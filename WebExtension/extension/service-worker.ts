"use strict";

chrome.runtime.onInstalled.addListener(() => {
  // remove any old storage from previous versions of this extension
  chrome.storage.local.clear();
});

// remove the stored options when a page navigation occurs
chrome.webNavigation.onCompleted.addListener(async (details) => {
  // The common components need to exist in every frame
  try {
    await chrome.scripting.executeScript({
      target: {
        tabId: details.tabId,
        allFrames: true,
      },
      // This needs to be relative to the root of the extension
      files: ["checks/common.js", "extension/content-setting.js"],
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.toLowerCase().includes("cannot access")
        || err.message.toLowerCase().includes("cannot be scripted.")
        || err.message.toLowerCase().includes("no tab with id")) {
        console.log(`Failed to get permission to insert the scripts ${err}  (URL:${details.url})`);
        return;
      }
      console.error(`failed to load default client scripts: ${err} (URL:${details.url})`);
    }
    else {
      console.error(`Type of err: ${typeof (err)}`);
    }
  }
});
