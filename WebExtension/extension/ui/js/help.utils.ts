"use strict";

// Optional help text for the section
export function createHelpSection(fieldset: HTMLElement, helpSection: string) {
    const helpText = document.createElement("p");
    helpText.innerText = helpSection;
    helpText.classList.add("help-section-7726536");
    fieldset.appendChild(helpText);
  }
  
  // Optional help text for the item
  export function createHelpCheck(listItem: HTMLElement, helpCheck: string) {
    const helpText = document.createElement("p");
    helpText.innerText = helpCheck;
    helpText.classList.add("help-check-77265");
    listItem.appendChild(helpText);
  }
  
  // Create a help link
  export function createHelpLink(tabPanel: HTMLElement, helpUrl?: string) {
    const helpLink = document.createElement("a");
    helpLink.innerText = "About A11y Quick Check";
    helpLink.classList.add("help-link");
    
    if (helpUrl) {
      helpLink.href = chrome.runtime.getURL(helpUrl);
    } else {
      helpLink.href = "#"; // Fallback to placeholder if no helpUrl is provided.
    }
  
    // Add an event listener to open the help URL in a new Chrome window
    helpLink.addEventListener("click", (e) => {
      if (helpLink.href !== "#") {
        e.preventDefault();
        chrome.windows.create({
          url: helpLink.href,
          type: "popup",
          width: 720,
          height: 614,
          left: 0,
          top: 0,
        });
      }
    });
  
    tabPanel.appendChild(helpLink);
  }
  