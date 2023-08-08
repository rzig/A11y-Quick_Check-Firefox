"use strict";

function checkDescriptionLists(): void {
  const dlElements = document.querySelectorAll("dl");

  for (const dlElement of dlElements) {
    let isNested = false;

    // Check for nested DL elements
    if (dlElement.parentElement && dlElement.parentElement.nodeName === 'DL') {
      dlElement.classList.add("dl--nested-9927845");
      dlElement.setAttribute('data-isNestedList', 'true');
      const message = "Fail: Nested DL detected.";
      createChildMessageDiv(dlElement, "nested-dl-message-9927845", message);
      isNested = true;  // Mark that a nested DL was detected
      continue;  // Skip the remaining checks for this element
    }

    if (isNested) {
      // If a nested DL was detected for this element, skip the other checks
      continue;
    }

    // Check for DIV wrapping DT and DD
    const divChild = Array.from(dlElement.children).find((child) => child.nodeName === "DIV" && child.querySelector("dt") && child.querySelector("dd"));
    if (divChild) {
      dlElement.classList.add("dl--valid-div-wrap-dt-dd");
      const message = "Pass: DIV wrapping DT and DD in DL is valid.";
      createChildMessageDiv(dlElement, "div-wrap-message", message);
      continue;  // Skip the remaining checks for this element
    }

    // Check for first child of DL being DIV, SPAN, or P - using these as the most common seen in the wild.
    const firstChild = dlElement.firstElementChild;
    if (firstChild && (firstChild.nodeName === "DIV" || firstChild.nodeName === "SPAN" || firstChild.nodeName === "P")) {
      dlElement.classList.add("dl--invalid-first-child-9927845");
      const message = `Fail: Element ${firstChild.nodeName} cannot be the first child of DL.`;
      createChildMessageDiv(dlElement, "invalid-first-child-message-9927845", message);
      continue;  // Skip the remaining checks for this element
    }

    // Check for valid HTML Description List
    const hasHtmlDl = dlElement.nodeName === "DL" && !dlElement.hasAttribute("role");
    if (hasHtmlDl) {
      dlElement.classList.add("dl--valid-html-9927845");
      const message = "Pass: Description List (HTML)";
      createChildMessageDiv(dlElement, "html-dl-message-9927845", message);
      continue;  // Skip the remaining checks for this element
    }

    // Check if the DL element, being a parent, has an invalid role
    const role = dlElement.getAttribute("role");
    if (role && role !== "descriptionlist") {
      dlElement.classList.add("dl--invalid-role-9927845");
      const capitalizedRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : null;
      const message = `Fail: This DL has an invalid role of ${capitalizedRole}`;
      createChildMessageDiv(dlElement, "invalid-role-message-9927845", message);
    }
  }
}

checkDescriptionLists();