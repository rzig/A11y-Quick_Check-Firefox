"use strict";

function showMissingAltAttributes(): void {
  // Select all 'img' elements on the page
  const imgElements: NodeListOf<HTMLImageElement> = document.querySelectorAll("img");

  // Define class names to associate with the messages
  const missingAltMessageClass: string = "missing-alt-message-8892664";
  const ariaHiddenAncestorMessageClass: string = "aria-hidden-ancestor-message-8892664";

  // Loop through each 'img' element and get the current 'img' element
  for (const imgElement of imgElements) {
    // Check if 'alt' attribute is present
    const hasAlt: boolean = imgElement.hasAttribute('alt');

    // Set the container element to be the 'picture' parent if present, otherwise the img element itself
    const containerElement: HTMLElement = imgElement.parentElement!.nodeName.toLowerCase() === 'picture'
      ? imgElement.parentElement!
      : imgElement;

    // Initialize the aria-hidden value with the current img element's aria-hidden attribute
    let ariaHidden: string | null = imgElement.getAttribute('aria-hidden');
    let ancestor: HTMLElement | null = imgElement.parentElement;

    // If 'aria-hidden' is not present, move up the DOM tree until 'aria-hidden' is found or we reach 'body' element
    while (!ariaHidden && ancestor && ancestor.nodeName.toLowerCase() !== 'body') {
      ariaHidden = ancestor.getAttribute('aria-hidden');
      ancestor = ancestor.parentElement;
    }

    if (!hasAlt) {
      // Set the default message and associated class
      let message: string = "This image is missing an ALT attribute";
      let messageClass: string = missingAltMessageClass;

      // If 'aria-hidden' attribute is found on an ancestor and is set to true, modify the message and associated class
      if (ariaHidden === 'true') {
        message = "This image is missing an ALT attribute, however is marked as decorative by aria-hidden true set on an ancestor";
        messageClass = ariaHiddenAncestorMessageClass;
      }

      // Create a div to display the message with the appropriate class
      createChildMessageDiv(containerElement, messageClass, message);
    }
  }
}

function checkMissingAltElementParentOverflowHidden(): void {
  const elements: NodeListOf<Element> = document.querySelectorAll('[data-a11y-wrapper-2edbc8ab]');

  for (const element of elements) {
    let parent: HTMLElement | null = element.parentElement;

    while (parent != null) {
      const style: CSSStyleDeclaration = getComputedStyle(parent);

      if (style.overflow === 'hidden') {
        element.classList.add('positionAbsolute00898');
        break;
      }

      parent = parent.parentElement;
    }
  }
  if (elements.length !== 0) {
    console.log('script run successfully');
  }
}

showMissingAltAttributes();
setTimeout(checkMissingAltElementParentOverflowHidden, 200);