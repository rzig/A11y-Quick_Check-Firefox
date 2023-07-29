"use strict";

function removeRelatedControls() {
  // Remove the 'fieldset-present-5599775' attribute from each fieldset
  const fieldsets = document.querySelectorAll("fieldset");
  for (const element of fieldsets) {
    element.removeAttribute("data-fieldset-present-5599775");
  }

  // Remove the 'data-nested-fieldset-present-5599775' attribute from each nested fieldset
  const nestedFieldsets = document.querySelectorAll("fieldset fieldset");
  for (const nestedFieldset of nestedFieldsets) {
    nestedFieldset.removeAttribute("data-nested-fieldset-present-5599775");
  }

  const legends = document.querySelectorAll("legend");
  for (const legendName of legends) {
    legendName.removeAttribute("data-legend-present-5599775");
  }

  // Call the function to remove all injected divs, classes, and text
  removeInjectedDivs([
    'fieldset-present-5599775',
    'nested-fieldset-present-5599775',
    'legend-present-5599775',
    'not-first-number5599775',
    'group-present-5599775',
    'radiogroup-present-5599775',
    'labelledByName-5599775',
    'labelledByRadioGroupName-5599775',
    'missingRoleGroupName-5599775',
    'missingRoleRadioGroupName-5599775',
    'ariaLabelName-5599775',
    'ariaLabelRadioGroupName-5599775'
  ]);
}

removeRelatedControls();