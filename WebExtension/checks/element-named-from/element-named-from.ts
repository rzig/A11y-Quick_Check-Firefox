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
    "alert",
    "alertdialog",
    "application",
    "article",
    "banner",
    "blockquote",
    "button",
    "cell",
    "checkbox",
    "columnheader",
    "combobox",
    "command",
    "complementary",
    "composite",
    "contentinfo",
    "definition",
    "dialog",
    "directory",
    "document",
    "feed",
    "figure",
    "form",
    "grid",
    "gridcell",
    "group",
    "heading",
    "img",
    "input",
    "landmark",
    "link",
    "list",
    "listbox",
    "listitem",
    "log",
    "main",
    "marquee",
    "math",
    "meter",
    "menu",
    "menubar",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "navigation",
    "note",
    "option",
    "progressbar",
    "radio",
    "radiogroup",
    "range",
    "region",
    "row",
    "rowgroup",
    "rowheader",
    "scrollbar",
    "search",
    "searchbox",
    "sectionhead",
    "select",
    "separator",
    "slider",
    "spinbutton",
    "status",
    "switch",
    "tab",
    "table",
    "tablist",
    "tabpanel",
    "term",
    "textbox",
    "time",
    "timer",
    "toolbar",
    "tooltip",
    "tree",
    "treegrid",
    "treeitem",
    "window",
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

    // Process the nodes
    processNodes(nodes);
  }

  /**
   * Processes a collection of nodes to determine the accessible name.
   * Generates and attaches appropriate messages based on the computed name.
   *
   * @param {NodeListOf<Element>} nodes - Collection of DOM nodes to be processed.
   */
  function processNodes(nodes: NodeListOf<Element>) {
    for (const node of nodes) {
      // Check if the node is an HTMLElement
      if (node instanceof HTMLElement) {
        if (isElementVisible(node)) {
          let accessibleName = getAccessibleName(node);
          let message = `Element <${node.nodeName.toLowerCase()}> gets name from ${
            accessibleName.method
          }.`;
          createExtendedChildMessageDiv(
            node,
            "neutral-message-9927845",
            message
          );
        }
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

function createTopRightContainerENF() {
  // Check if the container already exists
  let containerDiv = document.querySelector('.top-right-container-9927845') as HTMLDivElement;

  // If the container doesn't exist, create it
  if (!containerDiv) {
      // Create the container div
      containerDiv = document.createElement('div');
      containerDiv.className = 'top-right-container-9927845';

      // Create the paragraph element for the important note
      const importantNotePara = document.createElement('p');
      const strongImportantNote = document.createElement('strong');
      strongImportantNote.textContent = 'Important note';
      importantNotePara.appendChild(strongImportantNote);
      importantNotePara.style.marginBottom = '0';

      // Create the paragraph element for the message
      const messagePara = document.createElement('p');
      messagePara.textContent = 'This is an experimental check that may return false positive results. Once it is fully tested this message will be removed.';

      // Append all elements to the main container
      containerDiv.appendChild(importantNotePara);
      containerDiv.appendChild(messagePara);

      // Create the reference text element
      const referenceText = document.createElement('p');
      const strongReference = document.createElement('strong');
      strongReference.textContent = 'Reference';
      referenceText.appendChild(strongReference);
      containerDiv.appendChild(referenceText);

      // Create an unordered list for the links
      const linkList = document.createElement('ul');
      linkList.className = 'reference-list-9927845'; // Add class to the ul

      // Use for ariaLinks
      if (ariaLinks['Accessible Name and Description Computation 1.2']) {
          const ariaLink = document.createElement('li');
          const inlineAnchor = document.createElement('a');
          inlineAnchor.href = ariaLinks['Accessible Name and Description Computation 1.2'];
          inlineAnchor.textContent = 'Accessible Name and Description Computation 1.2';
          ariaLink.appendChild(inlineAnchor);
          linkList.appendChild(ariaLink);
      }

      // Append the link list to the main container
      containerDiv.appendChild(linkList);

      // Call the function to create dismiss button
      createDismissButton(containerDiv);

      // Append the container div to the body
      document.body.appendChild(containerDiv);
  }
}

// Call the function to create and append the div
createTopRightContainerENF();
