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
  if ((elemWidth < 44 || elemHeight < 44) && !isInline && !['OL', 'UL', 'DL','LI','DT','DD'].includes(parentTag) && !isHidden && !isTooSmall) {
    // Add a CSS class to the element
    elem.classList.add('small-target');

    // Add a div container to the element
    elem.insertAdjacentHTML(
      "afterend",
      `<div class="target-size-8228965">The target size in pixels for this element is <strong>${elemWidth} x ${elemHeight}</strong></div>`
    );
  }
});
