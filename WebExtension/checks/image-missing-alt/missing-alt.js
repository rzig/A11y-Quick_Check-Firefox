function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function showMissingAltAttributes() {
  const imgElements = document.querySelectorAll("img");
  const missingAltMessageClass = "missing-alt-message-8892664";

  for (let i = 0; i < imgElements.length; i++) {
      const hasAlt = imgElements[i].hasAttribute('alt');

      if (!hasAlt) {
          const message = "This image is missing an ALT attribute";
          const missingAltMessageDiv = createMessageDiv(missingAltMessageClass, message);
          imgElements[i].after(missingAltMessageDiv);
      }
  }
}

showMissingAltAttributes();
