"use strict";

function dataNameProhibited() {
  // Get all elements with the text-elements class
  const target = document.querySelectorAll("[data-textspacing-7783664]");
  // Remove the text-elements class from each element
  for (const element of target) {
    element.removeAttribute("data-textspacing-7783664");
  }
}

dataNameProhibited()

removeInjectedDivs([
  "remove-inner-tspacing-9927845",
  "remove-outerdiv-9927845"
]);