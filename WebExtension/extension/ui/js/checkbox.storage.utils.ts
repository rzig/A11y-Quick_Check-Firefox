import { options } from './helper.utils.js';
import { saveOptionsObject } from './session.storage.js';

// Gets the value from the session storage, and sets the checkbox appropriately
// The checkbox is passed in, and the id is used to look up the saved value, but the checkbox itself's
// checked property is updated directly
export async function loadCheckboxValue(checkbox: HTMLInputElement) {
    const checkboxName = checkbox.id;
  
    let checked = false;
  
    // If we don't have a value, assume it's false, and save it back.
    if (!options.has(checkboxName)) {
      options.set(checkboxName, checked);
      await saveOptionsObject();
    }
  
    checked = options.get(checkboxName)!;
  
    checkbox.checked = checked;
  }