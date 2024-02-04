#! /bin/sh

set -e
set -u

echo This script will restore the history that was lost when the beta version was copied.

echo "";
echo "";
echo "  +-----------------+";
echo "  |  Current state  |";
echo "  +-----------------+                +--------------------+";
echo "  ---------------------------------> | Release Repository |";
echo "                                     +--------------------+";
echo "                                     +--------------------+";
echo "                  -----------------> |  Beta Repository   |";
echo "                                     +--------------------+";
echo "";
echo " +-----------------------+";
echo " | After running script  |";
echo " +-----------------------+           +--------------------+";
echo "  ----------------+----------------> | Release Repository |";
echo "                  |                  +--------------------+";
echo "                  |";
echo "                  |                  +--------------------+";
echo "                  +----------------> |  Beta Repository   |";
echo "                                     +--------------------+";
echo "";

echo The script will restore the history, without actually merging any changes
echo that have happened on the release branch since the beta repo was created.

echo "";
echo Because this does re-write the history, you should know what you are doing
echo before you run it. This script contains a protection that will rpevent it 
echo from making any changes.

exit

# Get the current remote
REMOTE_BETA=$(git remote show origin | grep 'Fetch URL' | sed 's#.*\(http.*\)$#\1#')

BETA_CHECKOUT=A11yQC-beta-merge

cd ..

rm -rf ${BETA_CHECKOUT}

# get the base path for the current repo
REMOTE_BASE=$(echo ${REMOTE_BETA} | sed 's#\(.*/\)[^/]*$#\1#')
REMOTE_RELEASE=${REMOTE_BASE}A11y-Quick-Check.git
REMOTE_RELEASE_MARCUS=$(echo ${REMOTE_RELEASE}|sed 's/LaurenceRLewis/MarcusP-P/g')

# Backup the repos
for BACKUP_REPO in ${REMOTE_BETA} ${REMOTE_RELEASE} ${REMOTE_RELEASE_MARCUS}; do
	# We start with a mirror clone, then bundle it into a single bundle file.
	echo Backing up ${BACKUP_REPO}
	BACKUP_REPO_NAME=$(echo ${BACKUP_REPO} | sed 's#.*/\([^/]*\)/\([^/]*\)$#\1-\2#')

	rm -rf ${BACKUP_REPO_NAME} ${BACKUP_REPO_NAME}.bundle
	git clone --quiet --mirror ${BACKUP_REPO} ${BACKUP_REPO_NAME}
	pushd ${BACKUP_REPO_NAME}

	git bundle create --quiet ../${BACKUP_REPO_NAME}.bundle --all

	popd

	rm -rf ${BACKUP_REPO_NAME}
done

git clone -o beta-origin ${REMOTE_BETA} ${BETA_CHECKOUT}
cd ${BETA_CHECKOUT}

# Rename the main branch
git branch -m main local-beta-origin/beta

# Add the release version as a remote
echo Adding release origin
git remote add -f --tags release-origin ${REMOTE_RELEASE}

# Add Marcus release version as a remote
echo Adding marcus release origin
git remote add -f --tags release-origin-marcus ${REMOTE_RELEASE_MARCUS}

# Get everything...
echo Fetching all remotes
git fetch --quiet --all

# Find the second commit
FIRST_COMMIT=$(git log --before "Tue Mar 14 06:49:43 2023 +1000" --pretty=oneline -1 | sed 's/^\([^ ]*\) .*/\1/')

# graft the Beta to the release version.
echo Grafting the history into the the beta tree.
git replace --graft $FIRST_COMMIT 75c442c4876c32a90e8a7133d27dda7a42f14cae

# filter the repo to change the the graft into a real tree link
echo Linking the graft permanently
git filter-repo --quiet --force

# Create local copies of all branches
for CURRENT_BRANCH in $(git branch -r | grep -v 'beta-origin\/main'); do
	git switch -c local-${CURRENT_BRANCH} ${CURRENT_BRANCH}
done


# Cleanup repos

# While we're here, remove any .DS_Store turds left lying around
echo Removing any .DS_Store files.
git filter-repo --quiet --invert-paths --path '.DS_Store' --use-base-name

exit

# We don't want to risk the release tree.
echo Forgetting release remote
git remote remove release-origin
git remote remove release-origin-marcus

# Add in the origional remote.
git remote add origin ${REMOTE}

# Fetch the origin
git fetch --quiet --all

exit

# Re-add the upstream branch
for BRANCH in $(git branch --list --format '%(refname:short)'); do
	git branch --set-upstream-to=origin/${BRANCH} ${BRANCH}
done

# Force push the new versions back to the server
for BRANCH in $(git branch --list --format '%(refname:short)'); do
	git switch --quiet ${BRANCH}
	git push --quiet --force
done
