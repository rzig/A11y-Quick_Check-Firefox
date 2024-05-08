// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {
  "use strict";

  // Function to remove all classes and attributes added by the add.ts script
  function removeAllAddedClassesAndAttributes(): void {
    const elements = document.querySelectorAll(
      ".duplicate-id-warning, .warning-9927845"
    );

    elements.forEach(element => {
      // Remove specific classes
      element.classList.remove(
        //"numbered-square-9927845",
        //"warning-message-9927845",
        "duplicate-id-warning",
        "warning-9927845",
      );

      // Remove specific attributes
      if (element.hasAttribute("data-after-div-9f2dc5ea")) {
        element.removeAttribute("data-after-div-9f2dc5ea");
      }

      // Check if the element is effectively empty (no other classes, attributes, or non-whitespace text content)
      if (!element.classList.length && !element.attributes.length && !(element.textContent || '').trim().length) {
        element.remove();
      }
    });
  }

  // Function to specifically target and remove nested divs based on given class names
  function removeNestedDivsWithClass(classNames: string[]): void {
    classNames.forEach(className => {
      document.querySelectorAll(`div.${className}`).forEach(div => {
        // Remove the div directly without additional checks as the class targeting is assumed sufficient
        div.remove();
      });
    });
  }

  // Remove all added classes and attributes
  removeAllAddedClassesAndAttributes();

  // Specify class names of injected divs that need to be removed
  const classLabelledByNames: string[] = [
    //"warning-message-9927845"
  ];

  // Remove injected nested divs based on their class names
  removeNestedDivsWithClass(classLabelledByNames);

  removeInjectedDivs([
    "remove-inner-div-9927845",
    "remove-outerdiv-9927845",
    "numbered-square-9927845",
    "after-div-9f2dc5ea",
    "warning-message-9927845"
  ]);

})();
