function removeInjectedAccessibleNames() {
  const injectedAccessibleNames = document.querySelectorAll('.html-dl-message, .aria-dl-message');
  injectedAccessibleNames.forEach((accessibleNameDiv) => {
      accessibleNameDiv.remove();
  });
}

removeInjectedAccessibleNames();