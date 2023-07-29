"use strict";

function checkSvgDecorative() {
    const svgElements = document.querySelectorAll("svg");
    const decorativeSvgClass = "svg--decorative-8892664";
    const decorativeSvgWithNameClass = "svg--decorative-with-name-8892664";

    for (const svgElement of svgElements) {
        const ariaHidden = svgElement.getAttribute("aria-hidden");
        const ariaLabel = svgElement.getAttribute("aria-label");
        const accessibleNameMissing = !ariaLabel || ariaLabel.trim() === "";
        const accessibleNamePresent = ariaLabel && ariaLabel.trim() !== "";

        if (ariaHidden === "true") {
            if (accessibleNameMissing) {
                const message = "This SVG is marked as decorative with 'aria-hidden true'";
                createChildMessageDiv(svgElement, decorativeSvgClass, message);
            } else if (accessibleNamePresent) {
                const message = "This SVG has an accessible name but is marked as decorative with 'aria-hidden true'";
                createChildMessageDiv(svgElement, decorativeSvgWithNameClass, message);
            }
        }
    }
}

checkSvgDecorative();

function checkSvgAccessibleNamesDecorative() {
    const svgElements = document.querySelectorAll("svg");
    const hiddenAncestorClass = "svg--hiddenAncestor-882726654";
    const decorativeAncestorClass = "svg--decorativeAncestor-882726654";

    function checkAncestors(element: Element) {
        let currentElement = element;

        while (currentElement.parentElement) {
            currentElement = currentElement.parentElement;

            const tagName = currentElement.tagName.toLowerCase();
            const role = currentElement.getAttribute("role");

            if (currentElement.getAttribute("aria-hidden") === "true") {
                return { element: currentElement, isHidden: true };
            }
            if (role === "none" || role === "presentation") {
                return { element: currentElement, isDecorative: true };
            }
        }

        return null;
    }

    for (const svgElement of svgElements) {
        const svgText = svgElement.getAttribute("aria-label");
        const hiddenElement = svgElement.getAttribute("aria-hidden");
        const role = svgElement.getAttribute("role");
        const accessibleNameMissing = !svgText || svgText.trim() === "";
        const ancestorCheck = checkAncestors(svgElement);

        if (ancestorCheck && ancestorCheck.isHidden) {
            const message = "An ancestor element of this SVG has 'aria-hidden' set to 'true'.";
            createChildMessageDiv(svgElement, hiddenAncestorClass, message);
        }

        if (ancestorCheck && ancestorCheck.isDecorative) {
            const message = "This SVG is decorative. An ancestor element of this SVG has 'role none or role presentation'.";
            createChildMessageDiv(svgElement, decorativeAncestorClass, message);
        }
    }
}

checkSvgAccessibleNamesDecorative();