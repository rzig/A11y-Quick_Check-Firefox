"use strict";

// Function to restore all CSS
function restoreCSS() {
    // Remove existing styles
    removeCustomCSS();

    // Add back original styles
    for (const originalCSS of document.originalCSS_38ff418) {
        if (originalCSS.type === 'link') {
            let link = document.createElement('link');
            link.href = originalCSS.href!;
            link.rel = 'stylesheet';
            originalCSS.parent.appendChild(link);
        } else if (originalCSS.type === 'style') {
            let style = document.createElement('style');
            style.innerHTML = originalCSS.content!;
            originalCSS.parent.appendChild(style);
        }
    }
}

// Function to remove max width on all images and SVGs
function removeMaxWidthOnImagesAndSVG() {
    // Select all img and svg elements
    const imgAndSvgElements = document.querySelectorAll('img, svg');

    // Loop through the NodeList and set max-width on each element
    for (const imgAndSvgElement of imgAndSvgElements) {
        const imgAndSvgTag=<HTMLElement>imgAndSvgElement;
        imgAndSvgTag.style.maxWidth = "";
    }
}

// Restore original CSS, then remove max-width from images and SVGs
restoreCSS();
removeMaxWidthOnImagesAndSVG();