function showAltText() {

    const imgElements = document.querySelectorAll("img");

    function addMessageAfter(elem, messageClass, message) {
    const existingMessage = elem.nextElementSibling;
    if (existingMessage && existingMessage.classList.contains(messageClass)) {
      // Message already exists, no need to add again
      return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.classList.add(messageClass);
    const messageText = document.createTextNode(message);
    messageDiv.append(messageText);
    elem.after(messageDiv);
  }

  for (let i = 0; i < imgElements.length; i++) {
    const altText = imgElements[i].alt;

    if (altText !== "") {
      const message = `This image ALT text is: ${altText}`;
      addMessageAfter(imgElements[i], "alt-text-message", message);
    }
  }
}

showAltText();

undefined;