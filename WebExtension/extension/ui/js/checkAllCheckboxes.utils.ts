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