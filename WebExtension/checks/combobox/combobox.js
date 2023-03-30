function checkComboboxAttributes() {
    checkInputInsideComboboxContainer();
    checkAriaLabelledby();
    checkAriaActiveDescendant();
    checkAriaLabelledby();
    checkAriaOwnsUsage();
  }

function checkInputInsideComboboxContainer() {
    const inputs = document.querySelectorAll('input[role="combobox"]');
  
    inputs.forEach((input) => {
      const parent = input.parentElement;
      const parentRole = parent.getAttribute('role');
  
      if (parentRole !== 'combobox') {
        const messageClass = 'missing-container-776553';
        const message = 'Input element should be inside a container element with role="combobox"';
  
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(messageClass);
        const messageText = document.createTextNode(message);
        messageDiv.append(messageText);
        input.after(messageDiv);
      }
    });
  }
  
  function checkAriaLabelledby() {
    const inputs = document.querySelectorAll('input[role="combobox"]');
  
    inputs.forEach((input) => {
      const ariaLabelledby = input.getAttribute('aria-labelledby');
      const ariaLabel = input.getAttribute('aria-label');
      const id = input.getAttribute('id');
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;
      const hasVisibleLabel = label !== null;
  
      if (hasVisibleLabel && label.tagName.toLowerCase() !== 'label') {
        const messageClass = 'incorrect-visible-label-776553';
        const message = 'The visible label should be an HTML label element';
  
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(messageClass);
        const messageText = document.createTextNode(message);
        messageDiv.append(messageText);
        input.after(messageDiv);
      } else if (hasVisibleLabel && ariaLabelledby !== null) {
        const messageClass = 'unnecessary-aria-labelledby-776553';
        const message = 'Remove aria-labelledby attribute when using an HTML label element';
  
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(messageClass);
        const messageText = document.createTextNode(message);
        messageDiv.append(messageText);
        input.after(messageDiv);
      } else if (!hasVisibleLabel && ariaLabelledby === null && ariaLabel === null) {
        const messageClass = 'missing-aria-labelledby-or-aria-label-776553';
        const message = 'Missing aria-labelledby or aria-label attribute for the combobox';
  
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(messageClass);
        const messageText = document.createTextNode(message);
        messageDiv.append(messageText);
        input.after(messageDiv);
      }
    });
  }  
  
  function checkAriaActiveDescendant() {
    const inputs = document.querySelectorAll('input[role="combobox"]');
  
    inputs.forEach((input) => {
      const ariaExpanded = input.getAttribute('aria-expanded');
      const ariaActiveDescendant = input.getAttribute('aria-activedescendant');
  
      if (ariaExpanded === 'true' && (ariaActiveDescendant === null || ariaActiveDescendant === '')) {
        const messageClass = 'missing-aria-activedescendant-776553';
        const message = 'Missing aria-activedescendant attribute when aria-expanded is set to "true"';
  
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(messageClass);
        const messageText = document.createTextNode(message);
        messageDiv.append(messageText);
        input.after(messageDiv);
      }
    });
  }

  function checkAriaOwnsUsage() {
    const inputs = document.querySelectorAll('input[role="combobox"]');
    const comboboxContainers = document.querySelectorAll('div[role="combobox"]');
  
    inputs.forEach((input) => {
      const ariaOwns = input.getAttribute('aria-owns');
      if (ariaOwns !== null) {
        const messageClass = 'unsupported-aria-1_0-776553';
        const message = 'It looks like you are using the unsupported ARIA 1.0 pattern. Please update to ARIA 1.2';
  
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(messageClass);
        const messageText = document.createTextNode(message);
        messageDiv.append(messageText);
        input.after(messageDiv);
      }
    });
  
    comboboxContainers.forEach((container) => {
      const ariaOwns = container.getAttribute('aria-owns');
      if (ariaOwns !== null) {
        const messageClass = 'unsupported-aria-1_1-776553';
        const message = 'It looks like you are using the unsupported ARIA 1.1 pattern. Please update to ARIA 1.2';
  
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(messageClass);
        const messageText = document.createTextNode(message);
        messageDiv.append(messageText);
        container.after(messageDiv);
      }
    });
  }
  
 // Call the checkComboboxAttributes function
checkComboboxAttributes();