"use strict";

function isDirectlyInsideUl(dlElement: Element): boolean {
  return !!(dlElement.parentElement && dlElement.parentElement.nodeName === "UL");
}

function isDivWithDtDd(child: Element): boolean {
  // Check if DIV contains only DT, DD, SCRIPT, or TEMPLATE elements
  for (const innerChild of Array.from(child.children)) {
    if (!["DT", "DD", "SCRIPT", "TEMPLATE"].includes(innerChild.nodeName)) {
      return false;  // Contains invalid elements
    }
  }
  return !!child.querySelector("dt") && !!child.querySelector("dd");
}

function checkDivChild(child: Element, dlElement: Element): boolean {
  if (!isDivWithDtDd(child)) {
    dlElement.classList.add("invalid-9927845");
    const message = `Invalid: DIV with incorrect content detected inside DL.`;
    createChildMessageDiv(dlElement, "invalid-message-9927845", message);
    return true;
  }
  return false;
}

function checkOtherChild(child: Element, dlElement: Element): boolean {
  if (!["DT", "DD", "SCRIPT", "TEMPLATE"].includes(child.nodeName)) {
    dlElement.classList.add("invalid-9927845");
    const message = `Invalid: Child ${child.nodeName} detected inside DL.`;
    createChildMessageDiv(dlElement, "invalid-message-9927845", message);
    return true;
  }
  return false;
}

function checkDLStructure(dlElement: Element): boolean {
  let failureDetected = false;
  let lastChildWasDt = false;
  let seenDt = false;
  let divFound = false;
  let nonDivDtDdFound = false;

  for (const child of Array.from(dlElement.children)) {
    if (!["DT", "DD", "DIV", "SCRIPT", "TEMPLATE"].includes(child.nodeName)) {
      dlElement.classList.add("invalid-9927845");
      const message = `Invalid: Child ${child.nodeName} detected inside DL.`;
      createChildMessageDiv(dlElement, "invalid-message-9927845", message);
      failureDetected = true; // Mark as failure and continue to provide comprehensive feedback
    }

    if (child.nodeName === "DIV") {
      divFound = true;
      if (!isDivWithDtDd(child)) {
        nonDivDtDdFound = true;
      }
    } else if (child.nodeName === "DT" || child.nodeName === "DD") {
      if (divFound) {
        nonDivDtDdFound = true;
      }
      seenDt = seenDt || child.nodeName === "DT";
      lastChildWasDt = child.nodeName === "DT";
    } else {
      lastChildWasDt = false;
    }

    if (child.nodeName === "DD" && !seenDt) {
      dlElement.classList.add("invalid-9927845");
      const message = `Invalid: DD without any preceding DT detected inside DL.`;
      createChildMessageDiv(dlElement, "invalid-message-9927845", message);
      failureDetected = true;
    }
  }

  if (divFound && nonDivDtDdFound) {
    dlElement.classList.add("invalid-9927845");
    const message = "Invalid: Mixed DIV and non-DIV DT/DD elements within DL.";
    createChildMessageDiv(dlElement, "invalid-message-9927845", message);
    failureDetected = true;
  }

  return failureDetected;
}

function checkInvalidRole(dlElement: Element): boolean {
  const role = dlElement.getAttribute("role");
  if (role && role.toLowerCase() !== "none" && role.toLowerCase() !== "presentation") {
    dlElement.classList.add("invalid-9927845");
    const message = `Invalid: DL has a non-ARIA presentation role of ${role}.`;
    createChildMessageDiv(dlElement, "invalid-message-9927845", message);
    return true;
  }
  return false;
}

function checkDescriptionLists(): void {
  const dlElements = document.querySelectorAll("dl");
  for (const dlElement of dlElements) {
    if (isDirectlyInsideUl(dlElement)) {
        dlElement.classList.add("invalid-9927845");
        const message = "Invalid: DL element directly inside a UL.";
        createChildMessageDiv(dlElement, "invalid-message-9927845", message);
        continue; // Move to the next DL element
      }
  
      // Checking for invalid role attribute
      if (checkInvalidRole(dlElement)) continue; // If invalid role, skip further checks
  
      // Proceed with internal structure checks
      let failureDetected = checkDLStructure(dlElement);
      if (failureDetected) continue; // If any structure check failed, move to the next DL element
  
      // Finally, if none of the checks flagged the DL as invalid, mark it as valid
      dlElement.classList.add("valid-9927845");
      const message = "Valid: DL structure and attributes are correct.";
      createChildMessageDiv(dlElement, "valid-message-9927845", message);
    }
  }
  
  checkDescriptionLists();
