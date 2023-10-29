import { options } from './helper.utils.js';
import { saveOptionsObject } from './session.storage.js';

// Gets the value from the session storage, and sets the checkbox checkedness.
export async function loadCheckboxValue(checkbox: HTMLInputElement) {
  const checkboxName = checkbox.id;

  let checked = false;

  // If we don't have a value, assume it's false, and save it back.
  if (!options.has(checkboxName)) {
    options.set(checkboxName, checked);
    await saveOptionsObject();
  }

  const value = options.get(checkboxName);
  if (typeof value === 'boolean') {
    checked = value;
  } else {
    console.error('Unexpected type for checkbox value', value);
  }

  checkbox.checked = checked;
}
