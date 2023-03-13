function showDecorativeImages() {
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
    const ariaHidden = imgElements[i].getAttribute('aria-hidden');
    const role = imgElements[i].getAttribute('role');

    if (ariaHidden === 'true') {
      const message = 'aria-hidden set to true used for decorative image. alt="" is the preferred method.';
      addMessageAfter(imgElements[i], "aria-hidden-message", message);
    } else if (role === 'presentation' || role === 'none') {
      const message = 'presentation role used for decorative image. alt="" is the preferred method.';
      addMessageAfter(imgElements[i], "presentation-role-message", message);
    } else if (altText === '' && (role || ariaHidden)) {
      const roleMessage = role ? `Role ${role}` : 'aria-hidden set to true';
      const message = `Decorative image. ${roleMessage} can be removed as it is redundant.`;
      addMessageAfter(imgElements[i], "redundant-role-message", message);
    } else if (altText === '' && !role && !ariaHidden) {
      const message = 'This image is decorative';
      addMessageAfter(imgElements[i], "decorative-message", message);
    }
  }
}

showDecorativeImages();

undefined;