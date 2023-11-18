"use strict";

for (const element of document.querySelectorAll(
  ".unordered-list-c34fac2, .invalid-list-c34fac2, .valid-html-unordered-list, .unordered-list-div-child, .unordered-list-div-inside, .html-ul-message, .custom-role-ul-li, .unordered-list-aria, .has-aria-role-8892664"
)) {
  element.classList.remove(
    "unordered-list-c34fac2",
    "invalid-list-c34fac2",
    "valid-html-unordered-list",
    "unordered-list-div-child",
    "unordered-list-div-inside",
    "html-ul-message",
    "custom-role-ul-li",
    "unordered-list-aria",
    "has-aria-role-8892664"
  );
}

removeInjectedDivs([
  "unordered-list-div-child",
  "ul--invalid-children-8892664",
  "invalid-list-c34fac2",
  "common-a11y-message-2edbc8ab",
  "custom-role-valid-li-message",
  "aria-role-message-8892664"
  
]);