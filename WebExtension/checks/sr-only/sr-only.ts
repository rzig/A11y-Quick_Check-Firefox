"use strict";

function checkScreenReaderText() {
  const allElements = document.querySelectorAll("body *");
  const srOnlyMessageClass = "warning-message-9927845";

  for (const element of allElements) {
    // Check if the element's text content is not null and not empty or whitespace
    if (element.textContent && element.textContent.trim() !== "") {
      const style = window.getComputedStyle(element);
      if ((style.position === 'absolute' && style.clip !== 'auto') ||
          (style.width === '1px' && style.height === '1px')) {

        const message = `Warning Possible Screen Reader Only Text Detected: ${element.textContent}`;
        createChildMessageDiv(element, srOnlyMessageClass, message);
        element.classList.add("warning-9927845");
      }
    }
  }
}

checkScreenReaderText();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerSrOnly(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-sro-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimised'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing Off Screen Content",
    "The purpose of this check is to identify potential instances where text is rendered invisible to sighted users but remains accessible to assistive technology, such as screen readers. The check identifies CSS techniques commonly used in generating screen reader only content, such as applying clip, setting position: absolute, and specifying dimensions of height: 1px and width: 1px."
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

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Offscreen Content");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerSrOnly();