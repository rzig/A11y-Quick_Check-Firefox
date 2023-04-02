function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function checkUnorderedLists() {
  const ulElements = document.querySelectorAll("ul");

  function addMessageAfter(elem, messageClass, message) {
    const existingMessage = elem.nextElementSibling;
    if (existingMessage && existingMessage.classList.contains(messageClass)) {
      // Message already exists, no need to add again
      return;
    }

    const messageDiv = createMessageDiv(messageClass, message);
    elem.after(messageDiv);
  }

  for (let i = 0; i < ulElements.length; i++) {
    // Check for HTML unordered list markup
    const hasHtmlUl = ulElements[i].nodeName === "UL" && !ulElements[i].hasAttribute("role");
    if (hasHtmlUl) {
      const message = "Unordered List (HTML)";
      addMessageAfter(ulElements[i], "html-ul-message", message);
    }

    // Check for ARIA unordered list markup
    const hasAriaListRole = ulElements[i].getAttribute("role") === "list";
    const hasAriaListItemRole = ulElements[i].querySelectorAll("[role='listitem']").length > 0;
    if (hasAriaListRole && hasAriaListItemRole) {
      const message = "Unordered List (ARIA)";
      addMessageAfter(ulElements[i], "aria-ul-message", message);
    }
  }
}

checkUnorderedLists();
