function checkDescriptionLists() {
  const dlElements = document.querySelectorAll("dl");

  for (let i = 0; i < dlElements.length; i++) {
    // Check for HTML description list markup
    const hasHtmlDl =
      dlElements[i].nodeName === "DL" && !dlElements[i].hasAttribute("role");
    if (hasHtmlDl) {
      const message = "Description List (HTML)";
      createMessageDiv(dlElements[i], "html-dl-message", message);
    }

    // Check for ARIA description list markup
    const hasAriaListRole = dlElements[i].getAttribute("role") === "list";
    const hasAriaListItemRole =
      dlElements[i].querySelectorAll("[role='listitem']").length > 0;
    if (hasAriaListRole && hasAriaListItemRole) {
      const message = "Description List (ARIA)";
      createMessageDiv(dlElements[i], "aria-dl-message", message);
    }
  }
}

checkDescriptionLists();
