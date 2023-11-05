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
REMOTE=$(git remote show origin | grep 'Fetch URL' | sed 's#.*\(http.*\)$#\1#')

pushd ..

# get the base path for the current repo
REMOTE_BASE=$(echo $REMOTE | sed 's#\(.*/\)[^/]*$#\1#')
REMOTE_RELEASE=${REMOTE_BASE}A11y-Quick-Check.git

# Backup the repos
for BACKUP_REPO in ${REMOTE} ${REMOTE_RELEASE}; do
	# We start with a mirror clone, then bundle it into a single bundle file.
	echo Backing up ${BACKUP_REPO}
	BACKUP_REPO_NAME=$(echo ${BACKUP_REPO} | sed 's#.*/\([^/]*\)$#\1#')

	rm -rf ${BACKUP_REPO_NAME} ${BACKUP_REPO_NAME}.bundle
	git clone --quiet --mirror ${BACKUP_REPO}
	pushd ${BACKUP_REPO_NAME}

	git bundle create --quiet ../${BACKUP_REPO_NAME}.bundle --all

	popd

	rm -rf ${BACKUP_REPO_NAME}
done

popd

# While we're here, remove any .DS_Store turds left lying around
# This will also help make sure it's a freshly cloned repo
echo Removing any .DS_Store files.
git filter-repo --quiet --invert-paths --path '.DS_Store' --use-base-name

# Add the release version as a remote
echo Adding release origin
git remote add release-origin ${REMOTE_RELEASE}

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

# We don't want to risk the release tree.
echo Forgetting release remote
git remote remove release-origin

# Add in the origional remote.
git remote add origin ${REMOTE}

# Fetch the origin
git fetch --quiet --all

# Re-add the upstream branch
for BRANCH in $(git branch --list --format '%(refname:short)'); do
	git branch --set-upstream-to=origin/${BRANCH} ${BRANCH}
done

# Force push the new versions back to the server
for BRANCH in $(git branch --list --format '%(refname:short)'); do
	git switch --quiet ${BRANCH}
	git push --quiet --force
done
