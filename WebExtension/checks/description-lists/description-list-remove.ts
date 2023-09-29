"use strict";

for (const element of document.querySelectorAll(
  ".dl--valid-html-9927845, .dl--nested-9927845, .dl--invalid-child-9927845, .dl--single-dt-dd-9927845, .dl--invalid-role-9927845, .dl--invalid-childelement-9927845"
)) {
  element.classList.remove(
    "dl--valid-html-9927845",
    "dl--nested-9927845",
    "dl--invalid-child-9927845",
    "dl--single-dt-dd-9927845",
    "dl--invalid-role-9927845",
    "dl--invalid-childelement-9927845"
  );
}

removeInjectedDivs([
  "html-dl-message-9927845",
  "nested-dl-message-9927845",
  "invalid-child-message-9927845",
  "single-dt-dd-message-9927845",
  "invalid-role-message-9927845",
]);