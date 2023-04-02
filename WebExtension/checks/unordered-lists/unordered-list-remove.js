function removeInjectedAccessibleNames() {
  const injectedAccessibleNames = document.querySelectorAll('.html-ul-message, .aria-ul-message');
  injectedAccessibleNames.forEach((accessibleNameDiv) => {
      accessibleNameDiv.remove();
  });
}

removeInjectedAccessibleNames();