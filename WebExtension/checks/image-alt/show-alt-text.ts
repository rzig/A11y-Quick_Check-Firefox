"use strict";

function showAltText(): void {
  const imgElements: NodeListOf<HTMLImageElement> = document.querySelectorAll("img");
  const altTextMessageClass: string = "alt-text-message-88927564";

  // Function to check if any ancestor element has 'aria-hidden' set to 'true'
  function hasAriaHiddenAncestor(element: HTMLElement | null): boolean {
    while (element) {
      if (element.getAttribute('aria-hidden') === 'true') {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }

  for (let i = 0; i < imgElements.length; i++) {
    const imgElement: HTMLImageElement | undefined = imgElements[i];
    if (!imgElement) continue; // Skip to next loop iteration if imgElement is undefined

    const altText: string = imgElement.alt;
    const altTextPresent: boolean = Boolean(altText && altText.trim() !== "");
    const containerElement: HTMLElement | null = imgElement.parentElement && imgElement.parentElement.nodeName.toLowerCase() === 'picture'
      ? imgElement.parentElement
      : imgElement;

    if (containerElement && !hasAriaHiddenAncestor(imgElement) && altTextPresent && !isHidden(imgElement)) {
      const message: string = `This image ALT text is: ${altText}`;
      createChildMessageDiv(containerElement, altTextMessageClass, message);
    }
  }
}

function checkElementParentOverflowHidden(): void {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll('[data-a11y-wrapper-2edbc8ab]');

  if (elements.length) {
    elements.forEach((element: HTMLElement) => {
      let parent: Node | null = element.parentNode;

      while (parent && parent !== document) {
        const style: CSSStyleDeclaration = getComputedStyle(parent as Element);

        if (style.overflow === 'hidden') {
          element.classList.add('position-absolute-00898');
          break;
        }

        parent = parent.parentNode;
      }
    });
  } else {
    console.log('script run successfully');
  }
}

showAltText();
setTimeout(checkElementParentOverflowHidden, 200);