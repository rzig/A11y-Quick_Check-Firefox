"use strict";

function ariaNameProhibited() {
  let nodes = document.querySelectorAll(
    "div:not([role])[aria-label], " +
      "div:not([role])[aria-labelledby], " +
      "span:not([role])[aria-labelledby], " +
      "span:not([role])[aria-label], " +
      '[role="caption"][aria-labelledby], ' +
      '[role="code"][aria-labelledby], ' +
      '[role="deletion"][aria-labelledby], ' +
      '[role="emphasis"][aria-labelledby], ' +
      '[role="generic"][aria-labelledby], ' +
      '[role="insertion"][aria-labelledby], ' +
      '[role="paragraph"][aria-labelledby], ' +
      '[role="presentation"][aria-labelledby], ' +
      '[role="strong"][aria-labelledby], ' +
      '[role="subscript"][aria-labelledby], ' +
      '[role="superscript"][aria-labelledby], ' +
      '[role="caption"][aria-label], ' +
      '[role="code"][aria-label], ' +
      '[role="deletion"][aria-label], ' +
      '[role="emphasis"][aria-label], ' +
      '[role="generic"][aria-label], ' +
      '[role="insertion"][aria-label], ' +
      '[role="paragraph"][aria-label], ' +
      '[role="presentation"][aria-label], ' +
      '[role="none"][aria-label], ' +
      '[role="strong"][aria-label], ' +
      '[role="subscript"][aria-label], ' +
      '[role="superscript"][aria-label]'
  ) as NodeListOf<HTMLElement>;

  for (const currentNode of nodes) {
    currentNode.setAttribute("data-name-prohibited-aria", "role");
  }
}

function ariaNamePermitted() {
  let nodes = document.querySelectorAll(
    "div[aria-label]:not([role]), " +
      "span[aria-label]:not([role]), " +
      'div[role="region"][aria-label], ' +
      '[role="generic"][aria-label], ' +
      '[role="caption"][aria-label], ' +
      "caption[aria-label], " +
      '[role="deletion"][aria-label], ' +
      "del[aria-label], " +
      '[role="emphasis"][aria-label], ' +
      "em[aria-label], " +
      '[role="insertion"][aria-label], ' +
      "ins[aria-label], " +
      '[role="paragraph"][aria-label], ' +
      "p[aria-label], " +
      '[role="presentation"][aria-label], ' +
      '[role="none"][aria-label], ' +
      '[role="strong"][aria-label], ' +
      "strong[aria-label], " +
      '[role="subscript"][aria-label], ' +
      "sub[aria-label], " +
      '[role="superscript"][aria-label], ' +
      "sup[aria-label], " +
      '[role="table"][aria-label], ' +
      "sub[aria-label]"
  ) as NodeListOf<HTMLElement>;

  for (const currentNode of nodes) {
    currentNode.setAttribute("data-name-permitted-aria", "role");
  }
}

ariaNameProhibited();
ariaNamePermitted();

populateLinkObjects(); // Ensure the links are populated before use.

  function createTopRightContainerAriaLabel(): void {
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
      "The purpose of this check is to highlight instances where aria-label is used, visibly displaying the label value that would be announced to screen reader users, thus providing a visual confirmation of what screen reader users will experience. It also identifies and provides feedback on instances where aria-label is improperly applied to elements where its use is not valid and may ot behave as expected.";
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
    appendLink(ariaLinks, "aria-label property", "ARIA");

    // Add the action buttons
  }
createDismissButton(containerDiv);

    // Append the main container to the document's body
    document.body.appendChild(containerDiv);
  }

  createTopRightContainerAriaLabel();