function removeInjectedDivsByClass(className) {
  const injectedDivs = document.getElementsByClassName(className);
  while (injectedDivs.length > 0) {
    injectedDivs[0].parentNode.removeChild(injectedDivs[0]);
  }
}

function removeAllInjectedDivs() {
  removeInjectedDivsByClass('fieldset-present-5599775');
  removeInjectedDivsByClass('nested-fieldset-present-5599775');
  removeInjectedDivsByClass('legend-present-5599775');
  removeInjectedDivsByClass('not-first-number5599775');
  removeInjectedDivsByClass('group-present-5599775');
  removeInjectedDivsByClass('radiogroup-present-5599775');
  removeInjectedDivsByClass('labelledby-present-5599775');
}

// Call the function to remove all injected divs, classes, and text
removeAllInjectedDivs();
