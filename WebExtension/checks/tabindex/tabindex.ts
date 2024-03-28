"use strict";

// Define roles that can have names from their content
const rolesNameFromContent: Set<string> = new Set([
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
    href: "link" // Maps HTML elements to their inherent ARIA roles
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
  function getAccessibleNameTab(node: Element): { name: string; method: string } {
      if (node.getAttribute("aria-hidden") === "true" || !isElementVisible(node as HTMLElement)) {
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
              .map(id => document.getElementById(id)?.textContent || "")
              .filter(text => text)
              .join(" ");
          if (referencedElements) {
              return { name: referencedElements, method: "aria-labelledby" };
          }
      }
  
      const labelElement = node.id ? document.querySelector(`label[for="${node.id}"]`) : null;
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
                      return { name: Array.from(inputElement.files).map(file => file.name).join(", "), method: "file list" };
                  }
                  break;
              default:
                  if (inputValue) {
                      return { name: inputValue, method: "default method" };
                  }
          }
      }
  
      // Special handling for img elements with a role attribute
      if (node.tagName.toLowerCase() === "img" && node.hasAttribute('role')) {
          const imgAltText = node.getAttribute("alt") || "";
          if (imgAltText) {
              return { name: imgAltText.trim(), method: "alt attribute" };
          }
      }
  
      // Text content for certain roles or default text content
      const textContent = node.textContent?.trim() || "";
      if (textContent && (rolesNameFromContent.has(node.tagName.toLowerCase()) || rolesNameFromContent.has((node.getAttribute('role') || "").toLowerCase()))) {
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
                if (["text", "email", "password", "search", "tel", "url", "number"].includes(typeAttribute)) {
                    roleName = "textbox";
                } else if (typeAttribute === "submit" || typeAttribute === "button") { // Include "button" input type as well
                    roleName = "button";  // Correct roles for 'submit' and 'button' input types
                } else {
                    roleName = "no role"; // Default if no specific role is applicable
                }
            } else {
                roleName = element.getAttribute("role") || "no role";  // Use explicit role if it exists
            }
        } else if (tagName === "a") {
            // Adjusting role assignment for <a> elements based on the presence of href
            roleName = element.hasAttribute("href") ? "link" : "generic"; // Assign "link" role if <a> has href, otherwise "generic"
        } else {
            roleName = rolesNameFromContent.has(tagName) ? tagName : element.getAttribute("role") || "no role";
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
        addMessageToPrecedingDiv(element as HTMLElement, messageClass, messageText, extraClasses);
        element.classList.add("tabindex-0-detected-9927845");
    }
});

function createTopContainer() {
    // Create the container div
    const containerDiv = document.createElement('div');
    containerDiv.className = 'top-container-9927845';
  
    // Create the paragraph element for the message
    const messagePara = document.createElement('p');
    messagePara.textContent = 'This is an experimental check that may return false positive results. Once it is fully tested this message will be removed. The naming uses the ARIA 1.2 Name and Description calculation.';
    
    // Create the dismiss button
    const dismissButton = document.createElement('button');
    dismissButton.className = 'dismiss-button-9927845';
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
  createTopContainer();