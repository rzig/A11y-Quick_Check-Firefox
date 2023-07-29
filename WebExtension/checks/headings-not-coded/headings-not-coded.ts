// function getDefaultFontSize() {
//   // Create a temporary div offscreen with a font size of 1rem this fakes the default to 16px which is the default for most browsers. So if the developer has, for whatever reason, changed the base font, it does not affect the check.
//   const div = document.createElement('div');
//   div.style.cssText = 'position:absolute; left:-10000px; top:-10000px; font-size: 16px;';
//   document.body.appendChild(div);

//   // Get the computed font size in pixels
//   const defaultFontSize = parseFloat(window.getComputedStyle(div).fontSize);

//   // Remove the temporary div from the DOM
//   document.body.removeChild(div);

//   return defaultFontSize;
// }

// // The function checkTextNodesForHeadings checks all text nodes in the HTML document for headings that have not been marked up as such in the code
// function checkTextNodesForHeadings() {
//   // It creates a TreeWalker object that will traverse all text nodes in the body of the document
//   const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

//   // Defines CSS classes for use later in the code
//   const heavyTextClass = "text--heavy-a11y-9892664";
//   const largeTextClass = "text--large-a11y-9892664";
//   const missingHeadingClass = "headingTagMissing8898";

//   // Get the default browser font size
//   const defaultFontSize = getDefaultFontSize();

//   // The TreeWalker starts at the root of the document and traverses all text nodes
//   let node;
//   while(node = walk.nextNode()) {
//     // Gets the computed style of the parent element of the current text node
//     let style = window.getComputedStyle(node.parentElement);
//     let fontSize = parseFloat(style.fontSize); // Parses the font size as a float
//     let fontWeight = style.fontWeight; // Gets the font weight

//     // Gets the parent element and its tag name
//     let parent = node.parentElement;
//     let tagName = parent.tagName.toLowerCase();

//     // Checks if the parent or any of its ancestors are a heading or SVG element
//     let ancestor = parent;
//     let isHeadingOrSvg = false;
//     while (ancestor) {
//       if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'svg'].includes(ancestor.tagName.toLowerCase())) {
//         isHeadingOrSvg = true;
//         break;
//       }
//       ancestor = ancestor.parentElement;
//     }

//     // If the parent or any of its ancestors are a heading or SVG element, skip this iteration
//     if (isHeadingOrSvg) {
//       continue;
//     }

//     // If the font size is greater or equal to 18 and the font weight is greater or equal to 700, then a heading is detected
//     if(fontSize >= (1.125 * defaultFontSize) && fontWeight >= 700) {
//       const message = "Is this a heading? If yes, it is not marked up as a heading in code.";
//       parent.classList.add(missingHeadingClass); // Add the class indicating a missing heading
//       createChildMessageDiv(parent, heavyTextClass, message); // Call a function to create a message div
//     } 
//     // If the font size is greater or equal to 24, then a heading is detected
//     else if(fontSize >= (1.5 * defaultFontSize)) {
//       const message = "Is this a heading? If yes, it is not marked up as a heading in code.";
//       parent.classList.add(missingHeadingClass); // Add the class indicating a missing heading
//       createChildMessageDiv(parent, largeTextClass, message); // Call a function to create a message div
//     }
//   }
// }

// // Finally, call the function to start the check
// checkTextNodesForHeadings();
"use strict";

// The function checkTextNodesForHeadings checks all text nodes in the HTML document for headings that have not been marked up as such in the code
function checkTextNodesForHeadings() {
  // It creates a TreeWalker object that will traverse all text nodes in the body of the document
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  // Get the computed style of the body
  let bodyStyle = window.getComputedStyle(document.body);
  
  // Get the body's font size
  let bodyFontSize = parseFloat(bodyStyle.fontSize);
  
  // Define the browser default font size
  const defaultFontSize = 16; // You can change this if your browser default is different
  
  // Calculate the font size ratio
  const fontSizeRatio = bodyFontSize / defaultFontSize;

  // Defines CSS classes for use later in the code
  const heavyTextClass = "text--heavy-a11y-9892664";
  const largeTextClass = "text--large-a11y-9892664";
  const missingHeadingClass = "headingTagMissing8898";

  // The TreeWalker starts at the root of the document and traverses all text nodes
  let node;
  while(node = walk.nextNode()) {
    // Gets the computed style of the parent element of the current text node
    // Gets the parent element and its tag name
    let parent = node.parentElement;
      // if we don't have a parent, no need to check the parent.
      if (parent == null) {
      continue;
    }
    let style = window.getComputedStyle(parent);
    let fontSize = parseFloat(style.fontSize); // Parses the font size as a float
    let fontWeight = parseFloat(style.fontWeight); // Gets the font weight as a float

    // Gets the parent element and its tag name
    let tagName = parent.tagName.toLowerCase();

    // Checks if the parent or any of its ancestors are a heading or SVG element
    let ancestor: HTMLElement| null = parent;
    let isHeadingOrSvg = false;
    while (ancestor) {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'svg'].includes(ancestor.tagName.toLowerCase())) {
        isHeadingOrSvg = true;
        break;
      }
      ancestor = ancestor.parentElement;
    }

    // If the parent or any of its ancestors are a heading or SVG element, skip this iteration
    if (isHeadingOrSvg) {
      continue;
    }

    // If the font size is greater or equal to 18 and the font weight is greater or equal to 700, then a heading is detected
    if(fontSize >= (18 * fontSizeRatio) && fontWeight >= 700) {
      const message = "Is this a heading? If yes, it is not marked up as a heading in code.";
      parent.classList.add(missingHeadingClass); // Add the class indicating a missing heading
      createChildMessageDiv(parent, heavyTextClass, message); // Call a function to create a message div
    } 
    // If the font size is greater or equal to 24, then a heading is detected
    else if(fontSize >= (24 * fontSizeRatio)) {
      const message = "Is this a heading? If yes, it is not marked up as a heading in code.";
      parent.classList.add(missingHeadingClass); // Add the class indicating a missing heading
      createChildMessageDiv(parent, largeTextClass, message); // Call a function to create a message div
    }
  }
}

// Finally, call the function to start the check
checkTextNodesForHeadings();