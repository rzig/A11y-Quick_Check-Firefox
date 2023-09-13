function addLandmarkMessages() {
  const htmlLandmarks = ["header", "nav", "main", "footer", "aside"];
  const ariaRoles = ["banner", "navigation", "main", "contentinfo", "complementary"];

  for (const landmark of htmlLandmarks) {
    const elements = document.querySelectorAll(landmark);
    for (const element of elements) {
      if (isHidden(element as HTMLElement)) continue;

      let accessibleName = element.getAttribute("aria-label") || "not named";
      let ariaRole = element.getAttribute("role");
      let hasDuplicateRole = ariaRole && ariaRoles.includes(ariaRole) && landmark === ariaRole;

      // Decide the message for HTML landmark
      let htmlMessage = `HTML ${landmark} landmark has accessible name ${accessibleName}`;
      let htmlMessageClass = `html-${landmark}-message-88937746`;
      if (accessibleName === "not named") {
        htmlMessage = `HTML ${landmark} landmark is missing an accessible name`;
      }

      // Decide the message for ARIA role
      let ariaMessage = ariaRole ? `ARIA ${ariaRole} landmark has accessible name ${accessibleName}` : "";
      let ariaMessageClass = `aria-${ariaRole}-message-88937746`;
      if (accessibleName === "not named") {
        ariaMessage = ariaRole ? `ARIA ${ariaRole} landmark is missing an accessible name` : "";
      }

      // If there is a duplicate role, add only the duplicate message
      if (hasDuplicateRole) {
        const duplicateMessage = `HTML ${landmark} landmark has a duplicate role in ARIA ${ariaRole}. The accessible name is ${accessibleName}`;
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