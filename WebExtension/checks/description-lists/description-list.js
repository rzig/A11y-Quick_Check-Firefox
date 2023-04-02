function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function checkDescriptionLists() {
  const dlElements = document.querySelectorAll("dl");

  function addMessageAfter(elem, messageClass, message) {
    const existingMessage = elem.nextElementSibling;
    if (existingMessage && existingMessage.classList.contains(messageClass)) {
      // Message already exists, no need to add again
      return;
    }

    const messageDiv = createMessageDiv(messageClass, message);
    elem.after(messageDiv);
  }

  for (let i = 0; i < dlElements.length; i++) {
    // Check for HTML description list markup
    const hasHtmlDl = dlElements[i].nodeName === "DL" && !dlElements[i].hasAttribute("role");
    if (hasHtmlDl) {
      const message = "Description List (HTML)";
      addMessageAfter(dlElements[i], "html-dl-message", message);
    }

    // Check for ARIA description list markup
    const hasAriaListRole = dlElements[i].getAttribute("role") === "list";
    const hasAriaListItemRole = dlElements[i].querySelectorAll("[role='listitem']").length > 0;
    if (hasAriaListRole && hasAriaListItemRole) {
      const message = "Description List (ARIA)";
      addMessageAfter(dlElements[i], "aria-dl-message", message);
    }
  }
}

checkDescriptionLists();
