"use strict";

function isDirectlyInsideUl(dlElement: Element): boolean {
  return !!(
    dlElement.parentElement && dlElement.parentElement.nodeName === "UL"
  );
}

function isDivWithDtDd(child: Element): boolean {
  // Check if DIV contains only DT, DD, SCRIPT, or TEMPLATE elements
  for (const innerChild of Array.from(child.children)) {
    if (!["DT", "DD", "SCRIPT", "TEMPLATE"].includes(innerChild.nodeName)) {
      return false; // Contains invalid elements
    }
    if(child.children.length==0) {
      return false
    }
  }
  return !!child.querySelector("dt") && !!child.querySelector("dd");
}

function checkDivChild(child: Element, dlElement: Element): boolean {
  if (!isDivWithDtDd(child)) {
    dlElement.classList.add("dl-invalid-9927845");
    const message = `Invalid: DIV with incorrect content detected inside DL.`;
    createChildMessageDiv(dlElement, "dl-invalid-message-9927845", message);
    return true;
  }
  return false;
}

function checkOtherChild(child: Element, dlElement: Element): boolean {
  if (!["DT", "DD", "SCRIPT", "TEMPLATE"].includes(child.nodeName)) {
    dlElement.classList.add("dl-invalid-9927845");
    const message = `Invalid: Child ${child.nodeName} detected inside DL.`;
    createChildMessageDiv(dlElement, "dl-invalid-message-9927845", message);
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
  let invalidDivContentFound=false;
  let validDivContentFound=false;

  for (const child of Array.from(dlElement.children)) {
    if (!["DT", "DD", "DIV", "SCRIPT", "TEMPLATE"].includes(child.nodeName)) {
      dlElement.classList.add("dl-invalid-9927845");
      const message = `Invalid: Child ${child.nodeName} detected inside DL.`;
      createChildMessageDiv(dlElement, "dl-invalid-message-9927845", message);
      failureDetected = true; // Mark as failure and continue to provide comprehensive feedback
    }

    if (child.nodeName === "DIV") {
      divFound = true;
      if (!isDivWithDtDd(child)) {
        invalidDivContentFound = true;
      }
      else
      {
        validDivContentFound=true;
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
      dlElement.classList.add("dl-invalid-9927845");
      const message = `Invalid: DD without any preceding DT detected inside DL.`;
      createChildMessageDiv(dlElement, "dl-invalid-message-9927845", message);
      failureDetected = true;
    }
  }

  if (divFound && nonDivDtDdFound && validDivContentFound) {
    dlElement.classList.add("dl-invalid-9927845");
    const message = "Invalid: Mixed DIV and non-DIV DT/DD elements within DL.";
    createChildMessageDiv(dlElement, "dl-invalid-message-9927845", message);
    failureDetected = true;
  }


  if (invalidDivContentFound) {
    dlElement.classList.add("dl-invalid-9927845");
    const message = "Invalid: A DIV inside a DL must contain DD and DT elements, and can only contain DD, DT, SCRIPT, or TEMPLATE elements.";
    createChildMessageDiv(dlElement, "dl-invalid-message-9927845", message);
    failureDetected = true;
  }

  return failureDetected;
}

function checkInvalidRole(dlElement: Element): boolean {
  const role = dlElement.getAttribute("role");
  if (
    role &&
    role.toLowerCase() !== "none" &&
    role.toLowerCase() !== "presentation"
  ) {
    dlElement.classList.add("dl-invalid-9927845");
    const message = `Invalid: DL has a non-ARIA presentation role of ${role}.`;
    createChildMessageDiv(dlElement, "dl-invalid-message-9927845", message);
    return true;
  }
  return false;
}

function checkDescriptionLists(): void {
  const dlElements = document.querySelectorAll("dl");
  for (const dlElement of dlElements) {
    if (isDirectlyInsideUl(dlElement)) {
      dlElement.classList.add("dl-invalid-9927845");
      const message = "Invalid: DL element directly inside a UL.";
      createChildMessageDiv(dlElement, "dl-invalid-message-9927845", message);
      continue; // Move to the next DL element
    }

    // Checking for invalid role attribute
    if (checkInvalidRole(dlElement)) continue; // If invalid role, skip further checks

    // Proceed with internal structure checks
    let failureDetected = checkDLStructure(dlElement);
    if (failureDetected) continue; // If any structure check failed, move to the next DL element

    // Finally, if none of the checks flagged the DL as invalid, mark it as valid
    dlElement.classList.add("dl-valid-9927845");
    const message = "Valid: DL structure and attributes are correct.";
    createChildMessageDiv(dlElement, "dl-valid-message-9927845", message);
  }
}

checkDescriptionLists();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerDescriptionList(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-dl-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimised'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing description lists",
    "The purpose of this check is to provide feedback on the use of description lists (<dl>) in HTML. It evaluates if <dl>, <dt> and <dd> elements adhere to a valid structure."
  );
  innerDiv.appendChild(checkDetails);

  // // Manual notes details component
  // const checkManualDetails = createDetailsComponent(
  //   "How to manually test ( is coming! )",
  //   "This section will be populated with how to manually test"
  // );
  // innerDiv.appendChild(checkManualDetails);

  // heading for the list
  const summaryHeadingPara = document.createElement("h2");
  summaryHeadingPara.textContent = "Description lists";
  summaryHeadingPara.className = "list-heading-9927845";
  innerDiv.appendChild(summaryHeadingPara);

  const olElements = document.querySelectorAll("dl");

  // Create the list for unordered lists
  const findingsUL = document.createElement("ul");
  findingsUL.className = "findings-list-9927845";
  findingsUL.style.margin = "0";
  findingsUL.style.padding = "0";

  // Dynamically add a message based on hgroup elements found
  const findingsLi = document.createElement("li");
  if (olElements.length === 0) {
    findingsLi.textContent = "No description lists identified.";
  } else {
    findingsLi.textContent = `${olElements.length} description lists identified.`;
  }
  findingsUL.appendChild(findingsLi); // Add the dynamic message to the list

  // Append the findings list to the container
  innerDiv.appendChild(findingsUL);

  // Use createReferenceContainer to generate the reference section
  const referenceContainer = createReferenceContainer();
  if (referenceContainer) {
    innerDiv.appendChild(referenceContainer);

    // Link List
    const linkList = document.createElement("ul");
    linkList.className = "reference-list-9927845";
    linkList.style.margin = "0";
    linkList.style.padding = "0";
    
    referenceContainer.appendChild(linkList);

    // Specified links function
    function appendLink(
      links: Record<string, string>,
      key: string,
      category: string
    ): void {
      const href = links[key];
      if (href) {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.textContent = `${category} - ${key}`;
        listItem.appendChild(anchor);
        linkList.appendChild(listItem);
      }
    }

    // Append specific links
    appendLink(wcagLinks, "1.3.1 Info and Relationships (Level A)", "WCAG");
    appendLink(htmlLinks, "4.4.9 The dl element", "HTML");
    appendLink(htmlLinks, "4.4.9 The dl element", "HTML");
    appendLink(htmlLinks, "4.4.10 The dt element", "HTML");
    appendLink(htmlLinks, "4.4.11 The dd element", "HTML");

    // Add the Dismiss Button
  }

  createDismissButton(innerDiv, "Description Lists");

  // Create the toggle button for messages and append it to the containerDiv
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Hide Messages";
  toggleButton.setAttribute("aria-pressed", "false");
  toggleButton.className = "toggle-button-9927845";

  toggleButton.addEventListener("click", () => {
    const messages = document.querySelectorAll(".message-66786");
    const isPressed = toggleButton.getAttribute("aria-pressed") === "true";

    messages.forEach((message) => {
      const msg = message as HTMLElement; // Cast Element to HTMLElement
      if (isPressed) {
        msg.style.display = "block";
      } else {
        msg.style.display = "none";
      }
    });

    toggleButton.setAttribute("aria-pressed", isPressed ? "false" : "true");
    toggleButton.textContent = isPressed ? "Hide Messages" : "Show Messages";
  });

  containerDiv.appendChild(toggleButton);

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerDescriptionList();
