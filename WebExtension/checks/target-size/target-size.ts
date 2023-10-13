"use strict";

// Function to get adjustment made by :before and :after pseudo-elements
function getPseudoElementAdjustment(elem: Element): {width: number, height: number} {
    const after = window.getComputedStyle(elem, ':after');
    const before = window.getComputedStyle(elem, ':before');

    const topAfter = parseFloat(after.getPropertyValue('top')) || 0;
    const bottomAfter = parseFloat(after.getPropertyValue('bottom')) || 0;
    const topBefore = parseFloat(before.getPropertyValue('top')) || 0;
    const bottomBefore = parseFloat(before.getPropertyValue('bottom')) || 0;

    const leftAfter = parseFloat(after.getPropertyValue('left')) || 0;
    const rightAfter = parseFloat(after.getPropertyValue('right')) || 0;
    const leftBefore = parseFloat(before.getPropertyValue('left')) || 0;
    const rightBefore = parseFloat(before.getPropertyValue('right')) || 0;

    const extraHeight = Math.abs(topAfter) + Math.abs(bottomAfter) + Math.abs(topBefore) + Math.abs(bottomBefore);
    const extraWidth = Math.abs(leftAfter) + Math.abs(rightAfter) + Math.abs(leftBefore) + Math.abs(rightBefore);

    return {width: extraWidth, height: extraHeight};
}

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
        const rect = elem.getBoundingClientRect();
        const {width: extraWidth, height: extraHeight} = getPseudoElementAdjustment(elem);
        
        const elemWidth = rect.width + extraWidth;
        const elemHeight = rect.height + extraHeight;
        const isButton = elem.tagName === 'BUTTON';
        const parentTag = elem.parentElement!.tagName;
        const isInTextBlock = ['P', 'SPAN'].includes(parentTag);
        
        const isHidden = getComputedStyle(elem).display === 'none' || getComputedStyle(elem).opacity === '0' || getComputedStyle(elem).visibility === 'hidden';
        const isTooSmall = elemWidth <= 1 || elemHeight <= 1;

        if ((elemWidth < targetSize || elemHeight < targetSize)
            && !isInTextBlock  // Exclude buttons that are positioned within text blocks
            && !['OL', 'UL', 'DL', 'LI', 'DT', 'DD'].includes(parentTag)
            && !isHidden
            && !isTooSmall
            && !isExcluded(elem)) {

            elem.classList.add(`small-target-${targetSize}-8228965`);
            
            if (!(isButton && isInTextBlock)) {
                // Add the message only if it is not a button inside a text block
                const messageDiv = createChildMessageDiv(elem, `target-size-${targetSize}-8228965`, `The target size in pixels for this element is ${elemWidth} x ${elemHeight}, which is smaller than ${targetSize} x ${targetSize}.`, ["target-size-8228965"]);
            }
            
            addCircleShape(elem, targetSize);
        }
    }
}