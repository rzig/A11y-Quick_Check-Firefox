function removeDescriptionListMessages() {
  const messages = document.querySelectorAll(".html-dl-message, .aria-dl-message");
  messages.forEach((message) => message.remove());
}

removeDescriptionListMessages();
