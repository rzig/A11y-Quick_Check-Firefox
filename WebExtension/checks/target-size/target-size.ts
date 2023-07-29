"use strict";

// Add a circle shape to a specific element
function addCircleShape(elem: Element, targetSize: number) {
    const circle = document.createElement('div');
    circle.classList.add('circle-shape-8228965');
    circle.classList.add(`circle-shape-size-${targetSize}-8228965`);
    circle.style.width = `${targetSize}px`;
    circle.style.height = `${targetSize}px`;
    elem.classList.add(`pos-rel-size-${targetSize}-8228965`);
    elem.classList.add(`pos-rel-8228965`);
    elem.appendChild(circle);
}

// Check if the element is excluded
function isExcluded(elem: Element) {
    const anchorLinkRegex = /^#[\w-]+$/;
    const isInPageLink = elem.tagName === 'A' && anchorLinkRegex.test(elem.getAttribute('href') ?? "");
    const isInParagraph = elem.tagName === 'A' && elem.parentElement!.tagName === 'P';
    const isInSentence = elem.tagName === 'A' && elem.parentElement!.tagName === 'SPAN';
    const isFootnote = elem.tagName === 'A' && elem.classList.contains('footnote');

    return isInPageLink || isInParagraph || isInSentence || isFootnote;
}

function addTargetSize(targetSize: number) {
    console.info("Here!!");
    // Get all interactive elements on the page
    const inputElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"], select, [role="button"]');
    // Loop through each element and check its dimensions
    for (const elem of inputElements) {
        const rect = elem.getBoundingClientRect(); // Get the element's dimensions
        const elemWidth = rect.width;
        const elemHeight = rect.height;
        const isInline = getComputedStyle(elem).display === 'inline';
        const parentTag = elem.parentElement!.tagName ?? "";
        const isHidden = getComputedStyle(elem).display === 'none' || getComputedStyle(elem).opacity === '0' || getComputedStyle(elem).visibility === 'hidden';
        const isTooSmall = elemWidth <= 1 || elemHeight <= 1;

        // TODO: Examine this to ensure none of these conditions may result in false negatives
        // Perhaps checking if there are text nodes siblings on either side of the control?

        // Check if the element's dimensions are less than the minimum requirement, it's not an inline element or in a list, and it's not hidden by CSS
        if ((elemWidth < targetSize || elemHeight < targetSize)
            && !isInline
            && !['OL', 'UL', 'DL', 'LI', 'DT', 'DD'].includes(parentTag)
            && !isHidden
            && !isTooSmall
            && !isExcluded(elem)) {
            // Add a CSS class to the element
            elem.classList.add(`small-target-${targetSize}-8228965`);

            const messageDiv = createChildMessageDiv(elem, `target-size-${targetSize}-8228965`, `The target size in pixels for this element is ${elemWidth} x ${elemHeight}, which is smaller than ${targetSize} x ${targetSize}.`, ["target-size-8228965"]);

            addCircleShape(elem, targetSize);
        }
    }
}
