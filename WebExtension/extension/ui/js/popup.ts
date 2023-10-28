"use strict";

import { TabManager } from "./tabs.js";
import { TabsUtils } from "./tabs.utils.js";
import { HelpUtils } from "./helptext.utils.js";
import { SetAllCheckboxesUtils, CheckboxManager } from "./checkbox.utils.js";
import { Item , Options } from "./dataDefinitions.js";
import { saveCheckboxValue } from './session.storage.js';

const svgIcon = `
<svg aria-hidden="true" width="32" height="32" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="12" fill="#5941a9" />
    <text x="50%" y="50%" font-size="24px" font-weight="bold" text-anchor="middle" dy=".3em" fill="#fff">?</text>
</svg>`;

// The empty tab container element for the tab container
export const tabContainer = document.getElementById("soup")!
// The checked state of the popup. is in sync with the state on the content script.
let options = new Map<string, boolean>();

let invalidPage = false;

export function setInvalidPage(value: boolean): void {
  invalidPage = value;
}
// The mapping between checkbox controls and the css and scripts
export const eventConfig = new Map<HTMLInputElement, Item>();

// load the json file, and create the tabs
setupConfiguration(
  eventConfig,
  tabContainer ?? new HTMLElement(),
  "./options.json"
)
  // until we can use await here, we need to fake it with .then
  .then(() => {
    if (options == null || invalidPage) {
      return;
    }

    // setup the tab events using the new TabManager instance
    const tabManager = new TabManager();
  });

// Loads the tab and checkbox setting from the json configuratiuon file
function loadConfiguration(resource: string): Promise<Options> {
  // Convert XMLHttpRequest from a callback to a promise that can be used with await.
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    // Create an event handler that fires when the request finishes.
    // This will create the promise when we finish.
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        let data: Options = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject("error getting resources");
      }
    });

    // get the json file.
    request.open("GET", resource);
    request.send();
  });
}

// create the tabs and checkboxes from a JSON config file
async function setupConfiguration(
  eventConfig: Map<HTMLElement, Item>,
  container: HTMLElement,
  resource: string
) {
  await loadOptionsObject();

  if (invalidPage) {
    return;
  }
  const configuration = await loadConfiguration(resource);

  // Make sure our top level container has the correct class.
  container.classList.add("tabs");

  // Use utility class to create a Tab List node to store the actual tab buttons.
  const tabList = TabsUtils.createTabList(container);

  // Keep track of how many tabs we've created
  const initialTabNumber = 1;
  let tabNumber = initialTabNumber;

  // Create an actual tab for each tab we have in the configuration
  for (const tabConfiguration of configuration.tabs) {
    // Use utility class to create the actual tab control itself
    const tabButton = TabsUtils.createTab(
      tabList,
      tabConfiguration,
      tabNumber,
      initialTabNumber
    );

    // Use utility class to create the tab panel to store the controls.
    const tabPanel = TabsUtils.createTabPanel(
      container,
      tabNumber,
      initialTabNumber
    );

    // Use utility class to link the tab button and the tab panel
    TabsUtils.linkTabAndPanel(tabButton, tabPanel);

    const { checkAllCheckbox, checkAllLabel } =
      SetAllCheckboxesUtils.setCheckAllCheckbox(
        tabNumber,
        tabConfiguration
      );

    // Create a div container to wrap the checkbox and its label
    const checkAllWrapper = document.createElement("div");
    checkAllWrapper.classList.add("check-all-wrapper-7786978");

    // Append the checkbox and the label to the div container
    checkAllWrapper.appendChild(checkAllCheckbox);
    checkAllWrapper.appendChild(checkAllLabel);

    // Add the div container to the tabPanel
    tabPanel.appendChild(checkAllWrapper);

    checkAllCheckbox.addEventListener("change", async (event) => {
      const state = (event.target as HTMLInputElement).checked;
    
      // Update the state of individual checkboxes
      const checkboxes = tabPanel.querySelectorAll<HTMLInputElement>(
        "input[type='checkbox']:not(.check-all)"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = state;
        checkbox.dispatchEvent(new Event("change"));
      });
    
      // Save the state of the "Check All" checkbox
      await saveCheckboxValue(checkAllCheckbox);
    });
    

    // setup fieldsets for the checkbox groupings
    for (const fieldsetConfiguration of tabConfiguration.fieldsets) {
      const fieldset = document.createElement("fieldset");

      //  Make sure it has a legend
      const legend = document.createElement("legend");
      legend.innerText = fieldsetConfiguration.name;
      fieldset.appendChild(legend);

      //Optional help text for the section
      if (fieldsetConfiguration.helpSection) {
        HelpUtils.createHelpSection(
          fieldset,
          fieldsetConfiguration.helpSection
        );
      }

      const divWrapper = document.createElement("div");
      divWrapper.classList.add("column--container-299867");

      // We use a list for the controls
      const list = document.createElement("ul");
      divWrapper.appendChild(list);

      // create the checkboxes
      for (const checkboxConfiguration of fieldsetConfiguration.items) {
        // Create list Item - we're within a UL here
        const listItem = document.createElement("li");
        listItem.classList.add("listItem-299867");

        // Optional help text for the item
        if (checkboxConfiguration.helpCheck) {
          HelpUtils.createHelpCheck(listItem, checkboxConfiguration.helpCheck);
        }

        // Add the divWrapper element to the fieldset element
        fieldset.appendChild(divWrapper);

        // create the input element
        const checkBox = document.createElement("input");
        checkBox.id = checkboxConfiguration.id;
        checkBox.type = "checkbox";

        // make sure we add the checkbox to the dom
        listItem.appendChild(checkBox);

        // Create the label
        const label = document.createElement("label");
        label.classList.add("switch--label-88947");

        // I'm not sure why we have a span within the label
        const span = document.createElement("span");
        span.classList.add("label");

        // give the label some text
        span.innerHTML = checkboxConfiguration.name;

        // add the span to the label
        label.appendChild(span);

        // link the label to the checkbox
        label.htmlFor = checkBox.id;

        // hook the label into the list item's DOM
        listItem.appendChild(label);

        // hook the listitem into the DOM
        list.appendChild(listItem);

        // get the current checkbox state for the checkbox.
        // We need to do this before we install teh event handkler to stop it from triggering.
        await loadCheckboxValue(checkBox);

        // hookup the event listener so we get the click events
        checkBox.addEventListener("change", async (event) => {
          await checkboxEventHandler(event);
          const checkboxManager = new CheckboxManager();
          checkboxManager.updateCheckAllState(tabPanel);
        });

        // Get the add/remove scripts and CSS files for this checkbox
        const resources: Partial<Item> = {}; // Using Partial<Item>

        // ensure the path starts with, and ends with a /
        let path = checkboxConfiguration.resource_path;
        if (path.substring(0, 1) !== "/") {
          path = "/" + path;
        }
        if (path.substring(path.length - 1) !== "/") {
          path += "/";
        }
        if (checkboxConfiguration.css != null) {
          if (Array.isArray(checkboxConfiguration.css)) {
            resources.css = checkboxConfiguration.css.map(
              (scriptFilename) => path + scriptFilename
            );
          } else {
            resources.css = path + checkboxConfiguration.css;
          }
        }
        if (Object.hasOwn(checkboxConfiguration, "addScript")) {
          if (checkboxConfiguration.addScript instanceof Array) {
            resources["addScript"] = checkboxConfiguration.addScript.map(
              (scriptFilename) => path + scriptFilename
            );
          } else {
            resources["addScript"] = path + checkboxConfiguration.addScript;
          }
        }

        if (Object.hasOwn(checkboxConfiguration, "removeScript")) {
          if (checkboxConfiguration.removeScript instanceof Array) {
            resources["removeScript"] = checkboxConfiguration.removeScript.map(
              (scriptFilename) => path + scriptFilename
            );
          } else {
            resources["removeScript"] =
              path + checkboxConfiguration.removeScript;
          }
        }

        // add the resources to the map, using the checkbox element itself as the key.
        eventConfig.set(checkBox, resources as Item);
      }

      // Hook the fieldset into the tab panel's DOM
      tabPanel.appendChild(fieldset);
    }

    // make sure we change this to ensure a unique tab
    tabNumber += 1;

    HelpUtils.createHelpLink(tabPanel, tabConfiguration.helpUrl);
  }
}

import { loadCheckboxValue } from './checkbox.storage.utils.js';
import { loadOptionsObject } from "./error.handling.js";
import { checkboxEventHandler } from './css.scripts.utils.js';