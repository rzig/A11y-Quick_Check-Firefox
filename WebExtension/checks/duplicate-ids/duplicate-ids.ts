(function () {
  "use strict";

  // Counter to uniquely identify relationships between elements with duplicate IDs and their referencing elements.
  let relationshipCounter: number = 1;
const uniqueDuplicateIDs = new Set();

// Adds a numbered square before each element in the provided array.
function addNumberedRelationship(elements: Element[], number: number): void {
  elements.forEach((element) => {
    let square = document.createElement("div");
    square.textContent = number.toString();
    square.classList.add("numbered-square-9927845");
    if (element.parentNode) {
      element.parentNode.insertBefore(square, element); // Ensure element's parent is not undefined
    }
  });
}

// Identify duplicate IDs and apply the numbered relationship and warning message.
function findDuplicateIdsAndApply(): void {
  const allElements = document.querySelectorAll("*[id], [aria-labelledby], [aria-describedby], [aria-controls], label[for]");
  const idCounts = new Map<string, { elements: Element[], hasAriaAttribute: boolean }>();

  // First pass: Count all IDs and check for associated aria attributes
  allElements.forEach((element: Element) => {
    const id: string | null = element.getAttribute("id");
    const hasAriaAttribute = element.hasAttribute("aria-labelledby") || element.hasAttribute("aria-describedby") || element.hasAttribute("aria-controls");
    if (id) {
      let record = idCounts.get(id) ?? { elements: [], hasAriaAttribute: false };
      record.elements.push(element);
      record.hasAriaAttribute = record.hasAriaAttribute || hasAriaAttribute;
      idCounts.set(id, record);
    }
  });

  // Second pass: Apply warnings and relationships based on the type and attributes of elements
  idCounts.forEach(({ elements, hasAriaAttribute }, id) => {
    if (elements.length > 1) {
      uniqueDuplicateIDs.add(id);
      elements.forEach((element: Element) => element.classList.add("duplicate-id-warning", "warning-9927845"));
      addNumberedRelationship(elements, relationshipCounter);

      if (elements[0]) {  // Ensure the first element is not undefined
        if (!hasAriaAttribute && elements[0] instanceof SVGElement) {
          console.log(`SVG element with duplicate ID '${id}' does not have required aria attributes.`);
        } else {
          const message = `Warning ID "${id}" is duplicated ${elements.length} times and may affect accessibility.`;
          addMessageToFollowingDiv(elements[0], "warning-message-9927845", message);
        }
      }
      relationshipCounter++;
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
  innerDiv.className = "inner-container-9927845 remove-inner-div-9927845";

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

createTopRightContainerDuplicateID();