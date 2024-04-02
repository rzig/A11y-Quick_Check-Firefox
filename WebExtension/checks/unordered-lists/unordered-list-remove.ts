"use strict";

for (const element of document.querySelectorAll(
  ".valid-9927845, .warning-9927845, .invalid-9927845",
)) {
  element.classList.remove(
    "valid-9927845",
    "warning-9927845",
    "invalid-9927845",
  );
}

removeInjectedDivs([
  "valid-message-9927845",
  "warning-message-9927845",
  "invalid-message-9927845",
  "remove-inner-ul-9927845"
]);