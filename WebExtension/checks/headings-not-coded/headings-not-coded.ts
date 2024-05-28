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

  function isNodeInExcludedContainer(node: Node): boolean {
    let currentElement = node.parentNode as HTMLElement | null;
    while (currentElement && currentElement !== document.body) {
      const tagName = currentElement.tagName.toLowerCase();
      const role = currentElement.getAttribute("role")?.toLowerCase();
      if (tagName === 'a' || tagName === 'button' || role === 'link' || role === 'button') {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }

  let node: Node | null;
  while ((node = walk.nextNode())) {
    const parentElement = node.parentElement;
    if (!parentElement || isNodeInExcludedContainer(node)) continue;

    const nodeText = node.nodeValue ? node.nodeValue.trim() : "";
    if (!nodeText) continue;

    const style = window.getComputedStyle(parentElement);
    const fontSize = parseFloat(style.fontSize);
    const fontWeight = parseFloat(style.fontWeight);

    let ancestor: HTMLElement | null = parentElement;
    let isHeadingOrSvg = false;
    let validTextContainer = false;

    while (ancestor && ancestor !== document.body) {
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

    // First, check if the `headingWrapper-8878` class is present in the `parentElement`
if (!parentElement.classList.contains('headingWrapper-8878')) {
  if (fontSize >= 18 * fontSizeRatio && fontWeight >= 700) {
      parentElement.classList.add(missingHeadingClass);
      createChildMessageDiv(parentElement, heavyTextClass, "Needs manual confirmation: Is this a heading? If yes, it is not marked up as a heading in code. " + charCountMessage);
  } else if (fontSize >= 24 * fontSizeRatio) {
      parentElement.classList.add(missingHeadingClass);
      createChildMessageDiv(parentElement, largeTextClass, "Needs manual confirmation: Is this a heading? If yes, it is not marked up as a heading in code. " + charCountMessage);
  }
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
  if (containerDiv.dataset['isMinimised'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Identifying if headings are marked up in code",
    "The purpose of this check is to identify text that visually resembles headings but lacks the proper semantic markup. It assesses text based on font size and weight, flags potential headings for review, and encourages the use of semantic heading tags."
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
    appendLink(wcagLinks, "1.3.1 Info and Relationships (Level A)", "WCAG");
    appendLink(wcagLinks, "Headings and Labels (Level A)", "WCAG");
    appendLink(htmlLinks, "4.3.11 Headings and outlines", "HTML");

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Headings not coded");

  // Create the toggle button for messages and append it to the containerDiv
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Hide Messages";
  toggleButton.setAttribute("aria-pressed", "false");
  toggleButton.className = "toggle-button-9927845";

  toggleButton.addEventListener("click", () => {
    const messages = document.querySelectorAll(".message-66786");
    const isPressed = toggleButton.getAttribute("aria-pressed") === "true";

    messages.forEach((message) => {
      const msg = message as HTMLElement; // Cast Element to HTMLElement
      if (isPressed) {
        msg.style.display = "block";
      } else {
        msg.style.display = "none";
      }
    });

    toggleButton.setAttribute("aria-pressed", isPressed ? "false" : "true");
    toggleButton.textContent = isPressed ? "Hide Messages" : "Show Messages";
  });

  containerDiv.appendChild(toggleButton);

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerNotHeading();
