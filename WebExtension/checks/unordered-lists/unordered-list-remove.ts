"use strict";

for (const element of document.querySelectorAll(
  ".ul-valid-9927845, .ul-warning-9927845, .ul-invalid-9927845",
)) {
  element.classList.remove(
    "ul-valid-9927845",
    "ul-warning-9927845",
    "ul-invalid-9927845",
  );
}

removeInjectedDivs([
  "ul-valid-message-9927845",
  "ul-warning-message-9927845",
  "ul-invalid-message-9927845",
  "remove-inner-ul-9927845",
  "remove-outerdiv-9927845"
]);