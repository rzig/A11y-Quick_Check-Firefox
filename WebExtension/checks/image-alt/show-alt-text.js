function showAltText() {
  const imgElements = document.querySelectorAll("img");
  const altTextMessageClass = "alt-text-message-88927564";

  for (let i = 0; i < imgElements.length; i++) {
      const altText = imgElements[i].alt;
      const altTextPresent = altText && altText.trim() !== "";

      if (altTextPresent) {
          const message = `This image ALT text is: ${altText}`;
          createMessageDiv(imgElements[i], altTextMessageClass, message);
      }
  }
}

showAltText();
