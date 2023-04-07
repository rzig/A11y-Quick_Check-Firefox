function test() {
  window.alert("Test of common code");
}

function createMessageDiv(element, messageClass, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  element.after(messageDiv);
}

function removeInjectedDivs(messageClasses) {
    console.log("Removing...");

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}
