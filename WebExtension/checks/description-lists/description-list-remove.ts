"use strict";

for (const element of document.querySelectorAll(
  ".dl--valid-html, .dl--valid-div-wrap-dt-dd, .dl--invalid-first-child, .dl--invalid-role"
)) {
  element.classList.remove(
    "dl--valid-html",
    "dl--valid-div-wrap-dt-dd",
    "dl--invalid-first-child",
    "dl--invalid-role"
  );
}

removeInjectedDivs([
  "html-dl-message",
  "div-wrap-message",
  "invalid-first-child-message",
  "invalid-role-message",
]);