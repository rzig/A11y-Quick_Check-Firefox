function removeInjectedDivs() {
  const messageClasses = [
    'aria-hidden-message-8892664',
    'presentation-role-message-8892664',
    'redundant-role-message-8892664',
    'decorative-message-8892664'
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}

removeInjectedDivs();
