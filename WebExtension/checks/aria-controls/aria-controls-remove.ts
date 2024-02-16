// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {
    "use strict";

    // Select elements related to aria-controls implementation and remove related classes and attributes
    for (const element of document.querySelectorAll(".neutral-control-9927845, [data-controlledby-9927845], [data-namedfrom-control-9927845]")) {
        // Remove the neutral-control class
        element.classList.remove("neutral-control-9927845");

        // Remove attributes related to elements being controlled or naming a controlling element
        if (element.hasAttribute("data-controlledby-9927845")) {
            element.removeAttribute("data-controlledby-9927845");
        }
        if (element.hasAttribute("data-namedfrom-control-9927845")) {
            element.removeAttribute("data-namedfrom-control-9927845");
        }
    }

    removeInjectedDivs([
        "neutral-control-message-9927845",
        "numbered-controlled-square-9927845",
    ]);

})();