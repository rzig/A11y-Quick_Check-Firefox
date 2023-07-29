"use strict";

function checkHGroups() {
  const hgroupElements = document.querySelectorAll("hgroup");
  const htmlHGroupMessageClass = "html-hgroup-message-58997365";
  const ariaHGroupMessageClass = "aria-hgroup-message-58997365";

  for (const htmlGroupElement of hgroupElements) {
    // Check if HTML hgroup element has no roles
    const hasHtmlHGroup = htmlGroupElement.nodeName === "HGROUP" && !htmlGroupElement.hasAttribute("role");
    if (hasHtmlHGroup) {
      const message = "HTML <hgroup> is not fully supported. We recommend adding an ARIA role=\"group\" and role-description=\"Heading Group\"";
      createChildMessageDiv(htmlGroupElement, htmlHGroupMessageClass, message);
      htmlGroupElement.classList.add("hgroup-58997365");
    }

    // Check if ARIA hgroup element has role=group and role=description
    const hasAriaGroupRole = htmlGroupElement.getAttribute("role") === "group";
    const hasAriaDescriptionRole = htmlGroupElement.getAttribute("aria-roledescription") != null;
    if (hasAriaGroupRole && hasAriaDescriptionRole) {
      const roleDescription = htmlGroupElement.getAttribute("aria-roledescription");
      const message = `HTML <hgroup> with role=\"group\" and aria-roledescription: ${roleDescription}`;
      createChildMessageDiv(htmlGroupElement, ariaHGroupMessageClass, message);
      htmlGroupElement.classList.add("hgroup-58997365");
    }
  }
}

checkHGroups();