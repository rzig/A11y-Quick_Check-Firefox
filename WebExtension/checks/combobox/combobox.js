function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function checkComboboxListAttributes() {
  const comboboxInputs = document.querySelectorAll('input[role="combobox"]');
  checkAriaActiveDescendant(comboboxInputs);
  checkAriaExpanded(comboboxInputs);
  checkAriaControls();
  checkAriaAutocomplete(comboboxInputs);
  checkAriaOwnsUsage(comboboxInputs);
}

function checkAriaExpanded(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaExpanded = input.getAttribute('aria-expanded');
    if (ariaExpanded === null) {
      const messageDiv = createMessageDiv('missing-aria-expanded-776553', 'The combobox input should have the "aria-expanded" attribute');
      input.after(messageDiv);
    }
  });
}

function checkAriaControls() {
  const inputs = document.querySelectorAll('input[role="combobox"]');

  inputs.forEach((input) => {
    const ariaExpanded = input.getAttribute('aria-controls');
    if (ariaExpanded === null) {
      const messageDiv = createMessageDiv('missing-aria-controls-776553', 'The combobox input should have the "aria-controls" attribute');
      input.after(messageDiv);
    }
  });
}

function checkAriaAutocomplete(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaAutocomplete = input.getAttribute('aria-autocomplete');
    if (ariaAutocomplete === null) {
      const messageDiv = createMessageDiv('missing-aria-autocomplete-776553', 'The combobox input should have the "aria-autocomplete" attribute');
      input.after(messageDiv);
    }
  });
}

function checkAriaActiveDescendant(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaExpanded = input.getAttribute('aria-expanded');
    const ariaActiveDescendant = input.getAttribute('aria-activedescendant');

    if (ariaExpanded === 'true') {
      if (ariaActiveDescendant !== null && ariaActiveDescendant !== '') {
        const messageDiv = createMessageDiv('aria-conditions-met-776553', 'All conditions are met');
        input.after(messageDiv);
      } else {
        const messageDiv = createMessageDiv('missing-aria-activedescendant-776553', 'Check that aria-activedescendant attribute is set to the id of the role option that has aria-selected=true');
        input.after(messageDiv);
      }
    }
  });
}

function checkAriaOwnsUsage(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaOwns = input.getAttribute('aria-owns');
    if (ariaOwns !== null) {
      const messageDiv = createMessageDiv('unsupported-aria-1_0-776553', 'It looks like you are using the unsupported ARIA 1.0 pattern. Please update to ARIA 1.2');
      input.after(messageDiv);
    }
  });

  const comboboxContainers = document.querySelectorAll('div[role="combobox"]');

  comboboxContainers.forEach((container) => {
    const ariaOwns = container.getAttribute('aria-owns');
    if (ariaOwns !== null) {
      const messageDiv = createMessageDiv('unsupported-aria-1_1-776553', 'It looks like you are using the unsupported ARIA 1.1 pattern. Please update to ARIA 1.2');
      container.after(messageDiv);
    }
  });
}
  
 // Call the checkComboboxAttributes function
checkComboboxListAttributes();