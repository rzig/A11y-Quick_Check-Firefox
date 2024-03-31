"use strict";

function addAutocompleteMessages(): void {
  const elementsWithAutocomplete: NodeListOf<HTMLElement> = document.querySelectorAll('[autocomplete]');

  for (const element of elementsWithAutocomplete as any) {
    const autocompleteValue: string | null = element.getAttribute('autocomplete');
    if (autocompleteValue === null) continue;

    const autocompleteMessage: string = `Needs manual confirmation Check that the value autocomplete="${autocompleteValue}" matches the required input`;
    const autocompleteMessageClass: string = `autocomplete-${autocompleteValue.replace(/ /g, '-')}-message-5575855`;
    const commonAutocompleteClass: string = 'neutral-9927845';
    const commonAutocompleteMessageClass: string = 'neutral-message-9927845';

    element.classList.add(autocompleteMessageClass, commonAutocompleteClass); // Add both classes
    createChildMessageDiv(element, commonAutocompleteMessageClass, autocompleteMessage);
  }
}

addAutocompleteMessages();

populateLinkObjects(); // Ensure the links are populated before use.

  function createTopRightContainerAutocomplete(): void {
    const containerDiv = document.createElement("div");
    containerDiv.className = "top-right-container-9927845";

    // Message Paragraph title - directly under the top-right-container
    const importantNotePara: HTMLParagraphElement = document.createElement("p");
    const strongImportantNote: HTMLElement = document.createElement("strong");
    strongImportantNote.textContent = "Feature Summary:";
    importantNotePara.className = "message-heading-9927845";
    importantNotePara.appendChild(strongImportantNote);
    containerDiv.appendChild(importantNotePara);

    // Message Paragraph - directly under title
    const messagePara = document.createElement("p");
    messagePara.textContent =
      "The purpose of this check is to identify web elements that utilise the HTML autocomplete attribute, displaying their assigned values for visual inspection. This procedure ensures that the supplied values align with the WCAG 1.3.5 Identify Input Purpose (Level AA) criteria, requiring manual confirmation to ascertain that the autocomplete attribute's value meets the correct input specifications.";
    containerDiv.appendChild(messagePara);

    // Use createReferenceContainer to generate the reference section
    const referenceContainer = createReferenceContainer();
    containerDiv.appendChild(referenceContainer);

    // Link List
    const linkList = document.createElement("ul");
    linkList.className = "reference-list-9927845";
    referenceContainer.appendChild(linkList);

    // Specified links function
    function appendLink(
      links: Record<string, string>,
      key: string,
      category: string
    ): void {
      const href = links[key];
      if (href) {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.textContent = `${category} - ${key}`;
        listItem.appendChild(anchor);
        linkList.appendChild(listItem);
      }
    }

    // Append specific links
    appendLink(wcagLinks, "1.3.5 Identify Input Purpose (Level AA)", "WCAG");
    appendLink(htmlLinks, "4.10.18.7.1 Autofilling form controls: the autocomplete attribute", "HTML");

    // Add the action buttons
  createDismissButton(containerDiv);
  createMinMaxButton(containerDiv);

    // Append the main container to the document's body
    document.body.appendChild(containerDiv);
  }

  createTopRightContainerAutocomplete();