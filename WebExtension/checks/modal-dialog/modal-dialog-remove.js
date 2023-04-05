function removeInjectedDivs() {
    const messageClasses = [
      'missing-aria-modal-776553',
      'invalid-accessible-name-776553',
    ];
    messageClasses.forEach((messageClass) => {
      const messageDivs = document.querySelectorAll(`.${messageClass}`);
  
      messageDivs.forEach((messageDiv) => {
        messageDiv.remove();
      });
    });
  }
  
  // Call the functions
  removeInjectedDivs();  