function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function checkHGroups() {
  const hgroupElements = document.querySelectorAll("hgroup");
  const htmlHGroupMessageClass = "html-hgroup-message-58997365";
  const ariaHGroupMessageClass = "aria-hgroup-message-58997365";

  for (let i = 0; i < hgroupElements.length; i++) {
      // Check if HTML hgroup element has no roles
      const hasHtmlHGroup = hgroupElements[i].nodeName === "HGROUP" && !hgroupElements[i].hasAttribute("role");
      if (hasHtmlHGroup) {
        const message = "HTML <hgroup> is not fully supported. We recommend adding an ARIA role=\"group\" and role-description=\"Heading Group\"";
          const htmlHGroupMessageDiv = createMessageDiv(htmlHGroupMessageClass, message);
          hgroupElements[i].after(htmlHGroupMessageDiv);
          hgroupElements[i].classList.add("hgroup-58997365");
      }

      // Check if ARIA hgroup element has role=group and role=description
      const hasAriaGroupRole = hgroupElements[i].getAttribute("role") === "group";
      const hasAriaDescriptionRole = hgroupElements[i].getAttribute("aria-roledescription") !== null;
      if (hasAriaGroupRole && hasAriaDescriptionRole) {
          const roleDescription = hgroupElements[i].getAttribute("aria-roledescription");
          const message = `HTML <hgroup> with role=\"group\" and aria-roledescription: ${roleDescription}`;
          const ariaHGroupMessageDiv = createMessageDiv(ariaHGroupMessageClass, message);
          hgroupElements[i].after(ariaHGroupMessageDiv);
          hgroupElements[i].classList.add("hgroup-58997365");
      }
  }
}

checkHGroups();