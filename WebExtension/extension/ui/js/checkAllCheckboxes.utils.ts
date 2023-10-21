"use strict";

export function createCheckAll(tabPanel: HTMLDivElement, tabConfiguration: any, tabNumber: number) {
    const checkAllCheckbox = document.createElement("input");
    checkAllCheckbox.type = "checkbox";
    checkAllCheckbox.id = `check-all-${tabNumber}`;
    checkAllCheckbox.classList.add("check-all");
  
    const checkAllLabel = document.createElement("label");
    checkAllLabel.htmlFor = checkAllCheckbox.id;
    checkAllLabel.innerText = `Check All - ${tabConfiguration.name}`;
  
    // ... rest of your checkbox code ...
  
    tabPanel.appendChild(checkAllCheckbox);
    tabPanel.appendChild(checkAllLabel);
  }