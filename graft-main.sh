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
BETA_FIRST_COMMIT=$(git rev-list HEAD | tail -n 2 | head -n 1)

# graft the Beta to the release version.
echo Grafting the history into the the beta tree.
git replace --graft ${BETA_FIRST_COMMIT} 75c442c4876c32a90e8a7133d27dda7a42f14cae

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

# Convert line endings

# Find first commit of old main
#echo Finding first commit

#FIRST_COMMIT=$(git rev-list HEAD | tail -n 1)

#git checkout ${FIRST_COMMIT}

echo Creating .gitAttributes
cat << --EOF > ../.gitattributes
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

echo Creating update shell scriopt
cat << --EOF > ../update-repo.sh
#! /bin/sh

set -e
set -u

if [ -z "\${1-}" ] ; then
    echo "\$1 not set or empty"
    exit 1
fi

CURRENT_DIR=\${1-}

echo
echo Update repo script

echo Creating and adding .gitattributes 
# Copy the .gitattributes file
cp \${CURRENT_DIR}/../.gitattributes . 

git add .gitattributes

echo Converting line endings

git ls-files -z | xargs -0 dos2unix -q -r -e -ic0 -- | xargs -0 dos2unix -r -e --

# Normalise the formatting

### Functions to create various files

## package.json
# stage 1 is before creation of WebExtension folder
create_package_json_stage1 ()
{
cat << !!EOF > package.json
{
  "private": true,
  "scripts": {
    "stylelint-fix": "stylelint --fix \"**/*.{css,scss}\"",
    "eslint-fix": "eslint --fix \"**/*.js\"",
    "prettier-fix": "prettier --ignore-unknown --log-level warn --write \"**/*\""
  },
  "devDependencies": {
    "eslint": "8.52.0",
    "eslint-config-prettier": "9.0.0",
    "eslint-config-eslint": "9.0.0",
    "prettier": "3.0.3",
    "prettier-plugin-sh": "0.13.1",
    "sass": "1.69.5",
    "stylelint": "15.11.0",
    "stylelint-config-standard-scss": "11.0.0",
    "typescript": "5.2.2"
  }
}
!!EOF
}

# stage 1 is before the start of TypeScript conversion
create_package_json_stage2 ()
{
cat << !!EOF > package.json
{
  "private": true,
  "scripts": {
    "stylelint-fix": "stylelint --fix \"WebExtension/**/*.{css,scss}\"",
    "eslint-fix": "eslint --fix \"WebExtension/**/*.js\"",
    "prettier-fix": "prettier --ignore-unknown --log-level warn --write \"WebExtension/**/*\""
  },
  "devDependencies": {
    "eslint": "8.52.0",
    "eslint-config-prettier": "9.0.0",
    "eslint-config-eslint": "9.0.0",
    "prettier": "3.0.3",
    "prettier-plugin-sh": "0.13.1",
    "sass": "1.69.5",
    "stylelint": "15.11.0",
    "stylelint-config-standard-scss": "11.0.0",
    "typescript": "5.2.2"
  }
}
!!EOF
}

## .stylelintignore
# stage 1 for before creation of the WebExtension folder
create_stylelintignore_stage1 ()
{
cat << !!EOF >  .stylelintignore
.eslintrc.js
node_modules
!!EOF
}

## .stylelintrc
# stage 1 for before creation of the WebExtension folder
create_stylelintrc_stage1 ()
{
cat << !!EOF >  .stylelintrc
{
  "extends": ["stylelint-config-standard-scss"],
  "overrides": [
    {
      "files": ["WebExtension/**/*.scss"],
      "customSyntax": "postcss-scss"
    }
  ],
  "rules": {
	"declaration-block-single-line-max-declarations": null,
	"selector-class-pattern": null,
	"unit-no-unknown": null,
	"font-family-no-missing-generic-family-keyword": null,
	"no-descending-specificity": null,
	"custom-property-pattern": null,
	"no-duplicate-selectors": null,
	"custom-property-pattern": null,
	"scss/load-no-partial-leading-underscore": null,
	"scss/at-mixin-pattern": null,
  }
}
!!EOF
}


## .eslintignore
# stage 1 for before creation of the WebExtension folder
create_eslintignore_stage1 ()
{
cat << !!EOF >  .eslintignore
.eslintrc.js
node_modules
!!EOF
}

## eslintrc.js
# stage 1 for before creation of the WebExtension folder
create_eslintrc_js_stage1 ()
{
cat << !!EOF >  .eslintrc.js
/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "prettier",
  ],
  env: {
    es2022: true,
    browser: true,
    webextensions: true,
  },
  rules: {
	"no-undef": ["off"],
	"no-prototype-builtins": ["off"],
	"no-unused-vars": ["off"],
	"no-useless-escape": ["off"],
	"no-cond-assign": ["off"],
	"no-inner-declarations": ["off"],
  },
};
!!EOF
}

## .prettierignore
# stage 1 for before creation of the WebExtension folder
create_prettierignore_stage1 ()
{
cat << !!EOF >  .prettierignore
.eslintrc.js
node_modules
!!EOF
}

## .prettierrc
create_prettierrc ()
{
cat << !!EOF >  .prettierrc
{
  "plugins": ["prettier-plugin-sh"],
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "quoteProps": "as-needed",
  "trailingComma": "all",
  "bracketSpacing": false,
  "bracketSameLine": true,
  "arrowParens": "always",
  "proseWrap": "always",
  "htmlWhitespaceSensitivity": "css",
  "endOfLine": "auto",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false,
  "overrides": []
}
!!EOF
}

# Before we moved the location of the shell scripts, things were based
# in the root directory 
if [ -f manifest.json ]; then
	create_package_json_stage1
	create_stylelintignore_stage1
	create_stylelintrc_stage1
	create_eslintignore_stage1
	create_eslintrc_js_stage1
	create_prettierignore_stage1
	create_prettierrc

	npm install -d --no-audit --no-fund --loglevel warn

	# if [ "\$(shasum graft-main.sh)" = "ec8f70df6cc9f0ec9a33c3afcf4ff36878539b21  graft-main.sh" ]
	#sed -i@ 's/; border 3px/; border: 3px/g' css/headings.css
	#sed -i~ 's/; border 2px/; border: 2px/g' css/headings.css
	#sed -i~ 's/^role="heading"]/[role="heading"]/g' css/headings.css
	#rm css/headings.css~

	#sed -i@ "s/\',0);}//g" css/relatedFormControls.css

	#sed -i@ 's#<div class="the--icon"><img src="icons/icon.svg"</div>#<div class="the--icon"><img src="icons/icon.svg"></div>#g' popup.html

	set +e
	npm run stylelint-fix
	npm run eslint-fix
	npm run prettier-fix
	set -e

	rm package.json
	rm package-lock.json
	rm .stylelintignore
	rm .stylelintrc
	rm .eslintignore
	rm .eslintrc.js
	rm .prettierignore
	rm .prettierrc
	rm -rf node_modules
# The WebExtension folder has been created
elif [ -d WebExtension ]; then
	# At this stage we are still using JavaScript and CSS
	if [ ! -f WebExtension/package.json -a ! -f package.json ]; then
		create_package_json_stage2
		create_stylelintignore_stage1
		create_stylelintrc_stage1
		create_eslintignore_stage1
		create_eslintrc_js_stage1
		create_prettierignore_stage1
		create_prettierrc

		npm install -d --no-audit --no-fund --loglevel warn

		set +e
		npm run stylelint-fix
		npm run eslint-fix
		set -e
		npm run prettier-fix

		rm package.json
		rm .stylelintignore
		rm .stylelintrc
		rm package-lock.json
		rm .eslintignore
		rm .eslintrc.js
		rm .prettierignore
		rm .prettierrc
		rm -rf node_modules
	fi
fi
--EOF

chmod +x ../update-repo.sh

CURRENT_DIR=$(pwd)

echo Convert all text files to unix line endings, and add .gitattributes
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --tree-filter "${CURRENT_DIR}/../update-repo.sh ${CURRENT_DIR}" -- --all

echo Removing backup refs
rm -rf .git/refs/original

#echo Add .gitattributes to all history
#FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --tree-filter 'cp ../.gitattributes . && git add .gitattributes' -- --all

#echo Removing backup refs
#rm -rf .git/refs/original

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

# TODO:
# * Run eslint -fix, stylelint -fix, and prettier -fix on all code
#   * Before WebExtension directory
#   * WebExtension directory, no package.json
#   * WebExtension directory, package.json in WebExtension
#   * Some Typescript conversion
#   * WebExtension directory, package.json in root
#   * WebExtension directory, package.json in root, linting fix in package.json
# * Upgrade npm packages
# * Move the generation scripts from Release to Beta (Without enforcing linting)
# * Push changes back to remotes
#   * Release main renamed to old-release and added to all 3 repos
#   * Beta main to be added to all 3 repos as main
#   * All other branches force pushed
# * Close the Beta repository

# Re-add the upstream branch
for BRANCH in $(git branch --list --format '%(refname:short)'); do
	git branch --set-upstream-to=origin/${BRANCH} ${BRANCH}
done

# Force push the new versions back to the server
for BRANCH in $(git branch --list --format '%(refname:short)'); do
	git switch --quiet ${BRANCH}
	git push --quiet --force
done
