function showMissingAltAttributes() {

 function addMessageAfter(elem, messageClass, message) {
  // Check if the element already has a message with the given class
  const existingMessage = elem.querySelector(`.${messageClass}`);
  if (existingMessage) {
    return; // Message already exists, don't add it again
  }

  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  elem.after(messageDiv);
}


  const imgElements = document.querySelectorAll("img");

  for (let i = 0; i < imgElements.length; i++) {
    const hasAlt = imgElements[i].hasAttribute('alt');

    if (!hasAlt) {
      const message = "This image is missing an ALT attribute";
      addMessageAfter(imgElements[i], "missing-alt-message", message);
    }
  }
}

showMissingAltAttributes();


undefined;