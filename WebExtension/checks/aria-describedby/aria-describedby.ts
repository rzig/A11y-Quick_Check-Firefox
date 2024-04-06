// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {
  "use strict";

  // Global counter for data attribute numbering
  let dataDescAttributeCounter = 1;

  /**
   * Main function to check and process nodes with aria-describedby attribute.
   * It selects nodes and processes them.
   */
  function ariaDescribedbyCheck() {
    // Select all nodes with aria-describedby
    let nodes = document.querySelectorAll("[aria-describedby]:not(.top-right-container-9927845 [aria-describedby], .inner-container-9927845 [aria-describedby])");

    // Process the nodes
    adbprocessNodes(nodes);
  }

  /**
   * Processes a collection of nodes to determine the usage of their aria-describedby attribute.
   * Generates and attaches appropriate messages based on the computed description.
   *
   * @param {NodeListOf<Element>} nodes - Collection of DOM nodes to be processed.
   */
  function adbprocessNodes(nodes: NodeListOf<Element>) {
    for (const currentNode of nodes) {
      const ariaDescribedby = currentNode.getAttribute("aria-describedby");
      if (ariaDescribedby) {
        const describedByIds = ariaDescribedby.split(" ");
        let computedDescription = "";

        // Add the neutral class and reset data attribute to the current node
        currentNode.classList.add("neutral-9927845");
        currentNode.setAttribute("data-namedfrom-9927845", "");

        for (const id of describedByIds) {
          const describedByElement = document.getElementById(id);
          if (describedByElement) {
            // Convert counter to a padded string
            let counterString = String(dataDescAttributeCounter).padStart(
              5,
              "0"
            );

            // Add data attributes to the elements
            describedByElement.classList.add("neutral-9927845");
            describedByElement.setAttribute(
              "data-elementnamedby-9927845",
              counterString
            );

            // Update the data attribute of the current node to include this counter
            let currentNamedFrom = currentNode.getAttribute(
              "data-namedfrom-9927845"
            );
            currentNode.setAttribute(
              "data-namedfrom-9927845",
              `${currentNamedFrom} ${counterString}`
            );

            // Add numbered squares next to the elements
            addNumberedSquare(describedByElement, dataDescAttributeCounter);
            addNumberedSquare(currentNode, dataDescAttributeCounter);

            computedDescription += describedByElement.textContent + " ";

            // Increment the global counter
            dataDescAttributeCounter++;
          }
        }

        const elementType = currentNode.nodeName.toUpperCase();
        let messageClassName = `neutral-message-9927845`;
        let message: string;

        if (computedDescription) {
          computedDescription = computedDescription.trim();
          message = `The description for <${elementType}> is ${computedDescription}.`;
        } else {
          message = `No description found for <${elementType}>.`;
        }

        createChildMessageDiv(currentNode, messageClassName, message);
      }
    }
  }

  function addNumberedSquare(element: Element, number: number) {
    // Create a div element to represent the square
    let square = document.createElement("div");
    square.textContent = number.toString();
    square.classList.add("numbered-square-9927845");

    // Insert the square after the element
    element.insertAdjacentElement("afterend", square);
  }

  // Initiate the check process
  ariaDescribedbyCheck();
})();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerAriaDescribedby(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-ad-9927845";

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
  strongImportantNote.textContent = "Aria-Describedby Summary";
  importantNotePara.appendChild(strongImportantNote);
  
  // Append the unique content to the summary
  const checkSummary = checkDetails.querySelector("summary");
  if (checkSummary) {
    checkSummary.appendChild(strongImportantNote);
  }

  // Additional unique content - directly under the summary
  const messagePara = document.createElement("p");
  messagePara.textContent = "The purpose of this check is to confirm that elements using the aria-describedby attribute properly reference the IDs of elements meant to describe them. It examines each element with aria-describedby, ensuring the ID references exist and are linked to descriptive text. Generating and attaching messages to both the described elements and their descriptors, the check provides clear feedback on the connections made, highlighting effective descriptive associations or noting when descriptions are missing.";
  checkDetails.appendChild(messagePara);

  // const checkManualDetails = createManualNotesDetailsContainer();
  // innerDiv.appendChild(checkManualDetails);

  // // Manual testing summary title for details
  // const manualTestingPara: HTMLParagraphElement = document.createElement("p");
  // manualTestingPara.className = "message-heading-9927845";
  // const manualTestingParaHeadingStrong: HTMLElement = document.createElement("strong");
  // manualTestingParaHeadingStrong.textContent = "How to manually test ( is coming! )";
  // manualTestingPara.appendChild(manualTestingParaHeadingStrong);
  
  // // Append the unique content to the manual testing summary
  // const manualTestingSummary = checkManualDetails.querySelector("summary");
  // if (manualTestingSummary) {
  //   manualTestingSummary.appendChild(manualTestingParaHeadingStrong);
  // }

  // Additional unique content for manual testing
  // const manualPara = document.createElement("p");
  // manualPara.textContent = "This section will be populated with how to manually test";
  // manualPara.className = "check-paragraph-9927845";
  // checkManualDetails.appendChild(manualPara);

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
    appendLink(ariaLinks, "aria-describedby property", "ARIA");

    // Add the action buttons
  }
  createDismissButton(innerDiv, "Aria-Describedby");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerAriaDescribedby();
