function injectAccessibleDivs() {
    const elements = document.querySelectorAll('button, input, select, a, label, textarea');
  
    elements.forEach((element) => {
      const accName = computeAccessibleName(element);
      if (accName) {
        // Check if the next sibling is the injected div with the same class
        const existingDiv = element.nextElementSibling;
        if (!(existingDiv && existingDiv.classList.contains('computedProperties-9984746'))) {
          // Create and insert the new div
          const div = document.createElement('div');
          div.classList.add('computedProperties-9984746');
          const accNameTextNode = document.createTextNode('accName: ');
          div.appendChild(accNameTextNode);
          const textNode = document.createTextNode(accName);
          div.appendChild(textNode);
  
          element.insertAdjacentElement('afterend', div);
        }
      }
    });
  }
  
  // Call the function to inject accessible divs
  injectAccessibleDivs();

/**
 * Computes the accessible name for the given element based on the W3C Accessibility Guidelines for Name Computation.
 * @param {HTMLElement} element - The element to compute the accessible name for.
 * @returns {string} - The computed accessible name for the element, or an empty string if no accessible name can be computed.
 */
function computeAccessibleName(element) {
  if (!element) {
    return '';
  }
  
  if (element.hasAttribute('aria-label')) {
    return element.getAttribute('aria-label');
  }
  
  const roles = element.getAttribute('role');
  if (roles && roles.split(/\s+/).indexOf('presentation') !== -1) {
    return '';
  }
  
  if (element.tagName === 'AREA' && element.hasAttribute('alt')) {
    return element.getAttribute('alt');
  }
  
  if (element.hasAttribute('title')) {
    return element.getAttribute('title');
  }
  
  if (element.tagName === 'INPUT') {
    const type = element.getAttribute('type');
    if (type === 'button' || type === 'submit' || type === 'reset' || type === 'image') {
      if (element.hasAttribute('value')) {
        return element.getAttribute('value');
      }
    } else if (type === 'checkbox' || type === 'radio') {
      const label = findClosestLabel(element);
      if (label) {
        return computeAccessibleName(label);
      }
    } else if (element.hasAttribute('placeholder')) {
      return element.getAttribute('placeholder');
    }
  }
  
  if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
    return element.getAttribute('placeholder');
  }
  
  if (element.tagName === 'SELECT') {
    const label = findClosestLabel(element);
    if (label) {
      return computeAccessibleName(label);
    } else {
      const selectedOption = element.querySelector('option:checked');
      if (selectedOption) {
        return selectedOption.textContent.trim();
      }
    }
  }
  
  if (element.hasAttribute('aria-labelledby')) {
    const labelIds = element.getAttribute('aria-labelledby').split(/\s+/);
    const labels = Array.from(document.querySelectorAll('[id]')).filter((label) => labelIds.indexOf(label.getAttribute('id')) !== -1);
    if (labels.length > 0) {
      return labels.map((label) => label.textContent.trim()).join(' ');
    }
  }
  
  return '';
}

/**
 * Finds the closest label element to the given input element.
 * @param {HTMLInputElement} input - The input element to find the closest label element for.
 * @returns {HTMLLabelElement|null} - The closest label element, or null if no label element is found.
 */
function findClosestLabel(input) {
    if (!input) {
      return null;
    }
    
    let label = null;
    
    if (input.hasAttribute('aria-labelledby')) {
      const labelIds = input.getAttribute('aria-labelledby').split(/\s+/);
      const labels = Array.from(document.querySelectorAll('[id]')).filter((label) => labelIds.indexOf(label.getAttribute('id')) !== -1);
      if (labels.length > 0) {
        label = labels[0];
      }
    }
    
    if (!label) {
      label = input.closest('label');
    }
    
    return label;
  }
  