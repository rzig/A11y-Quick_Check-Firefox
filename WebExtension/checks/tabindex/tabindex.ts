// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {
  "use strict";

  // Define roles that can have names from their content
  const rolesNameFromContentTab: Set<string> = new Set([
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
  ]);

  const inherentRoles = {
    a: "generic",
    href: "link", // Maps HTML elements to their inherent ARIA roles
  };

  // Function to check if the element is visible
  function isElementVisible(el: HTMLElement): boolean {
    const style: CSSStyleDeclaration = window.getComputedStyle(el);
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      parseFloat(style.opacity) > 0
    );
  }

  // Function to get the accessible name
  function getAccessibleNameTab(node: Element): {
    name: string;
    method: string;
  } {
    if (
      node.getAttribute("aria-hidden") === "true" ||
      !isElementVisible(node as HTMLElement)
    ) {
      return { name: "", method: "none" };
    }

    const ariaLabel = node.getAttribute("aria-label") || "";
    if (ariaLabel) {
      return { name: ariaLabel.trim(), method: "aria-label" };
    }

    const ariaLabelledby = node.getAttribute("aria-labelledby") || "";
    if (ariaLabelledby) {
      const referencedElements = ariaLabelledby
        .split(" ")
        .map((id) => document.getElementById(id)?.textContent || "")
        .filter((text) => text)
        .join(" ");
      if (referencedElements) {
        return { name: referencedElements, method: "aria-labelledby" };
      }
    }

    const labelElement = node.id
      ? document.querySelector(`label[for="${node.id}"]`)
      : null;
    if (labelElement && labelElement.textContent) {
      return { name: labelElement.textContent.trim(), method: "label" };
    }

    if (node.tagName.toLowerCase() === "a" && node.hasAttribute("href")) {
      const textContent = node.textContent?.trim() || "";
      if (textContent) {
        // If the <a> element has text content, use it as the accessible name
        return { name: textContent, method: "text content" };
      }
    }

    // Updated section to handle all input types
    if (node.tagName.toLowerCase() === "input") {
      const inputElement = node as HTMLInputElement;
      const inputType = inputElement.type.toLowerCase();
      let inputValue = inputElement.value.trim();

      switch (inputType) {
        case "submit":
        case "button":
        case "reset":
        case "text":
        case "email":
        case "password":
        case "search":
        case "tel":
        case "url":
          if (inputValue) {
            return { name: inputValue, method: "value attribute" };
          }
          break;
        case "checkbox":
        case "radio":
          if (inputElement.checked) {
            return { name: inputValue || "checked", method: "checked status" };
          }
          break;
        case "file":
          if (inputElement.files && inputElement.files.length > 0) {
            return {
              name: Array.from(inputElement.files)
                .map((file) => file.name)
                .join(", "),
              method: "file list",
            };
          }
          break;
        default:
          if (inputValue) {
            return { name: inputValue, method: "default method" };
          }
      }
    }

    // Special handling for img elements with a role attribute
    if (node.tagName.toLowerCase() === "img" && node.hasAttribute("role")) {
      const imgAltText = node.getAttribute("alt") || "";
      if (imgAltText) {
        return { name: imgAltText.trim(), method: "alt attribute" };
      }
    }

    // Text content for certain roles or default text content
    const textContent = node.textContent?.trim() || "";
    if (
      textContent &&
      (rolesNameFromContentTab.has(node.tagName.toLowerCase()) ||
        rolesNameFromContentTab.has(
          (node.getAttribute("role") || "").toLowerCase()
        ))
    ) {
      return { name: textContent, method: "text content" };
    }

    return { name: "", method: "none" }; // Default case if no name could be determined
  }

  // Main function to check tabindex and update messages for all elements
  document.querySelectorAll("[tabindex]").forEach((element) => {
    const tabIndexValue = parseInt(element.getAttribute("tabindex") || "0", 10);

    if (tabIndexValue >= 0 && isElementVisible(element as HTMLElement)) {
      let roleName = "";
      const tagName = element.tagName.toLowerCase();

      // Role determination logic considering the updated requirements
      if (tagName === "input") {
        const inputElement = element as HTMLInputElement;
        const typeAttribute = inputElement.type.toLowerCase();
        if (!element.getAttribute("role")) {
          if (
            [
              "text",
              "email",
              "password",
              "search",
              "tel",
              "url",
              "number",
            ].includes(typeAttribute)
          ) {
            roleName = "textbox";
          } else if (typeAttribute === "submit" || typeAttribute === "button") {
            // Include "button" input type as well
            roleName = "button"; // Correct roles for 'submit' and 'button' input types
          } else {
            roleName = "no role"; // Default if no specific role is applicable
          }
        } else {
          roleName = element.getAttribute("role") || "no role"; // Use explicit role if it exists
        }
      } else if (tagName === "a") {
        // Adjusting role assignment for <a> elements based on the presence of href
        roleName = element.hasAttribute("href") ? "link" : "generic"; // Assign "link" role if <a> has href, otherwise "generic"
      } else {
        roleName = rolesNameFromContentTab.has(tagName)
          ? tagName
          : element.getAttribute("role") || "no role";
      }

      const { name, method } = getAccessibleNameTab(element);
      let messageText = "";
      let messageClass = "";
      let extraClasses: string[] = [];

      if (roleName === "no role") {
        roleName = "without a valid role";
      }

      // Constructing message based on tabIndexValue, roleName, and name
      if (tabIndexValue === 0) {
        if (name) {
          messageText = `Valid: tabindex ${tabIndexValue} used on element ${tagName} with role '${roleName}' and accessible name '${name}' from ${method}.`;
          messageClass = "valid-9927845";
          extraClasses = ["valid-message-9927845"];
        } else {
          messageText = `Warning: tabindex ${tabIndexValue} used on element ${tagName} with role '${roleName}' and without a valid name.`;
          messageClass = "warning-9927845";
          extraClasses = ["warning-message-9927845"];
        }
      } else if (tabIndexValue > 0) {
        messageText = `Warning: tabindex ${tabIndexValue} used on element ${tagName}. Using tabindex greater than 0 can cause critical accessibility issues.`;
        messageClass = "warning-9927845";
        extraClasses = ["warning-message-9927845"];
      }

      // Append message and class to the element
      addMessageToPrecedingDiv(
        element as HTMLElement,
        messageClass,
        messageText,
        extraClasses
      );
      element.classList.add("tabindex-0-detected-9927845");
    }
  });

  populateLinkObjects(); // Ensure the links are populated before use.

  function createTopRightContainer(): void {
    const containerDiv = document.createElement("div");
    containerDiv.className = "top-right-container-9927845";

    // Message Paragraph title - directly under the top-right-container
    const importantNotePara: HTMLParagraphElement = document.createElement("p");
    const strongImportantNote: HTMLElement = document.createElement("strong");
    strongImportantNote.textContent = "Feature Summary:";
    importantNotePara.className = "message-heading-9927845";
    importantNotePara.appendChild(strongImportantNote);
    containerDiv.appendChild(importantNotePara);

    // Message Paragraph - directly under title
    const messagePara = document.createElement("p");
    messagePara.textContent =
      "This is a new check to identify tabindex 0 and greater.";
    containerDiv.appendChild(messagePara);

    // Use createReferenceContainer to generate the reference section
    const referenceContainer = createReferenceContainer();
    containerDiv.appendChild(referenceContainer);

    // Link List
    const linkList = document.createElement("ul");
    linkList.className = "reference-list-9927845";
    referenceContainer.appendChild(linkList); // This is key to match your HTML structure

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
    appendLink(wcagLinks, "1.3.1 Info and Relationships", "WCAG");
    appendLink(wcagLinks, "4.1.2 Name, Role, Value", "WCAG");
    appendLink(htmlLinks, "6.6.3 The tabindex attribute", "HTML");

    // Add the Dismiss Button
    createDismissButton(containerDiv);

    // Append the main container to the document's body
    document.body.appendChild(containerDiv);
  }

  createTopRightContainer();
})();
