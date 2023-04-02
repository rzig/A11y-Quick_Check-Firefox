function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function showAltText() {
  const imgElements = document.querySelectorAll("img");
  const altTextMessageClass = "alt-text-message-88927564";

  for (let i = 0; i < imgElements.length; i++) {
      const altText = imgElements[i].alt;
      const altTextPresent = altText && altText.trim() !== "";

      if (altTextPresent) {
          const message = `This image ALT text is: ${altText}`;
          const altTextMessageDiv = createMessageDiv(altTextMessageClass, message);
          imgElements[i].after(altTextMessageDiv);
      }
  }
}

showAltText();
