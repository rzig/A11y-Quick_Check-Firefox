"use strict";

function checkOrderedLists(): void {
  const olElements = document.querySelectorAll("ol");

  for (const olElement of olElements) {
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

    // Check for HTML unordered list markup
    const hasHtmlOl = olElement.nodeName === "OL" && !olElement.hasAttribute("role");
    if (hasHtmlOl) {
      olElement.classList.add("valid-html-ordered-list");
      const message = "Pass: Ordered List (HTML)";
      createChildMessageDiv(olElement, "html-ol-message", message);
    }
  }
}

function checkOlParentRole(): void {
  const olElements = document.querySelectorAll("ol");
  const invalidParentClass = "ol--invalid-children-8892664";
  const invalidListClass = "invalid-ol-c34fac2";

  for (const parentElement of olElements) {
    const parentRole = parentElement.getAttribute("role");

    // Check if the element is not a ol or the role is overwritten
    if (parentElement.tagName !== "OL" || (parentRole && parentRole !== "list" && parentRole !== "listbox")) {
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

checkOrderedLists();
checkOlParentRole();