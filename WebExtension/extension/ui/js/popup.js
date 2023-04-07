const clearAllOptions = document.getElementById("clearAllOptions");
const setAllOptions = document.getElementById("setAllOptions");

// The emptuy tab container element for the tab container
const tabContainer = document.getElementById("soup");

// The checked state of the popup. is in sync with the state on the content script.
let options = {};

// The mapping between checkbox controls and the css and scripts
const eventConfig = new Map();

// Create event handlers for the check all and uncheck all buttons
clearAllOptions.addEventListener("click", function () {
  setAllCheckboxes(false);
});

setAllOptions.addEventListener("click", function () {
  setAllCheckboxes(true);
});

// load the json file, and create the tabs
setupConfiguration(eventConfig, tabContainer, "./options.json")
  // until we can use await here, we need to fake it with .then
  .then(() => {
    // setup the tab evets
    configureTabs();
  });

// Loads the tab and checkbox setting from the json configuratiuon file
function loadConfiguration(resource) {
  // Convert XMLHttpRequest from a callback to a promise that can be used with await.
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    // Create an event handler that fires when the request finishes.
    // This will create the promise when we finish.
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        let data = JSON.parse(request.responseText);
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
async function setupConfiguration(eventConfig, container, resource) {
  const configuration = await loadConfiguration(resource);

  // Make sure our top level container hass the correct class...
  await container.classList.add("tabs");

  // Create a Tab List node to store the actual tab buttons.
  const tabList = document.createElement("div");
  tabList.role = "tablist";
  tabList.ariaLabel = "Quick check sections";
  container.appendChild(tabList);

  // Keep track of how many tabs we've created
  // There is no specific reason we're counting from 1, rather than 0, but you can use
  // whatever you want.
  const initialTabNumber = 1;
  let tabNumber = initialTabNumber;

  // Create an actual tab for each tab we have in the configuration
  for (const tabConfiguration of configuration.tabs) {
    // create the actual tab control itself
    const tabButton = document.createElement("button");
    tabButton.role = "tab";
    tabButton.id = "tab-" + tabNumber;

    // Only the first tab is selected
    tabButton.ariaSelected = tabNumber === initialTabNumber;

    // Only the initial tab is in the tab order. The rest can be programatically focussed.
    tabButton.tabIndex = tabNumber === initialTabNumber ? 0 : -1;

    tabButton.innerText = tabConfiguration.name;

    // Create the tabPanel to store the controls.
    const tabPanel = document.createElement("div");
    tabPanel.id = "panel-" + tabNumber;
    tabPanel.role = "tabpanel";

    // all but the first panel are hidden
    if (tabNumber !== initialTabNumber) {
      tabPanel.hidden = true;
    }

    // insert the tab and panel to their container
    tabList.appendChild(tabButton);
    container.appendChild(tabPanel);

    // link the tab button and the tabPannel
    tabButton.setAttribute("aria-controls", tabPanel.id);
    tabPanel.setAttribute("aria-labelledby", tabButton.id);

    // setup fieldsets for the checkbox groupings
    for (const fieldsetConfiguration of tabConfiguration.fieldsets) {
      const fieldset = document.createElement("fieldset");

      //  Make sure it has a legend
      const legend = document.createElement("legend");

      legend.innerText = fieldsetConfiguration.name;
      fieldset.appendChild(legend);

      // We use a DIV wrapper
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

        // Add the divWrapper element to the fieldset element
        fieldset.appendChild(divWrapper);

        // Check the number of li elements and add a class to the divWrapper element if necessary
        const liCount = list.querySelectorAll("li").length;

        if (liCount > 5) {
          divWrapper.classList.add("multi-column--container-299867");
        }

        // create the input element
        const checkBox = document.createElement("input");
        checkBox.id = checkboxConfiguration.id;
        checkBox.type = "checkbox";

        // make sure we add the checkbox to the dom
        listItem.appendChild(checkBox);

        // Create the label
        const label = document.createElement("label");
        label.classList.add("switch--label");

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

        //Updated to include radio button group option

        // create radio button group
        if (checkboxConfiguration.radioButtonGroup) {
          const radioGroupDiv = document.createElement("div");
          radioGroupDiv.classList.add("radio-group");

          const radioGroupLabel = document.createElement("label");
          radioGroupLabel.innerHTML =
            checkboxConfiguration.radioButtonGroup.name;

          radioGroupDiv.appendChild(radioGroupLabel);

          const radioButtons =
            checkboxConfiguration.radioButtonGroup.radioButtons;

          let defaultCheckedButton = null;

          for (const radioButton of radioButtons) {
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = checkboxConfiguration.radioButtonGroup.id;
            radioInput.value = radioButton.value;

            if (radioButton.disabledUntilChecked) {
              radioInput.disabled = true;
            }

            if (radioButton.defaultChecked) {
              radioInput.checked = true;
              defaultCheckedButton = radioInput;
            }

            if (radioButton.data) {
              for (const [key, value] of Object.entries(radioButton.data)) {
                radioInput.setAttribute(`data-${key}`, value);
              }
            }

            const radioLabel = document.createElement("label");
            radioLabel.innerHTML = radioButton.label;
            radioLabel.setAttribute(
              "for",
              `${checkBox.id}-${radioButton.value}`
            );

            radioGroupDiv.appendChild(radioInput);
            radioGroupDiv.appendChild(radioLabel);
          }

          // add the radio button group to the list item
          listItem.appendChild(radioGroupDiv);

          // add event listener to enable/disable radio buttons
          checkBox.addEventListener("change", () => {
            const radioInputs =
              radioGroupDiv.querySelectorAll("input[type=radio]");

            for (const radioInput of radioInputs) {
              radioInput.disabled = !checkBox.checked;

              if (checkBox.checked && defaultCheckedButton !== null) {
                if (
                  radioInput.value ===
                  checkboxConfiguration.radioButtonGroup
                    .defaultCheckedButtonValue
                ) {
                  radioInput.checked = true;
                }
              }
            }
          });

          // set default checked radio button from JSON
          if (defaultCheckedButton === null) {
            const defaultCheckedButtonValue =
              checkboxConfiguration.radioButtonGroup.defaultCheckedButtonValue;
            const radioInputs =
              radioGroupDiv.querySelectorAll("input[type=radio]");

            for (const radioInput of radioInputs) {
              if (radioInput.value === defaultCheckedButtonValue) {
                radioInput.checked = true;
                defaultCheckedButton = radioInput;
                break;
              }
            }
          }

          

        }
            
        // hook the listitem into the DOM
        list.appendChild(listItem);

        // get the current checkbox state for the checkbox.
        // We need to do this before we install teh event handkler to stop it from triggering.
        await loadCheckboxValue(checkBox);

        // hookup the event listener so we get the click events
        checkBox.addEventListener("change", async (event) => {
          await checkboxEventHandler(event);
        });

        // Get the add/remove scripts and CSS files for this checkbox
        const resources = {};

        // ensure the path starts with, and ends with a /
        let path = checkboxConfiguration.resource_path;
        if (path.substring(0, 1) !== "/") {
          path = "/" + path;
        }
        if (path.substring(path.length - 1) !== "/") {
          path += "/";
        }
        if (Object.hasOwn(checkboxConfiguration, "css")) {
          resources["css"] = path + checkboxConfiguration.css;
        }
        if (Object.hasOwn(checkboxConfiguration, "addScript")) {
          resources["addScript"] = path + checkboxConfiguration.addScript;
        }
        if (Object.hasOwn(checkboxConfiguration, "removeScript")) {
          resources["removeScript"] = path + checkboxConfiguration.removeScript;
        }

        // add the resources to the map, using the checkbox element itself as the key.
        eventConfig.set(checkBox, resources);
      }

      // Hook the fieldset into the tab panel's DOM
      tabPanel.appendChild(fieldset);
    }

    // make sure we change this to ensure a unique tab
    tabNumber += 1;
  }
}

// Gets the value from the session storage, and sets the checkbox appropriately
// The checkbox is passed in, and the id is used to look up the saved value, but the checkbox itself's
// checked proeprty is updated directly
async function loadCheckboxValue(checkbox) {
  const checkboxName = checkbox.id;

  await loadOptionsObject();

  let checked = false;

  // If we don't have a value, assume it's false, and save it back.
  if (!options.hasOwnProperty(checkboxName)) {
    options[checkboxName] = checked;
    await saveOptionsObject();
  }

  checked = options[checkboxName];

  checkbox.checked = checked;
}

// saves the checkbox value to session storage
async function saveCheckboxValue(checkbox) {
  const checkboxName = checkbox.id;

  options[checkboxName] = checkbox.checked;

  await saveOptionsObject();
}

// Loads the options from session storage
async function loadOptionsObject() {
  try {
    options = await chrome.tabs.sendMessage(
      await getTabId(),
      { getSettings: true },
      { frameId: 0 }
    );
  } catch (err) {
    // if that didn't work, assume the script isn't loaded in the tab, and re try after loading the script.
    await chrome.scripting.executeScript({
      target: {
        tabId: await getTabId(),
        allFrames: false,
      },
            files: ["/extension/content-setting.js", "extension/common.js"],
    });
    options = await chrome.tabs.sendMessage(
      await getTabId(),
      { getSettings: true },
      { frameId: 0 }
    );
  }
}

// Save the options to session storage
async function saveOptionsObject() {
  chrome.tabs.sendMessage(
    await getTabId(),
    { putSettings: true, value: options },
    { frameId: 0 }
  );
}

async function getTabId() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return tab.id;
}

// Inserts cssFileName css file into the active tab
async function insertCSS(cssFileName) {
  try {
    await chrome.scripting.insertCSS({
      target: {
        tabId: await getTabId(),
        allFrames: true,
      },
      files: [cssFileName],
    });
  } catch (err) {
    console.error(`failed to insert ${cssFileName} CSS: ${err}`);
  }
}

// Removes cssFileName css file from the active tab
async function removeCSS(cssFileName) {
  try {
    await chrome.scripting.removeCSS({
      target: {
        tabId: await getTabId(),
        allFrames: true,
      },
      files: [cssFileName],
    });
  } catch (err) {
    console.error(`failed to remove ${cssFileName} CSS: ${err}`);
  }
}

// Execute script in active tab. You can pass a string for one file, or an array for multiple
async function executeScript(scriptFileName) {
  try {
    let argumentArray;
    if (scriptFileName instanceof Array) {
      argumentArray = scriptFileName;
    } else {
      argumentArray = [scriptFileName];
    }
    await chrome.scripting.executeScript({
      target: {
        tabId: await getTabId(),
        allFrames: true,
      },
      files: argumentArray,
    });
  } catch (err) {
    console.error(`failed to execute ${scriptFileName} script: ${err}`);
  }
}

// Change a checkbox's value, and fire the changed event. Use this to force ensure the event handler is run
// so the action happens
function setCheckboxValueWithChangeEvent(checkbox, value, force = false) {
  if (force == true || checkbox.checked != value) {
    checkbox.checked = value;
    const event = new Event("change");
    checkbox.dispatchEvent(event);
  }
}

// set all checkboxes to the value of state
function setAllCheckboxes(state) {
  // loop through the eventConfig keys (which are the checkbox elements) and update their values
  for (const checkBox of eventConfig.keys()) {
    setCheckboxValueWithChangeEvent(checkBox, state, false);
  }
}

// a generic event handler that will look up eventConfig for the correct actions
// async function checkboxEventHandler(event) {
//   if (event.type !== "change") {
//     return;
//   }
//   const target = event.target;
//   const handlerConfig = eventConfig.get(target);

//   await saveCheckboxValue(target);

//   if (target.checked) {
//     if (Object.hasOwn(handlerConfig, "css")) {
//       await insertCSS(handlerConfig.css);
//     }
//     if (Object.hasOwn(handlerConfig, "addScript")) {
//       await executeScript(handlerConfig.addScript);
//     }
//   } else {
//     if (Object.hasOwn(handlerConfig, "css")) {
//       await removeCSS(handlerConfig.css);
//     }
//     if (Object.hasOwn(handlerConfig, "removeScript")) {
//       await executeScript(handlerConfig.removeScript);
//     }
//   }
// }
//either an array or a single file update
async function checkboxEventHandler(event) {
  if (event.type !== "change") {
    return;
  }
  const target = event.target;
  const handlerConfig = eventConfig.get(target);

  await saveCheckboxValue(target);

  if (target.checked) {
    if (Object.hasOwn(handlerConfig, "css")) {
      const cssFiles = Array.isArray(handlerConfig.css) ? handlerConfig.css : [handlerConfig.css];
      for (const cssFile of cssFiles) {
        await insertCSS(cssFile);
      }
    }
    if (Object.hasOwn(handlerConfig, "addScript")) {
      const addScripts = Array.isArray(handlerConfig.addScript) ? handlerConfig.addScript : [handlerConfig.addScript];
      await executeScript(addScripts);
    }
  } else {
    if (Object.hasOwn(handlerConfig, "css")) {
      const cssFiles = Array.isArray(handlerConfig.css) ? handlerConfig.css : [handlerConfig.css];
      for (const cssFile of cssFiles) {
        await removeCSS(cssFile);
      }
    }
    if (Object.hasOwn(handlerConfig, "removeScript")) {
      const removeScript = Array.isArray(handlerConfig.removeScript) ? handlerConfig.removeScript : [handlerConfig.removeScript];
      await executeScript(removeScript);
    }
  }
}








//Radio button functions
function addCheckboxAndRadioGroup(config) {
  // create the container div for the checkbox and radio button group
  const container = document.createElement("div");
  container.classList.add("checkbox-radio-group");

  // create the checkbox element
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = config.id;
  checkbox.classList.add("checkbox");

  // add the checkbox label
  const checkboxLabel = document.createElement("label");
  checkboxLabel.for = config.id;
  checkboxLabel.textContent = config.name;

  // check if the config has a radio button group
  if (config.radioButtonGroup) {
    // add the radio button group label
    const radioGroupLabel = document.createElement("div");
    radioGroupLabel.classList.add("radio-group-label");
    radioGroupLabel.textContent = config.radioButtonGroup.name;

    // create the radio button group element
    const radioGroup = document.createElement("div");
    radioGroup.classList.add("radio-group");

    // add each radio button to the group
    config.radioButtonGroup.radioButtons.forEach((button) => {
      const radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = config.radioButtonGroup.id;
      radioButton.id = button.id;
      radioButton.value = button.value;
      radioButton.classList.add("radio");

      if (button.defaultChecked) {
        radioButton.checked = true;
      }

      if (button.disabledUntilChecked) {
        radioButton.disabled = true;
      }

      // add the radio button label
      const radioLabel = document.createElement("label");
      radioLabel.for = button.id;
      radioLabel.textContent = button.label;

      // add any custom data attributes
      if (button.data) {
        Object.keys(button.data).forEach((key) => {
          radioButton.dataset[key] = button.data[key];
        });
      }

      // add the radio button and label to the group
      radioGroup.appendChild(radioButton);
      radioGroup.appendChild(radioLabel);
    });

    // add the radio button group to the container
    container.appendChild(radioGroupLabel);
    container.appendChild(radioGroup);

    // add event listener to enable/disable radio buttons
    checkbox.addEventListener("change", () => {
      const radioButtons = radioGroup.querySelectorAll("input[type=radio]");
      for (const radioButton of radioButtons) {
        radioButton.disabled = !checkbox.checked;
      }
    });

    // add event listener to execute the script on radio button change
    radioGroup.addEventListener("change", () => {
      const checkedButton = radioGroup.querySelector(
        'input[name="' + config.radioButtonGroup.id + '"]:checked'
      );
      executeScript(checkedButton.dataset.script);
    });
  } else {
    // add event listener to execute the script on checkbox change
    checkbox.addEventListener("change", () => {
      executeScript(config.addScript);
    });
  }

  // add the checkbox to the container
  container.appendChild(checkbox);
  container.appendChild(checkboxLabel);

  // add the container to the popup
  const popupContent = document.querySelector(".popup-content");
  popupContent.appendChild(container);
}

