removeInjectedAccessibleNames();

function removeInjectedDivs() {
  const messageClasses = [
    'html-ul-message', 
    'aria-ul-message'
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}

removeInjectedDivs();