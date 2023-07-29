"use strict";

function checkSvgAccessibleNames() {
  // Query all SVG elements in the document
  const svgElements = document.querySelectorAll("svg");

  // Define the CSS classes used to categorize SVG elements
  const showSvgTextClass = "svg--hasName-882726654";
  const notNamedDecorativeClass = "svg--nodecorative-noname-882726654";
  const imgRoleWithLabelClass = "svg--roleimg-withlabel-882726654";
  const hasAncestorWithAccessibleNameClass = "svg--ancestorAccessibleName-882726654";
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

    // If an ancestor with role='none' or 'presentation' is found, skip adding the warning message
    if (ancestorCheck && (ancestorCheck.role === 'none' || ancestorCheck.role === 'presentation')) {
      continue;
    }

    // The remaining part of the loop will only be executed if the ancestor is not of role 'none' or 'presentation'

    // If the SVG has a role of 'img' but is missing an accessible name
    if (role === "img" && accessibleNameMissing && hiddenElement !== "true") {
      const message =
        "Warning: This SVG element has a role of 'img' but is missing an accessible name.";
      createChildMessageDiv(svgElement, notNamedDecorativeClass, message);
    }
    // If the SVG has an aria-label, is not hidden and the label is not empty
    else if (
      svgElement.hasAttribute("aria-label") &&
      svgText !== "" &&
      hiddenElement !== "true"
    ) {
      const message =
        "This SVG is following best practices for a meaningful SVG. The accName is: " +
        svgText;
      createChildMessageDiv(svgElement, showSvgTextClass, message);
    }
    // If the SVG is missing 'aria-hidden' or 'role img', and or an accessible name
    else if (
      hiddenElement !== "true" &&
      (role !== "img" || accessibleNameMissing)
    ) {
      const message =
        "Warning: This SVG element is missing 'aria-hidden' or 'role img', and or an accessible name.";
      createChildMessageDiv(svgElement, notNamedDecorativeClass, message);
    }

    // If the SVG is not hidden, has a role of 'img', and has an aria-label
    if (
      hiddenElement === "false" &&
      role === "img" &&
      svgElement.hasAttribute("aria-label") &&
      svgText !== ""
    ) {
      const message = "Includes an unnecessary aria-hidden set to false.";
      createChildMessageDiv(svgElement, imgRoleWithLabelClass, message);
    }

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

        if (role === "none" || role === "presentation") {
          return { element: currentElement, role: role };
        }

        if (currentElement.getAttribute("aria-hidden") === "true") {
          return { element: currentElement, isHidden: true };
        }
      }

      return null;
    }
  }
}

// Call the function
checkSvgAccessibleNames();