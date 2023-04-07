function createMessageDiv(element, messageClass, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  element.after(messageDiv);
}

function removeInjectedDivs(messageClasses) {
  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}
