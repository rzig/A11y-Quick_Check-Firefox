(() => {
  "use strict";

  // Arrays for roles
  const rolesNameFromContent: string[] = [
    "button", "cell", "checkbox", "columnheader", "gridcell", "heading", "link",
    "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row",
    "rowheader", "sectionhead", "switch", "tab", "tooltip", "treeitem",
  ];

  const rolesNameFromAuthor: string[] = [
    "alert", "alertdialog", "application", "article", "banner", "blockquote",
    "button", "cell", "checkbox", "columnheader", "combobox", "command",
    "complementary", "composite", "contentinfo", "definition", "dialog",
    "directory", "document", "feed", "figure", "form", "grid", "gridcell",
    "group", "heading", "img", "input", "landmark", "link", "list", "listbox",
    "listitem", "log", "main", "marquee", "math", "meter", "menu", "menubar",
    "menuitem", "menuitemcheckbox", "menuitemradio", "navigation", "note",
    "option", "progressbar", "radio", "radiogroup", "range", "region", "row",
    "rowgroup", "rowheader", "scrollbar", "search", "searchbox", "sectionhead",
    "select", "separator", "slider", "spinbutton", "status", "switch", "tab",
    "table", "tablist", "tabpanel", "term", "textbox", "time", "timer",
    "toolbar", "tooltip", "tree", "treegrid", "treeitem", "window",
  ];

  // Combine both arrays to create a unique set of roles
  const uniqueRoles: Set<string> = new Set([...rolesNameFromContent, ...rolesNameFromAuthor]);

  // Construct the selector string for these roles
  const roleSelectors: string = Array.from(uniqueRoles).map(role => `[role="${role}"]`).join(", ");

  // HTML equivalents for some ARIA roles
  const htmlEquivalents: string[] = [
    "button", "input[type='button']", "a[href]", "textarea", "select", "details", "summary"
  ];

  // Combine role selectors and HTML equivalents
  const combinedSelector: string = `${roleSelectors}, ${htmlEquivalents.join(", ")}`;

  function accessibleNameCheck(): void {
    // Select nodes based on roles and HTML equivalents
    const nodes: NodeListOf<HTMLElement> = document.querySelectorAll(combinedSelector);
    processNodes(nodes);
  }

  function processNodes(nodes: NodeListOf<HTMLElement>): void {
    nodes.forEach((node: HTMLElement) => {
      if (isElementVisible(node)) {
        const { name, method } = getAccessibleName(node);
        if (name !== "" && method !== "none") {
          const message: string = `Element <${node.tagName.toLowerCase()}> gets name '${name}' from ${method}.`;
          createExtendedChildMessageDiv(node, "neutral-message-9927845", message);
        }
      }
    });
  }

  function isElementVisible(el: HTMLElement): boolean {
    const style: CSSStyleDeclaration = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden" && parseFloat(style.opacity) > 0;
  }

  function getAccessibleName(node: Element): { name: string; method: string } {
    // Check if the element itself is hidden from the accessibility tree
    if (node.getAttribute("aria-hidden") === "true") {
      // The element is hidden from the accessibility tree, return early without a name
      return { name: "", method: "none" };
    }
  
    // Set of tags for which name from contents is allowed
    const nameFromContentsTags = new Set(['button', 'a', 'link']);
  
    // Check for children and if the element itself should provide name from contents
    if (nameFromContentsTags.has(node.tagName.toLowerCase()) || node.hasChildNodes()) {
      const childNodes = Array.from(node.childNodes);
      let nameFromContents = childNodes.map((child) => {
        if (child.nodeType === Node.TEXT_NODE && child.textContent && child.textContent.trim().length > 0) {
          return child.textContent.trim(); // Text directly inside the active element
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const childElement = child as Element;
          // SVG can contain accessible names
          if (childElement.tagName.toLowerCase() === 'svg') {
            return childElement.getAttribute('aria-label')?.trim() ||
                    childElement.querySelector('title')?.textContent?.trim() || '';
          }
          // For active elements, their children can contribute text content
          if (nameFromContentsTags.has(node.tagName.toLowerCase())) {
            return childElement.textContent?.trim() || '';
          }
        }
        return ''; // For nodes that do not contribute to the name
      }).filter(name => name.length > 0).join(' ');
  
      if (nameFromContents.length > 0) {
        return { name: nameFromContents, method: "Contents" };
      }
    }
  
    // Check for aria-labelledby
    let labelledby = node.getAttribute("aria-labelledby");
    if (labelledby) {
      let names = labelledby.split(" ")
                             .map(id => document.getElementById(id)?.textContent?.trim() ?? "")
                             .filter(text => text.length > 0)
                             .join(" ");
      if (names.length > 0) {
        return { name: names, method: "aria-labelledby" };
      }
    }
  
    // Check for aria-label
    let label = node.getAttribute("aria-label");
    if (label) {
      return { name: label.trim(), method: "aria-label" };
    }
  
    // Check for labels associated via 'for' attribute
    if (node.id) {
      let labelFor = document.querySelector(`label[for="${node.id}"]`);
      if (labelFor && labelFor.textContent) {
        return { name: labelFor.textContent.trim(), method: "labelled by" };
      }
    }
  
    // Check for title attribute
    let title = node.getAttribute("title");
    if (title) {
      return { name: title.trim(), method: "Title" };
    }
  
    // If none of the conditions are met
    return { name: "", method: "none" }; // Default return when no accessible name is found
  }

  function createExtendedChildMessageDiv(node: HTMLElement, className: string, message: string): void {
    const messageDiv: HTMLElement = document.createElement("div");
    messageDiv.className = className;
    messageDiv.textContent = message;
    node.insertAdjacentElement("afterend", messageDiv);
  }

  accessibleNameCheck();
})();

function createTopLeftContainer() {
  // Create the container div
  const containerDiv = document.createElement('div');
  containerDiv.className = 'top-left-container';

  // Create the paragraph element for the message
  const messagePara = document.createElement('p');
  messagePara.textContent = 'This is an experimental check that may return false positive results. Once it is fully tested this message will be removed. The naming uses the ARIA 1.2 Name and Description calculation.';
  
  // Create the dismiss button
  const dismissButton = document.createElement('button');
  dismissButton.className = 'dismiss-button';
  dismissButton.textContent = 'Dismiss';
  
  // Append the message and button to the container
  containerDiv.appendChild(messagePara);
  containerDiv.appendChild(dismissButton);

  // Append the container div to the body
  document.body.appendChild(containerDiv);

  // Add event listener to the dismiss button
  dismissButton.addEventListener('click', () => {
      containerDiv.remove();
  });
}

// Call the function to create and append the div
createTopLeftContainer();