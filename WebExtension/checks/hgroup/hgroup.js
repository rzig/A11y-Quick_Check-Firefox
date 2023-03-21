function checkHGroups() {
  const hgroupElements = document.querySelectorAll("hgroup");

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

  for (let i = 0; i < hgroupElements.length; i++) {
    // Check if HTML hgroup element has no roles
    const hasHtmlHGroup = hgroupElements[i].nodeName === "HGROUP" && !hgroupElements[i].hasAttribute("role");
    if (hasHtmlHGroup) {
      const message = "HGroup";
      addMessageAfter(hgroupElements[i], "html-hgroup-message", message);
    }

    // Check if ARIA hgroup element has role=group and role=description
    const hasAriaGroupRole = hgroupElements[i].getAttribute("role") === "group";
    const hasAriaDescriptionRole = hgroupElements[i].getAttribute("aria-roledescription") !== null;
    if (hasAriaGroupRole && hasAriaDescriptionRole) {
      const roleDescription = hgroupElements[i].getAttribute("aria-roledescription");
      const message = `HGroup with Role Group and aria-roledescription: ${roleDescription}`;
      addMessageAfter(hgroupElements[i], "aria-hgroup-message", message);
      hgroupElements[i].style.border = "2px solid #ccc";
    }
  }
}

checkHGroups();
