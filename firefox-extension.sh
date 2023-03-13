# !/bin/sh

set -e
set -u

rm -rf Firefox FirefoxBundle
mkdir Firefox
mkdir FirefoxBundle
cp -R WebExtension/* Firefox
cd Firefox

mv manifest.json manifest.json~
grep -v '"version"' manifest.json~ > manifest.json
sed -i'~' 's/"version_name": "\([^"]*\)"/"version": "\1"/g' manifest.json
sed -i'~' 's/"service_worker": "\([^"]*\)"/"scripts": \["\1"\]/g' manifest.json
sed -i'~' '/"background":/i\
     "browser_specific_settings": \{\
        "gecko": \{\
            "id": "A11y-Quick-Check@LaurenceRLewis.github.com",\
            "strict_min_version": "103.0"\
        \}\
    \},\
' manifest.json

# Change to manifest V2 until Firefox V3 support is out...
sed -i'~' 's/"manifest_version": 3,/"manifest_version": 2,/' manifest.json
sed -i'~' 's/"action": {/"browser_action": {/' manifest.json
sed -i'~' '/"permissions":/a\
        "<all_urls>",\
' manifest.json
sed -i'~' '/"host_permissions"/,+2d' manifest.json

# V2 manifests don't support promises for chrome.* calls, so 
find . -name "*.js" -exec sed -i'~' 's/chrome\./browser./g' {} \;

# Delete backup files created by sed
find . -name "*~" -delete

# build the extension
if [ -x "`which web-ext`" ] ;  then
    web-ext build -a ../FirefoxBundle
elif [ -x "`which zip`" ] ; then
    VERSION=`grep '"version"' manifest.json | sed -e 's/.*"\([0-9][^"]*\)".*/\1/'`
    NAME=`grep '"name"' manifest.json | sed -e 's/.*"name":.*"\([^"]*\)".*/\1/' | tr '[A-Z]' '[a-z]' | tr ' ' '_'`
    BUNDLENAME=${NAME}-${VERSION}.zip
    zip -r ../FirefoxBundle/$BUNDLENAME *
fi