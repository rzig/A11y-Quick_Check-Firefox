"use strict";

function checkOrderedLists(): void {
  const olElements = document.querySelectorAll("ol");

  for (const olElement of olElements) {
    // Reset state for each OL element
    olElement.classList.remove("valid-9927845", "invalid-9927845");
    // Remove previous messages
    olElement
      .querySelectorAll(".validation-message")
      .forEach((msg) => msg.remove());

    let invalidMessages = new Set<string>();

    // Role checks for custom roles
    const customRole = olElement.getAttribute("role");
    if (customRole && customRole !== "list") {
      invalidMessages.add(
        `Invalid: <li> is missing a parent of UL or OL. The list has a parent with a Role of '${customRole}''.`
      );
    }

    // Checking direct children validity against allowed elements (LI, SCRIPT, TEMPLATE)
    const invalidChildren = olElement.querySelectorAll(
      ":scope > :not(li):not(script):not(template)"
    );
    invalidChildren.forEach((child) => {
      const tagName = child.tagName.toLowerCase();
      invalidMessages.add(
        `Invalid: <${tagName}> cannot be direct child of OL.`
      );
    });

    if (invalidMessages.size > 0) {
      olElement.classList.add("invalid-9927845");
      invalidMessages.forEach((message: string) => {
        createChildMessageDiv(olElement, "invalid-message-9927845", message);
      });
      continue; // Move to the next ol element as this one has invalid content
    }

    // If no issues were found, mark the list as valid
    if (!olElement.classList.contains("invalid-9927845")) {
      olElement.classList.add("valid-9927845");
      createChildMessageDiv(
        olElement,
        "valid-message-9927845",
        "Valid: Ordered List uses valid HTML."
      );
    }
  }
}

function checkForAriaRolesonOL(): void {
  const elements = document.querySelectorAll(
    'ol[role="list"], li[role="listitem"]:not(ol > li)'
  );

  for (const element of elements) {
    const ariaRole = element.getAttribute("role");
    const tagName = element.tagName.toLowerCase();

    // ARIA role check should not assume invalid, only add warnings if there is an actual issue
    if (
      (tagName === "ol" && ariaRole !== "list") ||
      (tagName === "li" && ariaRole !== "listitem")
    ) {
      element.classList.add("warning-9927845");
      const message = `<${tagName}> has an incorrect ARIA Role ${ariaRole}.`;
      createChildMessageDiv(element, "warning-message-9927845", message);
    }
  }
}

// Run the checks
checkOrderedLists();
checkForAriaRolesonOL();
