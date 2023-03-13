# !/bin/sh

set -e
set -u


rm -rf ChromeBundle
mkdir ChromeBundle

cd WebExtension

# Create the build id from the version

# Get the current branch
BRANCH=`git rev-parse --abbrev-ref HEAD`

# If we're on the main branch, then we just need to get that version number
if [ $BRANCH == main ] ; then
	BUILD="`git rev-list --count HEAD`"
else
	# Get the last common ancestor
	MAIN_MERGE_POINT=`git merge-base --fork-point main`

        # Count how many changes led to the branch point
	MAIN_VERSION_COUNT=`git rev-list --count $MAIN_MERGE_POINT`

        # Count how many revisions on this branch since it split off main
	POINT_VERSION_COUNT=`git rev-list --count HEAD ^main`

        # COmbine the two intot he version number
	BUILD="$MAIN_VERSION_COUNT.$POINT_VERSION_COUNT"
fi

VERSION=`grep '"version_name" *:' manifest.json | sed 's/.*\"version_name\" *: *\"\([^\"]*\)\".*/\1/'`

echo Build $BUILD
echo Version $VERSION

sed -i'~' 's/"version" *: *"[^"]*".*/"version": "'$BUILD'",/' manifest.json
# Delete backup files created by sed
find . -name "*~" -delete

# build the extension
    NAME=`grep '"name"' manifest.json | sed -e 's/.*"name":.*"\([^"]*\)".*/\1/' | tr '[A-Z]' '[a-z]' | tr ' ' '_'`
    BUNDLENAME=${NAME}-${VERSION}.zip
    zip -r ../ChromeBundle/$BUNDLENAME *
