function removeInjectedDivs() {
  const messageClasses = [
    'html-hgroup-message-58997365',
    'aria-hgroup-message-58997365'
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}

removeInjectedDivs();
