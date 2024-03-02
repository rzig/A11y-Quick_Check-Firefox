"use strict";

interface AccessibleNameResult {
  name: string;
  method: string;
  isLabelledByIdMissing: boolean;
  additionalMessage?: string; // Optional property for additional warnings or messages
}

interface AncestorCheckResult {
  element: Element;
  accessibleName?: string;
  isHidden: boolean;
  role?: string | undefined; // Allow both omitted and explicitly undefined
}

function getAccessibleName(node: Element): AccessibleNameResult {
  let result: AccessibleNameResult = {
    name: "",
    method: "none",
    isLabelledByIdMissing: false,
  };
  let labelledby = node.getAttribute("aria-labelledby");
  let label = node.getAttribute("aria-label");
  let titleElement = node.querySelector("title");
  let titleAttribute = node.getAttribute("title"); // Direct title attribute of the SVG
  let textElement = node.querySelector("text"); // Check for <text> element inside SVG

  // Check aria-labelledby
  if (labelledby) {
    let names = labelledby
      .split(" ")
      .map((id) => {
        const element = document.getElementById(id);
        if (!element) {
          result.isLabelledByIdMissing = true;
          return "";
        }
        return element.textContent?.trim() ?? "";
      })
      .filter((text) => text.length > 0)
      .join(" ");
    if (names.length > 0) {
      result.name = names;
      result.method = "aria-labelledby";
    }
  }

  // Check aria-label
  if (!result.name && label) {
    result.name = label;
    result.method = "aria-label";
  }

  // The <title> element check is updated to consider it as providing a description rather than a direct name
  // This ensures that <title> is not incorrectly used as the primary accessible name when better methods are available
  if (!result.name && titleElement && titleElement.textContent) {
    // Name is now set based on <title> only if other more appropriate methods are not available
    result.additionalMessage = "Note: The <title> element provides a description, not a direct accessible name.";
    result.method = "<title> element"; // This is kept for backward compatibility but should be revisited for correct usage
  }

  // Check title attribute on SVG
  if (!result.name && titleAttribute) {
    result.name = titleAttribute;
    result.method = "title attribute";
  }

  // Check <text> element inside SVG
  if (!result.name && textElement && textElement.textContent) {
    result.name = textElement.textContent.trim();
    result.method = "<text>";
  }

  return result;
}

function checkAncestors(element: Element): AncestorCheckResult | null {
  let currentElement = element;

  while (currentElement.parentElement) {
    currentElement = currentElement.parentElement;

    const tagName = currentElement.tagName.toLowerCase();
    const roleAttr = currentElement.getAttribute("role"); // Use roleAttr for the attribute value

    if (
      tagName === "a" ||
      tagName === "button" ||
      roleAttr === "link" ||
      roleAttr === "button"
    ) {
      const accessibleName =
        currentElement.getAttribute("aria-label") ||
        currentElement.textContent ||
        "";
      return {
        element: currentElement,
        accessibleName: accessibleName.trim(),
        isHidden: false,
        ...(roleAttr !== null && { role: roleAttr }), // Only add role if it's not null
      };
    }

    if (roleAttr === "none" || roleAttr === "presentation") {
      return {
        element: currentElement,
        isHidden: false,
        ...(roleAttr !== null && { role: roleAttr }), // Only add role if it's not null
      };
    }

    if (currentElement.getAttribute("aria-hidden") === "true") {
      return {
        element: currentElement,
        isHidden: true,
      };
    }
  }

  return null;
}

function checkSvgAccessibleNames() {
  const svgElements = document.querySelectorAll("svg");
  const showSvgTextClass = "valid-message-9927845"; // Used for valid naming
  const notNamedDecorativeClass = "invalid-message-9927845"; // Used for missing names
  const imgRoleWithLabelClass = "warning-message-9927845"; // Used for warnings
  const generalTips = "tips-message-9927845"; // Used for general tips

  for (const svgElement of svgElements) {
      const ancestorCheck = checkAncestors(svgElement);
      if (ancestorCheck?.isHidden) {
          continue; // Skip SVGs with hidden ancestors
      }

      const { name, method, isLabelledByIdMissing } = getAccessibleName(svgElement);
      const role = svgElement.getAttribute("role");
      const hiddenElement = svgElement.getAttribute("aria-hidden");
      const titleElement = svgElement.querySelector('title'); // Retrieve title element for current SVG

      if (hiddenElement === "true") {
          continue; // Skip SVGs that are explicitly hidden
      }

      if (name) {
          const nameMessage = `The SVG is named using ${method}: "${name}".`;
          createChildMessageDiv(svgElement, showSvgTextClass, nameMessage);
      }

      if (titleElement) { // This line checks if there is a <title> element present
        // Safely accessing the text content of the <title> element, providing a fallback if it is null
        const svgDesc = titleElement.textContent ? titleElement.textContent.trim() : 'No description provided';
        const titleElementWarning = `Tip: The <title> element provides a short description (“${svgDesc}”). Make sure this supports the name provided. This will be announced after the name where supported.`;
        createChildMessageDiv(svgElement, generalTips, titleElementWarning);
    }

      // Warning for <text> element usage regarding cross-browser and AT support
      if (method === "<text>") {
          const textWarning = "Warning: The SVG is named using <text>. This does not have reliable cross-browser and AT support.";
          createChildMessageDiv(svgElement, imgRoleWithLabelClass, textWarning);
      }

      let showGeneralMissingNameMessage = true; // Flag to determine if general missing name message should be shown

      if (role === "img") {
          if (method === "none" || method === "<title> element") { // Updated condition
              const roleImgWarning = "Warning: SVG element has 'role=img' but is missing an accessible name.";
              createChildMessageDiv(svgElement, notNamedDecorativeClass, roleImgWarning);
              showGeneralMissingNameMessage = false; // Prevent general missing name message if this specific message is shown
          }
      } else if (role !== "img" && (method !== "none" && method !== "<title> element")) { // Updated condition
          const roleWarning = "Warning: SVG element is missing 'role=img'.";
          createChildMessageDiv(svgElement, imgRoleWithLabelClass, roleWarning);
      }

      if (showGeneralMissingNameMessage && (method === "none" || method === "<title> element")) { // Updated condition
          const missingNameMessage = "Warning: SVG element is missing an accessible name.";
          createChildMessageDiv(svgElement, notNamedDecorativeClass, missingNameMessage);
      }

      if (isLabelledByIdMissing) {
          const missingIdMessage = "Warning: SVG element uses 'aria-labelledby', but the ID referenced does not exist.";
          createChildMessageDiv(svgElement, notNamedDecorativeClass, missingIdMessage);
      }
  }
}

checkSvgAccessibleNames();