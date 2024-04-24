"use strict";

// Helper function to check if an element is visible
function isVisibleFO(element: HTMLElement): boolean {
    return !(element.offsetWidth === 0 && element.offsetHeight === 0) && getComputedStyle(element).visibility !== "hidden";
}

// Function to add a class to all focusable elements
function addClassToFocusableElements(): void {
    const focusableElements = Array.from(document.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]')) as HTMLElement[];

    let i = 1;
    for (const element of focusableElements) {
        // Check if the element is visible and not inside the .top-right-container-9927845
        if (isVisibleFO(element) && !element.closest('.top-right-container-9927845')) {
            element.setAttribute(`data-domCount-889557`, `${i}`);
            i++;
        }
    }
}

// Function to add a child div to each element with a data-domCount-889557 attribute
function addDomCountDivs(): void {
    const elementsWithDomCount = Array.from(document.querySelectorAll("[data-domCount-889557]")) as HTMLElement[];
    const domCountDivClass = "dom-count-div";

    for (const element of elementsWithDomCount) {
        const dataCount = element.getAttribute("data-domCount-889557");
        if (dataCount) {
            createChildMessageDiv(element, domCountDivClass, `${dataCount}`);
        }
    }
}

// Function to create and append a child div with the count
function createChildMessageDiv(parentElement: HTMLElement, className: string, text: string): void {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = text;
    parentElement.appendChild(div);
}

// Execute the functions
addClassToFocusableElements();
addDomCountDivs();