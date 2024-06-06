"use strict";

function checkSvgDecorative() {
  const svgElements = document.querySelectorAll("svg");
  const decorativeSvgClass = "neutral-message-9927845";
  const decorativeSvgWithNameClass = "neutral-message-9927845";

  for (const svgElement of svgElements) {
    const ariaHidden = svgElement.getAttribute("aria-hidden");
    const ariaLabel = svgElement.getAttribute("aria-label");
    const accessibleNameMissing = !ariaLabel || ariaLabel.trim() === "";
    const accessibleNamePresent = ariaLabel && ariaLabel.trim() !== "";

    if (ariaHidden === "true") {
      if (accessibleNameMissing) {
        const message = "This SVG is marked as decorative with 'aria-hidden true'";
        createChildMessageDiv(svgElement, decorativeSvgClass, message);
      } else if (accessibleNamePresent) {
        const message = "This SVG has an accessible name but is marked as decorative with 'aria-hidden true'";
        createChildMessageDiv(svgElement, decorativeSvgWithNameClass, message);
      }
    }
  }
}

checkSvgDecorative();

function checkSvgAccessibleNamesDecorative() {
  const svgElements = document.querySelectorAll("svg");
  const hiddenAncestorClass = "svg-hidden-ancestor-882726654";
  const decorativeAncestorClass = "svg--decorativeAncestor-882726654";
  const imgRoleWithLabelClass = "warning-message-9927845";

  function checkAncestors(element: Element) {
    let currentElement = element;

    while (currentElement.parentElement) {
      currentElement = currentElement.parentElement;

      const tagName = currentElement.tagName.toLowerCase();
      const roleAttr = currentElement.getAttribute("role");
      const accessibleName = currentElement.getAttribute("aria-label") || currentElement.textContent || "";

      if (currentElement.getAttribute("aria-hidden") === "true") {
        return {
          element: currentElement,
          isHidden: true,
          accessibleName: accessibleName?.trim(),
        };
      }
      if (roleAttr === "none" || roleAttr === "presentation") {
        return {
          element: currentElement,
          isDecorative: true,
          accessibleName: accessibleName?.trim(),
        };
      }

      if (tagName === "a" || tagName === "button" || roleAttr === "link" || roleAttr === "button") {
        return {
          element: currentElement,
          accessibleName: accessibleName?.trim(),
          role: roleAttr,
        };
      }
    }

    return null;
  }

  for (const svgElement of svgElements) {
    const svgText = svgElement.getAttribute("aria-label");
    const hiddenElement = svgElement.getAttribute("aria-hidden");
    const role = svgElement.getAttribute("role");
    const ancestorCheck = checkAncestors(svgElement);

    // New function to check if the parent of the SVG has an accessible name
    if (ancestorCheck?.accessibleName) {
      const parentRole = ancestorCheck.role ?? ancestorCheck.element.tagName.toLowerCase();
      const parentName = ancestorCheck.accessibleName;
      if (role === "img" && !svgText && hiddenElement !== "true") {
        const message = `Warning SVG has parent with role ${parentRole} and accessible name "${parentName}".`;
        createChildMessageDiv(svgElement, imgRoleWithLabelClass, message);
      } else if (role === "img" && svgText && hiddenElement !== "true") {
        const message = `Warning SVG has parent with role ${parentRole} and accessible name "${parentName}".".`;
        createChildMessageDiv(svgElement, imgRoleWithLabelClass, message);
      } else if (!role && !svgText && hiddenElement !== "true") {
        const message = `Warning SVG has parent with role ${parentRole} and accessible name "${parentName}"..`;
        createChildMessageDiv(svgElement, imgRoleWithLabelClass, message);
      }
    }

    if (ancestorCheck && ancestorCheck.isHidden) {
      const message = "An ancestor element of this SVG has 'aria-hidden' set to 'true'.";
      createChildMessageDiv(svgElement, hiddenAncestorClass, message);
    }

    if (ancestorCheck && ancestorCheck.isDecorative) {
      const message = "This SVG is decorative. An ancestor element of this SVG has 'role none or role presentation'.";
      createChildMessageDiv(svgElement, decorativeAncestorClass, message);
    }
  }
}

checkSvgAccessibleNamesDecorative();