"use strict";

for (const element of document.querySelectorAll(
  ".unordered-list-c34fac2, .invalid-list-c34fac2, .valid-html-unordered-list, .unordered-list-div-child, .unordered-list-div-inside, .html-ul-message"
)) {
  element.classList.remove(
    "unordered-list-c34fac2",
    "invalid-list-c34fac2",
    "valid-html-unordered-list",
    "unordered-list-div-child",
    "unordered-list-div-inside",
    "html-ul-message"
  );
}

removeInjectedDivs([
  "unordered-list-div-child",
  "unordered-list-aria",
  "ul--invalid-children-8892664",
  "invalid-list-c34fac2",
  "common-a11y-message-2edbc8ab"
  
]);