"use strict";

function checkScreenReaderText() {
  const allElements = document.querySelectorAll("body *");
  const srOnlyMessageClass = "warning-message-9927845";

  for (const element of allElements) {
    // Check if the element's text content is not null and not empty or whitespace
    if (element.textContent && element.textContent.trim() !== "") {
      const style = window.getComputedStyle(element);
      if ((style.position === 'absolute' && style.clip !== 'auto') ||
          (style.width === '1px' && style.height === '1px')) {

        const message = `Possible Screen Reader Only Text Detected: ${element.textContent}`;
        createChildMessageDiv(element, srOnlyMessageClass, message);
        element.classList.add("warning-9927845");
      }
    }
  }
}

checkScreenReaderText();