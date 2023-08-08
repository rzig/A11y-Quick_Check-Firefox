"use strict";

function checkDescriptionLists(): void {
  const dlElements = document.querySelectorAll("dl");

  for (const dlElement of dlElements) {
    let failureDetected = false; // Add this flag to keep track of failures

    // Check for nested DL elements
    if (dlElement.parentElement && dlElement.parentElement.nodeName === 'DL') {
      dlElement.classList.add("dl--nested-9927845");
      dlElement.setAttribute('data-isNestedList', 'true');
      const message = "Fail: Nested DL detected.";
      createChildMessageDiv(dlElement, "nested-dl-message-9927845", message);
      continue;
    }

    // Check for DIV wrapping DT and DD
    const divChild = Array.from(dlElement.children).find((child) => 
      child.nodeName === "DIV" && (child.querySelector("dt") && child.querySelector("dd"))
    );
    if (divChild) {
      dlElement.classList.add("dl--valid-div-wrap-dt-dd-9927845");
      const message = "Pass: DIV wrapping DT and DD in DL is valid.";
      createChildMessageDiv(dlElement, "div-wrap-message-9927845", message);
      continue;
    }

    // Check for invalid elements inside DL or div without dt and dd
    for (const child of dlElement.children) {
      if (!['DT', 'DD', 'SCRIPT', 'TEMPLATE'].includes(child.nodeName)) {
        failureDetected = true; // Set the failure flag when an invalid child is detected
        if (child.nodeName === "DIV" && (!child.querySelector("dt") || !child.querySelector("dd"))) {
          dlElement.classList.add("dl--invalid-child-9927845");
          const message = `Fail: Invalid DIV without DT and DD detected inside DL.`;
          createChildMessageDiv(dlElement, "invalid-child-message-9927845", message);
          break;
        } else {
          dlElement.classList.add("dl--invalid-child-9927845");
          const message = `Fail: Invalid child ${child.nodeName} detected inside DL.`;
          createChildMessageDiv(dlElement, "invalid-child-message-9927845", message);
          break;
        }
      }
    }

    if (failureDetected) continue; // If a failure was detected, skip the remaining checks for this element

    // Check for valid HTML Description List
    const hasHtmlDl = dlElement.nodeName === "DL" && !dlElement.hasAttribute("role");
    if (hasHtmlDl) {
      dlElement.classList.add("dl--valid-html-9927845");
      const message = "Pass: Description List (HTML)";
      createChildMessageDiv(dlElement, "html-dl-message-9927845", message);
      continue;
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