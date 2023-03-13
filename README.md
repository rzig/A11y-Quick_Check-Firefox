# A11y-Quick-Check
Simple extension for basic accessibility testing against the WCAG guidelines.

## Extension versioning

Extensions in Chrome and Safari have two version numbers. Chrome has a `version` number that is used to determine upgrades, and an English `version_name` that is displayed to users. The build script will automatcially update the `version` number based on the git history. The `version_name` needs to be set manually for a release of the Chrome extension. While Chrome uses this as a display string, the Firefox and Safari scripts make use of these versions, and therefore they should always be in the `Major.Minor.Patch` format, and the number shoudl always increase as per the [rules of extension version numbers](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/version#version_format).

The Safari has a [version number](https://help.apple.com/xcode/mac/current/#/devc092854f5) and a [build string](https://help.apple.com/xcode/mac/current/#/dev93a5ca344). The version number is displayed to users, and needs to be increased for each release published on the app store (Testflight builds can have several builds sharing the same version number), and the build string needs to be incremented for every build uploaded to App Store Connect, even if it will jsut be used for testing.

Firefox does not understand `version_name`, so instead, we use chrome's `version_name` as Firefox's `version`. This means that Firefox does not have a build ID, and is entirely dependent on the

### The automatic build number

#### Build off the `main` branch

If you are building off the `main` branch, the build number is the total number of commits on the main branch. This includes any commits on another branch that have been merged back into the main branch.

#### Build off another branch

If you are building off a branch off `main`, the major version is the most recent commit on both the `main` branch, and the branch you are building off. This is either the point at which the branch was created, ot the most recent revision that was merged from `main` into the branch. The minor version is the number of commits that re on the branch, but not in the main branch.

## Chrome

The Chrome extension can be run locally by pointing Chrome to the WebExtension folder.

To create a publishable version of the Chrome extension, run the `chrome-extension.sh` 
script. It will automatically update the version based on the git history.

The display version number can be set manually updating the `version_name` string in `manifest.json`. The Chrome developer documentation on [extension versioning](https://developer.chrome.com/docs/extensions/mv3/manifest/version/).

## Firefox

A Firefox extension can be created from the Chrome extension by running the `firefox-extension.sh` script on Linux or macOS. This script will:
* Duplicate the existing Chrome Extension
* Change the Manifest file:
    * Change the manifest from V3 to V2
    * Change the `service_worker` to a background event script
    * Add the required `browser_specific_settings` section
    * Add `<all_urls>` to the permissions section
    * Remove the `host_permissions` section, which isn't supported in a Manifest V2 file
    * Remove the version field, and re-name the version_name field to version.
* Change the `chrome.` namespace in javascript files to `browser.`. Firefox's V2 `browser.*` api endpoints support promise returns, but Chorme's V2 does not, and isn't emulated, so we jsut rename them all.
* Create a bundle from the extension

**IMPORTANT**: If you edit the files in the Firefox browser, you will need to manually copy them back into the WebExtension folder. The Firefox folder will not be comitted

Eventually it would be nice to switch Firefox to a V3 manifest, but support for V3 manefests in Firefox is still in beta. Mozilla has a guide on [how to get v3 manifests working](https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/). At the moment, Firefox does not support Service Workers, whch we use. 

If you have node installed, you can install the [`web-ext` npm module](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) to easily run and debug the extension:
* Run the extension with `web-ext run -f firefoxdeveloperedition --firefox-preview --devtools`
* Lint the extension with `web-ext lint --firefox-preview`
* Build/package the extension with `web-ext build -a ../` (This is what the script uses if it's installed, otherwise it will use `zip(1)`).

## Safari

The build number of the app is generated as part of the Xcode build process. Unfortunately, this requires an update to the project file, which will cause the build to be cancelled. If that happens, re-running the build again will fix the issue. 

Apple provide instructions to [run new extensions in Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/running_your_safari_web_extension).

To re-create the app, use `xcrun safari-web-extension-converter WebExtension --app-name "A11y Quick Check" --bundle-identifier au.com.helvig.A11y-Quick-Check --swift --rebuild-project Safari/A11y\ Quick\ Check/A11y\ Quick\ Check.xcodeproj`. You will need to manually add a 1024x1042 iOS icon. You can use the mac 512x512 @2x icon.
