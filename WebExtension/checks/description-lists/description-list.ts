"use strict";

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
    return true;
  }
  return false;
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

  for (const child of Array.from(dlElement.children)) {
    // Check for DD elements without a preceding DT or DIV and handle null case for previousElementSibling.
    if (child.nodeName === "DD" && !lastChildWasDt && !(child.previousElementSibling && isDivWithDtDd(child.previousElementSibling))) {
      dlElement.classList.add("invalid-9927845");
      const message = `Invalid: DD without preceding DT or DIV wrapping detected inside DL.`;
      createChildMessageDiv(dlElement, "invalid-message-9927845", message);
      failureDetected = true;
      break;
    }

    if (child.nodeName === "DT") {
      lastChildWasDt = true;
    } else if (child.nodeName !== "DD") {
      lastChildWasDt = false;
    }

    failureDetected = checkChildStructure(child, dlElement);

    if (failureDetected) {
      break;
    }
  }
  return failureDetected;
}

function checkDescriptionLists(): void {
  const dlElements = document.querySelectorAll("dl");
  for (const dlElement of dlElements) {
    if (dlElement.parentElement && dlElement.parentElement.nodeName === "DL") {
      dlElement.classList.add("warning-9927845");
      const message = "Warning: Nested DL detected.";
      createChildMessageDiv(dlElement, "warning-message-9927845", message);
      continue;
    }

    const children = Array.from(dlElement.children);
    const divWrappedPairs = children.filter(
      (child) =>
        child.nodeName === "DIV" &&
        !!child.querySelector("dt") &&
        !!child.querySelector("dd")
    );
    const standaloneDts = children.filter((child) => child.nodeName === "DT");
    const standaloneDds = children.filter((child) => child.nodeName === "DD");

    if (
      divWrappedPairs.length ===
      (standaloneDts.length + standaloneDds.length) / 2
    ) {
      dlElement.classList.add("valid-9927845");
      const message = "Valid: DIV wrapping all DT and DD in DL.";
      createChildMessageDiv(dlElement, "valid-message-9927845", message);
    } else if (
      divWrappedPairs.length > 0 &&
      (standaloneDts.length > 0 || standaloneDds.length > 0)
    ) {
      dlElement.classList.add("invalid-9927845");
      const message = "Invalid: DT or DD cannot be after a DIV in a DL";
      createChildMessageDiv(dlElement, "invalid-message-9927845", message);
      continue;
    }

    const failureDetected = checkDLStructure(dlElement);

    if (failureDetected) continue;

    const dtCount = dlElement.querySelectorAll("dt").length;
    const ddCount = dlElement.querySelectorAll("dd").length;
    // if (dtCount === 1 && ddCount === 1) {
    //   dlElement.classList.add("warning-9927845");
    //   const message = "Warning: This DL contains a single key-value pair";
    //   createChildMessageDiv(dlElement, "warning-message-9927845", message);
    // }

    // Check for valid HTML Description List
    const hasHtmlDl =
      dlElement.nodeName === "DL" && !dlElement.hasAttribute("role");
    if (hasHtmlDl) {
      dlElement.classList.add("valid-9927845");
      const message = "Valid: Description List uses valid (HTML)";
      createChildMessageDiv(dlElement, "valid-message-9927845", message);
    }

    // Check if the DL element, being a parent, has an invalid role
    const role = dlElement.getAttribute("role");
    if (role && role !== "descriptionlist") {
      dlElement.classList.add("invalid-9927845");
      const capitalizedRole = role
        ? role.charAt(0).toUpperCase() + role.slice(1)
        : null;
      const message = `Invalid: DL has an invalid role of ${capitalizedRole}`;
      createChildMessageDiv(dlElement, "invalid-message-9927845", message);
    }
  }
}

checkDescriptionLists();
