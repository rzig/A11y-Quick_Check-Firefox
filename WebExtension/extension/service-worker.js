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
      files: ["extension/common.js"],
    });
  } catch (err) {
    console.error(`failed to load default client scripts: ${err}`);
  }
  // We only need to store the settings once per tab, so only execute them in the top frame
  if (details.frameId == 0) {
    try {
      await chrome.scripting.executeScript({
        target: {
          tabId: details.tabId,
          allFrames: false,
        },
        // This needs to be relative to teh root of the extension
        files: ["extension/content-setting.js"],
      });
    } catch (err) {
      console.error(`failed to load default client scripts: ${err}`);
    }
  }
});
