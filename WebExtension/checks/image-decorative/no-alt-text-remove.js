function removeDecorativeImageMessages() {
  const messageDivs = document.querySelectorAll(".aria-hidden-message, .presentation-role-message, .redundant-role-message, .decorative-message");

  for (let i = 0; i < messageDivs.length; i++) {
    const messageDiv = messageDivs[i];
    const imgElement = messageDiv.previousElementSibling;

    // Remove the message div element
    messageDiv.remove();

    // Remove any text nodes before the image element
    let prevNode = imgElement.previousSibling;
    while (prevNode && prevNode.nodeType === Node.TEXT_NODE) {
      const prevPrevNode = prevNode.previousSibling;
      prevNode.remove();
      prevNode = prevPrevNode;
    }

    // Remove the injected classes from the image element
    imgElement.classList.remove("aria-hidden", "decorative", "presentation");
  }
}

removeDecorativeImageMessages();


undefined;