"use strict";

// Function to restore all CSS
function restoreCSS(callback: Function) {
    // Remove existing styles
    removeCustomCSS();

    let remaining = document.originalCSS_38ff418.length;
    if (!remaining) callback();  // No CSS to load, call the callback immediately

    // Add back original styles
    for (const originalCSS of document.originalCSS_38ff418) {
        if (originalCSS.type === 'link') {
            let link = document.createElement('link');
            link.href = originalCSS.href!;
            link.rel = 'stylesheet';
            link.onload = () => {
                remaining--;
                if (remaining === 0) callback();
            };
            link.onerror = () => {
                //console.error(`Failed to load CSS from ${originalCSS.href}`);
                remaining--;
                if (remaining === 0) callback();
            };
            originalCSS.parent.appendChild(link);
        } else if (originalCSS.type === 'style') {
            let style = document.createElement('style');
            style.innerHTML = originalCSS.content!;
            originalCSS.parent.appendChild(style);
            remaining--;
            if (remaining === 0) callback();
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

function restoreElements() {
    for (const originalElement of document.originalElements_38ff418) {
        originalElement.parent.appendChild(originalElement.element);
    }
}

for (const element of document.querySelectorAll(
    ".displayNone-45865, .visibilityHidden-45865, .opacityZero-45865"
  )) {
    element.classList.remove(
      "displayNone-45865",
      "visibilityHidden-45865",
      "opacityZero-45865",
    );
  }

// Restore original CSS, then remove max-width from images and SVGs
restoreCSS(() => {
    removeMaxWidthOnImagesAndSVG();
    restoreElements();
});