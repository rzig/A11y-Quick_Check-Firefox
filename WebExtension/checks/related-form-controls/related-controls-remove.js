function removeInjectedElements() {
    const elementsToRemove = document.querySelectorAll('.fieldset-present-5599775,.nested-fieldset-present-5599775,.legend-present-5599775,.group-present-5599775,.radiogroup-present-5599775,.labelledby-present-5599775"]');
    for (let i = 0; i < elementsToRemove.length; i++) {
      elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
    }
  }
  