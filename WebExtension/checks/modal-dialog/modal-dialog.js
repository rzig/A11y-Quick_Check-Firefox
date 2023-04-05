function createMessageDiv(messageClass, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(messageClass);
    const messageText = document.createTextNode(message);
    messageDiv.append(messageText);
    return messageDiv;
  }
  
  function checkDialogAttributes() {
    const dialogs = document.querySelectorAll('div[role="dialog"]');
    dialogs.forEach((dialog) => {
      checkAriaModal(dialog);
      checkAccessibleName(dialog);
      checkAriaHidden(dialog);
    });
  }
  
  function checkAriaModal(dialog) {
    const ariaModal = dialog.getAttribute('aria-modal');
    if (ariaModal !== 'true') {
      const messageDiv = createMessageDiv('missing-aria-modal-776553', 'The dialog should have the "aria-modal" attribute set to true');
      dialog.append(messageDiv);
    }
  }
  
  function checkAccessibleName(dialog) {
    const ariaLabel = dialog.getAttribute('aria-label');
    const ariaLabelledBy = dialog.getAttribute('aria-labelledby');
    if ((ariaLabel !== null && ariaLabelledBy !== null) || (ariaLabel === null && ariaLabelledBy === null)) {
      const messageDiv = createMessageDiv('invalid-accessible-name-776553', 'The dialog should have either "aria-label" or "aria-labelledby" attribute, not both or none');
      dialog.append(messageDiv);
    }
  }
  
  function checkAriaHidden(dialog) {
    const isInertLayer = (element) => {
      return element.getAttribute('aria-hidden') === 'true';
    };
  
    const inertLayerElements = Array.from(document.querySelectorAll('[aria-hidden="true"]'));
    const isDialogInInertLayer = inertLayerElements.some((element) => element.contains(dialog));
  
    if (isDialogInInertLayer) {
      const messageDiv = createMessageDiv('dialog-in-inert-layer-776553', 'The dialog should not be a descendant of any element that has "aria-hidden" set to true');
      dialog.append(messageDiv);
    }
  
    const isVisible = dialog.offsetWidth > 0 && dialog.offsetHeight > 0;
    if (isVisible) {
      inertLayerElements.forEach((element) => {
        if (!element.contains(dialog)) {
          const messageDiv = createMessageDiv('inert-layer-missing-aria-hidden-776553', 'Each element containing a portion of the inert layer should have "aria-hidden" set to true');
          element.append(messageDiv);
        }
      });
    }
  }
  
  checkDialogAttributes();
  