"use strict";
export class HelpUtils {
  static createHelpSection(fieldset: HTMLElement, helpSection: string) {
    const helpText = document.createElement("p");
    helpText.innerText = helpSection;
    helpText.classList.add("help-section-7726536");
    fieldset.appendChild(helpText);
  }

  static createHelpCheck(listItem: HTMLElement, helpCheck: string) {
    const helpText = document.createElement("p");
    helpText.innerText = helpCheck;
    helpText.classList.add("help-check-77265");
    listItem.appendChild(helpText);
  }

  static createHelpLink(tabPanel: HTMLElement, helpUrl?: string) {
    const helpLink = document.createElement("a");
    helpLink.innerText = "About A11y Quick Check";
    helpLink.classList.add("help-link");

    if (helpUrl) {
      helpLink.href = chrome.runtime.getURL(helpUrl);
    } else {
      helpLink.href = "#";
    }

    helpLink.addEventListener("click", (e) => {
      if (helpLink.href !== "#") {
        e.preventDefault();
        chrome.windows.create({
          url: helpLink.href,
          type: "popup",
          width: 800,
          height: 640,
          left: 0,
          top: 0,
        });
      }
    });

    tabPanel.appendChild(helpLink);
  }
}