"use strict";

// Function to remove the injected divs
removeInjectedDivs([
  "html-header-message-88937746",
  "html-nav-message-88937746",
  "html-footer-message-88937746",
  "html-aside-message-88937746",
  "nav-message-88937746",

  "aria-banner-message-88937746",
  "aria-navigation-message-88937746",
  "aria-contentinfo-message-88937746",
  "aria-complementary-message-88937746",

  "html-aria-duplicate-header-message-88937746",
  "html-aria-duplicate-nav-message-88937746",
  "html-aria-duplicate-footer-message-88937746",
  "html-aria-duplicate-aside-message-88937746"
]);

// Function to remove the added classes
function removeAddedClasses() {
  const addedClasses = [
    "header--aria-html-88937746",
    "header--aria--88937746",
    "header--html--88937746",

    "nav--aria-html-88937746",
    "nav--aria--88937746",
    "nav--html--88937746",

    "footer--aria-html-88937746",
    "footer--aria--88937746",
    "footer--html--88937746",

    "aside--aria-html-88937746",
    "aside--aria--88937746",
    "aside--html--88937746",
    
  ];

  // Query all the elements in the DOM that have one of the above classes
  for (const className of addedClasses) {
    const elements = document.querySelectorAll(`.${className}`);
    for (const element of elements) {
      element.classList.remove(className); // This only removes the specified class
    }
  }
}

// Call the function to remove the added classes
removeAddedClasses();
