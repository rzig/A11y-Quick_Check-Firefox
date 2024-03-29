"use strict";

(() => {
  // Define the message and class used by the script
  const messageClasses: string[] = [
    "warning-9927845",
    "warning-message-9927845",
    "valid-message-9927845",
    "invalid-message-9927845",
    "top-container-9927845",
    "top-right-container-9927845",
  ];
  const addedElementClass = "tabindex-0-detected";

  // Remove injected divs and messages using the provided helper function
  removeInjectedDivs(messageClasses);

  // Remove the 'tabindex-0-detected' class from all elements that have it
  document
    .querySelectorAll<HTMLElement>(`.${addedElementClass}`)
    .forEach((element) => {
      element.classList.remove(addedElementClass); // Remove the specific class from the element
    });
})();
