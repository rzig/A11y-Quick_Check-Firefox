function removeInjectedDivs() {
    const messageClasses = [
      'missing-aria-modal-776553',
      'invalid-accessible-name-776553',
      'dialog-in-inert-layer-776553',
      'inert-layer-missing-aria-hidden-776553',
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