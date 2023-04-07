function removeInjectedDivs() {
    const messageClasses = [
      'svg--decorative-8892664',
      'svg--decorative-with-name-8892664',
      'svg--nodecorative-noname-8892664',
    ];
    messageClasses.forEach((messageClass) => {
      const messageDivs = document.querySelectorAll(`.${messageClass}`);
  
      messageDivs.forEach((messageDiv) => {
        messageDiv.remove();
      });
    });
}

removeInjectedDivs();
