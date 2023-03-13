// Get all elements with the small-target class
document.querySelectorAll('.small-target')
// Loop through each element and remove the class
  .forEach(elem => {
  // Remove the div container if it exists
  const targetSizeElem = elem.nextElementSibling;
  if (targetSizeElem && targetSizeElem.classList.contains('target-size-8228965')) {
    targetSizeElem.remove();
  }
  // Remove the small-target class
  elem.classList.remove('small-target');
});
