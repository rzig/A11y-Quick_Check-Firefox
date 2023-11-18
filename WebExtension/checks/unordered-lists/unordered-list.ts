"use strict";

function checkUnorderedLists(): void {
  const ulElements = document.querySelectorAll("ul");

  for (const ulElement of ulElements) {
    const customRole = ulElement.getAttribute("role");
    
    // Skip UL elements that will be handled by checkForAriaRoles
    if (customRole === 'list' || ulElement.querySelectorAll("li[role='listitem']").length > 0) {
      continue;
    }

    // Check if UL has a role other than 'list'
    if (customRole && customRole !== "list") {
      const liElements = ulElement.querySelectorAll("li");
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
          ulElement.classList.add("custom-role-ul-li");
          const liRole = firstLiElement.getAttribute("role");
          const message = `Warning: UL has a Role of ${customRole} and the LI elements have the ${liRole} Role. Make sure that the code structure is valid according to the Specifications.`;
          createChildMessageDiv(ulElement, "custom-role-valid-li-message", message);
        }
        continue;
      }           
    }

    // Check for first child of UL being DIV
    const firstChild = ulElement.firstElementChild;
    if (firstChild && firstChild.nodeName === "DIV") {
      ulElement.classList.add("unordered-list-div-child");
      const message = "Fail: The first child of UL must be a Li, Script or Template tag. The first child of UL is DIV.";
      createChildMessageDiv(ulElement, "div-child-message", message);
      continue;
    }

    // Check for any DIV element as a direct child of UL
    const hasDivChild = ulElement.querySelector(":scope > div");
    if (hasDivChild) {
      ulElement.classList.add("unordered-list-div-inside");
      const message = "Fail: The DIV element cannot be a child of UL.";
      createChildMessageDiv(ulElement, "div-inside-message", message);
      continue;
    }

    // Check for HTML unordered list markup
    const hasHtmlUl = ulElement.nodeName === "UL" && !ulElement.hasAttribute("role");
    if (hasHtmlUl) {
      ulElement.classList.add("valid-html-unordered-list");
      const message = "This Unordered List uses valid (HTML)";
      createChildMessageDiv(ulElement, "html-ul-message", message);
    }
  }
}

function checkListParentRole(): void {
  const ulElements = document.querySelectorAll("ul");

  for (const parentElement of ulElements) {
    const parentRole = parentElement.getAttribute("role");

    // Check if the element is not a ul or the role is overwritten
    if (parentElement.tagName !== "UL" || (parentRole && parentRole !== "list" && parentRole !== "listbox")) {
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
        const invalidParentClass = "ul--invalid-children-8892664";
        const invalidListClass = "invalid-list-c34fac2";

        // Add class and message only once per ul
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

function checkForAriaRoles(): void {
  const elements = document.querySelectorAll('ul[role="list"], li[role="listitem"]');

  for (const element of elements) {
    const ariaRole = element.getAttribute('role');
    const tagName = element.tagName.toLowerCase();
    
    let implicitHtmlRole = '';
    if (tagName === 'ul') {
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
checkUnorderedLists();
checkListParentRole();
checkForAriaRoles();