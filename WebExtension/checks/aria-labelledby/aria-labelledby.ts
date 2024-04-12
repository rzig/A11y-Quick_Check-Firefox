// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {
  "use strict";

  // Global counter for data attribute numbering, used to associate aria-labelledby elements and their targets uniquely
  let ariaLabelCounter = 1;

  // Mapping from input types to their corresponding ARIA roles
  const inputTypeToRole: { [type: string]: string } = {
    button: "button",
    checkbox: "checkbox",
    color: "ColorWell",
    date: "Date",
    "datetime-local": "DateTime",
    email: "textbox",
    file: "button",
    image: "button",
    month: "DateTime",
    number: "spinbutton",
    password: "textbox",
    radio: "radio",
    range: "slider",
    reset: "button",
    search: "searchbox",
    submit: "button",
    tel: "textbox",
    text: "textbox",
    time: "InputTime",
    url: "textbox",
    week: "DateTime",
  };

  interface RoleMapping {
    [key: string]: string[];
  }

  // Mapping of prohibited ARIA roles to their HTML element counterparts
  const prohibitedRoleMappings: RoleMapping = {
    caption: ["caption", "figcaption"],
    code: ["code"],
    deletion: ["del"],
    emphasis: ["em"],
    //generic: ["div", "span"],
    insertion: ["ins"],
    none: [],
    paragraph: ["p"],
    presentation: [],
    strong: ["strong"],
    subscript: ["sub"],
    superscript: ["sup"],
  };

  function inferRoleFromElement(node: Element): string {
    if (node instanceof HTMLInputElement) {
      const type = node.type.toLowerCase();
      return inputTypeToRole[type] || "textbox";
    }

    // Structural element roles mapping
    const structuralElementRoles: { [element: string]: string } = {
      HEADER: "banner",
      FOOTER: "contentinfo",
      ASIDE: "complementary",
      SECTION: "",
      ARTICLE: "article",
    };

    // Headers and footers not nested within certain parent elements
    if (
      (node.nodeName.toUpperCase() === "HEADER" ||
        node.nodeName.toUpperCase() === "FOOTER") &&
      !isDescendantOf(node, ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"])
    ) {
      return node.nodeName.toUpperCase() === "HEADER"
        ? "banner"
        : "contentinfo";
    }

    // Checks if an element is a descendant of any of the specified tag names
    function isDescendantOf(element: Element, tagNames: string[]): boolean {
      let parent = element.parentElement;
      while (parent != null) {
        if (tagNames.includes(parent.nodeName.toUpperCase())) {
          return true;
        }
        parent = parent.parentElement;
      }
      return false;
    }

    // Determine the role based on the element type if it's a known structural element
    const nodeName = node.nodeName.toUpperCase();
    if (structuralElementRoles.hasOwnProperty(nodeName)) {
      return structuralElementRoles[nodeName] || "";
    }

    // Early return for DIV or SPAN with an explicit role
    const role = node.getAttribute("role");
    if (
      node.nodeName.toUpperCase() === "DIV" ||
      node.nodeName.toUpperCase() === "SPAN"
    ) {
      if (role) {
        return role; // Return the explicit role if one is set
      }
      return "generic"; // Assign "generic" only if no explicit role is set
    }

    // Handle roles for other specific HTML elements
    switch (node.nodeName.toUpperCase()) {
      case "DEL":
        return "deletion";
      case "EM":
      case "I":
        return "emphasis";
      case "STRONG":
      case "B":
        return "strong";
      case "INS":
        return "insertion";
      case "P":
        return "paragraph";
      case "CODE":
        return "code";
      case "SUP":
        return "superscript";
      case "SUB":
        return "subscript";
      default:
        return ""; // Return an empty string if no role is identified
    }
  }

  // Main function to check elements with 'aria-labelledby'
  function ariaLbNameCheck() {
    let allNodes = document.querySelectorAll(
      "[aria-labelledby]:not(.top-right-container-9927845 [aria-labelledby], .inner-container-9927845 [aria-labelledby])"
    );

    processNodes(allNodes);
  }

  // Processes each node that has 'aria-labelledby' attribute
  function processNodes(nodes: NodeListOf<Element>) {
    for (const currentNode of nodes) {
      const inferredRole = inferRoleFromElement(currentNode);
      const explicitRole = currentNode.getAttribute("role");
      const ariaLabelledBy = currentNode.getAttribute("aria-labelledby") || "";
      currentNode.setAttribute("data-arialabelledby-9927845", "");
      if (ariaLabelledBy !== null) {
        const labelledByIds = ariaLabelledBy
          .split(" ")
          .filter((id) => id.trim().length > 0);
        let computedNames = [];
        let isLabelMissing = false;

        for (const id of labelledByIds) {
          const labelledByElement = document.getElementById(id);
          if (labelledByElement) {
            computedNames.push(labelledByElement.textContent || "Unnamed");
            addNumberedRelationship(labelledByElement, ariaLabelCounter);
            addNumberedRelationship(currentNode, ariaLabelCounter);
            ariaLabelCounter++;
          } else {
            isLabelMissing = true;
          }
        }

        const namesList = computedNames.join(", "); // Combine names for message
        const elementType = currentNode.nodeName.toLowerCase();
        const explicitRole = currentNode.getAttribute("role") || "";
        let baseMessage = "";
        let isValid = true;

        // Standard validity checks
        const isExplicitlyProhibited =
          explicitRole &&
          Object.keys(prohibitedRoleMappings).includes(explicitRole);
        const isImplicitlyProhibited = Object.entries(
          prohibitedRoleMappings
        ).some(
          ([_, elements]) => !explicitRole && elements.includes(elementType)
        );

        // Check for mismatch between inferred and explicit roles
      if (inferredRole && explicitRole && inferredRole !== explicitRole) {
        const baseMessage = `Mismatched roles detected. Inferred: ${inferredRole}, Explicit: ${explicitRole}`;
        addMessageToPrecedingDiv(
          currentNode,
          "warning-message-9927845",
          baseMessage
        );
      }

        if (isExplicitlyProhibited || isImplicitlyProhibited) {
          baseMessage = `Invalid: <${elementType}>${
            explicitRole ? ` role="${explicitRole}" with ` : ""
          } aria-labelledby is not supported.`;
          isValid = false;
        } else if (explicitRole) {
          baseMessage = `Valid: aria-labelledby used on <${elementType}> with role="${explicitRole}" is supported. Elements name is "${namesList}".`;
        } else {
          baseMessage = `Valid: aria-labelledby used on <${elementType}> is supported. Elements name is "${namesList}".`;
        }

        currentNode.classList.add(
          isValid ? "valid-9927845" : "invalid-9927845"
        );
        addMessageToPrecedingDiv(
          currentNode,
          isValid ? "valid-message-9927845" : "invalid-message-9927845",
          baseMessage
        );

        // Separate checks and messages for missing IDs and empty aria-labelledby
        if (isLabelMissing) {
          const warningMessage =
            "Warning: there is no ID associated with the aria-labelledby.";
          addMessageToPrecedingDiv(
            currentNode,
            "warning-message-9927845",
            warningMessage
          );
        }
        if (ariaLabelledBy.trim() === "") {
          const emptyAriaLabelWarning =
            "Warning: aria-labelledby attribute is empty.";
          addMessageToPrecedingDiv(
            currentNode,
            "warning-message-9927845",
            emptyAriaLabelWarning
          );
        }
      }
    }
  }

  // Function to visually represent the relationship between elements referenced by 'aria-labelledby'
  function addNumberedRelationship(element: Element, number: number) {
    let square = document.createElement("div");
    square.textContent = number.toString();
    square.classList.add("numbered-square-9927845");
    element.insertAdjacentElement("afterend", square);
  }

  ariaLbNameCheck();
})();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerAriaLabelledby(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-alb-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset["isMinimized"] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing aria-labelledby",
    "The purpose of this check is to analyse the use of the aria-labelledby attribute within HTML elements, distinguishing between valid and invalid implementations. It looks at each element that includes aria-labelledby, checking for its connection to labelled elements."
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
    appendLink(ariaLinks, "aria-labelledby property", "ARIA");

    // Add the action buttons
  }
  createDismissButton(innerDiv, "ARIA-labelledby");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerAriaLabelledby();
