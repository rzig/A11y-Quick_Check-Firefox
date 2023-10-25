"use strict";

export class TabManager {
  private tabs: NodeListOf<Element> | null;
  private tabList: Element | null;
  private tabFocus: number;

  constructor() {
    this.tabs = document.querySelectorAll('[role="tab"]');
    this.tabList = document.querySelector('[role="tablist"]')!;
    this.tabFocus = 0;
    this.init();
  }

  private init() {
    if (this.tabList) {
      this.tabList.addEventListener("keydown", (event) => this.handleKeyDown(event));
    } else {
      console.error('tabList is null');
    }
    
    if (this.tabs) {
      for (const tab of this.tabs) {
        tab.addEventListener("click", this.changeTabs.bind(this));
      }
    } else {
      console.error('tabs are null');
    }
  }

  private handleKeyDown(event: Event) {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }

    if (!this.tabs) {
      return;
    }
    const previousTab = this.tabs[this.tabFocus];
    if (previousTab != null) {
      previousTab.setAttribute("tabindex", "-1");
    }

    if (event.key === "ArrowRight") {
      this.tabFocus++;
      if (this.tabFocus >= this.tabs.length) {
        this.tabFocus = 0;
      }
    } else if (event.key === "ArrowLeft") {
      this.tabFocus--;
      if (this.tabFocus < 0) {
        this.tabFocus = this.tabs.length - 1;
      }
    } else if (event.key === "Home") {
      this.tabFocus = 0;
    } else if (event.key === "End") {
      this.tabFocus = this.tabs.length - 1;
    }

    const newTab = this.tabs[this.tabFocus];
    if (newTab != null && newTab instanceof HTMLElement) {
      newTab.setAttribute("tabindex", "0");
      newTab.focus();
    }
  }

  public changeTabs(el: Event) {
    const previousTab = el.target!;

    if (!(previousTab instanceof HTMLElement)) {
      return;
    }

    const tabList = previousTab.parentNode!;
    const tabContainer = tabList.parentNode;

    const selectedTabs = tabList.querySelectorAll('[aria-selected="true"]');
    for (const currentTab of selectedTabs) {
      currentTab.setAttribute("aria-selected", "false");
    }

    previousTab.setAttribute("aria-selected", "true");

    const tabpanels = tabContainer!.querySelectorAll('[role="tabpanel"]');
    for (const p of tabpanels) {
      p.setAttribute("hidden", "true");
    }

    const activePanel = tabContainer!.querySelector(`#${previousTab.getAttribute("aria-controls")}`)!;
    activePanel.removeAttribute("hidden");
  }
}