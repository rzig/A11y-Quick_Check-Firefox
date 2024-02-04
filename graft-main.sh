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
	pushd ${BACKUP_REPO_NAME} > /dev/null

	git bundle create --quiet ../${BACKUP_REPO_NAME}.bundle --all

	popd > /dev/null

	rm -rf ${BACKUP_REPO_NAME}
done

# Clone the main repo
echo Cloning main repo ${REMOTE_BETA}
git clone --quiet -o beta-origin ${REMOTE_BETA} ${BETA_CHECKOUT}
cd ${BETA_CHECKOUT}

BETA_MAIN_NAME=local-beta-origin/beta

# Rename the main branch
git branch --quiet -m main ${BETA_MAIN_NAME}

# Add the release version as a remote
echo Adding release origin
git remote add release-origin ${REMOTE_RELEASE}

# Add Marcus release version as a remote
echo Adding marcus release origin
git remote add release-origin-marcus ${REMOTE_RELEASE_MARCUS}

# Get everything...
echo Fetching all remotes
git fetch --tags --quiet --all

# Find the second commit
BATA_FIRST_COMMIT=$(git rev-list HEAD | tail -n 2 | head -n 1)

# graft the Beta to the release version.
echo Grafting the history into the the beta tree.
git replace --graft ${BATA_FIRST_COMMIT} 75c442c4876c32a90e8a7133d27dda7a42f14cae

# filter the repo to change the the graft into a real tree link
echo Linking the graft permanently
git filter-repo --quiet --force

# Create local copies of all branches
for CURRENT_BRANCH in $(git branch -r | grep -v 'beta-origin\/main'); do
	git switch --quiet -c local-${CURRENT_BRANCH} ${CURRENT_BRANCH}
done

git checkout ${BETA_MAIN_NAME}

# Cleanup repos

# While we're here, remove any .DS_Store turds left lying around
echo Removing any .DS_Store files.
git filter-repo --quiet --invert-paths --path '.DS_Store' --use-base-name

# Find first commit of old main
echo Finding first commit
FIRST_COMMIT=$(git rev-list HEAD | tail -n 1)

# Convert line endings

git filter-branch --tree-filter 'git ls-files  | grep -v "\.png$" | tr "\n" "\0" | xargs -0 -L1 dos2unix -q -r' -- --all

exit

git checkout ${FIRST_COMMIT}

cat << --EOF > .gitattributes
# Set the default behavior, in case people don't have core.autocrlf set.
* text lf

# Explicitly declare text files you want to always be normalized and converted
# to native line endings on checkout.
#*.c text=auto

# Declare files that will always have CRLF line endings on checkout.
#*.sln text eol=crlf

# Denote all files that are truly binary and should not be modified.
*.png binary
*.jpg binary
--EOF

git add .gitattributes

git commit --amend

git tag tmp

git checkout ${BETA_MAIN_NAME}

git rebase --rebase-merges --onto tmp ${FIRST_COMMIT}

git tag -d tmp


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
