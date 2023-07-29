"use strict";

/***
Based on code at MDN: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
***/

function configureTabs() {
  const tabs = document.querySelectorAll('[role="tab"]');

  // at some stage, we should probably do a check for null here
  const tabList = document.querySelector('[role="tablist"]')!;

  // Add a click event handler to each tab
  for (const tab of tabs) {
    tab.addEventListener("click", changeTabs);
  }

  // Enable arrow navigation between tabs in the tab list
  let tabFocus = 0;

  tabList.addEventListener("keydown", (event) => {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }
    if (event.key === "ArrowRight" || event.key === "ArrowLeft"
      || event.key === "Home" || event.key === "End") {
      const previousTab = tabs[tabFocus];
      if (previousTab != null) {
        previousTab.setAttribute("tabindex", "-1");
      }

      if (event.key === "ArrowRight") {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
      } else if (event.key === "ArrowLeft") {
        tabFocus--;

        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      } else if (event.key === "Home") {
        tabFocus = 0;
      } else if (event.key === "End") {
        tabFocus = tabs.length - 1;
      }

      const newTab = tabs[tabFocus];
      if (newTab != null && newTab instanceof HTMLElement) {
        newTab.setAttribute("tabindex", "0");
        newTab.focus();
      }
    }
  });
};

function changeTabs(el: Event) {
  // The newly selected tab
  const previousTab = el.target!;

  if (!(previousTab instanceof HTMLElement)){
    return;
  }
  // The group of tabs (but not the tabpanel)
  const tabList = previousTab.parentNode!;
  // The entire control that contains tabs and tabpanels
  const tabContainer = tabList.parentNode;

  // Remove all current selected tabs
  const selectedTabs = tabList.querySelectorAll('[aria-selected="true"]');

  for (const currentTab of selectedTabs) {
    currentTab.setAttribute("aria-selected", "false");
  }

  // Set this tab as selected
  previousTab.setAttribute("aria-selected", "true");

  // Hide all tab panels
  const tabpanels = tabContainer!.querySelectorAll('[role="tabpanel"]');
  for(const p of tabpanels) {
    p.setAttribute("hidden", "true");
  }

  // Show the selected panel
  // This code differs slightly from the MDN code. The MDN code accesses the parent control of the container,
  // but because the tabpanels are already contained within a div that's referenced by tabContainer, we don't
  // need to get its parent. 
  const activePanel=tabContainer!.querySelector(`#${previousTab.getAttribute("aria-controls")}`)!;
  activePanel.removeAttribute("hidden");
}
