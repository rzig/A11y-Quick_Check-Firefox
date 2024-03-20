// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {
  "use strict";

  // Global counter for data attribute numbering
  let ariaLabelCounter = 1;

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

  const prohibitedRoles = [
    "caption",
    "code",
    "deletion",
    "emphasis",
    "generic",
    "insertion",
    "paragraph",
    "presentation",
    "strong",
    "subscript",
    "superscript",
  ];

  function inferRoleFromElement(node: Element): string {
    // Handling for INPUT elements
    if (node instanceof HTMLInputElement) {
      // More robust type checking
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

    // Special handling for HEADER and FOOTER when not children of BODY
    if (
      (node.nodeName.toUpperCase() === "HEADER" ||
        node.nodeName.toUpperCase() === "FOOTER") &&
      node.parentNode &&
      node.parentNode.nodeName.toUpperCase() !== "BODY"
    ) {
      return ""; // No specific role needed
    }

    // Check if the node is a structural element and return the corresponding role
    const nodeName = node.nodeName.toUpperCase();
    if (structuralElementRoles.hasOwnProperty(nodeName)) {
      // Use non-null assertion operator because we've already checked it exists
      // Or provide a default value like "" to ensure a string is always returned
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

    // Handling for non-input elements based on nodeName
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

  function ariaLbNameCheck() {
    let allNodes = document.querySelectorAll("[aria-labelledby]");
    processNodes(allNodes);
  }

  function processNodes(nodes: NodeListOf<Element>) {
    for (const currentNode of nodes) {
      const ariaLabelledBy = currentNode.getAttribute("aria-labelledby");
      if (ariaLabelledBy) {
        const labelledByIds = ariaLabelledBy.split(" ");
        let computedName = "";

        for (const id of labelledByIds) {
          const labelledByElement = document.getElementById(id);
          if (labelledByElement) {
            computedName += labelledByElement.textContent + " ";

            let labelCounterString = String(ariaLabelCounter).padStart(5, "0");
            labelledByElement.setAttribute(
              "data-elementnamedby-9927845",
              labelCounterString
            );
            currentNode.setAttribute(
              "data-namedfrom-9927845",
              labelCounterString
            );

            addNumberedRelationship(labelledByElement, ariaLabelCounter);
            addNumberedRelationship(currentNode, ariaLabelCounter);

            ariaLabelCounter++;
          }
        }

        computedName = computedName.trim();
        const elementType = currentNode.nodeName.toUpperCase();
        let explicitOrInferredRole =
          currentNode.getAttribute("role") || inferRoleFromElement(currentNode);
        let messageClassName = "";
        let message;
        let isValid = true;

        // Adjusting message to include explicit or inferred role
        if (explicitOrInferredRole) {
          if (prohibitedRoles.includes(explicitOrInferredRole.toLowerCase())) {
            messageClassName = "invalid-message-9927845";
            message = `Invalid: <${elementType}> role="${explicitOrInferredRole}" is not supported.`;
            isValid = false;
          } else {
            messageClassName = "valid-message-9927845";
            message = `Valid: The name for <${elementType}> role="${explicitOrInferredRole}" is "${computedName}".`;
          }
        } else {
          // Handle as generic if no role is detected or applied
          messageClassName = "invalid-message-9927845";
          message = `Invalid: <${elementType}> without a valid role is not supported.`;
          isValid = false;
        }

        currentNode.classList.add(
          isValid ? "valid-9927845" : "invalid-9927845"
        );
        if (message) {
          addMessageToPrecedingDiv(currentNode, messageClassName, message);
        }
      }
    }
  }

  function addNumberedRelationship(element: Element, number: number) {
    let square = document.createElement("div");
    square.textContent = number.toString();
    square.classList.add("numbered-square-9927845");
    element.insertAdjacentElement("afterend", square);
  }

  ariaLbNameCheck();
})();
