function removeInjectedMessageDivs() {
  const injectedMessageDivs = document.querySelectorAll('.html-hgroup-message-58997365, .aria-hgroup-message-58997365');
  injectedMessageDivs.forEach((messageDiv) => {
      messageDiv.remove();
  });
}

removeInjectedMessageDivs();