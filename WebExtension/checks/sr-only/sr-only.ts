"use strict";

function checkScreenReaderText() {
  const allElements = document.querySelectorAll("body *");
  const srOnlyMessageClass = "sr-only-message-identifier";

  for (const element of allElements) {
    const style = window.getComputedStyle(element);
    if ((style.position === 'absolute' && style.clip !== 'auto') ||
        (style.width === '1px' && style.height === '1px')) {

      const message = `Screen Reader Only Text Detected: ${element.textContent}`;
      createChildMessageDiv(element, srOnlyMessageClass, message);
      element.classList.add("screen-reader-detected");
    }
  }
}

checkScreenReaderText();