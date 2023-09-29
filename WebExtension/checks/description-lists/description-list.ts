"use strict";

function checkDivChild(child: Element, dlElement: Element): boolean {
  const hasDt = !!child.querySelector("dt");
  const hasDd = !!child.querySelector("dd");
  if (!(hasDt && hasDd)) {
    dlElement.classList.add("dl--invalid-child-9927845");
    const message = `Fail: Invalid DIV without DT and DD detected inside DL.`;
    createChildMessageDiv(dlElement, "invalid-child-message-9927845", message);
    return true;
  }
  return false;
}

function checkOtherChild(child: Element, dlElement: Element): boolean {
  if (!['DT', 'DD', 'SCRIPT', 'TEMPLATE'].includes(child.nodeName)) {
    dlElement.classList.add("dl--invalid-childelement-9927845");
    const message = `Fail: Invalid child ${child.nodeName} detected inside DL.`;
    createChildMessageDiv(dlElement, "invalid-child-message-9927845", message);
    return true;
  }
  return false;
}

function checkDescriptionLists(): void {
  const dlElements = document.querySelectorAll("dl");

  for (const dlElement of dlElements) {
    let failureDetected = false;

    // Check for nested DL elements
    if (dlElement.parentElement && dlElement.parentElement.nodeName === 'DL') {
      dlElement.classList.add("dl--nested-9927845");
      dlElement.setAttribute('data-isNestedList', 'true');
      const message = "Fail: Nested DL detected.";
      createChildMessageDiv(dlElement, "nested-dl-message-9927845", message);
      continue;
    }

    // Check each child element for validity
    for (const child of Array.from(dlElement.children)) {
      if (child.nodeName === "DIV") {
        failureDetected = checkDivChild(child, dlElement);
      } else {
        failureDetected = checkOtherChild(child, dlElement);
      }

      if (failureDetected) {
        break;
      }
    }

    if (failureDetected) continue;

    // Check for a single DT/DD within a DL
    const dtCount = dlElement.querySelectorAll("dt").length;
    const ddCount = dlElement.querySelectorAll("dd").length;
    if (dtCount === 1 && ddCount === 1) {
      dlElement.classList.add("dl--single-dt-dd-9927845");
      const message = "Warning: This DL contains a single key-value pair";
      createChildMessageDiv(dlElement, "single-dt-dd-message-9927845", message);
    }

    // Check for valid HTML Description List
    const hasHtmlDl = dlElement.nodeName === "DL" && !dlElement.hasAttribute("role");
    if (hasHtmlDl) {
      dlElement.classList.add("dl--valid-html-9927845");
      const message = "Pass: Description List (HTML)";
      createChildMessageDiv(dlElement, "html-dl-message-9927845", message);
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

// Call the function to perform the check
checkDescriptionLists();