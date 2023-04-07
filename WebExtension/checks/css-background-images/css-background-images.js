function showBackgroundImages() {
  const allElements = document.getElementsByTagName('*');
  const inlineBackgroundClass = "inline-background-8892664";
  const cssBackgroundClass = "css-background-8892664";

  for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const style = window.getComputedStyle(element);

      if (style.backgroundImage !== 'none') {
          const inlineStyle = element.getAttribute('style');

          if (inlineStyle && inlineStyle.indexOf('background-image') !== -1) {
              element.classList.add('inline-css-image');
              const message = "This image is inserted using inline style";
              createMessageDiv(element.inlineBackgroundClass, message);
          } else {
              element.classList.add('css-image');
              const message = "This image is inserted using CSS";
              createMessageDiv(element, cssBackgroundClass, message);
          }
      }
  }
}

showBackgroundImages();