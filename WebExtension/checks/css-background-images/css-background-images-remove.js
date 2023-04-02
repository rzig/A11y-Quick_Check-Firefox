function removeInjectedMessageDivs() {
  const injectedMessageDivs = document.querySelectorAll('.inline-background-8892664, .css-background-8892664');
  injectedMessageDivs.forEach((messageDiv) => {
      messageDiv.remove();
  });
}

removeInjectedMessageDivs();