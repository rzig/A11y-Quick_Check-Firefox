# A11y-Quick-Check
Simple extension for basic accessibility testing against the WCAG guidelines.

## Build Instructions

Note: all commands are executed from the WebExtension folder

* Ensure you have NPM installed
* Install the dependencies `npm i --save-dev`

### Build options

* `npm run build` - Build into the ChromeExtension folder
* `npm run clean` - Erase the ChromeExtension folder
* `npm run rebuild` - Clean the ChromeExtension folder, and then build into it
* `npm run watch` - Build in watch mode - this mode doesn't terminate, but will keep an eye on the files in the WebExtension, and update the files in the ChromeExtension folder.

### Run stylelint to fix scss errors

 * `npx stylelint "**/*.scss"` - Check for scss errors
* `npx stylelint "**/*.scss" --fix` - Automatically fix scss errors