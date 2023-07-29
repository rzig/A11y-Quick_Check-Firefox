"use strict";

// Function to remove data attributes and injected divs
function removeDataAttributesAndDivs(): void {
    for (const element of document.querySelectorAll("[data-domCount-889557]")) {
        element.removeAttribute("data-domCount-889557");
    }
    
    removeInjectedDivs([
        'has-aria-hidden--true-889557',
        'has-aria-hidden--false-889557',
    ]);
}

// Execute the function
removeDataAttributesAndDivs();