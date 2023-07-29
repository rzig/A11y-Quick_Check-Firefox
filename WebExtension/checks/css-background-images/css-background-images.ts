"use strict";

function showBackgroundImages() {
    const allElements = document.getElementsByTagName('*');
    const inlineBackgroundClass = "inline-background-8892664";
    const cssBackgroundClass = "css-background-8892664";

    for (const element of allElements) {
        const style = window.getComputedStyle(element);

        if (style.backgroundImage !== 'none') {
            const inlineStyle = element.getAttribute('style');

            if (inlineStyle && inlineStyle.indexOf('background-image') !== -1) {
                element.classList.add('inline-css-image');
                const message = "This image is inserted using inline style";
                createChildMessageDiv(element, inlineBackgroundClass, message);
            } else {
                element.classList.add('css-image');
                const message = "This image is inserted using CSS";
                createChildMessageDiv(element, cssBackgroundClass, message);
            }
        }
    }
}

showBackgroundImages();