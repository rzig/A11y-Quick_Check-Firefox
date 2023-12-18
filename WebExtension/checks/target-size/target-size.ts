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
function isExcluded(elem: Element): boolean {
    const anchorLinkRegex = /^#[\w-]+$/;
    const isAnchor = elem.tagName === 'A';
    const isButton = elem.tagName === 'BUTTON' || elem.getAttribute('role') === 'button';

    let currentElem: Element | null = elem;
    while (currentElem) {
        if (currentElem.tagName === 'LI' && (isAnchor || isButton)) {
            return true; // Exclude anchors and buttons within list items
        }
        currentElem = currentElem.parentElement;
    }

    const isInPageLink = isAnchor && anchorLinkRegex.test(elem.getAttribute('href') ?? "");
    const isInParagraph = (isAnchor || isButton) && elem.parentElement?.tagName === 'P';
    const isInSentence = (isAnchor || isButton) && elem.parentElement?.tagName === 'SPAN';
    const isFootnote = isAnchor && elem.classList.contains('footnote');

    return isInPageLink || isInParagraph || isInSentence || isFootnote;
}

function checkSpacing(elem: Element, targetSize: number): boolean {
    console.log(`Checking spacing for element: `, elem);
    const rect = elem.getBoundingClientRect();

    const expandedRect = {
        top: rect.top - targetSize / 2,
        left: rect.left - targetSize / 2,
        bottom: rect.bottom + targetSize / 2,
        right: rect.right + targetSize / 2
    };

    const inputElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"], select, [role="button"], [role="link"]');

    for (let otherElem of inputElements) {
        if (otherElem === elem) continue; // Skip comparing the element with itself

        const otherRect = otherElem.getBoundingClientRect();
        const otherExpandedRect = {
            top: otherRect.top - targetSize / 2,
            left: otherRect.left - targetSize / 2,
            bottom: otherRect.bottom + targetSize / 2,
            right: otherRect.right + targetSize / 2
        };

        // Check if the expanded rectangles intersect
        const intersects = !(expandedRect.right < otherExpandedRect.left ||
                              expandedRect.left > otherExpandedRect.right ||
                              expandedRect.bottom < otherExpandedRect.top ||
                              expandedRect.top > otherExpandedRect.bottom);

        if (intersects) {
            console.log(`Insufficient spacing found between:`, elem, `and`, otherElem);
            return false; // Intersection found, indicating insufficient spacing
        }
    }

    console.log(`Sufficient spacing for element: `, elem);
    return true; // No intersections found, indicating sufficient spacing
}

function addTargetSize(targetSize: number) {
    // Select all interactive elements on the page
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

        const isHidden = getComputedStyle(elem).display === 'none' || getComputedStyle(elem).opacity === '0' || getComputedStyle(elem).visibility === 'hidden';
        const isTooSmall = elemWidth <= 1 || elemHeight <= 1;

        if (!isHidden && !isTooSmall && (elemWidth < targetSize || elemHeight < targetSize)) {
            if (!isExcluded(elem)) {
                elem.classList.add(`small-target-${targetSize}-8228965`);

                const hasSufficientSpacing = checkSpacing(elem, targetSize);
                let extraClass = hasSufficientSpacing ? `target-sufficient-8228965` : `target-insufficient-8228965`;

                let message = `The target size for element <${identifier}> is ${elemWidth.toFixed(2)}px x ${elemHeight.toFixed(2)}px`;
                message += hasSufficientSpacing ? `. The element has sufficient spacing.` : `which is less than ${targetSize}px x ${targetSize}px`;

                createChildMessageDiv(elem, `target-size-${targetSize}-8228965`, message, ["target-size-8228965", extraClass]);
                addCircleShape(elem, targetSize);
            }
        }
    }
}