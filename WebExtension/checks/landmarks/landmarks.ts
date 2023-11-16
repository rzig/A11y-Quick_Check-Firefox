"use strict";

function addLandmarkMessages() {
  const htmlLandmarks = ["header", "form", "main", "footer", "search" , "nav"];
  const ariaRoles = ["banner", "form", "contentinfo", "region" , "navigation"];

  const ariaToHtmlMapping: Record<string, string> = {
    "banner": "header",
    "form": "form",
    "contentinfo": "footer",
    "navigation": "nav"
  };

  for (const landmark of htmlLandmarks) {
    const elements = document.querySelectorAll(landmark);
    const sameTypeLandmarksCount = elements.length + document.querySelectorAll(`[role=${landmark}]`).length;

    for (const element of elements) {
      if (isHidden(element as HTMLElement)) continue;

      let accessibleName = element.getAttribute("aria-label") || "not named";
      let ariaRole = element.getAttribute("role");
      let hasDuplicateRole = ariaRole && ariaToHtmlMapping[ariaRole] === landmark;

      let shouldSkipMessage = ["header", "form", "main", "footer"].includes(landmark) && accessibleName === "not named";

      // Decide the message for HTML landmark
      let htmlMessage = sameTypeLandmarksCount > 1 && landmark !== "main" ? `HTML ${landmark} landmark has accessible name ${accessibleName}` : "";
      let htmlMessageClass = `html-${landmark}-message-88937746`;
      if (!shouldSkipMessage && accessibleName === "not named") {
        htmlMessage = `HTML ${landmark} landmark is missing an accessible name`;
      }

      // Decide the message for ARIA role
      let ariaMessage = ariaRole && (sameTypeLandmarksCount > 1 || ariaRole !== "main") ? `ARIA ${ariaRole} landmark has accessible name ${accessibleName}` : "";
      let ariaMessageClass = `aria-${ariaRole}-message-88937746`;
      if (!shouldSkipMessage && accessibleName === "not named") {
        ariaMessage = ariaRole ? `ARIA ${ariaRole} landmark is missing an accessible name` : "";
      }

      // Determine and add the required class for the landmark identified
      if (hasDuplicateRole) {
        element.classList.add(`${landmark}--aria-html-88937746`);
      } else if (ariaRole) {
        element.classList.add(`${landmark}--aria--88937746`);
      } else {
        element.classList.add(`${landmark}--html--88937746`);
      }

      const rolesThatMustBeNamed = ["navigation", "nav"];  // Add roles and landmarks that must be named


      // If there is a duplicate role, add only the duplicate message
      if (hasDuplicateRole) {
        let duplicateMessage = `HTML ${landmark} landmark has a duplicate role in ARIA ${ariaRole!}`;
        if ((rolesThatMustBeNamed.includes(ariaRole!) || rolesThatMustBeNamed.includes(landmark)) && accessibleName === "not named") {
          duplicateMessage += `. The accessible name is ${accessibleName}`;
        }
        let duplicateMessageClass = `html-aria-duplicate-${landmark}-message-88937746`;
        addMessageToPrecedingDiv(element, duplicateMessageClass, duplicateMessage);
      }
      

      // If no duplicate role, then add the decided HTML and ARIA messages
      else {
        if (htmlMessage && !shouldSkipMessage) {
          addMessageToPrecedingDiv(element, htmlMessageClass, htmlMessage);
        }
        if (ariaMessage && !shouldSkipMessage) {
          addMessageToPrecedingDiv(element, ariaMessageClass, ariaMessage);
        }
      }
    }
  }
}

addLandmarkMessages();