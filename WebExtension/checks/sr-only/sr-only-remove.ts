"use strict";

function removeInjectedScreenReaderMessages(): void {
  for (const element of document.querySelectorAll(".warning-9927845")) {
    element.classList.remove(
      "warning-9927845",
    );
  }

  removeInjectedDivs([
    "warning-message-9927845"
  ]);
}

// Directly calling the function to remove injected elements and classes
removeInjectedScreenReaderMessages();