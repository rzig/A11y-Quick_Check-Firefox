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
    const isAnchor = elem.tagName === 'A';
    const isButton = elem.tagName === 'BUTTON' || elem.getAttribute('role') === 'button';

    const isInPageLink = isAnchor && anchorLinkRegex.test(elem.getAttribute('href') ?? "");
    const isInParagraph = (isAnchor || isButton) && elem.parentElement!.tagName === 'P';
    const isInSentence = (isAnchor || isButton) && elem.parentElement!.tagName === 'SPAN';
    const isFootnote = isAnchor && elem.classList.contains('footnote');

    // Check for <a>, <button>, or [role="button"] within <li> or <li role="listitem">
    let currentElem = elem.parentElement;
    let isExcludedListElement = false;
    while (currentElem && !isExcludedListElement) {
        if (currentElem.tagName === 'LI' && (currentElem.getAttribute('role') === 'listitem' || !currentElem.hasAttribute('role'))) {
            isExcludedListElement = isAnchor || isButton;
            break;
        }
        currentElem = currentElem.parentElement;
    }

    return isInPageLink || isInParagraph || isInSentence || isFootnote || isExcludedListElement;
}


function addTargetSize(targetSize: number) {
    // Get all interactive elements on the page
    const inputElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"], select, [role="button"], [role="link"]');
    
    // Loop through each element and check its dimensions
    for (const elem of inputElements) {
        const rect = elem.getBoundingClientRect();
        const {width: extraWidth, height: extraHeight} = getPseudoElementAdjustment(elem);
        
        const elemWidth = rect.width + extraWidth;
        const elemHeight = rect.height + extraHeight;
        const tagName = elem.tagName.toLowerCase();
        const role = elem.getAttribute('role');
        const identifier = role ? `role="${role}"` : tagName;
        
        const parentTag = elem.parentElement!.tagName;
        // If the paragraph is marked up as a div and nnot a P this will trigger the check.
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
            
            if (!(tagName === 'button' && isInTextBlock)) {
                // Don't add the message if the button is conpained inside a text block
                const messageDiv = createChildMessageDiv(elem, `target-size-${targetSize}-8228965`, `The target size for element <${identifier}> is ${elemWidth.toFixed(2)} x ${elemHeight.toFixed(2)}, which is smaller than ${targetSize} x ${targetSize}.`, ["target-size-8228965"]);
            }
            
            addCircleShape(elem, targetSize);
        }
    }
}