"use strict";

function checkHGroups() {
  const hgroupElements = document.querySelectorAll("hgroup");
  const htmlHGroupMessageClass = "html-hgroup-message-58997365";
  const ariaHGroupMessageClass = "aria-hgroup-message-58997365";
  const missingHeadingClass = "missing-heading-message-58997365";

  for (const htmlGroupElement of hgroupElements) {
    // Check if HTML hgroup element has no roles
    const hasHtmlHGroup = htmlGroupElement.nodeName === "HGROUP" && !htmlGroupElement.hasAttribute("role");
    if (hasHtmlHGroup) {
      const message = "Needs manual confirmation HTML <hgroup> is not fully supported. We recommend adding an ARIA role=\"group\" and role-description=\"Heading Group\"";
      createChildMessageDiv(htmlGroupElement, htmlHGroupMessageClass, message);
      htmlGroupElement.classList.add("hgroup-58997365");
    }

    // Check if ARIA hgroup element has role=group and role=description
    const hasAriaGroupRole = htmlGroupElement.getAttribute("role") === "group";
    const hasAriaDescriptionRole = htmlGroupElement.getAttribute("aria-roledescription") != null;
    if (hasAriaGroupRole && hasAriaDescriptionRole) {
      const roleDescription = htmlGroupElement.getAttribute("aria-roledescription");
      const message = `Valid HTML <hgroup> with role=\"group\" and aria-roledescription: ${roleDescription}`;
      createChildMessageDiv(htmlGroupElement, ariaHGroupMessageClass, message);
      htmlGroupElement.classList.add("hgroup-58997365");
    }

    // Check if the hgroup contains at least one heading level element
    const headingElements = htmlGroupElement.querySelectorAll("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level='1'], [role='heading'][aria-level='2'], [role='heading'][aria-level='3'], [role='heading'][aria-level='4'], [role='heading'][aria-level='5'], [role='heading'][aria-level='6']");
    if (headingElements.length === 0) {
      const message = "Warning This <hgroup> is missing a heading element";
      createChildMessageDiv(htmlGroupElement, missingHeadingClass, message);
    }
  }
}

checkHGroups();

populateLinkObjects(); // Ensure the links are populated before use.

  function createTopRightContainerHgroup(): void {
    const containerDiv = getOrCreateContainer();

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-hg-9927845";

  containerDiv.appendChild(innerDiv);

    // Message Paragraph title - directly under the top-right-container
    const importantNotePara: HTMLParagraphElement = document.createElement("p");
    const strongImportantNote: HTMLElement = document.createElement("strong");
    strongImportantNote.textContent = "The hgroup element Summary";
    importantNotePara.className = "message-heading-9927845";
    importantNotePara.appendChild(strongImportantNote);
    innerDiv.appendChild(importantNotePara);

    // Message Paragraph - directly under title
    const messagePara = document.createElement("p");
    messagePara.textContent =
      "The purpose of this functionality is to evaluate <hgroup> elements. It advises on enhancing <hgroup> accessibility by suggesting ARIA roles and attributes that can be used to provide support and confirms correct implementations. Additionally, it identifies <hgroup> elements missing heading elements, prompting for corrective actions to improve web content structure and accessibility.";
    innerDiv.appendChild(messagePara);

    // Add the original paragraph as a heading for the list
const summaryHeadingPara = document.createElement("p");
const summaryStrong = document.createElement("strong");
summaryStrong.textContent = "Findings"; // Title for the findings section
summaryHeadingPara.className = "list-heading-9927845";
summaryHeadingPara.appendChild(summaryStrong);
innerDiv.appendChild(summaryHeadingPara); // Append the heading to the container

const hgroupElements = document.querySelectorAll("hgroup");

// Create the list for hgroup findings
const findingsUL = document.createElement("ul");
findingsUL.className = "findings-list-9927845";

// Dynamically add a message based on hgroup elements found
const findingsLi = document.createElement("li");
if (hgroupElements.length === 0) {
    findingsLi.textContent = "No hgroup elements identified.";
} else {
    findingsLi.textContent = `${hgroupElements.length} implementations of <hgroup> element identified.`;
}
findingsUL.appendChild(findingsLi); // Add the dynamic message to the list

// Append the findings list to the container
innerDiv.appendChild(findingsUL);

    // Use createReferenceContainer to generate the reference section
    const referenceContainer = createReferenceContainer();
   if (referenceContainer) {
    //console.log('Appending referenceContainer to innerDiv', referenceContainer);
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
    appendLink(htmlLinks, "4.3.7 The hgroup element", "HTML");
    appendLink(canUseLinks, "hgroup", "Support");

    // Add the action buttons
  }
createDismissButton(innerDiv);

    // Append the main container to the document's body
    document.body.appendChild(containerDiv);
  }

  createTopRightContainerHgroup();