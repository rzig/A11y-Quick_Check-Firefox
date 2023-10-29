import { InternalRequest, InternalResponse } from "./dataDefinitions.js";
import { options as errorOptions, getTabId } from './helper.utils.js';
import { tabContainer, setInvalidPage } from './popup.js';

// Loads the options from session storage
export async function loadOptionsObject() {
    let rawResponse: any;
    const request = new InternalRequest();
    request.type = "getSettings";
    try {
      rawResponse = await chrome.tabs.sendMessage(await getTabId(), request, {
        frameId: 0,
      });
    } catch (err) {
      try {
        await chrome.scripting.executeScript({
          target: {
            tabId: await getTabId(),
            allFrames: false,
          },
          files: ["/extension/content-setting.js", "checks/common.js"],
        });
      } catch (err2: any) {
        if (err2 instanceof Error) {
          if (
            err2.message.toLowerCase().includes("cannot access") ||
            err2.message.toLowerCase().includes("cannot be scripted.") ||
            err2.message.toLowerCase().includes("no tab with id")
          ) {
            console.log("Failed to get permission to insert the scripts");
            tabContainer.innerHTML =
              "<p>The browser has prevented the extension from accessing this tab.</p>";
            errorOptions.clear();
            setInvalidPage(true);  // Use the exported function to update invalidPage
            return;
          }
        }
        throw err2;
      }
      console.log(`getMessage err1 ${err}`);
      rawResponse = await chrome.tabs.sendMessage(await getTabId(), request, {
        frameId: 0,
      });
    }
  
    const response = new InternalResponse();
    response.values = rawResponse.values.reduce(
      (newMap: Map<string, boolean>, valuePair: Array<any>) =>
        newMap.set(valuePair[0], valuePair[1]),
      new Map<string, boolean>()
    );

    // Update errorOptions
    errorOptions.clear();
    for (const [key, value] of response.values!.entries()) {
      errorOptions.set(key, value);
    }
}
