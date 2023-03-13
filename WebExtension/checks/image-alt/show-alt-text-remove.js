function removeAltText() {
  const messageElements = document.querySelectorAll('.alt-text-message');

  messageElements.forEach(function(element) {
    element.remove();
  });
}

removeAltText();


undefined;