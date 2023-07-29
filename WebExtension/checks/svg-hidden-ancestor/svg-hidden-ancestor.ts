"use strict";

function checkSvgAccessibleNamesHiddenAncestor() {
  // Query all SVG elements in the document
  const svgElements = document.querySelectorAll("svg");

  // Define the CSS classes used to categorize SVG elements
  const hiddenAncestorClass = "svg--hiddenAncestor-882726654";

  // Iterate through each SVG element
  for (const svgElement of svgElements) {
    // Get accessibility-related attributes of the SVG element
    const svgText = svgElement.getAttribute("aria-label");
    const hiddenElement = svgElement.getAttribute("aria-hidden");
    const role = svgElement.getAttribute("role");

    // Check if the SVG's accessible name is missing
    const accessibleNameMissing = !svgText || svgText.trim() === "";

    // Check if any ancestor is a <a>, <button>, or has role="link" or "button" or has aria-hidden="true"
    const ancestorCheck = checkAncestors(svgElement);

    // Function to check all ancestors for <a>, <button>, role="link", role="button" and aria-hidden="true"
    function checkAncestors(element: Element) {
      let currentElement = element;

      while (currentElement.parentElement) {
        currentElement = currentElement.parentElement;

        const tagName = currentElement.tagName.toLowerCase();
        const role = currentElement.getAttribute("role");

        if (currentElement.getAttribute("aria-hidden") === "true") {
          return { element: currentElement, isHidden: true };
        }
      }

      return null;
    }

    //If any ancestor has aria-hidden="true"
    if (ancestorCheck && ancestorCheck.isHidden) {
      const message = "An ancestor element of this SVG has 'aria-hidden' set to 'true'.";
      createChildMessageDiv(svgElement, hiddenAncestorClass, message);
    }
  }
}

// Call the function
checkSvgAccessibleNamesHiddenAncestor();
