function removeInjectedDivs() {
  const messageClasses = [
    'container-776553', // Add this line to remove the container divs
    'missing-attr-776553',
    'incorrect-visible-label-776553',
    'unnecessary-aria-labelledby-776553',
    'missing-aria-labelledby-or-aria-label-776553',
    'missing-aria-labels-776553',
    'missing-aria-expanded-776553',
    'missing-aria-autocomplete-776553',
    'missing-aria-activedescendant-776553',
    'unsupported-aria-1_0-776553',
    'unsupported-aria-1_1-776553',
    'incorrect-listbox-role-776553',
    'incorrect-option-role-776553',
    'missing-aria-selected-776553',
    'incorrect-aria-selected-776553',
    'missing-listbox-accessible-name-776553',
    'recommend-html-structure-776553',
    'missing-aria-controls-776553',
  ];

  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      messageDiv.remove();
    });
  });
}

function removeInjectedInlineStyles() {
  const inputs = document.querySelectorAll('input[role="combobox"]');

  inputs.forEach((input) => {
    const inputStyles = input.getAttribute('style');

    if (inputStyles) {
      const stylesArray = inputStyles.split(';').filter((style) => {
        const styleKey = style.trim().split(':')[0];
        return styleKey !== 'border';
      });

      const updatedStyles = stylesArray.join(';');
      input.setAttribute('style', updatedStyles);
    }
  });
}

// Call the functions
removeInjectedDivs();
removeInjectedInlineStyles();
