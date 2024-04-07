"use strict";

function checkOrderedLists(): void {
  const olElements = document.querySelectorAll(
    "ol:not(.top-right-container-9927845 ol, .inner-container-9927845 ol)"
  );

  for (const olElement of olElements) {
    // Reset state for each OL element
    olElement.classList.remove("valid-9927845", "invalid-9927845");
    // Remove previous messages
    olElement
      .querySelectorAll(".validation-message")
      .forEach((msg) => msg.remove());

    let invalidMessages = new Set<string>();

    // Role checks for custom roles
    const customRole = olElement.getAttribute("role");
    if (customRole && customRole !== "list") {
      invalidMessages.add(
        `Invalid: <li> is missing a parent of UL or OL. The list has a parent with a Role of '${customRole}''.`
      );
    }

    // Checking direct children validity against allowed elements (LI, SCRIPT, TEMPLATE)
    const invalidChildren = olElement.querySelectorAll(
      ":scope > :not(li):not(script):not(template)"
    );
    invalidChildren.forEach((child) => {
      const tagName = child.tagName.toLowerCase();
      invalidMessages.add(
        `Invalid: <${tagName}> cannot be direct child of OL.`
      );
    });

    if (invalidMessages.size > 0) {
      olElement.classList.add("invalid-9927845");
      invalidMessages.forEach((message: string) => {
        createChildMessageDiv(olElement, "invalid-message-9927845", message);
      });
      continue; // Move to the next ol element as this one has invalid content
    }

    // If no issues were found, mark the list as valid
    if (!olElement.classList.contains("invalid-9927845")) {
      olElement.classList.add("valid-9927845");
      createChildMessageDiv(
        olElement,
        "valid-message-9927845",
        "Valid: Ordered List uses valid HTML."
      );
    }
  }
}

function checkForAriaRolesonOL(): void {
  const elements = document.querySelectorAll(
    'ol[role="list"], li[role="listitem"]:not(ol > li)'
  );

  for (const element of elements) {
    const ariaRole = element.getAttribute("role");
    const tagName = element.tagName.toLowerCase();

    // ARIA role check should not assume invalid, only add warnings if there is an actual issue
    if (
      (tagName === "ol" && ariaRole !== "list") ||
      (tagName === "li" && ariaRole !== "listitem")
    ) {
      element.classList.add("warning-9927845");
      const message = `<${tagName}> has an incorrect ARIA Role ${ariaRole}.`;
      createChildMessageDiv(element, "warning-message-9927845", message);
    }
  }
}

// Run the checks
checkOrderedLists();
checkForAriaRolesonOL();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerOrderedList(): void {
  const containerDiv = getOrCreateContainer();

  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-ol-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset["isMinimized"] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing ordered lists",
    "The purpose of this check is to ensure that ordered lists (<ol>) in HTML are used correctly and structured properly. It validates the presence and usage of appropriate child elements. If issues are found, it flags the lists as invalid and provides feedback. Valid lists are confirmed as correctly implemented."
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
  summaryHeadingPara.textContent = "Ordered lists";
  summaryHeadingPara.className = "list-heading-9927845";
  innerDiv.appendChild(summaryHeadingPara);

  const olElements = document.querySelectorAll("ol");

  // Create the list for unordered lists
  const findingsUL = document.createElement("ul");
  findingsUL.className = "findings-list-9927845";
  findingsUL.style.margin = "0";
  findingsUL.style.padding = "0";

  // Dynamically add a message based on hgroup elements found
  const findingsLi = document.createElement("li");
  if (olElements.length === 0) {
    findingsLi.textContent = "No ordered lists identified.";
  } else {
    findingsLi.textContent = `${olElements.length} ordered lists identified.`;
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
    appendLink(htmlLinks, "4.4.5 The ol element", "HTML");
    appendLink(htmlLinks, "4.4.8 The li element", "HTML");

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Ordered List");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerOrderedList();
