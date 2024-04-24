"use strict";

function addFieldsetDiv(fieldset: HTMLFieldSetElement, divClass: string, textContent: string) {
    addMessageToPrecedingDiv(fieldset, divClass, textContent);

    if (fieldset.parentElement && fieldset.parentElement.nodeName.toLowerCase() !== 'fieldset') {
        fieldset.setAttribute("data-fieldset-present-5599775", "");
    }
}

function addFieldsetsBeforeDiv() {
    const fieldsets = document.getElementsByTagName('fieldset');
    for (const fieldset of fieldsets) {
        if (fieldset.parentElement && fieldset.parentElement.nodeName.toLowerCase() !== 'fieldset') {
            addFieldsetDiv(fieldset, 'fieldset-present-5599775', 'Grouped with a Fieldset');
        }
    }
}

function addNestedFieldsetsBeforeDiv() {
    const fieldsets = document.getElementsByTagName('fieldset');
    for (const fieldset of fieldsets) {
        const nestedFieldsets = fieldset.getElementsByTagName('fieldset');
        for (const nestedFieldset of nestedFieldsets) {
            addFieldsetDiv(nestedFieldset, 'nested-fieldset-present-5599775', 'Grouped with a (nested) Fieldset');
            nestedFieldset.setAttribute('data-nested-fieldset-present-5599775', '');
        }
    }
}

function addLegendsBeforeDiv() {
  const legends = document.querySelectorAll('legend');
  for (const legend of legends) {
      const fieldsetParent = legend.closest('fieldset');

      // Check if the legend has a fieldset parent
      if (fieldsetParent) {
          // Get the first element child of the fieldset
          const firstChild = fieldsetParent.firstElementChild;

          // Check if the first element child is the legend
          if (firstChild !== legend) {
              // Legend is not the first child, generate a warning
              createChildMessageDiv(legend, 'legend-not-first-child-5599775', '(Warning) The Legend is present but is not the first element child of Fieldset');
          } else {
              // Legend is the first child, generate success message
              createChildMessageDiv(legend, 'legend-first-child-5599775', 'The Legend is present and is the first element child of Fieldset');
          }

          // Check if the legend is empty and display a warning if it is
          if (!legend.textContent || !legend.textContent.trim()) {
              createChildMessageDiv(legend, 'legend-no-text-5599775', 'Warning There is no legend text for the fieldset.');
          }
      } else {
          // Legend has no fieldset parent, generate a warning
          createChildMessageDiv(legend, 'legend-no-parent-fieldset-5599775', 'Warning The Legend is present but is not contained within a Fieldset.');
      }
  }
}

function addGroupBeforeDiv() {
    const groups = document.querySelectorAll('[role="group"]');
    for (const group of groups) {
        createChildMessageDiv(group, 'group-present-5599775', 'Role [GROUP] wraps this content');
    }
}

function addRadioGroupBeforeDiv() {
    const radioGroups = document.querySelectorAll('[role="radiogroup"]');
    for (const radioGroup of radioGroups) {
        createChildMessageDiv(radioGroup, 'radiogroup-present-5599775', 'Role [RADIOGROUP] wraps this content');
    }
}

function roleGroupName() {
    const groupElements = document.querySelectorAll('[role="group"]');
    for (const groupElement of groupElements) {
        const id = groupElement.getAttribute('aria-labelledby');
        if (id) {
            const labelledElement = document.getElementById(id);
            if (labelledElement) {
                const textNode = labelledElement.textContent || '';
                createChildMessageDiv(groupElement, 'labelled-by-name-5599775', `aria-labelledby provides the accessible name "${textNode}" for the group.`);
            }
        } else if (!groupElement.hasAttribute('aria-label')) {
            createChildMessageDiv(groupElement, 'missing-role-group-name-5599775', `(Warning) Role Group should have a name via aria-label or aria-labelledby.`);
        }
    }
}

function roleRadioGroupName() {
    const radioGroupElements = document.querySelectorAll('[role="radiogroup"]');
    for (const radioGroupElement of radioGroupElements) {
        const id = radioGroupElement.getAttribute('aria-labelledby');
        if (id) {
            const labelledRadioGroup = document.getElementById(id);
            if (labelledRadioGroup) {
                const textContent = labelledRadioGroup.textContent || '';
                createChildMessageDiv(radioGroupElement, 'labelled-by-radio-group-name-5599775', `aria-labelledby provides the accessible name "${textContent}" for the radio group.`);
            }
        } else if (!radioGroupElement.hasAttribute('aria-label')) {
            createChildMessageDiv(radioGroupElement, 'missing-role-radio-group-name-5599775', `(Fail) Role Radiogroup must have a name via aria-label or aria-labelledby.`);
        }
    }
}

function roleGroupAriaLabel() {
    const groupElements = document.querySelectorAll('[role="group"]');
    for (const groupElement of groupElements) {
        const ariaLabel = groupElement.getAttribute('aria-label');
        if (ariaLabel) {
            createChildMessageDiv(groupElement, 'aria-label-name-5599775', `aria-label provides the accessible name "${ariaLabel}" for the group.`);
        }
    }
}

function roleRadioGroupAriaLabel() {
    const radioGroupElements = document.querySelectorAll('[role="radiogroup"]');
    for (const radioGroupElement of radioGroupElements) {
        const ariaLabel = radioGroupElement.getAttribute('aria-label');
        if (ariaLabel) {
            createChildMessageDiv(radioGroupElement, 'aria-label-radio-group-name-5599775', `aria-label provides the accessible name "${ariaLabel}" for the radio group.`);
        }
    }
}

// Call the functions
addFieldsetsBeforeDiv();
addNestedFieldsetsBeforeDiv();
addLegendsBeforeDiv();
addGroupBeforeDiv();
addRadioGroupBeforeDiv();
roleGroupName();
roleRadioGroupName();
roleGroupAriaLabel();
roleRadioGroupAriaLabel();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerRelatedControls(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-fc-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimised'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }
 
  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing related form controls",
    "The purpose of this check is to evaluate whether related form controls are grouped. It aims to ensure these elements are correctly structured, highlighting best practices such as the correct placement of legend elements within fieldset tags, and verifying that ARIA groupings have accessible names provided by aria-label or aria-labelledby. The check offers feedback on the presence and configuration of these elements, reinforcing the importance of proper labeling for accessibility and the structural integrity of forms."
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
    appendLink(wcagLinks, "1.3.1 Info and Relationships (Level A)", "WCAG");
    appendLink(htmlLinks, "4.10.15 The fieldset element", "HTML");
    appendLink(htmlLinks, "4.10.16 The legend element", "HTML");

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Related Form Controls");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerRelatedControls();