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

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainer(): void {
  const containerDiv = document.createElement("div");
  containerDiv.className = "top-right-container-9927845";

  //Title - directly under the top-right-container
  const importantNotePara: HTMLParagraphElement = document.createElement("p");
  const strongImportantNote: HTMLElement = document.createElement("strong");
  strongImportantNote.textContent = "Important note:";
  importantNotePara.appendChild(strongImportantNote);
  containerDiv.appendChild(importantNotePara);

  // Message Paragraph - directly under the title
  const messagePara = document.createElement("p");
  messagePara.textContent =
    "This is an updated check that identifies the accessible (programmatic) name of elements. It is useful to identify how the element is named, especially when it has multiple naming techniques.";
  containerDiv.appendChild(messagePara);

  // Use createReferenceContainer to generate the reference section
  const referenceContainer = createReferenceContainer();
  containerDiv.appendChild(referenceContainer);

  // Link List
  const linkList = document.createElement("ul");
  linkList.className = "reference-list-9927845";
  referenceContainer.appendChild(linkList); // This is key to match your HTML structure

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
  createDismissButton(containerDiv);

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainer();
