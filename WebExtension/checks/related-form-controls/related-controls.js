function addFieldsetDiv(fieldset, divClass, textContent) {
  const div = document.createElement('div');
  div.classList.add(divClass);
  const text = document.createTextNode(textContent);
  div.appendChild(text);
  fieldset.parentNode.insertBefore(div, fieldset);
}

function addFieldsetsBeforeDiv() {
  const fieldsets = document.getElementsByTagName('fieldset');
  for (let i = 0; i < fieldsets.length; i++) {
    addFieldsetDiv(fieldsets[i], 'fieldset-present-5599775', 'A fieldset element is present');
  }
}

function addNestedFieldsetsBeforeDiv() {
  const fieldsets = document.getElementsByTagName('fieldset');
  for (let i = 0; i < fieldsets.length; i++) {
    const nestedFieldsets = fieldsets[i].getElementsByTagName('fieldset');
    for (let j = 0; j < nestedFieldsets.length; j++) {
      addFieldsetDiv(nestedFieldsets[j], 'nested-fieldset-present-5599775', 'A nested fieldset element is present');
    }
  }
}

function addLegendsBeforeDiv() {
  const legends = document.getElementsByTagName('legend');
  for (let i = 0; i < legends.length; i++) {
    const legend = legends[i];
    const div = document.createElement('div');
    div.classList.add('legend-present-5599775');
    if (legend !== legend.parentNode.firstElementChild) {
      div.classList.add('not-first-number5599775');
      const text = document.createTextNode('The Legend is present but is not the first element child');
      div.appendChild(text);
    } else {
      const text = document.createTextNode('The Legend is present and is the first element child');
      div.appendChild(text);
    }

    // Check if the legend is empty
    if (!legend.textContent.trim()) {
      const emptyTextMessage = document.createTextNode(' There is no legend text.');
      div.appendChild(emptyTextMessage);
    }

    legend.parentNode.insertBefore(div, legend);
  }
}

function addGroupBeforeDiv() {
  const groups = document.querySelectorAll('[role="group"]');
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    const div = document.createElement('div');
    div.classList.add('group-present-5599775');
    const text = document.createTextNode('Role [GROUP] wraps this content');
    div.appendChild(text);
    group.parentNode.insertBefore(div, group);
  }
}

function addRadioGroupBeforeDiv() {
  const radioGroups = document.querySelectorAll('[role="radiogroup"]');
  for (let i = 0; i < radioGroups.length; i++) {
    const radioGroup = radioGroups[i];
    const div = document.createElement('div');
    div.classList.add('radiogroup-present-5599775');
    const text = document.createTextNode('Role [RADIOGROUP] wraps this content');
    div.appendChild(text);
    radioGroup.parentNode.insertBefore(div, radioGroup);
  }
}

function addAriaLabelledByAfterDiv() {
  const labelledBys = document.querySelectorAll('[aria-labelledby]');
  for (let i = 0; i < labelledBys.length; i++) {
    const labelledBy = labelledBys[i];
    const div = document.createElement('div');
    div.classList.add('labelledby-present-5599775');
    const text = document.createTextNode('[HAS a name] aria-labelledby="' + labelledBy.getAttribute('aria-labelledby') + '"');
    div.appendChild(text);
    labelledBy.parentNode.insertBefore(div, labelledBy.nextSibling);
  }
}

// Call the functions
addFieldsetsBeforeDiv();
addNestedFieldsetsBeforeDiv();
addLegendsBeforeDiv();
addGroupBeforeDiv();
addRadioGroupBeforeDiv();
addAriaLabelledByAfterDiv();
