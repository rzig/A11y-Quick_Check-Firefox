function removeInjectedDivs() {
    const messageClasses = [
      'data-name-prohibited-aria',
      'data-name-prohibited-html'
    ];
  
    messageClasses.forEach((messageClass) => {
      const messageDivs = document.querySelectorAll(`[${messageClass}]`);
  
      messageDivs.forEach((messageDiv) => {
        messageDiv.removeAttribute(messageClass);
      });
    });
  }
  
  removeInjectedDivs();
  