"use strict";

function checkOrderedLists(): void {
  const olElements = document.querySelectorAll("ol");

  for (const olElement of olElements) {
    const customRole = olElement.getAttribute("role");

    // Check if OL has a role other than 'list'
    if (customRole && customRole !== "list") {
      const liElements = olElement.querySelectorAll("li");
      let hasValidLiRole = false;

      for (const liElement of liElements) {
        const liRole = liElement.getAttribute("role");

        // Check if any LI has a valid role
        if (liRole && liRole !== "listitem") {
          hasValidLiRole = true;
          break;
        }
      }

      if (hasValidLiRole) {
        const firstLiElement = liElements.item(0);
        if (firstLiElement !== null) {
          olElement.classList.add("ol-custom-role-valid-li");
          const liRole = firstLiElement.getAttribute("role");
          const message = `Warning: OL has a Role of ${customRole} and the LI elements have the ${liRole} Role. Make sure that the code structure is valid according to the Specifications.`;
          createChildMessageDiv(olElement, "ol-custom-role-valid-li-message", message);
        }
        continue;  // Skip the remaining checks for this OL element
      }
    }

    // Check for first child of OL being DIV
    const firstChild = olElement.firstElementChild;
    if (firstChild && firstChild.nodeName === "DIV") {
      olElement.classList.add("ordered-list-div-child");
      const message = "Fail: The first child of OL must be a Li, Script or Template tag. The first child of OL is DIV.";
      createChildMessageDiv(olElement, "div-child-message", message);
      continue;  // Skip the remaining checks for this element
    }

    // Check for any DIV element as a direct child of OL
    const hasDivChild = olElement.querySelector(":scope > div");
    if (hasDivChild) {
      olElement.classList.add("ordered-list-div-inside");
      const message = "Fail: The DIV element cannot be a child of OL.";
      createChildMessageDiv(olElement, "div-inside-message", message);
      continue;  // Skip the remaining checks for this element
    }

    // Check for HTML ordered list markup
    const hasHtmlOl = olElement.nodeName === "OL" && !olElement.hasAttribute("role");
    if (hasHtmlOl) {
      olElement.classList.add("valid-html-ordered-list");
      const message = "Pass: Ordered List (HTML)";
      createChildMessageDiv(olElement, "html-ol-message", message);
    }
  }
}

// Run the function
checkOrderedLists();