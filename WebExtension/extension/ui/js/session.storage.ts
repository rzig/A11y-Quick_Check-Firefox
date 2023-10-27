import { options } from './helper.utils.js';
import { getTabId } from './helper.utils.js';
import { InternalRequest } from "./dataDefinitions.js";

// Save the options to session storage
export async function saveOptionsObject() {
    if (options.size > 0) {
      const request = new InternalRequest();
      request.type = "putSettings";
      request.values = Array.from(options.entries());
      chrome.tabs.sendMessage(await getTabId(), request, { frameId: 0 });
    }
  }