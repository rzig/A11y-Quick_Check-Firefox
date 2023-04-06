// Create a global wrapper div for messages
if (typeof wrapperDiv === 'undefined') {
  var wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('container-776553');
}

// Create a message div with specified class and message text
function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

// Insert a message div into the global wrapper div and place it after the target element
function insertMessageDiv(target, messageDiv) {
  const messageClass = messageDiv.className;

  // Check if a div with the same message class already exists in the wrapper div
  const existingMessageDiv = wrapperDiv.querySelector(`.${messageClass}`);

  // If a div with the same message class does not exist, insert the new message div
  if (!existingMessageDiv) {
    wrapperDiv.append(messageDiv);
    target.after(wrapperDiv);
  }
}

// Check ARIA attributes for all combobox inputs
function checkComboboxListAttributes() {
  // Clear the content of the global wrapper div
  wrapperDiv.innerHTML = '';

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
      const messageDiv = createMessageDiv('missing-aria-expanded-776553', 'The combobox input should have the "aria-expanded" attribute');
      insertMessageDiv(input, messageDiv);
    }
  });
}

// Check if the "aria-controls" attribute is present on combobox inputs
function checkAriaControls(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaControls = input.getAttribute('aria-controls');
    if (ariaControls === null) {
      const messageDiv = createMessageDiv('missing-aria-controls-776553', 'The combobox input should have the "aria-controls" attribute');
      insertMessageDiv(input, messageDiv);
    }
  });
}

// Check if the "aria-autocomplete" attribute is present on combobox inputs
function checkAriaAutocomplete(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaAutocomplete = input.getAttribute('aria-autocomplete');
    if (ariaAutocomplete === null) {
      const messageDiv = createMessageDiv('missing-aria-autocomplete-776553', 'The combobox input should have the "aria-autocomplete" attribute');
      insertMessageDiv(input, messageDiv);
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
        const messageDiv = createMessageDiv('aria-conditions-met-776553', 'All conditions are met');
        insertMessageDiv(input, messageDiv);
      } else {
        const messageDiv = createMessageDiv('missing-aria-activedescendant-776553', 'Check that aria-activedescendant attribute is set to the id of the role option that has aria-selected=true');
        insertMessageDiv(input, messageDiv);
      }
    }
  });
}

// Check if the "aria-owns" attribute is being used correctly and if ARIA 1.0 or 1.1 patterns are being used
function checkAriaOwnsUsage(comboboxInputs) {
  comboboxInputs.forEach((input) => {
    const ariaOwns = input.getAttribute('aria-owns');
    if (ariaOwns !== null) {
      const messageDiv = createMessageDiv('unsupported-aria-1_0-776553', 'It looks like you are using the unsupported ARIA 1.0 pattern. Please update to ARIA 1.2');
      insertMessageDiv(input, messageDiv);
    }
  });

  const comboboxContainers = document.querySelectorAll('div[role="combobox"]');

  comboboxContainers.forEach((container) => {
    const ariaOwns = container.getAttribute('aria-owns');
    if (ariaOwns !== null) {
      const messageDiv = createMessageDiv('unsupported-aria-1_1-776553', 'It looks like you are using the unsupported ARIA 1.1 pattern. Please update to ARIA 1.2');
      insertMessageDiv(container, messageDiv);
    }
  });
}

// Call the checkComboboxAttributes function
checkComboboxListAttributes();
