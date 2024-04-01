"use strict";

function checkUnorderedLists(): void {
  const ulElements = document.querySelectorAll("ul");

  for (const ulElement of ulElements) {
    // Reset state for each UL element
    ulElement.classList.remove("valid-9927845", "invalid-9927845");
    // Remove previous messages
    ulElement
      .querySelectorAll(".validation-message")
      .forEach((msg) => msg.remove());

    let invalidMessages = new Set<string>();

    // Role checks for custom roles
    const customRole = ulElement.getAttribute("role");
    if (customRole && customRole !== "list") {
      invalidMessages.add(
        `Invalid: <li> is missing a parent of UL or OL. The list has a parent with a Role of '${customRole}''.`
      );
    }

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
      ulElement.classList.add("invalid-9927845");
      invalidMessages.forEach((message: string) => {
        createChildMessageDiv(ulElement, "invalid-message-9927845", message);
      });
      continue; // Move to the next ul element as this one has invalid content
    }

    // If no issues were found, mark the list as valid
    if (!ulElement.classList.contains("invalid-9927845")) {
      ulElement.classList.add("valid-9927845");
      createChildMessageDiv(
        ulElement,
        "valid-message-9927845",
        "Valid: Ordered List uses valid HTML."
      );
    }
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
      element.classList.add("warning-9927845");
      const message = `<${tagName}> has an incorrect ARIA Role ${ariaRole}.`;
      createChildMessageDiv(element, "warning-message-9927845", message);
    }
  }
}

// Run the checks
checkUnorderedLists();
checkForAriaRolesonUL();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerUnorderedList(): void {
  const containerDiv = document.createElement("div");
  containerDiv.className = "top-right-container-9927845";

  // Message Paragraph title - directly under the top-right-container
  const importantNotePara: HTMLParagraphElement = document.createElement("p");
  const strongImportantNote: HTMLElement = document.createElement("strong");
  strongImportantNote.textContent = "Feature Summary:";
  importantNotePara.className = "message-heading-9927845";
  importantNotePara.appendChild(strongImportantNote);
  containerDiv.appendChild(importantNotePara);

  // Message Paragraph - directly under title
  const messagePara = document.createElement("p");
  messagePara.textContent =
    "The purpose of this check is to ensure that ordered lists (<ul>) in HTML are used correctly and structured properly. It validates the presence and usage of appropriate child elements. If issues are found, it flags the lists as invalid and provides feedback. Valid lists are confirmed as correctly implemented.";
  containerDiv.appendChild(messagePara);

  const hgroupElements = document.querySelectorAll("ul");

  // Create the list for hgroup findings
  const findingsUL = document.createElement("ul");
  findingsUL.className = "findings-list-9927845";

  // Dynamically add a message based on hgroup elements found
  const findingsLi = document.createElement("li");
  if (hgroupElements.length === 0) {
    findingsLi.textContent = "No unordered lists identified.";
  } else {
    findingsLi.textContent = `${hgroupElements.length} unordered lists identified.`;
  }
  findingsUL.appendChild(findingsLi); // Add the dynamic message to the list

  // Append the findings list to the container
  containerDiv.appendChild(findingsUL);

  // Use createReferenceContainer to generate the reference section
  const referenceContainer = createReferenceContainer();
   if (referenceContainer) {
  containerDiv.appendChild(referenceContainer);

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
  appendLink(htmlLinks, "4.4.6 The ul element", "HTML");
  appendLink(htmlLinks, "4.4.8 The li element", "HTML");

  // Add the Dismiss Button
  }
createDismissButton(containerDiv);
  createMinMaxButton(containerDiv);

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerUnorderedList();
