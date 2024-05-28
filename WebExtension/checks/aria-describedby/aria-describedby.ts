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

        const elementType = currentNode.nodeName.toLowerCase();
        let messageClassName = `neutral-message-9927845`;
        let message: string;

        if (computedDescription) {
          computedDescription = computedDescription.trim();
          message = `The description for <${elementType}> is ${computedDescription}`;
        } else {
          message = `No description found for <${elementType}>`;
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
  if (containerDiv.dataset['isMinimised'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing aria-describedby",
    "The purpose of this check is to confirm that elements using the aria-describedby attribute properly reference the IDs of elements meant to describe them. It examines each element with aria-describedby, ensuring the ID references exist and are linked to descriptive text. Generating and attaching messages to both the described elements and their descriptors, the check provides clear feedback on the connections made, highlighting effective descriptive associations or noting when descriptions are missing."
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
    appendLink(ariaLinks, "aria-describedby property", "ARIA");

    // Add the action buttons
  }
  createDismissButton(innerDiv, "Aria-Describedby");

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

createTopRightContainerAriaDescribedby();
