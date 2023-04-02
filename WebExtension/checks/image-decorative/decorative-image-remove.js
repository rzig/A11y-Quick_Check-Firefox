function removeInjectedMessageDivs() {
  const injectedMessageDivs = document.querySelectorAll('.aria-hidden-message-8892664, .presentation-role-message-8892664, .redundant-role-message-8892664, .decorative-message-8892664');
  injectedMessageDivs.forEach((messageDiv) => {
      messageDiv.remove();
  });
}

removeInjectedMessageDivs();