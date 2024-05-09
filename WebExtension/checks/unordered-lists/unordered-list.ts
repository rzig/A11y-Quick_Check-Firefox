"use strict";

function checkUnorderedLists(): void {
  const ulElements = document.querySelectorAll(
    "ul:not(.top-right-container-9927845 ul, .inner-container-9927845 ul)"
  );

  for (const ulElement of ulElements) {
    // Reset state for each UL element
    ulElement.classList.remove(
      "ul-valid-9927845",
      "ul-invalid-9927845",
      "ul-warning-9927845",
      "ul-generic-9927845"
    );
    // Remove previous messages
    ulElement
      .querySelectorAll(".ul-validation-message")
      .forEach((msg) => msg.remove());

    let invalidMessages = new Set<string>();

    // Role checks for custom roles, include "listbox" which was missing
    const customRole = ulElement.getAttribute("role");
    if (customRole && customRole !== "list" && customRole !== "listbox") {
      invalidMessages.add(
        `Invalid: <li> is missing a parent of UL or OL. The list has a parent with a Role of '${customRole}'.`
      );
    }

    // Check for empty ULs or improper role usage with style conditions
    checkEmptyAndRoleList(ulElement);

    // Checking direct children validity against allowed elements (LI, SCRIPT, TEMPLATE)
    const invalidChildren = ulElement.querySelectorAll(
      ":scope > :not(li):not(script):not(template)"
    );
    invalidChildren.forEach((child) => {
      const tagName = child.tagName.toLowerCase();
      invalidMessages.add(
        `Invalid: <${tagName}> cannot be direct child of UL.`
      );
    });

    if (invalidMessages.size > 0) {
      ulElement.classList.add("ul-invalid-9927845");
      invalidMessages.forEach((message: string) => {
        createChildMessageDiv(ulElement, "ul-invalid-message-9927845", message);
      });
      continue; // Move to the next ul element as this one has invalid content
    }

    // If no issues were found, mark the list as valid
    // If no issues were found and the ul is not empty, mark the list as valid
    if (
      !ulElement.classList.contains("ul-invalid-9927845") &&
      ulElement.querySelectorAll(":scope > *").length > 0
    ) {
      ulElement.classList.add("ul-valid-9927845");
      createChildMessageDiv(
        ulElement,
        "ul-valid-message-9927845",
        "Valid: Ordered List uses valid HTML."
      );
    }
  }

  // Check for li elements that do not have a valid container
}

function checkForInvalidListContainers(): void {
  for (const invalidListContainer of document.querySelectorAll(
    ":not(.ul-invalid-9927845)>:not(ul,ol,menu,[role=list]):has(>li)"
  )) {
    invalidListContainer.classList.add("ul-invalid-9927845");
    createChildMessageDiv(
      invalidListContainer,
      "ul-invalid-message-9927845",
      "Invalid: This list contains li elements, but does not have a valid container."
    );
  }

  for (const invalidListContainer of document.querySelectorAll(
    ":not(.ul-invalid-9927845)>:not(ul,ol,menu,[role=list]):has(>[role=listitem])"
  )) {
    invalidListContainer.classList.add("ul-invalid-9927845");
    createChildMessageDiv(
      invalidListContainer,
      "ul-invalid-message-9927845",
      "Invalid: This list contains elements with role=listitem, but does not have a valid container."
    );
  }
}

function checkForAriaRolesonUL(): void {
  const elements = document.querySelectorAll(
    'ul[role="list"], li[role="listitem"]:not(ul > li)'
  );

  for (const element of elements) {
    const ariaRole = element.getAttribute("role");
    const tagName = element.tagName.toLowerCase();

    // ARIA role check should not assume invalid, only add warnings if there is an actual issue
    if (
      (tagName === "ul" && ariaRole !== "list") ||
      (tagName === "li" && ariaRole !== "listitem")
    ) {
      element.classList.add("ul-warning-9927845");
      const message = `<${tagName}> has an incorrect ARIA Role ${ariaRole}.`;
      createChildMessageDiv(element, "ul-warning-message-9927845", message);
    }
  }
}

function checkEmptyAndRoleList(ulElement: Element): void {
  const children = ulElement.querySelectorAll(":scope > *");
  const role = ulElement.getAttribute("role");
  const style = window.getComputedStyle(ulElement).listStyleType;

  if (
    children.length === 0 ||
    ulElement.querySelectorAll("li, [role='listitem']").length === 0
  ) {
    const customRole = role || "inherit role";
    createChildMessageDiv(
      ulElement,
      "ul-warning-message-9927845",
      `Warning UL is missing required <li> or children with a valid role. UL has a Role of '${customRole}'.`
    );
    ulElement.classList.add("ul-warning-9927845");
  } else if (role === "list") {
    if (style === "none") {
      createChildMessageDiv(
        ulElement,
        "ul-generic-message-9927845",
        "Knowledge Role 'list' on <ul> exposes the list semantics when CSS list-style is set to none for iOS."
      );
      ulElement.classList.add("ul-generic-9927845");
    }
  }
}

// Run the checks
checkUnorderedLists();
checkForAriaRolesonUL();
checkForInvalidListContainers();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerUnorderedList(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-ul-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset["isMinimised"] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing unordered lists",
    "The purpose of this check is to ensure that ordered lists (<ul>) in HTML are used correctly and structured properly. It validates the presence and usage of appropriate child elements. If issues are found, it flags the lists as invalid and provides feedback. Valid lists are confirmed as correctly implemented."
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
  summaryHeadingPara.textContent = "Unordered lists";
  summaryHeadingPara.className = "list-heading-9927845";
  innerDiv.appendChild(summaryHeadingPara);

  const ulElements = document.querySelectorAll("ul");

  // Create the list for unordered lists
  const findingsUL = document.createElement("ul");
  findingsUL.className = "findings-list-9927845";
  findingsUL.style.margin = "0";
  findingsUL.style.padding = "0";

  // Dynamically add a message based on hgroup elements found
  const findingsLi = document.createElement("li");
  if (ulElements.length === 0) {
    findingsLi.textContent = "No unordered lists identified.";
  } else {
    findingsLi.textContent = `${ulElements.length} unordered lists identified.`;
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
    appendLink(htmlLinks, "4.4.6 The ul element", "HTML");
    appendLink(htmlLinks, "4.4.8 The li element", "HTML");

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Unordered List");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerUnorderedList();
