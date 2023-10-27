function addSectionContentMessages() {
  const htmlSections = ["article", "section", "aside"];
  const ariaRoles = ["article", "region", "complementary"];

  for (const section of htmlSections) {
    const elements = document.querySelectorAll(section);
    const sameTypeSectionsCount = elements.length + document.querySelectorAll(`[role=${section}]`).length;

    for (const element of elements) {
      if (isHidden(element as HTMLElement)) continue;

      let accessibleName = element.getAttribute("aria-label") || "not named";
      let ariaRole = element.getAttribute("role");
      let hasDuplicateRole = ariaRole !== null && ariaRoles.includes(ariaRole) && htmlSections.indexOf(section) === ariaRoles.indexOf(ariaRole);

      // Check for presence of h1-h6 within the article or section
      const hasHeading = element.querySelector('h1, h2, h3, h4, h5, h6') !== null;
      if (!hasHeading && (section === "article" || section === "section")) {
        element.classList.add("missing-heading");
        const missingHeadingMessage = `HTML ${section} does not have heading text available. A heading is recommended.`;
        addMessageToPrecedingDiv(element, `missing-heading-${section}-message-88937746`, missingHeadingMessage);
      }

      let htmlMessage = '';
      let htmlMessageClass = `html-${section}-message-88937746`;

      if (htmlSections.includes(section)) {
        if (section !== "section") {
          htmlMessage = (sameTypeSectionsCount > 1) ? `HTML ${section} has accessible name ${accessibleName}` : '';
          if (accessibleName === "not named") {
            htmlMessage = `HTML ${section} is missing an accessible name`;
          }
        } else {
          if (accessibleName !== "not named") {
            htmlMessage = `HTML ${section} has accessible name ${accessibleName}`;
          } else {
            htmlMessage = `HTML ${section}`;
          }
        }
      }

      let ariaMessage = '';
      let ariaMessageClass = ariaRole ? `aria-${ariaRole}-message-88937746` : '';

      if (ariaRole !== null && ariaRoles.includes(ariaRole)) {
        if (sameTypeSectionsCount > 1 || ariaRole !== "region") {
          ariaMessage = `ARIA ${ariaRole} has accessible name ${accessibleName}`;
        }
        if (accessibleName === "not named") {
          ariaMessage = `ARIA ${ariaRole} is missing an accessible name`;
        }
      }

      if (hasDuplicateRole) {
        element.classList.add(`${section}--aria-html-88937746`);
      } else {
        if (ariaRole !== null && ariaRoles.includes(ariaRole)) {
          element.classList.add(`${section}--aria--88937746`);
        } else if (htmlSections.includes(section)) {
          element.classList.add(`${section}--html--88937746`);
        }
      }

      if (hasDuplicateRole) {
        let duplicateMessage = `HTML ${section} has a duplicate role in ARIA ${ariaRole}. The accessible name is ${accessibleName}`;
        let duplicateMessageClass = `html-aria-duplicate-${section}-message-88937746`;
        addMessageToPrecedingDiv(element, duplicateMessageClass, duplicateMessage);
      } else {
        if (htmlSections.includes(section) && htmlMessage) {
          addMessageToPrecedingDiv(element, htmlMessageClass, htmlMessage);
        }
        if (ariaRole !== null && ariaRoles.includes(ariaRole) && ariaMessage) {
          addMessageToPrecedingDiv(element, ariaMessageClass, ariaMessage);
        }
      }
    }
  }
}

addSectionContentMessages();