function removeBackgroundImages() {
  const allElements = document.getElementsByTagName('*');

  for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i];
    element.classList.remove('inline-css-image', 'css-image');
    const messageElements = element.parentNode.querySelectorAll('.inline-background, .css-background');
    for (let j = 0; j < messageElements.length; j++) {
      messageElements[j].parentNode.removeChild(messageElements[j]);
    }
  }
}

removeBackgroundImages();



undefined;