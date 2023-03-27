(function() {
  let options_38ff418 = {};

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      // The service worker wants to get a setting
      if (Object.hasOwn(request, "getSetting")) {
          if (!Object.hasOwn(options_38ff418, request.setting)) {
              sendResponse({ value: false });
              return;
          }
          sendResponse({ value: options_38ff418[request.setting] });
          return;
      }
      if (Object.hasOwn(request, "getSettings")) {
          sendResponse(options_38ff418);
          return;
      }
      if (Object.hasOwn(request, "putSetting")) {
          options_38ff418[request.setting] = request.value;
          return;
      }
      if (Object.hasOwn(request, "putSettings")) {
          options_38ff418 = request.value;
          return;
      }
  });
})();


undefined;