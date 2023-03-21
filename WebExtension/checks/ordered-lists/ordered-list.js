function checkOrderedLists() {
  const olElements = document.querySelectorAll("ol");

  function addMessageAfter(elem, messageClass, message) {
    const existingMessage = elem.nextElementSibling;
    if (existingMessage && existingMessage.classList.contains(messageClass)) {
      // Message already exists, no need to add again
      return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.classList.add(messageClass);
    const messageText = document.createTextNode(message);
    messageDiv.append(messageText);
    elem.after(messageDiv);
  }

  for (let i = 0; i < olElements.length; i++) {
    // Check for HTML ordered list markup
    const hasHtmlOl = olElements[i].nodeName === "OL" && !olElements[i].hasAttribute("role");
    if (hasHtmlOl) {
      const message = "Ordered List (HTML)";
      addMessageAfter(olElements[i], "html-ol-message", message);
    }

    // Check for ARIA ordered list markup
    const hasAriaListRole = olElements[i].getAttribute("role") === "list";
    const hasAriaListItemRole = olElements[i].querySelectorAll("[role='listitem']").length > 0;
    if (hasAriaListRole && hasAriaListItemRole) {
      const message = "Ordered List (ARIA)";
      addMessageAfter(olElements[i], "aria-ol-message", message);
    }
  }
}

checkOrderedLists();
