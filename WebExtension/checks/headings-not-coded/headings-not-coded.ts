"use strict";

function checkTextNodesForHeadings(): void {
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const bodyStyle = window.getComputedStyle(document.body);
  const bodyFontSize = parseFloat(bodyStyle.fontSize);
  const defaultFontSize = 16;
  const fontSizeRatio = bodyFontSize / defaultFontSize;
  const heavyTextClass = "text-heavy-a11y-9892664";
  const largeTextClass = "text-large-a11y-9892664";
  const missingHeadingClass = "generic-9927845";

  let node: Node | null;
  while ((node = walk.nextNode())) {
    const parent = node.parentElement;

    // Continue to the next node if we don't have a parent.
    if (parent === null) {
      continue;
    }

    const nodeText = node.nodeValue ? node.nodeValue.trim() : "";
    // Commented out sections for specific character count logic
    // if (nodeText.length > 65) {
    //     continue; // Skip nodes where text exceeds 65 characters
    // }
    const charCountMessage = `Character count (including spaces) is ${nodeText.length}.`;

    const style = window.getComputedStyle(parent);
    const fontSize = parseFloat(style.fontSize);
    const fontWeight = parseFloat(style.fontWeight);

    let ancestor: HTMLElement | null = parent;
    let isHeadingOrSvg = false;
    let validTextContainer = false;

    while (ancestor) {
      if (
        ["h1", "h2", "h3", "h4", "h5", "h6", "svg"].includes(
          ancestor.tagName.toLowerCase()
        )
      ) {
        isHeadingOrSvg = true;
        break;
      }

      if (ancestor.tagName.toLowerCase() === "hgroup") {
        if (ancestor.querySelectorAll("h1, h2, h3, h4, h5, h6").length > 0) {
          isHeadingOrSvg = true;
          break;
        }
      }

      if (
        ["div", "span", "p"].includes(ancestor.tagName.toLowerCase()) &&
        !ancestor.hasAttribute("role")
      ) {
        validTextContainer = true;
        break;
      }

      ancestor = ancestor.parentElement;
    }

    // Continue to the next node if an ancestor was a heading or SVG, or if the text container is not valid.
    if (isHeadingOrSvg || !validTextContainer) {
      continue;
    }

    // Construct the final message.
    let finalMessage =
      "Needs manual confirmation: Is this a heading? If yes, it is not marked up as a heading in code. " +
      charCountMessage;

    // Apply checks and add messages for valid text containers.
    if (fontSize >= 18 * fontSizeRatio && fontWeight >= 700) {
      parent.classList.add(missingHeadingClass);
      createChildMessageDiv(parent, heavyTextClass, finalMessage);
    } else if (fontSize >= 24 * fontSizeRatio) {
      parent.classList.add(missingHeadingClass);
      createChildMessageDiv(parent, largeTextClass, finalMessage);
    }
  }
}

checkTextNodesForHeadings();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerNotHeading(): void {
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
    "The purpose of this check is to identify text that visually resembles headings but lacks the proper semantic markup. It assesses text based on font size and weight, flags potential headings for review, and encourages the use of semantic heading tags";
  containerDiv.appendChild(messagePara);

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
  appendLink(wcagLinks, "Headings and Labels (Level A)", "WCAG");
  appendLink(htmlLinks, "4.3.11 Headings and outlines", "HTML");

  // Add the Dismiss Button
  }
createDismissButton(containerDiv);
  createMinMaxButton(containerDiv);

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerNotHeading();
