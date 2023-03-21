function removeUnorderedListMessages() {
  const messages = document.querySelectorAll(".html-ul-message, .aria-ul-message");
  messages.forEach((message) => message.remove());
}

removeUnorderedListMessages();
