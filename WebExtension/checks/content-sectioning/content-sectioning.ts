function addSectionContentMessages() {
    const htmlSectionContent = ["section", "nav", "article", "aside"];
    const ariaSectionContentRoles = ["article", "section", "navigation", "complementary"];
  
    for (const section of htmlSectionContent) {
      const elements = document.querySelectorAll(section);
      const sameTypeSectionCount = elements.length + document.querySelectorAll(`[role=${section}]`).length;
  
      for (const element of elements) {
        if (isHidden(element as HTMLElement)) continue;
  
        let accessibleName = element.getAttribute("aria-label") || "not named";
        let ariaRole = element.getAttribute("role");
        let hasDuplicateRole = ariaRole && ariaSectionContentRoles.includes(ariaRole) && htmlSectionContent.indexOf(section) === ariaSectionContentRoles.indexOf(ariaRole);
  
        let sectionMessage = '';
        if (section !== 'section' || (section === 'section' && accessibleName !== 'not named')) {
          sectionMessage = (sameTypeSectionCount > 1 && accessibleName !== 'not named') ? `HTML ${section} section content has accessible name ${accessibleName}` : '';
        }
        let sectionMessageClass = `html-${section}-message-88937746`;
  
        if (accessibleName === "not named" && section !== 'section') {
          sectionMessage = `HTML ${section} section content is missing an accessible name`;
        }
  
        let ariaMessage = ariaRole && (sameTypeSectionCount > 1 && accessibleName !== 'not named') ? `ARIA ${ariaRole} section content has accessible name ${accessibleName}` : "";
        let ariaMessageClass = `aria-${ariaRole}-message-88937746`;
  
        if (accessibleName === "not named" && ariaRole) {
          ariaMessage = `ARIA ${ariaRole} section content is missing an accessible name`;
        }
  
        if (hasDuplicateRole) {
          element.classList.add(`${section}--aria-html-88937746`);
        } else if (ariaRole) {
          element.classList.add(`${section}--aria--88937746`);
        } else {
          element.classList.add(`${section}--html--88937746`);
        }
  
        if (hasDuplicateRole) {
          let duplicateMessage = `HTML ${section} section content has a duplicate role in ARIA ${ariaRole}. The accessible name is ${accessibleName}`;
          const duplicateMessageClass = `html-aria-duplicate-${section}-message-88937746`;
          addMessageToPrecedingDiv(element, duplicateMessageClass, duplicateMessage);
        } else {
          if (sectionMessage && accessibleName !== 'not named') {
            addMessageToPrecedingDiv(element, sectionMessageClass, sectionMessage);
          }
          if (ariaMessage && accessibleName !== 'not named') {
            addMessageToPrecedingDiv(element, ariaMessageClass, ariaMessage);
          }
        }
      }
    }
  }
  
  addSectionContentMessages();  