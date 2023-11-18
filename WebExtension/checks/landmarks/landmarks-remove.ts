"use strict";

/**
 * Removes div elements that contain any of the specified message classes.
 * If the element with the message class is a direct child of a div, the parent div is removed.
 * Otherwise, the element itself is removed.
 */
function removeDivsWithClass() {
  const messageClasses = [
    "common-a11y-message-2edbc8ab"
  ];

  messageClasses.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(element => {
      if (element.parentElement && element.parentElement.tagName === 'DIV') {
        element.parentElement.remove();
      } else {
        element.remove(); // Remove the element itself if it's not in a div.
      }
    });
  });
}

removeDivsWithClass();

/**
 * Removes specified classes from all elements in the document that have these classes.
 * This function targets various classes that might have been added by the TypeScript code.
 */
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
    "article--aria-html-88937746",
    "article--aria--88937746",
    "article--html--88937746",
    "section--aria-html-88937746",
    "section--aria--88937746",
    "section--html--88937746",
    "main--aria-html-88937746",
    "main--aria--88937746",
    "main--html--88937746",
    "form--aria-html-88937746",
    "form--aria--88937746",
    "form--html--88937746",
    "search--aria-html-88937746",
    "search--aria--88937746",
    "search--html--88937746"
  ];

  addedClasses.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(element => {
      element.classList.remove(className);
    });
  });
}

removeAddedClasses();