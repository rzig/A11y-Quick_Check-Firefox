function showBackgroundImages() {
  function addBackgroundImageStyles() {
    const allElements = document.getElementsByTagName('*');

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

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const style = window.getComputedStyle(element);

      if (style.backgroundImage !== 'none') {
        const inlineStyle = element.getAttribute('style');

        if (inlineStyle && inlineStyle.indexOf('background-image') !== -1) {
          element.classList.add('inline-css-image');
          const message = "This image is inserted using inline style";
          addMessageAfter(element, "inline-background", message);
        } else {
          element.classList.add('css-image');
          const message = "This image is inserted using CSS";
          addMessageAfter(element, "css-background", message);
        }
      }
    }
  }

  addBackgroundImageStyles();
}

showBackgroundImages();

undefined;