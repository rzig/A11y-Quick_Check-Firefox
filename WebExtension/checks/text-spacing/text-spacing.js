// Get all elements with text content
document.querySelectorAll("*:not(script):not(style):not(head):not(title):not(meta):not(link):not(br):not(hr):not(img):not(input):not(textarea)")

// Loop through all text elements
  .forEach(element => {
  // Add a class to the element
  element.classList.add("text-elements");
});
