(function () {
  "use strict";

  // Arrays for roles
  const rolesNameFromContent = [
    "button",
    "cell",
    "checkbox",
    "columnheader",
    "gridcell",
    "heading",
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "row",
    "rowheader",
    "sectionhead",
    "switch",
    "tab",
    "tooltip",
    "treeitem",
  ];
  const rolesNameFromAuthor = [
    "alertdialog",
    "application",
    "button",
    "checkbox",
    "columnheader",
    "combobox",
    "contentinfo",
    "dialog",
    "grid",
    "heading",
    "img",
    "link",
    "listbox",
    "marquee",
    "meter",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "progressbar",
    "radio",
    "radiogroup",
    "region",
    "rowheader",
    "searchbox",
    "slider",
    "spinbutton",
    "switch",
    "table",
    "tabpanel",
    "textbox",
    "tooltip",
    "tree",
    "treegrid",
    "treeitem",
  ];

  // Combine both arrays and create a unique set of roles
  const uniqueRoles = Array.from(
    new Set([...rolesNameFromContent, ...rolesNameFromAuthor])
  );

  // Construct the selector string for these roles
  const roleSelectors = uniqueRoles
    .map((role) => `[role="${role}"]`)
    .join(", ");

  // HTML equivalents for some ARIA roles
  const htmlEquivalents = [
    "button",
    "input",
    "a[href]",
    "textarea",
    "select",
    "details",
    "summary",
  ];

  // Combine role selectors and HTML equivalents
  const combinedSelector = roleSelectors + ", " + htmlEquivalents.join(", ");

  function accessibleNameCheck() {
    // Select nodes based on roles and HTML equivalents
    let nodes = document.querySelectorAll(combinedSelector);
  
    // Filter out nodes within the excluded containers
    let filteredNodes = Array.from(nodes).filter(node => {
      let parent = node.parentElement;
      while (parent) {
        if (parent.classList.contains('top-right-container-9927845') ||
            parent.classList.contains('inner-container-9927845')) {
          return false; // Exclude this node from further processing
        }
        parent = parent.parentElement; // Move up the DOM tree
      }
      return true; // Include this node for processing
    });
  
    // Process the filtered nodes
    processNodes(filteredNodes);
  }

  /**
   * Processes a collection of nodes to determine the accessible name.
   * Generates and attaches appropriate messages based on the computed name.
   *
   * @param {NodeListOf<Element>} nodes - Collection of DOM nodes to be processed.
   */

  function processNodes(nodes: Element[]) {
    for (const node of nodes) {
      if (node instanceof HTMLElement && isElementVisible(node)) {
        let role = node.getAttribute('role'); // Check for a role attribute
        let accessibleNameData = getAccessibleName(node);
        // Update message to include accessibleName directly and use accessibleNameData.name to show the name
        let message = `Element <${node.nodeName.toLowerCase()}>${role ? ` with Role ${role}` : ''} gets name '${accessibleNameData.name}' from ${accessibleNameData.method}.`;
        createExtendedChildMessageDiv(node, "neutral-message-9927845", message);
      }
    }
  }

  /**
   * Checks if an element is visible.
   *
   * @param {Element} el - The DOM element to check.
   * @returns {boolean} True if the element is visible, false otherwise.
   */
  function isElementVisible(el: HTMLElement): boolean {
    const style = window.getComputedStyle(el);
    return (
      !(el.offsetWidth === 0 && el.offsetHeight === 0) &&
      style.visibility !== "hidden" &&
      style.display !== "none" &&
      style.opacity !== "0"
    );
  }

  /**
   * Function to calculate the accessible name of a node.
   *
   * @param {Element} node - DOM node to calculate the name for.
   * @returns {object} Object containing the accessible name and the technique used.
   */
  function getAccessibleName(node: Element): { name: string; method: string } {
    // Check for aria-labelledby first
    let labelledby = node.getAttribute("aria-labelledby");
    if (labelledby) {
      let names = labelledby
        .split(" ")
        .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
        .filter((text) => text.length > 0)
        .join(" ");
      if (names.length > 0) {
        return { name: names, method: "aria-labelledby" };
      }
    }

    // Check for aria-label next
    let label = node.getAttribute("aria-label");
    if (label) {
      return { name: label, method: "aria-label" };
    }

    // Check for associated label via 'for' attribute
    // This step is new and checks if a label element is associated with the input
    if (node.id) {
      let labelFor = document.querySelector(`label[for="${node.id}"]`);
      if (labelFor && labelFor.textContent) {
        return {
          name: labelFor.textContent.trim(),
          method: "Contents (label for)",
        };
      }
    }

    // Then, check for text content or alt text of child img elements
    let textContent = node.textContent?.trim();
    let imgAltText = node.querySelector("img")?.getAttribute("alt")?.trim();
    if (textContent && textContent.length > 0) {
      return { name: textContent, method: "Contents" };
    } else if (imgAltText && imgAltText.length > 0) {
      return { name: imgAltText, method: "Contents" };
    }

    // Check for title attribute
    let title = node.getAttribute("title");
    if (title) {
      return { name: title, method: "Title" };
    }

    // Check for placeholder attribute
    let placeholder = node.getAttribute("placeholder");
    if (placeholder) {
      return { name: placeholder, method: "Placeholder" };
    }

    // Default case if no accessible name found
    return { name: "No accessible name", method: "none" };
  }

  function createExtendedChildMessageDiv(
    node: Element,
    className: string,
    message: string
  ) {
    let messageDiv = document.createElement("div");
    messageDiv.textContent = message;

    // Get role of the element
    const role = node.getAttribute("role") || node.nodeName.toLowerCase();

    // Assign class based on the role
    if (rolesNameFromContent.includes(role)) {
      messageDiv.classList.add(className, "from-content-class-9927845");
    } else if (rolesNameFromAuthor.includes(role)) {
      messageDiv.classList.add(className, "from-author-class-9927845");
    } else {
      messageDiv.classList.add(className);
    }

    node.insertAdjacentElement("afterend", messageDiv);
  }

  // Initiate the check process
  accessibleNameCheck();
})();

populateLinkObjects(); // Ensure the links are populated before use.

function createAccNameTopRightContainer(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-dnf-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimised'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing Accessible Name and Description",
    "The purpose of this check is to identify the accessible (programmatic) name of elements. It is useful to identify how the element is named, especially when it has multiple naming techniques. Displays the name from aria-labelledby, aria-label, or the description from aria-describedby."
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

    // Append specified links function
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

    // Specifying and appending links
    appendLink(
      ariaLinks,
      "Accessible Name and Description Computation 1.2",
      "ARIA"
    );

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Accessible Name Calc");

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

createAccNameTopRightContainer();
