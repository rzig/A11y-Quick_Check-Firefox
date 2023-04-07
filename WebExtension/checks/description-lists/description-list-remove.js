function removeInjectedDivs() {
  const messageClasses = [
    'html-dl-message',
    'aria-dl-message'
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}

removeInjectedDivs();
