function removeInjectedDivs() {
  const injectedDivClasses = [
    'fieldset-present-5599775',
    'nested-fieldset-present-5599775',
    'legend-present-5599775',
    'not-first-number5599775',
    'group-present-5599775',
    'radiogroup-present-5599775',
    'labelledby-present-5599775'
  ];
  
  injectedDivClasses.forEach((className) => {
    const injectedDivs = document.querySelectorAll(`.${className}`);
    injectedDivs.forEach((injectedDiv) => {
      injectedDiv.remove();
    });
  });
}

// Call the function to remove all injected divs, classes, and text
removeInjectedDivs();
