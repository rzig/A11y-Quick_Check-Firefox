"use strict";

function removeInjectedScreenReaderMessages(): void {
  for (const element of document.querySelectorAll(".screen-reader-identifier, .how-many-srts, .screen-reader-text-message")) {
    element.classList.remove(
      "screen-reader-identifier",
      "how-many-srts",
      "screen-reader-text-message"
    );
  }

  removeInjectedDivs([
    "screen-reader-identifier",
    "how-many-srts",
    "screen-reader-text-message",
    "common-a11y-message-2edbc8ab"
  ]);
}

// Directly calling the function to remove injected elements and classes
removeInjectedScreenReaderMessages();