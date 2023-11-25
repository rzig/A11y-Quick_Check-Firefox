// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {

"use strict";

for (const element of document.querySelectorAll(".neutral-9927845, [data-elementnamedby-9927845], [data-namedfrom-9927845]")) {

  element.classList.remove("neutral-9927845");

  if (element.hasAttribute("data-elementnamedby-9927845")) {
      element.removeAttribute("data-elementnamedby-9927845");
  }
  if (element.hasAttribute("data-namedfrom-9927845")) {
      element.removeAttribute("data-namedfrom-9927845");
  }
}

removeInjectedDivs([
  "neutral-message-9927845",
  "numbered-square-9927845",
]);

})();