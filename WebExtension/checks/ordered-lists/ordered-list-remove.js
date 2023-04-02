function removeInjectedAccessibleNames() {
  const injectedAccessibleNames = document.querySelectorAll('.html-ol-message, .aria-ol-message');
  injectedAccessibleNames.forEach((accessibleNameDiv) => {
      accessibleNameDiv.remove();
  });
}

removeInjectedAccessibleNames();