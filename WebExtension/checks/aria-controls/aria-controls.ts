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

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-ac-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimised'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing aria-controls",
    "The purpose of this check is to verify the correct application of the aria-controls attribute in web elements. It ensures elements using aria-controls properly reference other elements they intend to control, enhancing accessibility and user interaction. The check identifies these elements, confirms the existence of their referenced controls, and provides feedback to highlight correct connections or flag issues where the controlled element cannot be found."
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
    appendLink(ariaLinks, "aria-controls property", "ARIA");

    // Add the action buttons
  }
  createDismissButton(innerDiv, "Aria-Controls");

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

createTopRightContainerAriaControls();
