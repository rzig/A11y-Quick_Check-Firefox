"use strict";

/**
 * Main function to add accessibility messages to landmarks in the document.
 */
function addLandmarkMessages() {
  const htmlLandmarks = [
    "article",
    "aside",
    "section",
    "header",
    "form",
    "footer",
    "nav",
    "main",
    "search",
  ];
  const restrictedParents = ["article", "aside", "main", "nav", "section"];
  const ariaToHtmlMapping: Record<string, string> = {
    article: "article",
    section: "section",
    banner: "header",
    form: "form",
    contentinfo: "footer",
    navigation: "nav",
    main: "main",
    aside: "complementary",
    search: "search",
  };

  /**
   * Checks if the given element is nested within any of the specified parent elements.
   * @param element The element to check.
   * @param parentTags An array of tag names to check against.
   * @returns true if the element is inside any of the specified parent elements; false otherwise.
   */
  function isElementInside(element: Element, parentTags: string[]): boolean {
    let currentElement = element.parentElement;
    while (currentElement) {
      const tagName = currentElement.tagName.toLowerCase();
      const role = currentElement.getAttribute('role');

      // Check if inside a <div> without a restricted parent role
      if (tagName === 'div' && (!role || !parentTags.includes(role))) {
        return false;
      }
      if (parentTags.includes(tagName)) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }

  for (const landmark of htmlLandmarks) {
    const elements = document.querySelectorAll(landmark);
    const ariaElements = document.querySelectorAll(`[role=${landmark}]`);

    for (const element of elements) {
      if (isHidden(element as HTMLElement)) continue;

      const isInRestrictedParent = isElementInside(element, restrictedParents);

      if (isInRestrictedParent) {
        const parentTagName = element.parentElement?.tagName.toLowerCase();
        const message = `Testing with a screen reader, the <${landmark}> role should not be announced when nested inside a <${parentTagName}> element.`;

        const messageClassName = `message-${landmark}-inside-${parentTagName}-88937746`;
        addMessageToPrecedingDiv(element, messageClassName, message);

        // Add the common class to the message element
        const messageElement = document.querySelector(`.${messageClassName}`);
        if (messageElement) {
          messageElement.classList.add("common-inside-class-88937746");
        }
      }

      // Getting direct text content of the element, excluding children
      let directTextContent = Array.from(element.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => (node as Text).textContent?.trim())
        .join(" ");

      let accessibleName = element.getAttribute("aria-label") || "not named";
      let ariaRole = element.getAttribute("role");
      let hasDuplicateRole =
        ariaRole && ariaToHtmlMapping[ariaRole] === landmark;

      let shouldSkipMessage = [
        "header",
        "form",
        "main",
        "footer",
        "article",
        "aside",
        "section",
      ].includes(landmark);

      // Decide the message for HTML landmark
      let htmlMessage = "";
      let htmlMessageClass = "";

      if (!shouldSkipMessage) {
        if (accessibleName === "not named" && !ariaRole) {
          htmlMessage = `HTML <${landmark}> landmark is missing an accessible name`;
        } else {
          htmlMessage = `HTML <${landmark}> landmark has accessible name ${accessibleName}`;
        }
        htmlMessageClass = `html-${landmark}-message-88937746`;
      }

      // Decide the message for ARIA role
      let ariaMessage = "";
      let ariaMessageClass = "";

      if (!shouldSkipMessage && ariaRole) {
        if (accessibleName === "not named" && !ariaRole) {
          ariaMessage = `ARIA ${ariaRole} landmark is missing an accessible name`;
        } else {
          ariaMessage = `ARIA ${ariaRole} landmark has accessible name ${accessibleName}`;
        }
        ariaMessageClass = `aria-${ariaRole}-message-88937746`;
      }

      /**
       * Checks if the HTML role and ARIA role on the same element have different roles and adds a message if they conflict.
       * @param element The element to check.
       */
      function check(element: Element) {
        const ariaRole = element.getAttribute("role");
        if (ariaRole) {
          const tagName = element.tagName.toLowerCase();
          const htmlRole = ariaToHtmlMapping[ariaRole];

          if (htmlRole && htmlRole !== tagName) {
            // Remove any existing messages from the element
            const existingMessages = element.querySelectorAll(
              ".conflicting-roles-message-88937746"
            );
            existingMessages.forEach((message) => {
              element.removeChild(message);
            });

            // Add the conflict message to the element
            const message = `The HTML role '${tagName}' and ARIA role '${ariaRole}' on this element conflict.`;
            addMessageToPrecedingDiv(
              element,
              "conflicting-roles-message-88937746",
              message
            );
          }
        }
      }

      // Determine and add the required class for the landmark identified
      if (hasDuplicateRole) {
        element.classList.add(`${landmark}--aria-html-88937746`);
      } else if (ariaRole) {
        element.classList.add(`${landmark}--aria--88937746`);
        // Check for conflicting roles
        check(element);
      } else {
        element.classList.add(`${landmark}--html--88937746`);
      }

      const rolesThatMustBeNamed = ["navigation", "nav"]; // Add roles and landmarks that must be named

      // If there is a duplicate role, add only the duplicate message
      if (hasDuplicateRole) {
        let duplicateMessage = `HTML ${landmark} landmark has a duplicate role in ARIA ${ariaRole!}`;
        if (
          (rolesThatMustBeNamed.includes(ariaRole!) ||
            rolesThatMustBeNamed.includes(landmark)) &&
          accessibleName === "not named" &&
          !ariaRole
        ) {
          duplicateMessage += `. The accessible name is ${accessibleName}`;
        }
        let duplicateMessageClass = `html-aria-duplicate-${landmark}-message-88937746`;
        addMessageToPrecedingDiv(
          element,
          duplicateMessageClass,
          duplicateMessage
        );
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

  // Define the common class
  const commonClass = "common-class-for-aria-only-elements-88937746";

  // Check for elements with ARIA roles but without corresponding HTML landmark roles
  for (const [ariaRole, htmlEquivalent] of Object.entries(ariaToHtmlMapping)) {
    const ariaElements = document.querySelectorAll(
      `[role='${ariaRole}']:not(${htmlEquivalent})`
    );

    for (const element of ariaElements) {
      // const message = `HTML <${htmlEquivalent}> fully supported and should be used to replace ARIA role '${ariaRole}'`;
      const message = `Has ARIA role=\"${ariaRole}\". Check for current support of HTML <${htmlEquivalent}> using https://caniuse.com/?search=${htmlEquivalent}`;
      const messageClass = `replace-aria-${ariaRole}-with-html-${htmlEquivalent}-88937746`;
      addMessageToPrecedingDiv(element as HTMLElement, messageClass, message);

      // Add the common class to the preceding div
      const precedingDiv = element.previousElementSibling;
      if (precedingDiv) {
        precedingDiv.classList.add(commonClass);
      }
    }
  }
}

addLandmarkMessages();
