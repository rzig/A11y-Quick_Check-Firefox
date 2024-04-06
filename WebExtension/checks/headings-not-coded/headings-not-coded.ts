"use strict";

declare function createChildMessageDiv(parent: HTMLElement, className: string, message: string): void;

function checkTextNodesForHeadings(): void {
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const bodyStyle = window.getComputedStyle(document.body);
  const bodyFontSize = parseFloat(bodyStyle.fontSize);
  const defaultFontSize = 16;
  const fontSizeRatio = bodyFontSize / defaultFontSize;
  const heavyTextClass = "text-heavy-a11y-9892664";
  const largeTextClass = "text-large-a11y-9892664";
  const missingHeadingClass = "generic-9927845";

  function isNodeInExcludedContainer(node: Node): boolean {
    let parentElement: HTMLElement | null = node.parentElement;
    while (parentElement !== null) {
      const tagName = parentElement.tagName.toLowerCase();
      const role = parentElement.getAttribute("role")?.toLowerCase();
      if (tagName === 'a' || tagName === 'button' || role === 'link' || role === 'button') {
        return true;
      }
      parentElement = parentElement.parentElement;
    }
    return false;
  }

  let node: Node | null;
  while ((node = walk.nextNode())) {
    const parentElement = node.parentElement;
    if (parentElement === null) continue;

    if (isNodeInExcludedContainer(node)) {
      continue;
    }

    const nodeText = node.nodeValue ? node.nodeValue.trim() : "";
    if (nodeText === "") continue;
    const style = window.getComputedStyle(parentElement);
    const fontSize = parseFloat(style.fontSize);
    const fontWeight = parseFloat(style.fontWeight);

    let ancestor: HTMLElement | null = parentElement;
    let isHeadingOrSvg = false;
    let validTextContainer = false;

    while (ancestor !== null) {
      const tagName = ancestor.tagName.toLowerCase();
      if (["h1", "h2", "h3", "h4", "h5", "h6", "svg"].includes(tagName)) {
        isHeadingOrSvg = true;
        break;
      }
      if (["div", "span", "p"].includes(tagName) && !ancestor.hasAttribute("role")) {
        validTextContainer = true;
        break;
      }
      ancestor = ancestor.parentElement;
    }

    if (isHeadingOrSvg || !validTextContainer) continue;

    const charCountMessage = `Character count (including spaces) is ${nodeText.length}.`;
    let finalMessage = "Needs manual confirmation: Is this a heading? If yes, it is not marked up as a heading in code. " + charCountMessage;

    if (fontSize >= 18 * fontSizeRatio && fontWeight >= 700) {
      parentElement.classList.add(missingHeadingClass);
      createChildMessageDiv(parentElement, heavyTextClass, finalMessage);
    } else if (fontSize >= 24 * fontSizeRatio) {
      parentElement.classList.add(missingHeadingClass);
      createChildMessageDiv(parentElement, largeTextClass, finalMessage);
    }
  }
}

checkTextNodesForHeadings();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerNotHeading(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-hnc-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimized'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  // Use createCommonDetailsContainer from common.ts to create the common details structure
  const checkDetails = createCommonDetailsContainer();
  innerDiv.appendChild(checkDetails);

  // Unique content for this instance
  const importantNotePara: HTMLParagraphElement = document.createElement("p");
  importantNotePara.className = "message-heading-9927845";
  const strongImportantNote: HTMLElement = document.createElement("strong");
  strongImportantNote.textContent = "Headings (not marked up) Summary";
  importantNotePara.appendChild(strongImportantNote);
  
  // Append the unique content to the summary
  const checkSummary = checkDetails.querySelector("summary");
  if (checkSummary) {
    checkSummary.appendChild(strongImportantNote);
  }

  // Additional unique content - directly under the summary
  const messagePara = document.createElement("p");
  messagePara.textContent = "The purpose of this check is to identify text that visually resembles headings but lacks the proper semantic markup. It assesses text based on font size and weight, flags potential headings for review, and encourages the use of semantic heading tags.";
  checkDetails.appendChild(messagePara);

  const checkManualDetails = createManualNotesDetailsContainer();
  innerDiv.appendChild(checkManualDetails);

  // Manual testing summary title for details
  const manualTestingPara: HTMLParagraphElement = document.createElement("p");
  manualTestingPara.className = "message-heading-9927845";
  const manualTestingParaHeadingStrong: HTMLElement = document.createElement("strong");
  manualTestingParaHeadingStrong.textContent = "How to manually test ( is coming! )";
  manualTestingPara.appendChild(manualTestingParaHeadingStrong);
  
  // Append the unique content to the manual testing summary
  const manualTestingSummary = checkManualDetails.querySelector("summary");
  if (manualTestingSummary) {
    manualTestingSummary.appendChild(manualTestingParaHeadingStrong);
  }

  // Additional unique content for manual testing
  const manualPara = document.createElement("p");
  manualPara.textContent = "This section will be populated with how to manually test";
  manualPara.className = "check-paragraph-9927845";
  checkManualDetails.appendChild(manualPara);


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
    appendLink(wcagLinks, "Headings and Labels (Level A)", "WCAG");
    appendLink(htmlLinks, "4.3.11 Headings and outlines", "HTML");

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Headings not coded");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerNotHeading();
