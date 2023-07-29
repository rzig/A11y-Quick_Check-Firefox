"use strict";

// Helper function to check if an element is visible
function isVisible(element: HTMLElement): boolean {
    return !(element.offsetWidth === 0 && element.offsetHeight === 0) && getComputedStyle(element).visibility !== "hidden";
}

// Function to add a class to all focusable elements
function addClassToFocusableElements(): void {
    const focusableElements = Array.from(document.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]')) as HTMLElement[];

    let i = 1;
    for (const element of focusableElements) {
        if (isVisible(element)) {
            element.setAttribute(`data-domCount-889557`, `${i}`);
            i++;
        }
    }
}

// Function to add a child div to each element with a data-domCount-889557 attribute
function addDomCountDivs(): void {
    const elementsWithDomCount = Array.from(document.querySelectorAll("[data-domCount-889557]")) as HTMLElement[];
    const domCountDivClass = "domCountDiv";

    for (const element of elementsWithDomCount) {
        const dataCount = element.getAttribute("data-domCount-889557");
        if (dataCount) {
            createChildMessageDiv(element, domCountDivClass, `${dataCount}`);
        }
    }
}

// Execute the functions
addClassToFocusableElements();
addDomCountDivs();