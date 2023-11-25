// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {
  "use strict";

  // Global counter for data attribute numbering
  let ariaLabelCounter = 1;

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

            let labelCounterString = String(ariaLabelCounter).padStart(5, '0');
            labelledByElement.setAttribute('data-elementnamedby-9927845', labelCounterString);
            currentNode.setAttribute('data-namedfrom-9927845', labelCounterString);

            // Add numbered square next to the labelledByElement and currentNode
            addNumberedRelationship(labelledByElement, ariaLabelCounter);
            addNumberedRelationship(currentNode, ariaLabelCounter);

            ariaLabelCounter++;
          }
        }

        const elementType = currentNode.nodeName.toUpperCase();
        let currentRole = currentNode.getAttribute("role") || inferRoleFromElement(elementType);
        let messageClassName = '';
        let message;
        let isValid = true;

        if (elementType === "DIV" && !currentRole) {
          messageClassName = 'invalid-message-9927845';
          message = `Invalid: aria-labelledby is not valid on <${elementType}> without a valid Role.`;
          isValid = false;
        } else {
          const isInherentlyInvalid = prohibitedRoles.includes(currentRole.toLowerCase());
          if (!isInherentlyInvalid) {
            if (computedName) {
              computedName = computedName.trim();
              messageClassName = 'valid-message-9927845';
              message = `Valid: The name for <${elementType}> is \"${computedName}\".`;
              isValid = true;
            }
          } else {
            messageClassName = 'invalid-message-9927845';
            message = `Invalid: aria-labelledby is not valid on <${elementType}> with a role of ${currentRole.toUpperCase()}.`;
            isValid = false;
          }
        }

        currentNode.classList.add(isValid ? "valid-9927845" : "invalid-9927845");

        if (message) {
          addMessageToPrecedingDiv(currentNode, messageClassName, message);
        }
      }
    }
  }

  function inferRoleFromElement(elementType: string): string {
    switch (elementType) {
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
        return "";
    }
  }

  // Define the function to add a numbered square next to an element
  function addNumberedRelationship(element: Element, number: number) {
    let square = document.createElement('div');
    square.textContent = number.toString();
    square.classList.add('numbered-square-9927845');
    element.insertAdjacentElement('afterend', square);
  }

  ariaLbNameCheck();
})();