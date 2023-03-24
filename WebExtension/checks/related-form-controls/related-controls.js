function addFieldsetBeforeDiv() {
    const fieldsets = document.getElementsByTagName('fieldset');
    for (let i = 0; i < fieldsets.length; i++) {
      const fieldset = fieldsets[i];
      const div = document.createElement('div');
      div.classList.add('fieldset-present-5599775');
      const text = document.createTextNode('A fieldset element is present');
      div.appendChild(text);
      fieldset.parentNode.insertBefore(div, fieldset);
    }
  }
  
  function addNestedFieldsetBeforeDiv() {
    const fieldsets = document.getElementsByTagName('fieldset');
    for (let i = 0; i < fieldsets.length; i++) {
      const fieldset = fieldsets[i];
      const nestedFieldsets = fieldset.getElementsByTagName('fieldset');
      for (let j = 0; j < nestedFieldsets.length; j++) {
        const nestedFieldset = nestedFieldsets[j];
        const div = document.createElement('div');
        div.classList.add('nested-fieldset-present-5599775');
        const text = document.createTextNode('A nested fieldset element is present');
        div.appendChild(text);
        nestedFieldset.parentNode.insertBefore(div, nestedFieldset);
      }
    }
  }
  
  function addLegendBeforeDiv() {
    const legends = document.getElementsByTagName('legend');
    for (let i = 0; i < legends.length; i++) {
      const legend = legends[i];
      const div = document.createElement('div');
      div.classList.add('legend-present-5599775');
      if (legend !== legend.parentNode.firstChild) {
        div.classList.add('not-first-number5599775');
      }
      const text = document.createTextNode('The Legend is present but is not first child');
      div.appendChild(text);
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
addFieldsetBeforeDiv();
addNestedFieldsetBeforeDiv();
addLegendBeforeDiv();
addGroupBeforeDiv();
addRadioGroupBeforeDiv();
addAriaLabelledByAfterDiv();
  