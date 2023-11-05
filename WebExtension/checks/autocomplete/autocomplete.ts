"use strict";

interface HTMLElementWithAria extends HTMLElement {
  "aria-autocomplete"?: string;
}

function addAutocompleteMessages(): void {
  const elementsWithAutocomplete: NodeListOf<HTMLElement> = document.querySelectorAll('[autocomplete]');
  const elementsWithAriaAutocomplete: NodeListOf<HTMLElementWithAria> = document.querySelectorAll('[aria-autocomplete]');

  for (const element of elementsWithAutocomplete as any) {
    const autocompleteValue: string | null = element.getAttribute('autocomplete');
    if (autocompleteValue === null) continue;

    const autocompleteMessage: string = `Check that the value autocomplete="${autocompleteValue}" matches the required input`;
    const autocompleteMessageClass: string = `autocomplete-${autocompleteValue.replace(/ /g, '-')}-message-5575855`;
    const commonAutocompleteClass: string = 'autocomplete-common-5575855';
    const commonAutocompleteMessageClass: string = 'autocomplete-common-message-5575855';

    element.classList.add(autocompleteMessageClass, commonAutocompleteClass); // Add both classes
    // You might need to adjust this call according to how you're adding messages
    addMessageToPrecedingDiv(element, commonAutocompleteMessageClass, autocompleteMessage); // Use imported function
  }

  for (const element of elementsWithAriaAutocomplete as any) {
    const ariaAutocompleteValue: string | null = element.getAttribute('aria-autocomplete');
    if (ariaAutocompleteValue === null) continue;

    const ariaAutocompleteMessage: string = `Check that the value aria-autocomplete="${ariaAutocompleteValue}" matches the required input.`;
    const ariaAutocompleteMessageClass: string = `aria-autocomplete-${ariaAutocompleteValue.replace(/ /g, '-')}-message-5575855`;
    const commonAriaAutocompleteClass: string = 'autocomplete-common-5575855';
    const commonAriaAutocompleteMessageClass: string = 'autocomplete-common-message-5575855';

    element.classList.add(ariaAutocompleteMessageClass, commonAriaAutocompleteClass); // Add both classes
    // You might need to adjust this call according to how you're adding messages
    addMessageToPrecedingDiv(element, commonAriaAutocompleteMessageClass, ariaAutocompleteMessage); // Use imported function
  }
}

addAutocompleteMessages();