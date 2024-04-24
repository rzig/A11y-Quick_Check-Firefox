"use strict";

function removeAutocompleteMessages(): void {
  // Classes that are common to all elements with autocomplete functionality
  const commonAutocompleteClass: string = 'neutral-9927845';
  const commonAutocompleteMessageClass: string = 'neutral-message-9927845';
  const divToRemove: string = 'remove-inner-atoc-9927845'; // New div class to remove

  // Remove messages and classes associated with autocomplete attributes
  const elementsWithAutocomplete: NodeListOf<HTMLElement> = document.querySelectorAll('[autocomplete]');
  const autocompleteClassesToRemove: string[] = [commonAutocompleteClass]; // Start with common class

  for (const element of elementsWithAutocomplete as any) {
    const autocompleteValue: string | null = element.getAttribute('autocomplete');
    if (autocompleteValue === null) continue;

    const autocompleteMessageClass: string = `autocomplete-${autocompleteValue.replace(/ /g, '-')}-message-5575855`;

    autocompleteClassesToRemove.push(autocompleteMessageClass);
    // Remove the specific and common classes from the element
    element.classList.remove(autocompleteMessageClass, commonAutocompleteClass);
  }

  // Remove messages and classes associated with aria-autocomplete attributes
  const elementsWithAriaAutocomplete: NodeListOf<HTMLElement> = document.querySelectorAll('[aria-autocomplete]');
  const ariaAutocompleteClassesToRemove: string[] = [commonAutocompleteClass]; // Start with common class

  for (const element of elementsWithAriaAutocomplete as any) {
    const ariaAutocompleteValue: string | null = element.getAttribute('aria-autocomplete');
    if (ariaAutocompleteValue === null) continue;

    const ariaAutocompleteMessageClass: string = `aria-autocomplete-${ariaAutocompleteValue.replace(/ /g, '-')}-message-5575855`;

    ariaAutocompleteClassesToRemove.push(ariaAutocompleteMessageClass);
    // Remove the specific and common classes from the element
    element.classList.remove(ariaAutocompleteMessageClass, commonAutocompleteClass);
  }

  // Use the imported function to remove the message divs for both specific and common classes
  removeInjectedDivs(autocompleteClassesToRemove.concat(ariaAutocompleteClassesToRemove));

  // Also remove any common message divs that were added
  removeInjectedDivs([commonAutocompleteMessageClass]);

  // Remove the div with class top-right-container-9927845
  const divsToRemove = document.querySelectorAll(`.${divToRemove}`);
  divsToRemove.forEach(div => div.remove());
}

removeAutocompleteMessages();

removeInjectedDivs([
  "remove-outerdiv-9927845"
]);