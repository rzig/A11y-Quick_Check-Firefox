"use strict";

for (const element of document.querySelectorAll(
  ".ordered-list-c34fac2, .invalid-list-c34fac2, .valid-html-ordered-list, .ordered-list-div-child, .ordered-list-div-inside, .html-ol-message, .custom-role-ol-li, .ordered-list-aria, .has-aria-role-8892664"
)) {
  element.classList.remove(
    "ordered-list-c34fac2",
    "invalid-list-c34fac2",
    "valid-html-ordered-list",
    "ordered-list-div-child",
    "ordered-list-div-inside",
    "html-ol-message",
    "custom-role-ol-li",
    "ordered-list-aria",
    "has-aria-role-8892664"
  );
}

removeInjectedDivs([
  "ordered-list-div-child",
  "ol--invalid-children-8892664",
  "invalid-list-c34fac2",
  "common-a11y-message-2edbc8ab",
  "custom-role-valid-li-message",
  "aria-role-message-8892664"
  
]);