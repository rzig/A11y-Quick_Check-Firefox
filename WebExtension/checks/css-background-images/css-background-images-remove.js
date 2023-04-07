function removeInjectedDivs() {
  const messageClasses = [
    'inline-background-8892664',
    'css-background-8892664'
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}

removeInjectedDivs();
