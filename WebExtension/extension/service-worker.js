chrome.runtime.onInstalled.addListener(() => {
    // remove any old storage from previous versions of this extension
    chrome.storage.local.clear();
});

// remove the stored options when a page navigation occurs
chrome.webNavigation.onCompleted.addListener(async (details) => {
    if (details.frameId == 0) {
        try {
            await chrome.scripting.executeScript({
                target: {
                    tabId: details.tabId,
                    allFrames: false
                },
                // This needs to be relative to teh root of the extension
                files: ["extension/content-setting.js"],
            });
        } catch (err) {
            console.error(`failed to execute js/content-setting.js script: ${err}`);
        }
    }
});

