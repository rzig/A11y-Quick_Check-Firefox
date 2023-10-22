"use strict";

export class SetAllCheckboxesUtils {
    static setCheckAllCheckbox(tabNumber: number, tabConfiguration: any): { checkAllCheckbox: HTMLInputElement, checkAllLabel: HTMLLabelElement } {
      const checkAllCheckbox = document.createElement("input");
      checkAllCheckbox.type = "checkbox";
      checkAllCheckbox.id = `check-all-${tabNumber}`;
      checkAllCheckbox.classList.add("check-all");
  
      const checkAllLabel = document.createElement("label");
      checkAllLabel.htmlFor = checkAllCheckbox.id;
  
      // Append the tab name to the end of the "Check All" label
      checkAllLabel.innerText = `Check All - ${tabConfiguration.name}`;
  
      return { checkAllCheckbox, checkAllLabel };
    }
  }

  export class CheckboxManager {
    // The method for updating the "check all" checkbox
    public updateCheckAllState(tabPanel: HTMLElement): void {
      const checkboxes = tabPanel.querySelectorAll<HTMLInputElement>(
        "input[type='checkbox']:not(.check-all)"
      );
      const checkedCheckboxes = Array.from(checkboxes).filter(
        (checkbox) => checkbox.checked
      );
  
      const checkAllCheckbox =
        tabPanel.querySelector<HTMLInputElement>(".check-all");
  
      if (!checkAllCheckbox) return;
  
      if (checkedCheckboxes.length === 0) {
        checkAllCheckbox.checked = false;
        checkAllCheckbox.indeterminate = false;
      } else if (checkedCheckboxes.length === checkboxes.length) {
        checkAllCheckbox.checked = true;
        checkAllCheckbox.indeterminate = false;
      } else {
        checkAllCheckbox.indeterminate = true;
        checkAllCheckbox.checked = false;
      }
    }
  }