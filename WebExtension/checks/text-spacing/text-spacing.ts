"use strict";

function addTextSpacing() {
  // Get all elements with text content
  const targets = document.querySelectorAll("*:not(script):not(style):not(head):not(title):not(meta):not(link):not(br):not(hr):not(img):not(input):not(textarea)")

  // Loop through all text elements
  for (const element of targets) {
    // Add a data-attribute to the element
    element.setAttribute("data-textspacing-7783664", "");
  }
}
addTextSpacing();