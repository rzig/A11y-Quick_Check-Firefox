"use strict";

function isDirectlyInsideUl(dlElement: Element): boolean {
  return !!(dlElement.parentElement && dlElement.parentElement.nodeName === "UL");
}

function isDivWithDtDd(child: Element): boolean {
    return child.nodeName === "DIV" && !!child.querySelector("dt") && !!child.querySelector("dd");
}

function checkDivChild(child: Element, dlElement: Element): boolean {
    if (!isDivWithDtDd(child)) {
        dlElement.classList.add("invalid-9927845");
        const message = `Invalid: DIV without DT and DD detected inside DL.`;
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
      return true;  // Marks the presence of invalid child elements
  }
  return false;  // No invalid child elements found
}

function checkChildStructure(child: Element, dlElement: Element): boolean {
    if (child.nodeName === "DIV") {
        return checkDivChild(child, dlElement);
    } else if (child.nodeName === "DL") {
        return checkDLStructure(child);
    } else {
        return checkOtherChild(child, dlElement);
    }
}

function checkDLStructure(dlElement: Element): boolean {
  let failureDetected = false;
  let lastChildWasDt = false;
  let divFound = false;
  let nonDivDtDdFound = false;

  for (const child of Array.from(dlElement.children)) {
      // Check for invalid child elements first
      if (!["DT", "DD", "DIV", "SCRIPT", "TEMPLATE"].includes(child.nodeName)) {
          dlElement.classList.add("invalid-9927845");
          const message = `Invalid: Child ${child.nodeName} detected inside DL.`;
          createChildMessageDiv(dlElement, "invalid-message-9927845", message);
          return true; // Early return due to invalid child element
      }

      // Then check for DIV related conditions
      if (child.nodeName === "DIV") {
          divFound = true;
          // Check if the DIV is correctly wrapping DT and DD pairs
          if (!isDivWithDtDd(child)) {
              // If there is a DIV that does not contain both DT and DD, mark as failure
              nonDivDtDdFound = true; // This flag is for later, to check mixed content
          }
      } else if (child.nodeName === "DT" || child.nodeName === "DD") {
          if (divFound) {
              // If DIVs were found before and now we find a standalone DT or DD
              nonDivDtDdFound = true;
          }
      }

      // Update DT/DD sequence flags
      if (child.nodeName === "DD" && !lastChildWasDt) {
          dlElement.classList.add("invalid-9927845");
          const message = `Invalid: DD without preceding DT detected inside DL.`;
          createChildMessageDiv(dlElement, "invalid-message-9927845", message);
          failureDetected = true;
          break;
      } else if (child.nodeName === "DT") {
          lastChildWasDt = true;
      } else {
          lastChildWasDt = false;
      }
  }

  // After all children have been checked:
  if (divFound && nonDivDtDdFound) {
      // If there's a mix of wrapped and unwrapped DT/DDs
      dlElement.classList.add("invalid-9927845");
      const message = "Invalid: Mixed DIV and non-DIV DT/DD elements within DL.";
      createChildMessageDiv(dlElement, "invalid-message-9927845", message);
      failureDetected = true;
  }

  return failureDetected;
}

function checkInvalidRole(dlElement: Element): boolean {
  const role = dlElement.getAttribute("role");
  if (role && role.toLowerCase() === "region") {
      dlElement.classList.add("invalid-9927845");
      const message = `Invalid: DL has an invalid role of ${role}.`;
      createChildMessageDiv(dlElement, "invalid-message-9927845", message);
      return true;
  }
  return false;
}

function checkDescriptionLists(): void {
  const dlElements = document.querySelectorAll("dl");
  for (const dlElement of dlElements) {
      // Check if DL is directly inside UL
      if (isDirectlyInsideUl(dlElement)) {
          dlElement.classList.add("invalid-9927845");
          const message = "Invalid: DL element directly inside a UL.";
          createChildMessageDiv(dlElement, "invalid-message-9927845", message);
          continue;  // Move to the next DL element
      }

      // Check for nested DLs
      if (dlElement.parentElement && dlElement.parentElement.nodeName === "DL") {
          dlElement.classList.add("warning-9927845");
          const message = "Warning: Nested DL detected.";
          createChildMessageDiv(dlElement, "warning-message-9927845", message);
          continue;  // Move to the next DL element
      }

      // Now, proceed with internal structure checks
      let failureDetected = checkDLStructure(dlElement);
      if (failureDetected) continue;  // If any structure check failed, move to the next DL element

      // If none of the checks flagged the DL as invalid, mark it as valid
      dlElement.classList.add("valid-9927845");
      const message = "Valid: DL structure and attributes are correct.";
      createChildMessageDiv(dlElement, "valid-message-9927845", message);
  }
}

checkDescriptionLists();
