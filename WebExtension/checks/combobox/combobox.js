// Check ARIA attributes for all combobox inputs
function checkComboboxListAttributes() {

  const comboboxInputs = document.querySelectorAll('input[role="combobox"]');
  checkAriaActiveDescendant(comboboxInputs);
  checkAriaExpanded(comboboxInputs);
  checkAriaControls(comboboxInputs);
  checkAriaAutocomplete(comboboxInputs);
  checkAriaOwnsUsage(comboboxInputs);
}

// Check if the "aria-expanded" attribute is present on combobox inputs
function checkAriaExpanded(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaExpanded = input.getAttribute('aria-expanded');
    if (ariaExpanded === null) {
      createMessageDiv(input, 'missing-aria-expanded-776553', 'The combobox input should have the "aria-expanded" attribute');
    }
  });
}

// Check if the "aria-controls" attribute is present on combobox inputs
function checkAriaControls(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaControls = input.getAttribute('aria-controls');
    if (ariaControls === null) {
      createMessageDiv(input, 'missing-aria-controls-776553', 'The combobox input should have the "aria-controls" attribute');
    }
  });
}

// Check if the "aria-autocomplete" attribute is present on combobox inputs
function checkAriaAutocomplete(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaAutocomplete = input.getAttribute('aria-autocomplete');
    if (ariaAutocomplete === null) {
      createMessageDiv(input, 'missing-aria-autocomplete-776553', 'The combobox input should have the "aria-autocomplete" attribute');
    }
  });
}

// Check if the "aria-activedescendant" attribute is set correctly on combobox inputs when "aria-expanded" is true
function checkAriaActiveDescendant(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaExpanded = input.getAttribute('aria-expanded');
    const ariaActiveDescendant = input.getAttribute('aria-activedescendant');

    if (ariaExpanded === 'true') {
      if (ariaActiveDescendant !== null && ariaActiveDescendant !== '') {
        createMessageDiv(input, 'aria-conditions-met-776553', 'All conditions are met');
      } else {
        createMessageDiv(input, 'missing-aria-activedescendant-776553', 'Check that aria-activedescendant attribute is set to the id of the role option that has aria-selected=true');
      }
    }
  });
}

// Check if the "aria-owns" attribute is being used correctly and if ARIA 1.0 or 1.1 patterns are being used
function checkAriaOwnsUsage(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaOwns = input.getAttribute('aria-owns');
    if (ariaOwns !== null) {
      createMessageDiv(input, 'unsupported-aria-1_0-776553', 'It looks like you are using the unsupported ARIA 1.0 pattern. Please update to ARIA 1.2');
    }
  });

  const comboboxContainers = document.querySelectorAll('div[role="combobox"]');

  comboboxContainers.forEach((container) => {
    const ariaOwns = container.getAttribute('aria-owns');
    if (ariaOwns !== null) {
      createMessageDiv(container, 'unsupported-aria-1_1-776553', 'It looks like you are using the unsupported ARIA 1.1 pattern. Please update to ARIA 1.2');
    }
  });
}

// Call the checkComboboxAttributes function
checkComboboxListAttributes();
