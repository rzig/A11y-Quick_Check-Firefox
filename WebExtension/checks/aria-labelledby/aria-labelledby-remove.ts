// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {

"use strict";

for (const element of document.querySelectorAll(".valid-9927845, .invalid-9927845, [data-elementnamedby-9927845], [data-namedfrom-9927845]")) {
  console.log("Found element:", element);

  element.classList.remove("valid-9927845", "invalid-9927845");

  if (element.hasAttribute("data-elementnamedby-9927845")) {
      element.removeAttribute("data-elementnamedby-9927845");
  }
  if (element.hasAttribute("data-namedfrom-9927845")) {
      element.removeAttribute("data-namedfrom-9927845");
  }
  if (element.hasAttribute("data-arialabelledby-9927845")) {
    element.removeAttribute("data-arialabelledby-9927845");
}
}

const classLabelledByNames: string[] = [
  "valid-message-9927845",
  "invalid-message-9927845",
  "numbered-square-9927845",
  "warning-message-9927845",
];

removeInjectedDivs(classLabelledByNames);

})();