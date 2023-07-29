"use strict";

function removeTargetSize(targetSize: number) {

    // Get all elements with the small-target class
    const targets = document.querySelectorAll(`.small-target-${targetSize}-8228965`);
    // Loop through each element and remove the class
    for (const elem of targets) {
        // Remove the circle shape if it exists
        const circleShapeElem = elem.querySelector(`.circle-shape-size-${targetSize}-8228965`);
        if (circleShapeElem) {
            circleShapeElem.remove();
        }

        // Remove the div container if it exists
        removeInjectedDivs([`target-size-${targetSize}-8228965`]);

        // Remove the small-target and pos-rel classes
        elem.classList.remove(`small-target-${targetSize}-8228965`);
        elem.classList.remove(`pos-rel-size-${targetSize}-8228965`);

        // Check if we have any other elements here still
        let additionalRelsFound = false;
        for (const cssClass of elem.classList) {
            additionalRelsFound = additionalRelsFound || /pos-rel-size-[0-9]+-8228965/.test(cssClass);
        }

        // if we don't have any more circles, we can remove the pos-rel
        if (!additionalRelsFound) {
            elem.classList.remove(`pos-rel-8228965`);
        }
    }
}
