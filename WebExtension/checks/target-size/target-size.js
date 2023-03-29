/********
 * Struggling to work out how to use the radio buttons in the HTML created by the 
 * JSON data can dymamically update the check from 24, 44 and 48
*********/

// Get all interactive elements on the page
document.querySelectorAll('a, button, input[type="button"], input[type="submit"], select, [role="button"]')
// Loop through each element and check its dimensions
  .forEach(elem => {
  const rect = elem.getBoundingClientRect(); // Get the element's dimensions
  const elemWidth = rect.width;
  const elemHeight = rect.height;
  const isInline = getComputedStyle(elem).display === 'inline';
  const parentTag = elem.parentNode.tagName;
  const isHidden = getComputedStyle(elem).display === 'none' || getComputedStyle(elem).opacity === '0' || getComputedStyle(elem).visibility === 'hidden';
  const isTooSmall = elemWidth <= 1 || elemHeight <= 1;

  // Check if the element's dimensions are less than the minimum requirement, it's not an inline element or in a list, and it's not hidden by CSS
  if ((elemWidth < 48 || elemHeight < 48) && !isInline && !['OL', 'UL', 'DL','LI','DT','DD'].includes(parentTag) && !isHidden && !isTooSmall) {
    // Add a CSS class to the element
    elem.classList.add('small-target');

    // Add a div container to the element
    elem.insertAdjacentHTML(
      "afterend",
      `<div class="target-size-8228965">The target size in pixels for this element is <strong>${elemWidth} x ${elemHeight}</strong></div>`
    );
  }
});



// // Get the radio buttons and the interactive elements on the page
// const radioButtons = document.getElementsByName("size");
// const interactiveElems = document.querySelectorAll('a, button, input[type="button"], input[type="submit"], select, [role="button"]');

// // Set the initial minimum requirement values
// let minWidth = 48;
// let minHeight = 48;

// // Add an event listener to each radio button
// radioButtons.forEach((button) => {
//   button.addEventListener("change", () => {
//     // Update the minimum requirement values based on the selected radio button
//     const selectedSize = parseInt(button.value);
//     minWidth = selectedSize;
//     minHeight = selectedSize;

//     // Loop through all interactive elements on the page and check if their dimensions meet the new minimum requirement
//     interactiveElems.forEach((elem) => {
//       const rect = elem.getBoundingClientRect();
//       const elemWidth = rect.width;
//       const elemHeight = rect.height;
//       const isInline = getComputedStyle(elem).display === 'inline';
//       const parentTag = elem.parentNode.tagName;
//       const isHidden = getComputedStyle(elem).display === 'none' || getComputedStyle(elem).opacity === '0' || getComputedStyle(elem).visibility === 'hidden';
//       const isTooSmall = elemWidth <= 1 || elemHeight <= 1;

//       // Check if the element's dimensions are less than the minimum requirement, it's not an inline element or in a list, and it's not hidden by CSS
//       if ((elemWidth < minWidth || elemHeight < minHeight) && !isInline && !['OL', 'UL', 'DL','LI','DT','DD'].includes(parentTag) && !isHidden && !isTooSmall) {
//         // Add a CSS class to the element
//         elem.classList.add('small-target');

//         // Add a div container to the element
//         elem.insertAdjacentHTML(
//           "afterend",
//           `<div class="target-size-8228965">The target size in pixels for this element is <strong>${minWidth} x ${minHeight}</strong></div>`
//         );
//       } else {
//         // Remove the CSS class and div container from the element (if it exists)
//         elem.classList.remove('small-target');
//         const targetSizeDiv = elem.nextElementSibling;
//         if (targetSizeDiv && targetSizeDiv.classList.contains('target-size-8228965')) {
//           targetSizeDiv.remove();
//         }
//       }
//     });
//   });
// });

// // Dynamically update elemWidth and elemHeight based on minSize in the JSON
// const minSize = checkboxConfiguration.minSize;
// const elem = document.getElementById("my-element");
// const elemWidth = elem.offsetWidth;
// const elemHeight = elem.offsetHeight;

// if (minSize && Array.isArray(minSize) && minSize.length > 0) {
//   for (const size of minSize) {
//     if (elemWidth < size || elemHeight < size) {
//       elem.style.width = `${size}px`;
//       elem.style.height = `${size}px`;
//       break;
//     }
//   }
// }

