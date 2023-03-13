function removeMissingAltMessages() {
  // Remove all elements with the 'missing-alt-message' class
  const messageElements = document.querySelectorAll('.missing-alt-message');
  for (let i = 0; i < messageElements.length; i++) {
    messageElements[i].remove();
  }

  // Remove any text nodes added after the images
  const imgElements = document.querySelectorAll('img');
  for (let i = 0; i < imgElements.length; i++) {
    const nextSibling = imgElements[i].nextSibling;
    if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE) {
      nextSibling.remove();
    }
  }
}

removeMissingAltMessages();


undefined;