import { options, getTabId } from './helper.utils.js';
import { InternalRequest } from "./dataDefinitions.js";

// Save the options to local storage
// export async function saveOptionsObject() {
//   if (options.size > 0) {
//     chrome.storage.local.set({ 'options': Array.from(options.entries()) });

//     const request = new InternalRequest();
//     request.type = "putSettings";
//     request.values = Array.from(options.entries());
//     chrome.tabs.sendMessage(await getTabId(), request, { frameId: 0 });
//   }
// }
export async function saveOptionsObject() {
  if (options.size > 0) {
    const request = new InternalRequest();
    request.type = "putSettings";
    request.values = Array.from(options.entries());
    chrome.storage.local.set({ 'options': request.values });
    chrome.tabs.sendMessage(await getTabId(), request, { frameId: 0 });
  }
}

// saves the checkbox value to session storage
export async function saveCheckboxValue(checkbox: HTMLInputElement) {
  const checkboxName = checkbox.id;

  options.set(checkboxName, checkbox.checked);

  await saveOptionsObject();
}

// Save the active tab identifier to local storage
export async function saveActiveTab(tabIdentifier: string) {
  console.log("Saving active tab:", tabIdentifier);
  options.set("activeTab", tabIdentifier);
  await saveOptionsObject();
}

// Load the active tab identifier from local storage
export async function loadActiveTab(): Promise<string | null> {
  return new Promise<string | null>((resolve) => {
    chrome.storage.local.get(['options'], (result) => {
      console.log("Loaded options from storage:", result);
      const loadedOptions = new Map(result['options'] as [string, boolean | string][]);
      const activeTab = loadedOptions.get("activeTab") as string;
      console.log("Resolved active tab:", activeTab);
      resolve(activeTab);
    });
  });
}

const activeTabId = await loadActiveTab();
console.log("Loaded active tab:", activeTabId);