"use strict";

// The function checkTextNodesForHeadings checks all text nodes in the HTML document for headings that have not been marked up as such in the code
function checkTextNodesForHeadings(): void {
  // Create a TreeWalker object that will traverse all text nodes in the body of the document
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  // Get the computed style of the body
  const bodyStyle = window.getComputedStyle(document.body);
  
  // Get the body's font size
  const bodyFontSize = parseFloat(bodyStyle.fontSize);
  
  // Define the browser default font size
  const defaultFontSize = 16;
  
  // Calculate the font size ratio
  const fontSizeRatio = bodyFontSize / defaultFontSize;

  // Define CSS classes for use later in the code
  const heavyTextClass = "text-heavy-a11y-9892664";
  const largeTextClass = "text-large-a11y-9892664";
  const missingHeadingClass = "heading-tag-missing-8898";

  let node: Node | null;
  while (node = walk.nextNode()) {
    const parent = node.parentElement;

    // If we don't have a parent, no need to check the parent.
    if (parent === null) {
      continue;
    }
    const style = window.getComputedStyle(parent);
    const fontSize = parseFloat(style.fontSize);
    const fontWeight = parseFloat(style.fontWeight);

    // Initialize variables for ancestor traversal
    let ancestor: HTMLElement | null = parent;
    let isHeadingOrSvg = false;
    
    // Check ancestors for heading tags or SVG, and for hgroup containing h1-h6
    while (ancestor) {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'svg'].includes(ancestor.tagName.toLowerCase())) {
        isHeadingOrSvg = true;
        break;
      }
    
      // New condition for hgroup that contains at least one h1-h6
      if (ancestor.tagName.toLowerCase() === 'hgroup') {
        const headingsInHGroup = ancestor.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headingsInHGroup.length > 0) {
          isHeadingOrSvg = true;
          break;
        }
      }
    
      ancestor = ancestor.parentElement;
    }

    // Skip iteration if an ancestor was a heading or SVG, or if wrapped in an hgroup with at least one h1-h6
    if (isHeadingOrSvg) {
      continue;
    }

    // Check for likely headings based on styling
    if (fontSize >= (18 * fontSizeRatio) && fontWeight >= 700) {
      const message = "Is this a heading? If yes, it is not marked up as a heading in code.";
      parent.classList.add(missingHeadingClass);
      createChildMessageDiv(parent, heavyTextClass, message);
    } else if (fontSize >= (24 * fontSizeRatio)) {
      const message = "Is this a heading? If yes, it is not marked up as a heading in code.";
      parent.classList.add(missingHeadingClass);
      createChildMessageDiv(parent, largeTextClass, message);
    }
  }
}

// Call the function to start the check
checkTextNodesForHeadings();