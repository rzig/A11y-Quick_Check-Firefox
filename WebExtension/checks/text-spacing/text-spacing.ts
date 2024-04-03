"use strict";

function addTextSpacing() {
  // Get all elements with text content
  const targets = document.querySelectorAll("*:not(script):not(style):not(head):not(title):not(meta):not(link):not(br):not(hr):not(img):not(input):not(textarea)")

  // Loop through all text elements
  for (const element of targets) {
    // Add a data-attribute to the element
    element.setAttribute("data-textspacing-7783664", "");
  }
}
addTextSpacing();

// populateLinkObjects(); // Ensure the links are populated before use.

// function createTopRightContainerTextSpacing(): void {
//   const containerDiv = getOrCreateContainer();

//   const innerDiv = document.createElement("div");
//   innerDiv.className = "inner-container-9927845 remove-inner-tspacing-9927845";

//   containerDiv.appendChild(innerDiv);

//   // Use createCommonDetailsContainer from common.ts to create the common details structure
//   const checkDetails = createCommonDetailsContainer();
//   innerDiv.appendChild(checkDetails);

//   // Unique content for this instance
//   const importantNotePara: HTMLParagraphElement = document.createElement("p");
//   importantNotePara.className = "message-heading-9927845";
//   const strongImportantNote: HTMLElement = document.createElement("strong");
//   strongImportantNote.textContent = "Text Spacing Summary";
//   importantNotePara.appendChild(strongImportantNote);
  
//   // Append the unique content to the summary
//   const checkSummary = checkDetails.querySelector("summary");
//   if (checkSummary) {
//     checkSummary.appendChild(strongImportantNote);
//   }

//   // Additional unique content - directly under the summary
//   const messagePara = document.createElement("p");
//   messagePara.textContent = "The purpose of this check is to apply the minimum text spacing required (Line height to at least 1.5 times the font size; Spacing following paragraphs to at least 2 times the font size; Letter spacing to at least 0.12 times the font size; Word spacing to at least 0.16 times the font size) to test WCAG 1.4.12 Text Spacing (Level AA).";
//   checkDetails.appendChild(messagePara);

//   const hgroupElements = document.querySelectorAll("ul");

//   // Use createReferenceContainer to generate the reference section
//   const referenceContainer = createReferenceContainer();
//   if (referenceContainer) {
//     innerDiv.appendChild(referenceContainer);

//     // Link List
//     const linkList = document.createElement("ul");
//     linkList.className = "reference-list-9927845";
//     referenceContainer.appendChild(linkList);

//     // Specified links function
//     function appendLink(
//       links: Record<string, string>,
//       key: string,
//       category: string
//     ): void {
//       const href = links[key];
//       if (href) {
//         const listItem = document.createElement("li");
//         const anchor = document.createElement("a");
//         anchor.href = href;
//         anchor.textContent = `${category} - ${key}`;
//         listItem.appendChild(anchor);
//         linkList.appendChild(listItem);
//       }
//     }

//     // Append specific links
//     appendLink(wcagLinks, "1.4.12 Text Spacing (Level AA)", "WCAG");

//     // Add the Dismiss Button
//   }
//   createDismissButton(innerDiv);

//   // Append the main container to the document's body
//   document.body.appendChild(containerDiv);
// }

// createTopRightContainerTextSpacing();
