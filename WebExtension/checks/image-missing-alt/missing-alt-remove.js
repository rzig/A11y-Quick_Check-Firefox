function removeInjectedDivs() {
  const messageClasses = [
    'missing-alt-message-8892664'
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}

removeInjectedDivs();
