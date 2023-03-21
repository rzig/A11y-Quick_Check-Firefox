function removeOrderedListMessages() {
  const messages = document.querySelectorAll(".html-ol-message, .aria-ol-message");
  messages.forEach((message) => message.remove());
}

removeOrderedListMessages();
