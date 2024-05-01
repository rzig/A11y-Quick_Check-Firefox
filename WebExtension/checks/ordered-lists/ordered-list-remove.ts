"use strict";

for (const element of document.querySelectorAll(
  ".ol-valid-9927845, .ol-warning-9927845, .ol-invalid-9927845",
)) {
  element.classList.remove(
    "ol-valid-9927845",
    "ol-warning-9927845",
    "ol-invalid-9927845",
  );
}

removeInjectedDivs([
  "ol-message-9927845",
  "ol-warning-message-9927845",
  "ol-invalid-message-9927845",
  "remove-inner-ol-9927845",
  "remove-outerdiv-9927845"
]);
