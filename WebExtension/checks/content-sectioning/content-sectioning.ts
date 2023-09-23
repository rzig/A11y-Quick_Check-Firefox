function addSectionContentMessages() {
  const htmlSections = ["article", "section", "nav", "aside"];
  const ariaRoles = ["article", "region", "navigation", "complementary"];

  for (const section of htmlSections) {
    const elements = document.querySelectorAll(section);
    const sameTypeSectionsCount = elements.length + document.querySelectorAll(`[role=${section}]`).length;

    for (const element of elements) {
      if (isHidden(element as HTMLElement)) continue;

      let accessibleName = element.getAttribute("aria-label") || "not named";
      let ariaRole = element.getAttribute("role");
      let hasDuplicateRole = ariaRole && ariaRoles.includes(ariaRole) && htmlSections.indexOf(section) === ariaRoles.indexOf(ariaRole);

      let htmlMessage = '';
      let htmlMessageClass = `html-${section}-message-88937746`;
      
      if (section !== "section") {
        htmlMessage = (sameTypeSectionsCount > 1) ? `HTML ${section} has accessible name ${accessibleName}` : '';
        if (accessibleName === "not named") {
          htmlMessage = `HTML ${section} is missing an accessible name`;
        }
      } else { // Special case for <section>
        if (accessibleName !== "not named") {
          htmlMessage = `HTML ${section} has accessible name ${accessibleName}`;
        } else {
          htmlMessage = `HTML ${section}`;
        }
      }

      let ariaMessage = '';
      let ariaMessageClass = `aria-${ariaRole}-message-88937746`;
      if (ariaRole && (sameTypeSectionsCount > 1 || ariaRole !== "region")) {
        ariaMessage = `ARIA ${ariaRole} has accessible name ${accessibleName}`;
      }
      if (accessibleName === "not named") {
        ariaMessage = ariaRole ? `ARIA ${ariaRole} is missing an accessible name` : "";
      }

      if (hasDuplicateRole) {
        element.classList.add(`${section}--aria-html-88937746`);
      } else if (ariaRole) {
        element.classList.add(`${section}--aria--88937746`);
      } else {
        element.classList.add(`${section}--html--88937746`);
      }

      if (hasDuplicateRole) {
        let duplicateMessagePrefix = `HTML ${section} has a duplicate role in ARIA ${ariaRole}.`;
        let duplicateMessageSuffix = section !== "section" ? ` The accessible name is ${accessibleName}` : "";
        const duplicateMessage = duplicateMessagePrefix + duplicateMessageSuffix;
        const duplicateMessageClass = `html-aria-duplicate-${section}-message-88937746`;
        addMessageToPrecedingDiv(element, duplicateMessageClass, duplicateMessage);
      } else {
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

addSectionContentMessages();