"use strict";

function checkOrderedLists(): void {
  const olElements = document.querySelectorAll("ol");

  for (const olElement of olElements) {
    const customRole = olElement.getAttribute("role");
    
    // Skip UL elements that will be handled by checkForOlAriaRoles
    if (customRole === 'list' || olElement.querySelectorAll("li[role='listitem']").length > 0) {
      continue;
    }

    // Check if OL has a role other than 'list'
    if (customRole && customRole !== "list") {
      const liElements = olElement.querySelectorAll("li:not(ul > li)");
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
          olElement.classList.add("custom-role-ol-li");
          const liRole = firstLiElement.getAttribute("role");
          const message = `Warning: UL has a Role of ${customRole} and the LI elements have the ${liRole} Role. Make sure that the code structure is valid according to the Specifications.`;
          createChildMessageDiv(olElement, "custom-role-valid-li-message", message);
        }
        continue;
      }           
    }

    // Check for first child of UL being DIV
    const firstChild = olElement.firstElementChild;
    if (firstChild && firstChild.nodeName === "DIV") {
      olElement.classList.add("ordered-list-div-child");
      const message = "Fail: The first child of OL must be a Li, Script or Template tag. The first child of OL is DIV.";
      createChildMessageDiv(olElement, "div-child-message", message);
      continue;
    }

    // Check for any DIV element as a direct child of OL
    const hasDivChild = olElement.querySelector(":scope > div");
    if (hasDivChild) {
      olElement.classList.add("ordered-list-div-inside");
      const message = "Fail: The DIV element cannot be a child of OL.";
      createChildMessageDiv(olElement, "div-inside-message", message);
      continue;
    }

    // Check for HTML ordered list markup
    const hasHtmlOl = olElement.nodeName === "OL" && !olElement.hasAttribute("role");
    if (hasHtmlOl) {
      olElement.classList.add("valid-html-ordered-list");
      const message = "This Ordered List uses valid (HTML)";
      createChildMessageDiv(olElement, "html-ol-message", message);
    }
  }
}

function checkOlListParentRole(): void {
  const olElements = document.querySelectorAll("ol");

  for (const parentElement of olElements) {
    const parentRole = parentElement.getAttribute("role");

    // Check if the element is not a ol or the role is overwritten
    if (parentElement.tagName !== "OL" || (parentRole && parentRole !== "list" && parentRole !== "listbox")) {
      const liElements = parentElement.querySelectorAll("li");
      let hasValidLiRole = false;

      for (const liElement of liElements) {
        const liRole = liElement.getAttribute("role");

        if (liRole && liRole !== "listitem") {
          hasValidLiRole = true;
          break;
        }
      }

      if (!hasValidLiRole) {
        const invalidParentClass = "ol--invalid-children-8892664";
        const invalidListClass = "invalid-list-c34fac2";

        // Add class and message only once per ol
        if (!parentElement.classList.contains(invalidParentClass)) {
          parentElement.classList.add(invalidListClass);
          const capitalizedRole = parentRole ? parentRole.charAt(0).toUpperCase() + parentRole.slice(1) : null;
          const capitalizedTag = parentElement.tagName.charAt(0).toUpperCase() + parentElement.tagName.slice(1);
          const message = `Fail: This list is missing a parent of UL or OL. The list has a parent with a Role of ${capitalizedRole || capitalizedTag}`;
          createChildMessageDiv(parentElement, invalidParentClass, message);
        }
      }
    }
  }
}

function checkForOlAriaRoles(): void {
  const elements = document.querySelectorAll('ol[role="list"], li[role="listitem"]:not(ul > li)');

  for (const element of elements) {
    const ariaRole = element.getAttribute('role');
    const tagName = element.tagName.toLowerCase();
    
    let implicitHtmlRole = '';
    if (tagName === 'ol') {
      implicitHtmlRole = 'list';
    } else if (tagName === 'li') {
      implicitHtmlRole = 'listitem';
    }

    element.classList.add(`has-aria-role-8892664`);
    let message = `<${tagName}> has ARIA Role ${ariaRole}`;

    if (ariaRole === implicitHtmlRole) {
      message += '. This role may be redundant as it matches the HTML implicit role.';
    } else {
      message += '. Check if the ARIA role is needed as the HTML is fully supported.';
    }

    createChildMessageDiv(element, `aria-role-message-8892664`, message);
  }
}

// Run the checks
checkOrderedLists();
checkOlListParentRole();
checkForOlAriaRoles();