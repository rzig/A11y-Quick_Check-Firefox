"use strict";

for (const element of document.querySelectorAll(
  ".dl-valid-9927845, .dl-warning-9927845, .dl-invalid-9927845",
)) {
  element.classList.remove(
    "dl-valid-9927845",
    "dl-warning-9927845",
    "dl-invalid-9927845",
  );
}

removeInjectedDivs([
  "dl-valid-message-9927845",
  "dl-warning-message-9927845",
  "dl-invalid-message-9927845",
  "remove-inner-dl-9927845",
  "remove-outerdiv-9927845"
]);
