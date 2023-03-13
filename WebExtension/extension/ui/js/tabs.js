/***
Based on code at MDN: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
***/

function configureTabs() {
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabList = document.querySelector('[role="tablist"]');
  
  // Add a click event handler to each tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabs);
  }); 
  
  // Enable arrow navigation between tabs in the tab list
  let tabFocus = 0;

  tabList.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft"
        || e.key === "Home" || e.key === "End") {
      tabs[tabFocus].setAttribute("tabindex", -1);

      if (e.key === "ArrowRight") {
        tabFocus++; 
        // If we're at the end, go to the start
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
      } else if (e.key === "ArrowLeft") {
        tabFocus--; 
        
        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      } else if (e.key === "Home") {
        tabFocus = 0;
      } else if (e.key === "End") {
        tabFocus = tabs.length -1;
      }

      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
    }
  });
};

function changeTabs(el) {
  // The newly selected tab
  const selectedTab = el.target;
  // The group of tabs (but not the tabpanel)
  const tabList = selectedTab.parentNode;
  // The entire control that contains tabs and tabpanels
  const tabContainer = tabList.parentNode; 
  
  // Remove all current selected tabs
  tabList
    .querySelectorAll('[aria-selected="true"]')
    .forEach((t) => t.setAttribute("aria-selected", false)); 
    
  // Set this tab as selected
  selectedTab.setAttribute("aria-selected", true);
  
  // Hide all tab panels
  tabContainer
    .querySelectorAll('[role="tabpanel"]')
    .forEach((p) => p.setAttribute("hidden", true)); 
    
  // Show the selected panel
  // This code differs slightly from the MDN code. The MDN code accesses the parent control of the container,
  // but because the tabpanels are already contained within a div that's referenced by tabContainer, we don't
  // need to get its parent. 
  tabContainer
    .querySelector(`#${selectedTab.getAttribute("aria-controls")}`)
    .removeAttribute("hidden");
}
