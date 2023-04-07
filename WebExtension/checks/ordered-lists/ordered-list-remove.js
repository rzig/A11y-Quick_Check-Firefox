function removeInjectedDivs() {
  const messageClasses = [
    'html-ol-message',
    'aria-ol-message'
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}

removeInjectedDivs();
