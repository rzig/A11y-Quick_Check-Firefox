function removeInjectedMessageDivs() {
  const injectedMessageDivs = document.querySelectorAll('.alt-text-message-88927564');
  injectedMessageDivs.forEach((messageDiv) => {
      messageDiv.remove();
  });
}

removeInjectedMessageDivs();