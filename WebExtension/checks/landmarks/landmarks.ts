function addLandmarkMessages() {
  const htmlLandmarks = ["header", "nav", "main", "footer", "aside"];
  const ariaRoles = ["banner", "navigation", "main", "contentinfo", "complementary"];

  for (const landmark of htmlLandmarks) {
      const elements = document.querySelectorAll(landmark);
      const sameTypeLandmarksCount = elements.length + document.querySelectorAll(`[role=${landmark}]`).length;

      for (const element of elements) {
          if (isHidden(element as HTMLElement)) continue;

          let accessibleName = element.getAttribute("aria-label") || "not named";
          let ariaRole = element.getAttribute("role");
          let hasDuplicateRole = ariaRole && ariaRoles.includes(ariaRole) && htmlLandmarks.indexOf(landmark) === ariaRoles.indexOf(ariaRole);

          // Decide the message for HTML landmark
          let htmlMessage = (sameTypeLandmarksCount > 1 && landmark !== "main") ? `HTML ${landmark} landmark has accessible name ${accessibleName}` : '';
          let htmlMessageClass = `html-${landmark}-message-88937746`;
          if (accessibleName === "not named") {
              htmlMessage = `HTML ${landmark} landmark is missing an accessible name`;
          }

          // Decide the message for ARIA role
          let ariaMessage = ariaRole && (sameTypeLandmarksCount > 1 || ariaRole !== "main") ? `ARIA ${ariaRole} landmark has accessible name ${accessibleName}` : "";
          let ariaMessageClass = `aria-${ariaRole}-message-88937746`;
          if (accessibleName === "not named") {
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

          // If there is a duplicate role, add only the duplicate message, but omit "The accessible name is" for "main"
          if (hasDuplicateRole) {
              let duplicateMessagePrefix = `HTML ${landmark} landmark has a duplicate role in ARIA ${ariaRole}.`;
              let duplicateMessageSuffix = landmark !== "main" ? ` The accessible name is ${accessibleName}` : "";
              const duplicateMessage = duplicateMessagePrefix + duplicateMessageSuffix;
              
              const duplicateMessageClass = `html-aria-duplicate-${landmark}-message-88937746`;
              addMessageToPrecedingDiv(element, duplicateMessageClass, duplicateMessage);
          } 
          // If no duplicate role, then add the decided HTML and ARIA messages
          else {
              if (htmlMessage) {
                  addMessageToPrecedingDiv(element, htmlMessageClass, htmlMessage);
              }
              if (ariaMessage) {
                  addMessageToPrecedingDiv(element, ariaMessageClass, ariaMessage);
              }
          }
      }
  }
}

addLandmarkMessages();