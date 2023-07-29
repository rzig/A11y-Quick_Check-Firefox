"use strict";

function checkSvgAncestorAccessibleNames() {
  // Query all SVG elements in the document
  const svgElements = document.querySelectorAll("svg");

  // Define the CSS classes used to categorize SVG elements
  const hasAncestorWithAccessibleNameClass =
    "svg--ancestorAccessibleName-882726654";
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

        if (
          tagName === "a" ||
          tagName === "button" ||
          role === "link" ||
          role === "button"
        ) {
          const accessibleName =
            currentElement.getAttribute("aria-label") ||
            currentElement.textContent;
          return {
            element: currentElement,
            accessibleName: accessibleName!.trim(),
            isHidden: false,
          };
        }

        if (currentElement.getAttribute("aria-hidden") === "true") {
          return { element: currentElement, isHidden: true };
        }
      }

      return null;
    }

    // If any ancestor is a <a>, <button>, or has role="link" or "button"
    if (ancestorCheck && !ancestorCheck.isHidden) {
      const ancestorTag = ancestorCheck.element.tagName.toLowerCase();
      const ancestorRole = ancestorCheck.element.getAttribute("role");

      // Create a message to show the tag name, role and accessible name of the ancestor
      const message = `SVG has an ancestor element with a role of ${ancestorRole || `<${ancestorTag}>`
        } and accessible name is ${ancestorCheck.accessibleName}`;
      createChildMessageDiv(
        svgElement,
        hasAncestorWithAccessibleNameClass,
        message
      );
    }
  }
}

// Call the function
checkSvgAncestorAccessibleNames();
