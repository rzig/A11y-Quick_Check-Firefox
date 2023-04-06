function removeInjectedDivs() {
  const messageClasses = [
    'target-size-8228965',
    'circle-shape-8228965',
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      if (messageClass === 'circle-shape-8228965') {
        // Remove the pos-rel-8228965 class from the parent element
        messageDiv.parentNode.classList.remove('pos-rel-8228965');
      }
      messageDiv.remove();
    });
  });
}

// Call the function
removeInjectedDivs();
