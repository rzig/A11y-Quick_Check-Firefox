# !/bin/sh

set -e
set -u

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

VERSION=`grep '"version_name" *:' ../WebExtension/manifest.json | sed 's/.*\"version_name\" *: *\"\([^\"]*\)\".*/\1/'`

echo Build $BUILD
echo Version $VERSION

sed  's/\(CURRENT_PROJECT_VERSION *= *\).*$/\1'$BUILD';/' "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj" > "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj~"
sed -i~ 's/\(MARKETING_VERSION *= *\).*$/\1'$VERSION';/' "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj~" > "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj~~"

rm "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj~"

if ! diff -q "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj" "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj~~" ; then
        mv "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj~~" "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj"
else
        rm "A11y Quick Check/A11y Quick Check.xcodeproj/project.pbxproj~~"
fi

# Duplicate the Webextension
rm -rf WebExtension
mkdir WebExtension
cp -R ../WebExtension .
cd WebExtension

# Safari requires the persistant: false value
sed -i'~' '/"service_worker\":/a\
        \"persistent\": false\
' manifest.json

sed -i'~~' 's/\("service_worker".*\)/\1,/' manifest.json


#sed -i'~~' '/"background":/i\
#     "browser_specific_settings": \{\
#        "gecko": \{\
#            "id": "A11y-Quick-Check@LaurenceRLewis.github.com",\
#            "strict_min_version": "103.0"\
#        \}\
#    \},\
#' manifest.json

# Delete backup files created by sed
find . -name "*~" -delete

cd ..

