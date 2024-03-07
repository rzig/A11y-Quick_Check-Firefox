"use strict";

function checkUnorderedLists(): void {
  const ulElements = document.querySelectorAll("ul");

  for (const ulElement of ulElements) {
    // Reset state for each UL element
    ulElement.classList.remove("valid-9927845", "invalid-9927845");
    // Remove previous messages
    ulElement
      .querySelectorAll(".validation-message")
      .forEach((msg) => msg.remove());

    let invalidMessages = new Set<string>();

    // Role checks for custom roles
    const customRole = ulElement.getAttribute("role");
    if (customRole && customRole !== "list") {
      invalidMessages.add(
        `Invalid: <li> is missing a parent of UL or OL. The list has a parent with a Role of '${customRole}''.`
      );
    }

    // Checking direct children validity against allowed elements (LI, SCRIPT, TEMPLATE)
    const invalidChildren = ulElement.querySelectorAll(
      ":scope > :not(li):not(script):not(template)"
    );
    invalidChildren.forEach((child) => {
      const tagName = child.tagName.toLowerCase();
      invalidMessages.add(
        `Invalid: <${tagName}> cannot be direct child of UL.`
      );
    });

    if (invalidMessages.size > 0) {
      ulElement.classList.add("invalid-9927845");
      invalidMessages.forEach((message: string) => {
        createChildMessageDiv(ulElement, "invalid-message-9927845", message);
      });
      continue; // Move to the next ul element as this one has invalid content
    }

    // If no issues were found, mark the list as valid
    if (!ulElement.classList.contains("invalid-9927845")) {
      ulElement.classList.add("valid-9927845");
      createChildMessageDiv(
        ulElement,
        "valid-message-9927845",
        "Valid: Ordered List uses valid HTML."
      );
    }
  }
}

function checkForAriaRolesonUL(): void {
  const elements = document.querySelectorAll(
    'ul[role="list"], li[role="listitem"]:not(ul > li)'
  );

  for (const element of elements) {
    const ariaRole = element.getAttribute("role");
    const tagName = element.tagName.toLowerCase();

    // ARIA role check should not assume invalid, only add warnings if there is an actual issue
    if (
      (tagName === "ul" && ariaRole !== "list") ||
      (tagName === "li" && ariaRole !== "listitem")
    ) {
      element.classList.add("warning-9927845");
      const message = `<${tagName}> has an incorrect ARIA Role ${ariaRole}.`;
      createChildMessageDiv(element, "warning-message-9927845", message);
    }
  }
}

// Run the checks
checkUnorderedLists();
checkForAriaRolesonUL();
