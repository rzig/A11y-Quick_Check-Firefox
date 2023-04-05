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
  
  checkDialogAttributes();
  