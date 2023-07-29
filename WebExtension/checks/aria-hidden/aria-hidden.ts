"use strict";

// Helper function to check if an element or any of its parent elements is hidden
function isVisible(element: HTMLElement): boolean {
    let currentElement: HTMLElement | null = element;

    while (currentElement) {
        const style: CSSStyleDeclaration = window.getComputedStyle(currentElement);
        const isHidden: boolean = (style.display === 'none' || style.visibility === 'hidden' || currentElement.hidden);
        if (isHidden) {
            return false;
        }
        currentElement = currentElement.parentElement;
    }
    
    return true;
}

// Function to add a data-attribute to all visible aria-hidden elements
function addDataAttributeToVisibleAriaHiddenElements(): void {
    const ariaHiddenElements: NodeListOf<HTMLElement> = document.querySelectorAll('[aria-hidden]');

    let i = 1;
    for (const element of ariaHiddenElements) {
        if (isVisible(element)) {
            element.setAttribute(`data-domCount-889557`, `${i}`);
            i++;
        }
    }
}

// Function to add a child div and class to each element with a data-domCount-889557 attribute
function addAriaHiddenClassAndMessage(): void {
    const elementsWithDomCount: NodeListOf<HTMLElement> = document.querySelectorAll("[data-domCount-889557]");
    const ariaHiddenDivClassTrue = "has-aria-hidden--true-889557";
    const ariaHiddenDivClassFalse = "has-aria-hidden--false-889557";
    const domCountDivClass = "domCountDiv";

    for (const element of elementsWithDomCount) {
        const ariaHiddenAttribute: string | null = element.getAttribute("aria-hidden");
        const domCount: string | null = element.getAttribute("data-domCount-889557");
        
        if (ariaHiddenAttribute === "true") {
            const message: string = `(DOM Order ${domCount}): Has aria-hidden='true'`;
            const ariaHiddenDivClass: string = ariaHiddenDivClassTrue;
            element.classList.add(domCountDivClass);
            createChildMessageDiv(element, ariaHiddenDivClass, message);
        } 
        else if (ariaHiddenAttribute === "false") {
            const message: string = `(DOM Order ${domCount}): Has aria-hidden='false'`;
            const ariaHiddenDivClass: string = ariaHiddenDivClassFalse;
            element.classList.add(domCountDivClass);
            createChildMessageDiv(element, ariaHiddenDivClass, message);
        }
    }
}

// Execute the functions
addDataAttributeToVisibleAriaHiddenElements();
addAriaHiddenClassAndMessage();