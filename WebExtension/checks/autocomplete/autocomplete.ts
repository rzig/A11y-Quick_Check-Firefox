"use strict";

function addAutocompleteMessages(): void {
  const elementsWithAutocomplete: NodeListOf<HTMLElement> =
    document.querySelectorAll("[autocomplete]:not(.top-right-container-9927845 [autocomplete], .inner-container-9927845 [autocomplete])");

  for (const element of elementsWithAutocomplete as any) {
    const autocompleteValue: string | null =
      element.getAttribute("autocomplete");
    if (autocompleteValue === null) continue;

    const autocompleteMessage: string = `Needs manual confirmation Check that the value autocomplete="${autocompleteValue}" matches the required input`;
    const autocompleteMessageClass: string = `autocomplete-${autocompleteValue.replace(
      / /g,
      "-"
    )}-message-5575855`;
    const commonAutocompleteClass: string = "neutral-9927845";
    const commonAutocompleteMessageClass: string = "neutral-message-9927845";

    element.classList.add(autocompleteMessageClass, commonAutocompleteClass); // Add both classes
    createChildMessageDiv(
      element,
      commonAutocompleteMessageClass,
      autocompleteMessage
    );
  }
}

addAutocompleteMessages();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerAutocomplete(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-atoc-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimised'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing HTML autocomplete",
    "The purpose of this check is to identify web elements that utilise the HTML autocomplete attribute, displaying their assigned values for visual inspection. This procedure ensures that the supplied values align with the WCAG 1.3.5 Identify Input Purpose (Level AA) criteria, requiring manual confirmation to ascertain that the autocomplete attribute's value meets the correct input specifications."
  );
  innerDiv.appendChild(checkDetails);

  // // Manual notes details component
  // const checkManualDetails = createDetailsComponent(
  //   "How to manually test ( is coming! )",
  //   "This section will be populated with how to manually test"
  // );
  // innerDiv.appendChild(checkManualDetails);


  // Use createReferenceContainer to generate the reference section
  const referenceContainer = createReferenceContainer();
  if (referenceContainer) {
    innerDiv.appendChild(referenceContainer);

    // Link List
    const linkList = document.createElement("ul");
    linkList.className = "reference-list-9927845";
    linkList.style.margin = "0";
    linkList.style.padding = "0";
    
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
    appendLink(
      htmlLinks,
      "4.10.18.7.1 Autofilling form controls: the autocomplete attribute",
      "HTML"
    );

    // Add the action buttons
  }
  createDismissButton(innerDiv, "Autocomplete");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerAutocomplete();
