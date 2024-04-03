(function () {
  "use strict";

  // Counter to uniquely identify relationships between elements with duplicate IDs and their referencing elements.
  let relationshipCounter: number = 1;

  // Adds a numbered square before each element in the provided array.
  function addNumberedRelationship(elements: Element[], number: number): void {
    elements.forEach((element) => {
      let square = document.createElement("div");
      square.textContent = number.toString();
      square.classList.add("numbered-square-9927845");
      element.parentNode?.insertBefore(square, element); // Insert the square before the element in the DOM.
    });
  }

  // Identify duplicate IDs and apply the numbered relationship and warning message.
  function findDuplicateIdsAndApply(): void {
    // Gets all elements with IDs or reference IDs use by aria attributes or labels.
    const allElements = document.querySelectorAll(
      "*[id], [aria-labelledby], [aria-describedby], [aria-controls], label[for]"
    );
    // Map to track the count, elements, and elements referencing the ID.
    const idCounts = new Map<
      string,
      { count: number; elements: Element[]; referencedBy: Set<Element> }
    >();

    // Count IDs and store elements by ID.
    allElements.forEach((element) => {
      const id = element.getAttribute("id");
      if (id) {
        let record = idCounts.get(id) ?? {
          count: 0,
          elements: [],
          referencedBy: new Set<Element>(),
        };
        record.count += 1;
        record.elements.push(element);
        idCounts.set(id, record);
      }
    });

    // Find elements referencing these IDs and add them to the map.
    allElements.forEach((element) => {
      ["aria-labelledby", "aria-describedby", "aria-controls", "for"].forEach(
        (attr) => {
          const ids = element.getAttribute(attr);
          if (ids) {
            ids.split(" ").forEach((refId) => {
              let record = idCounts.get(refId);
              if (record) {
                record.referencedBy.add(element);
              }
            });
          }
        }
      );
    });

    // Iterates over the ID map to apply relationships and warnings for duplicates.
    idCounts.forEach(({ count, elements, referencedBy }, id) => {
      if (count > 1) {
        const referencingAttributes: string[] = [];
        // Checks if the duplicate ID is referenced by any ARIA attributes or label.
        const isReferencedByAria =
          document.querySelector(
            `[aria-labelledby~="${id}"], [aria-describedby~="${id}"],[aria-controls~="${id}"], label[for="${id}"]`
          ) !== null;
        if (isReferencedByAria) {
          // Populates the referencingAttributes array based on which ARIA attributes reference the duplicate ID.
          if (document.querySelector(`[aria-labelledby~="${id}"]`) !== null)
            referencingAttributes.push("aria-labelledby");
          if (document.querySelector(`[aria-describedby~="${id}"]`) !== null)
            referencingAttributes.push("aria-describedby");
          if (document.querySelector(`[aria-controls~="${id}"]`) !== null)
            referencingAttributes.push("aria-controls");
          if (document.querySelector(`label[for="${id}"]`) !== null)
            referencingAttributes.push("label[for]");

          // Combines elements with the same ID and elements referencing them.
          const allRelatedElements = elements.concat(Array.from(referencedBy));
          // Numbered circle to visually indicate elements related to the duplicate ID issue. No idea why I called this a square!
          addNumberedRelationship(allRelatedElements, relationshipCounter);
          relationshipCounter++;

          allRelatedElements.forEach((element) => {
            element.classList.add("warning-9927845");
            const attributesList = referencingAttributes.join(", "); // Combine referencing attributes into a string.
            const message = `Warning ID "${id}" is duplicated ${count} times and is referenced by ${attributesList}.`;
            // New global styled message that gets inserted after the element in the DOM, alerting about the duplicate ID. This is so the number is closer to the elements it relates to.
            addMessageToFollowingDiv(
              element,
              "warning-message-9927845",
              message
            );
          });
        }
      }
    });
  }

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
  if (containerDiv.dataset['isMinimized'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);

  // Use createCommonDetailsContainer from common.ts to create the common details structure
  const checkDetails = createCommonDetailsContainer();
  innerDiv.appendChild(checkDetails);

  // Unique content for this instance
  const importantNotePara: HTMLParagraphElement = document.createElement("p");
  importantNotePara.className = "message-heading-9927845";
  const strongImportantNote: HTMLElement = document.createElement("strong");
  strongImportantNote.textContent = "Duplicate IDs Summary";
  importantNotePara.appendChild(strongImportantNote);
  
  // Append the unique content to the summary
  const checkSummary = checkDetails.querySelector("summary");
  if (checkSummary) {
    checkSummary.appendChild(strongImportantNote);
  }

  // Additional unique content - directly under the summary
  const messagePara = document.createElement("p");
  messagePara.textContent = "The purpose of this check is to scan for duplicate IDs with ARIA attributes and label[for] references. It identifies elements with duplicate IDs, examining their references through attributes like aria-labelledby, ensuring each ID relationship is unique and correctly referenced.";
  checkDetails.appendChild(messagePara);

  // Use createReferenceContainer to generate the reference section
  const referenceContainer = createReferenceContainer();
  if (referenceContainer) {
    innerDiv.appendChild(referenceContainer);

    // Link List
    const linkList = document.createElement("ul");
    linkList.className = "reference-list-9927845";
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

    // Add the action buttons
  }
  createDismissButton(innerDiv);

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerDuplicateID();
