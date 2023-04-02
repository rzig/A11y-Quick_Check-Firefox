function removeInjectedMessageDivs() {
  const injectedMessageDivs = document.querySelectorAll('.missing-alt-message-8892664');
  injectedMessageDivs.forEach((messageDiv) => {
      messageDiv.remove();
  });
}

removeInjectedMessageDivs();