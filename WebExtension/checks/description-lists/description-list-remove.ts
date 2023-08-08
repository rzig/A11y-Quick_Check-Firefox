"use strict";

for (const element of document.querySelectorAll(
  ".dl--valid-html-9927845, .dl--valid-div-wrap-dt-dd-9927845, .dl--invalid-first-child-9927845, .dl--invalid-role-9927845, .dl--nested-9927845, [data-isNestedList]"
)) {
  element.classList.remove(
    "dl--valid-html-9927845",
    "dl--valid-div-wrap-dt-dd-9927845",
    "dl--invalid-first-child-9927845",
    "dl--invalid-role-9927845",
    "dl--nested-9927845",
    "[data-isNestedList]"
  );
}

removeInjectedDivs([
  "html-dl-message-9927845",
  "div-wrap-message-9927845",
  "invalid-first-child-message-9927845",
  "invalid-role-message-9927845",
  "nested-dl-message-9927845",
]);