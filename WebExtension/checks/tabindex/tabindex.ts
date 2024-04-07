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
  document.querySelectorAll("[tabindex], [role]").forEach((element) => {
    const tabIndexValue = parseInt(element.getAttribute("tabindex") || "0", 10);
    const role = element.getAttribute("role") || "";

    if (isElementVisible(element as HTMLElement)) {
      let roleName = "";
      const tagName = element.tagName.toLowerCase();

      // Role determination logic
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
            roleName = "button";
          } else {
            roleName = "no role";
          }
        } else {
          roleName = element.getAttribute("role") || "no role";
        }
      } else if (tagName === "a") {
        roleName = element.hasAttribute("href") ? "link" : "generic";
      } else {
        roleName = rolesNameFromContentTab.has(tagName)
          ? tagName
          : element.getAttribute("role") || "no role";
      }

      const { name, method } = getAccessibleNameTab(element);
      let messageText = "";
      let messageClass = "";
      let extraClasses = [];

      // Handling tabindex messages
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
        // Append tabindex related message
        addMessageToPrecedingDiv(
          element,
          messageClass,
          messageText,
          extraClasses
        );
      } else if (tabIndexValue > 0) {
        messageText = `Warning: tabindex ${tabIndexValue} used on element ${tagName}. Using tabindex greater than 0 can cause critical accessibility issues.`;
        messageClass = "warning-9927845";
        extraClasses = ["warning-message-9927845"];
        // Append tabindex related message
        addMessageToPrecedingDiv(
          element,
          messageClass,
          messageText,
          extraClasses
        );
      }

      // Handling role="application" message separately
      if (role.toLowerCase() === "application") {
        let appRoleMessageText =
          "Warning: Using role='application' changes the way assistive technologies interact with the content. In most cases, implementing the application role will create barriers to accessibility.";
        let appRoleMessageClass = "warning-9927845";
        let appRoleExtraClasses = ["warning-message-9927845"];

        // Append role="application" message
        addMessageToPrecedingDiv(
          element,
          appRoleMessageClass,
          appRoleMessageText,
          appRoleExtraClasses
        );
      }

      element.classList.add("tabindex-0-detected-9927845");
    }
  });

  populateLinkObjects(); // Ensure the links are populated before use.

  function createTopRightContainer(): void {
    const containerDiv = getOrCreateContainer();

    // Check if containerDiv is null and return early if so
    if (containerDiv === null) {
      return;
    }

    const innerDiv = document.createElement("div");
    innerDiv.className = "inner-container-9927845 remove-inner-tabi-9927845";

    // Check if the container is minimized
    if (containerDiv.dataset["isMinimized"] === "true") {
      innerDiv.classList.add("hidden-feature-message-9927845");
    }

    containerDiv.appendChild(innerDiv);
    updateParentContainerClass(containerDiv);

    const checkDetails = createDetailsComponent(
      "Analysing tabindex",
      "The purpose of this check is to identify elements with a tabindex attribute that has a value of 0 or higher. The check highlights best practices in accessibility by flagging any misuse of tabindex, with warning messages against values greater than 0, which can be a barrier to accessibility. This check intentionally overlooks elements with a tabindex of -1, focusing instead on guiding developers towards enhancing web accessibility through the correct use of tabindex 0 or higher."
    );
    innerDiv.appendChild(checkDetails);
  
    // // Manual notes details component
    // const checkManualDetails = createDetailsComponent(
    //   "How to manually test ( is coming! )",
    //   "This section will be populated with how to manually test"
    // );
    // innerDiv.appendChild(checkManualDetails);

    // Adding "Findings" heading
    const findingsHeading = document.createElement("h2");
    findingsHeading.className = "findings-heading-9927845";
    findingsHeading.textContent = "Findings:";
    innerDiv.appendChild(findingsHeading);

    // Creating the findings list
    const findingsUL = document.createElement("ul");
    findingsUL.className = "findings-list-9927845";
    findingsUL.style.margin = "0";
    findingsUL.style.padding = "0";

    // Tabindex Summary
    const allElements = document.querySelectorAll("*");
    let tabIndexZeroCount = 0; // Count for tabindex=0
    let tabIndexAboveZeroCount = 0; // Count for tabindex > 0
    allElements.forEach((element) => {
      const tabindexAttr = element.getAttribute("tabindex");
      if (tabindexAttr !== null) {
        const tabindex = parseInt(tabindexAttr, 10);
        if (tabindex === 0) {
          tabIndexZeroCount++;
        } else if (tabindex > 0) {
          tabIndexAboveZeroCount++;
        }
      }
    });

    // Append the message about tabindex="0" usage to the findings list
if (tabIndexZeroCount > 0) {
  const tabindexZeroLi = document.createElement("li");
  tabindexZeroLi.textContent = `${tabIndexZeroCount} uses of tabindex="0" identified.`;
  findingsUL.appendChild(tabindexZeroLi);
} else {
  // Append a message indicating no valid uses of tabindex="0" found, if applicable
  const noTabindexZeroLi = document.createElement("li");
  noTabindexZeroLi.textContent = 'No uses of tabindex="0" identified.';
  findingsUL.appendChild(noTabindexZeroLi);
}

// Append the message about tabindex > 0 usage to the findings list, if applicable
if (tabIndexAboveZeroCount > 0) {
  const tabindexAboveZeroLi = document.createElement("li");
  tabindexAboveZeroLi.textContent = `${tabIndexAboveZeroCount} uses of tabindex greater than 0 identified, which can interfere with the natural tab order and accessibility.`;
  findingsUL.appendChild(tabindexAboveZeroLi);
} else {
  // Append a message indicating no uses of tabindex > 0 found, if applicable
  const noTabindexAboveZeroLi = document.createElement("li");
  noTabindexAboveZeroLi.textContent = 'No uses of tabindex greater than 0 identified.';
  findingsUL.appendChild(noTabindexAboveZeroLi);
}

    let invalidTabIndexCount = 0;
    document.querySelectorAll("[tabindex]").forEach((element) => {
      const tabIndexValue = parseInt(
        element.getAttribute("tabindex") || "0",
        10
      );
      if (tabIndexValue < -1) {
        invalidTabIndexCount++;
      }
    });

    if (invalidTabIndexCount > 0) {
      const invalidTabindexLi = document.createElement("li");
      invalidTabindexLi.textContent = `${invalidTabIndexCount} invalid uses of tabindex identified. tabindex values should not be less than -1.`;
      findingsUL.appendChild(invalidTabindexLi);
    }

    // Append the findings list to the container
    innerDiv.appendChild(findingsUL);

    // Reference Section
    const referenceContainer = createReferenceContainer();
    if (referenceContainer) {
      innerDiv.appendChild(referenceContainer);

      const linkList = document.createElement("ul");
      linkList.className = "reference-list-9927845";
      linkList.style.margin = "0";
      linkList.style.padding = "0";

      referenceContainer.appendChild(linkList);

      // Function to append links to the reference section
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
      appendLink(wcagLinks, "1.3.1 Info and Relationships (Level A)", "WCAG");
      appendLink(wcagLinks, "4.1.2 Name, Role, Value (Level A)", "WCAG");
      appendLink(htmlLinks, "6.6.3 The tabindex attribute", "HTML");

      // Action Buttons
    }
    createDismissButton(innerDiv, "Tabindex");

    // Append the main container to the document's body
    document.body.appendChild(containerDiv);
  }

  createTopRightContainer();
})();
