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

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerAriaLabel(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-al-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimized'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing aria-label",
    "The purpose of this check is to highlight instances where aria-label is used, visibly displaying the label value that is announced to screen reader users, thus providing a visual confirmation of what screen reader users will experience. It also identifies and provides feedback on instances where aria-label is improperly applied to elements where its use is not valid and may ot behave as expected."
  );
  innerDiv.appendChild(checkDetails);

  // // Manual notes details component
  // const checkManualDetails = createDetailsComponent(
  //   "How to manually test ( is coming! )",
  //   "This section will be populated with how to manually test"
  // );
  // innerDiv.appendChild(checkManualDetails);

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
    appendLink(ariaLinks, "aria-label property", "ARIA");

    // Add the action buttons
  }
  createDismissButton(innerDiv, "ARIA-Label");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerAriaLabel();
