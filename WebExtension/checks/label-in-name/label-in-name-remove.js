function removeInjectedDivs() {
  const messageClasses = [
    'mismatch-9937664',
    'computed-name-9937664'
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}

removeInjectedDivs();
