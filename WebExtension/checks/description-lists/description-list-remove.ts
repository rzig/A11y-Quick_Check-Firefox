"use strict";

for (const element of document.querySelectorAll(
  ".dl-nested-9927845, .dl-valid-div-wrap-dt-dd-9927845, .dl-invalid-child-9927845, .dl-valid-html-9927845, .dl-invalid-role-9927845, .dl-single-dt-dd-9927845, .dl-invalid-childelement-9927845, .dl-invalid-dd-9927845",
)) {
  element.classList.remove(
    "dl-nested-9927845",
    "dl-valid-div-wrap-dt-dd-9927845",
    "dl-invalid-child-9927845",
    "dl-valid-html-9927845",
    "dl-invalid-role-9927845",
    "dl-single-dt-dd-9927845",
    "dl-invalid-childelement-9927845",
    "dl-invalid-dd-9927845",
  );
}

removeInjectedDivs([
  "nested-dl-message-9927845",
  "dl-div-wrap-message-9927845",
  "invalid-child-message-9927845",
  "html-dl-message-9927845",
  "invalid-role-message-9927845",
  "single-dt-dd-message-9927845",
  "invalid-first-child-message-9927845",
  "invalid-dd-message-9927845",
]);
