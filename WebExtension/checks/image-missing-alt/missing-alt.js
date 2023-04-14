function showMissingAltAttributes() {
  const imgElements = document.querySelectorAll("img");
  const missingAltMessageClass = "missing-alt-message-8892664";

  for (let i = 0; i < imgElements.length; i++) {
      const hasAlt = imgElements[i].hasAttribute('alt');

      if (!hasAlt) {
          const message = "This image is missing an ALT attribute";
          createMessageDiv(imgElements[i], missingAltMessageClass, message);
      }
  }
}

showMissingAltAttributes();
