"use strict";

// Existing removal code for various elements
for (const element of document.querySelectorAll(
  ".text-heavy-a11y-9892664, .text-large-a11y-9892664, .generic-9927845"
)) {
  element.classList.remove(
    "text-heavy-a11y-9892664",
    "text-large-a11y-9892664",
    "generic-9927845",
  );
}

removeInjectedDivs([
  "text-large-a11y-9892664",
  "text-heavy-a11y-9892664",
  "remove-inner-hnc-9927845",
]);