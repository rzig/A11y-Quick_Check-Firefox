(function () {
  "use strict";

  // Counter to uniquely identify relationships between elements with duplicate IDs.
  let relationshipCounter: number = 1;
  const uniqueDuplicateIDs = new Set();

  // Adds a numbered square before each element in the provided array.
  function addNumberedRelationship(elements: Element[], number: number): void {
    elements.forEach((element) => {
      const square = document.createElement("div");
      square.textContent = number.toString();
      square.classList.add("numbered-square-9927845");
      if (element.parentNode) {
        element.parentNode.insertBefore(square, element);
      }
    });
  }

  // Adds a warning message after the first element
  function addMessageToFollowingDiv(element: Element, className: string, message: string): void {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = message;
    if (element && element.parentNode) { // Check that element and its parent node are not undefined
      element.parentNode.insertBefore(div, element.nextSibling);
    }
  }

  // Identify duplicate IDs and apply the numbered relationship and warning message.
  function findDuplicateIdsAndApply(): void {
    const allElements = document.querySelectorAll("*[id]");
    const idCounts = new Map<string, { elements: Element[], hasRelevantAttr: boolean, attributes: Set<string> }>();

    // First pass: Count all IDs
    allElements.forEach((element) => {
      const id = element.getAttribute("id");
      if (id) {
        let record = idCounts.get(id) ?? { elements: [], hasRelevantAttr: false, attributes: new Set<string>() };
        record.elements.push(element);
        idCounts.set(id, record);
      }
    });

    // Check for relevant attributes
    document.querySelectorAll("[aria-labelledby], [aria-describedby], [aria-controls], label[for]").forEach((element) => {
      const attributes = ['aria-labelledby', 'aria-describedby', 'aria-controls', 'for'];
      attributes.forEach(attr => {
        const refId = element.getAttribute(attr);
        if (refId && idCounts.has(refId)) {
          let record = idCounts.get(refId);
          if (record) { // Check that the record is not undefined
            record.hasRelevantAttr = true;
            record.attributes.add(attr); // Record the attribute causing the association
          }
        }
      });
    });

    // Second pass: Apply to all duplicates that are relevant
    idCounts.forEach(({ elements, hasRelevantAttr, attributes }, id) => {
      if (elements.length > 1 && hasRelevantAttr) { // Check for duplicates and relevancy
        uniqueDuplicateIDs.add(id);

        // Add class to all elements with the duplicate ID
        elements.forEach((element) => element.classList.add("duplicate-id-warning", "warning-9927845"));

        // Add the same numbered relationship to all elements with the duplicate ID
        addNumberedRelationship(elements, relationshipCounter);

        // Only the first occurrence gets the warning message
        if (elements[0]) { // Check that the first element is not undefined
          const attrs = Array.from(attributes).join(', ');
          const message = `Warning: ID "${id}" is duplicated ${elements.length} times and is associated with ${attrs}, affecting accessibility.`;
          addMessageToFollowingDiv(elements[0], "warning-message-9927845", message);
        }

        relationshipCounter++; // Increment after processing each unique duplicate ID
      }
    });
  }

  // Call the main function to find and mark duplicate IDs.
  findDuplicateIdsAndApply();
})();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerDuplicateID(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-di-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset["isMinimized"] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing duplicate IDs",
    "The purpose of this check is to scan for duplicate IDs that pair with ARIA attributes and HTML label[for]. It identifies elements with duplicate IDs, examining their references through attributes like aria-labelledby, ensuring each ID relationship is unique and correctly referenced."
  );
  innerDiv.appendChild(checkDetails);

  // // Manual notes details component
  // const checkManualDetails = createDetailsComponent(
  //   "How to manually test ( is coming! )",
  //   "This section will be populated with how to manually test"
  // );
  // innerDiv.appendChild(checkManualDetails);

  // heading for the list
  // const summaryHeadingPara = document.createElement("h2");
  // summaryHeadingPara.textContent = "Findings";
  // summaryHeadingPara.className = "list-heading-9927845";
  // innerDiv.appendChild(summaryHeadingPara);

  // // Dynamically add a message based on unique duplicate ID elements found
  // // Here's the updated part for displaying the count
  // const findingsUL = document.createElement("ul");
  // findingsUL.className = "findings-list-9927845";

  // const findingsLi = document.createElement("li");
  // // Directly use uniqueDuplicateIDs.size for the current count
  // findingsLi.textContent = uniqueDuplicateIDs.size === 0 ?
  //   "No problematic duplicate IDs identified." :
  //   `${uniqueDuplicateIDs.size} unique IDs affecting accessibility identified.`;

  // findingsUL.appendChild(findingsLi);
  // innerDiv.appendChild(findingsUL);

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
    appendLink(wcagLinks, "4.1.2 Name, Role, Value (Level A)", "WCAG");
    appendLink(ariaLinks, "aria-controls property", "ARIA");
    appendLink(ariaLinks, "aria-describedby property", "ARIA");
    appendLink(ariaLinks, "aria-labelledby property", "ARIA");
    appendLink(htmlLinks, "The for attribute", "HTML");

    // Add the action buttons
  }
  createDismissButton(innerDiv, "Duplicate IDs");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

//findDuplicateIdsAndApply();
createTopRightContainerDuplicateID();
//})();