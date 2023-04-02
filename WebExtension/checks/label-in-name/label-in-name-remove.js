function removeInjectedAccessibleNames() {
  const injectedAccessibleNames = document.querySelectorAll('.mismatch-9937664, .computed-name-9937664');
  injectedAccessibleNames.forEach((accessibleNameDiv) => {
      accessibleNameDiv.remove();
  });
}

removeInjectedAccessibleNames();