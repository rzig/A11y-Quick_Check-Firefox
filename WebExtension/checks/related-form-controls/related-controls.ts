"use strict";

function addFieldsetDiv(fieldset: HTMLFieldSetElement, divClass: string, textContent: string) {
  const div = document.createElement('div');
  div.classList.add(divClass);
  const text = document.createTextNode(textContent);
  div.appendChild(text);
  fieldset.parentElement!.insertBefore(div, fieldset);
  
  // Check if the fieldset's parent is not another fieldset before adding the attribute
  if (fieldset.parentElement!.nodeName.toLowerCase() !== 'fieldset') {
    fieldset.setAttribute("data-fieldset-present-5599775", "");
  }
}

function addFieldsetsBeforeDiv() {
  const fieldsets = document.getElementsByTagName('fieldset');
  for (const fieldset of fieldsets) {
    // Skip if the fieldset's parent is another fieldset
    if (fieldset.parentElement!.nodeName.toLowerCase() !== 'fieldset') {
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
      
      // Add the data-nested-fieldset-present-5599775 attribute
      nestedFieldset.setAttribute('data-nested-fieldset-present-5599775', '');
    }
  }
}

function addLegendsBeforeDiv() {
  const legends = document.getElementsByTagName('legend');
  for (const legend of legends) {
    const div = document.createElement('div');
    div.classList.add('legend-present-5599775');
    legend.setAttribute('data-legend-present-5599775', '');
    if (legend !== legend.parentNode!.firstElementChild) {
      div.classList.add('not-first-number5599775');
      const text = document.createTextNode('(Warning) The Legend is present but is not the first element child of Fieldset');
      div.appendChild(text);
    } else {
      const text = document.createTextNode(' The Legend is present and is the first element child of Fieldset');
      div.appendChild(text);
    }

    // Check if the legend is empty
    if (legend.textContent == null || !legend.textContent.trim()) {
      const emptyTextMessage = document.createTextNode(' (Warning) There is no legend text for the fieldset.');
      div.appendChild(emptyTextMessage);
    }

    legend.parentNode!.insertBefore(div, legend);
  }
}

function addGroupBeforeDiv() {
  const groups = document.querySelectorAll('[role="group"]');
  for (const group of groups) {
    const div = document.createElement('div');
    div.classList.add('group-present-5599775');
    const text = document.createTextNode('Role [GROUP] wraps this content');
    div.appendChild(text);
    group.parentNode!.insertBefore(div, group);
  }
}

function addRadioGroupBeforeDiv() {
  const radioGroups = document.querySelectorAll('[role="radiogroup"]');
  for (const radioGroup of radioGroups) {
    const div = document.createElement('div');
    div.classList.add('radiogroup-present-5599775');
    const text = document.createTextNode('Role [RADIOGROUP] wraps this content');
    div.appendChild(text);
    radioGroup.parentNode!.insertBefore(div, radioGroup);
  }
}

function roleGroupName() {
  const groupElements = document.querySelectorAll('[role="group"]');
  
  for (const groupElement of groupElements) {
    const id = groupElement.getAttribute('aria-labelledby');
    const labelledElement = document.getElementById(id!);
    
    if (labelledElement) {
      const textNode = labelledElement.textContent;
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('labelledByName-5599775');
      messageDiv.textContent = `aria-labelledby provides the accessible name "${textNode}" for the group.`;
      
      // Insert the message div before the group element
      groupElement.parentNode!.insertBefore(messageDiv, groupElement);
    } else if (!groupElement.hasAttribute('aria-label')) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('missingRoleGroupName-5599775');
      messageDiv.textContent = `(Warning) Role Group should have a name via aria-label or aria-labelledby.`;
      
      // Insert the message div before the group element
      groupElement.parentNode!.insertBefore(messageDiv, groupElement);
    }
  }
}

function roleRadioGroupName() {
  const radioGroupElements = document.querySelectorAll('[role="radiogroup"]');
  
  for (const radioGroupElement of radioGroupElements) {
    const id = radioGroupElement.getAttribute('aria-labelledby');
    const labelledRadioGroup = document.getElementById(id!);
    
    if (labelledRadioGroup) {
      const textNode = labelledRadioGroup.textContent;
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('labelledByRadioGroupName-5599775');
      messageDiv.textContent = `aria-labelledby provides the accessible name "${textNode}" for the radio group.`;
      
      // Insert the message div before the group element
      radioGroupElement.parentNode!.insertBefore(messageDiv, radioGroupElement);
    } else if (!radioGroupElement.hasAttribute('aria-label')) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('missingRoleRadioGroupName-5599775');
      messageDiv.textContent = `(Fail) Role Radiogroup must have a name via aria-label or aria-labelledby.`;
      
      // Insert the message div before the group element
      radioGroupElement.parentNode!.insertBefore(messageDiv, radioGroupElement);
    }
  }
}

function roleGroupAriaLabel() {
  const groupElements = document.querySelectorAll('[role="group"]');
  
  for (const groupElement of groupElements) {
    const ariaLabel = groupElement.getAttribute('aria-label');
    
    if (ariaLabel) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('ariaLabelName-5599775');
      messageDiv.textContent = `aria-label provides the accessible name "${ariaLabel}" for the group.`;
      
      // Insert the message div before the group element
      groupElement.parentNode!.insertBefore(messageDiv, groupElement);
    }
  }
}

function roleRadioGroupAriaLabel() {
  const radioGroupElements = document.querySelectorAll('[role="radiogroup"]');
  
  for (const radioGroupElement of radioGroupElements) {
    const ariaLabel = radioGroupElement.getAttribute('aria-label');
    
    if (ariaLabel) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('ariaLabelRadioGroupName-5599775');
      messageDiv.textContent = `aria-label provides the accessible name "${ariaLabel}" for the radio group.`;
      
      // Insert the message div before the group element
      radioGroupElement.parentNode!.insertBefore(messageDiv, radioGroupElement);
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
roleRadioGroupAriaLabel()