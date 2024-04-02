// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {
  "use strict";

  // Global counter for data attribute numbering
  let dataControlsAttributeCounter = 1;

  /**
   * Main function to check and process nodes with aria-controls attribute.
   * It selects nodes and processes them.
   */
  function ariaControlsCheck() {
    // Select all nodes with aria-controls
    let nodes = document.querySelectorAll("[aria-controls]:not(.top-right-container-9927845 [aria-controls], .inner-container-9927845 [aria-controls])");


    // Process the nodes
    processControlledNodes(nodes);
  }

  /**
   * Processes a collection of nodes to determine the usage of their aria-controls attribute.
   * Generates and attaches appropriate messages based on the existence of controlled elements and their roles.
   *
   * @param {NodeListOf<Element>} nodes - Collection of DOM nodes to be processed.
   */
  function processControlledNodes(nodes: NodeListOf<Element>) {
    for (const currentNode of nodes) {
      const ariaControls = currentNode.getAttribute("aria-controls");
      if (ariaControls) {
        const controlledElement = document.getElementById(ariaControls);

        // Add the neutral class and reset data attribute to the current node
        currentNode.classList.add("neutral-control-9927845");
        currentNode.setAttribute("data-namedfrom-control-9927845", "");

        let messageClassName = `neutral-control-message-9927845`;
        let message;

        if (controlledElement) {
          // Convert counter to a padded string
          let counterString = String(dataControlsAttributeCounter).padStart(
            5,
            "0"
          );

          // Add data attributes to the elements
          controlledElement.classList.add("neutral-control-9927845");
          controlledElement.setAttribute(
            "data-controlledby-9927845",
            counterString
          );

          // Update the data attribute of the current node to include this counter
          currentNode.setAttribute(
            "data-namedfrom-control-9927845",
            counterString
          );

          // Add numbered squares next to the elements
          addNumberedSquare(controlledElement, dataControlsAttributeCounter);
          addNumberedSquare(currentNode, dataControlsAttributeCounter);

          // Determine the role of the controlled element or use "generic" if no role is set
          const role = controlledElement.getAttribute("role") || "generic";
          message = `${currentNode.nodeName.toUpperCase()} controls ${controlledElement.nodeName.toUpperCase()} role ${role}.`;

          // Increment the global counter
          dataControlsAttributeCounter++;
        } else {
          message = `Needs manual confirmation aria-controls id "${ariaControls}" present, but no controlled element found!`;
        }

        createChildMessageDiv(currentNode, messageClassName, message);
      }
    }
  }

  function addNumberedSquare(element: Element, number: number) {
    // Create a div element to represent the square
    let square = document.createElement("div");
    square.textContent = number.toString();
    square.classList.add("numbered-controlled-square-9927845");

    // Insert the square after the element
    element.insertAdjacentElement("afterend", square);
  }

  // Initiate the check process
  ariaControlsCheck();
})();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerAriaControls(): void {
  const containerDiv = getOrCreateContainer();

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-ac-9927845";

  containerDiv.appendChild(innerDiv);

  // Message Paragraph title - directly under the top-right-container
  const importantNotePara: HTMLParagraphElement = document.createElement("p");
  const strongImportantNote: HTMLElement = document.createElement("strong");
  strongImportantNote.textContent = "Aria-Controls Summary";
  importantNotePara.className = "message-heading-9927845";
  importantNotePara.appendChild(strongImportantNote);
  innerDiv.appendChild(importantNotePara);

  // Message Paragraph - directly under title
  const messagePara = document.createElement("p");
  messagePara.textContent =
    "The purpose of this check is to verify the correct application of the aria-controls attribute in web elements. It ensures elements using aria-controls properly reference other elements they intend to control, enhancing accessibility and user interaction. The check identifies these elements, confirms the existence of their referenced controls, and provides feedback to highlight correct connections or flag issues where the controlled element cannot be found. ";
  innerDiv.appendChild(messagePara);

  // Use createReferenceContainer to generate the reference section
  const referenceContainer = createReferenceContainer();
  if (referenceContainer) {
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
    appendLink(ariaLinks, "aria-controls property", "ARIA");

    // Add the action buttons
  }
  createDismissButton(innerDiv);

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerAriaControls();
