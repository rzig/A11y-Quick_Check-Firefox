"use strict";

export class TabsUtils {
  static createTabList(container: HTMLElement): HTMLDivElement {
    const tabList = document.createElement("div");
    tabList.role = "tablist";
    tabList.ariaLabel = "Quick check sections";
    container.appendChild(tabList);
    return tabList;
  }

  static createTab(
    tabList: HTMLDivElement,
    tabConfiguration: any,
    tabNumber: number,
    initialTabNumber: number
  ): HTMLButtonElement {
    const tabButton = document.createElement("button");
    tabButton.role = "tab";
    tabButton.id = "tab-" + tabNumber;
    tabButton.ariaSelected = (tabNumber === initialTabNumber).toString();
    tabButton.tabIndex = tabNumber === initialTabNumber ? 0 : -1;
    tabButton.innerText = tabConfiguration.name;
    tabList.appendChild(tabButton);
    return tabButton;
  }

  static createTabPanel(
    container: HTMLElement,
    tabNumber: number,
    initialTabNumber: number
  ): HTMLDivElement {
    const tabPanel = document.createElement("div");
    tabPanel.id = "panel-" + tabNumber;
    tabPanel.role = "tabpanel";
    tabPanel.hidden = tabNumber !== initialTabNumber;
    container.appendChild(tabPanel);
    return tabPanel;
  }

  static linkTabAndPanel(
    tabButton: HTMLButtonElement,
    tabPanel: HTMLDivElement
  ) {
    tabButton.setAttribute("aria-controls", tabPanel.id);
    tabPanel.setAttribute("aria-labelledby", tabButton.id);
  }
}