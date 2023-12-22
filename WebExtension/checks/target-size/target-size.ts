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
    const isInPageLink = isAnchor && anchorLinkRegex.test(elem.getAttribute('href') ?? "");
    const isInParagraph = (isAnchor || isButton) && elem.parentElement?.tagName === 'P';
    const isFootnote = isAnchor && elem.classList.contains('footnote');

    return isInPageLink || isInParagraph || isFootnote;
}

function checkSpacing(elem: Element, targetSize: number): boolean {
    const rect = elem.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(elem);

    // Calculate total height including pseudo-elements
    const totalHeight = rect.height + getPseudoElementAdjustment(elem).height;

    // Expand the rectangle to the target size for spacing check
    const expandedRect = {
        top: rect.top - (targetSize - rect.height) / 2,
        left: rect.left - (targetSize - rect.width) / 2,
        bottom: rect.bottom + (targetSize - rect.height) / 2,
        right: rect.right + (targetSize - rect.width) / 2
    };

    const inputElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"], select, [role="button"], [role="link"], li');

    for (let otherElem of inputElements) {
        if (otherElem === elem || otherElem.classList.contains('spacing-ignore-8228965')) continue;

        const otherRect = otherElem.getBoundingClientRect();

        // Expand the other element's rectangle to the target size
        const otherExpandedRect = {
            top: otherRect.top - (targetSize - otherRect.height) / 2,
            left: otherRect.left - (targetSize - otherRect.width) / 2,
            bottom: otherRect.bottom + (targetSize - otherRect.height) / 2,
            right: otherRect.right + (targetSize - otherRect.width) / 2
        };

        // Check if the expanded rectangles intersect
        const intersects = !(expandedRect.right < otherExpandedRect.left ||
                              expandedRect.left > otherExpandedRect.right ||
                              expandedRect.bottom < otherExpandedRect.top ||
                              expandedRect.top > otherExpandedRect.bottom);

        if (intersects) {
            return false;
        }
    }

    // If the height is slightly less than the target size but does not intersect with other elements, consider it sufficient
    return true;
}

function addTargetSize(targetSize: number) {
    const inputElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"], select, [role="button"], [role="link"]');

    for (const elem of inputElements) {
        // Exclude the 'Toggle messages' button
        if (elem.id === 'rmb-8228965') {
            continue;
        }
        const rect = elem.getBoundingClientRect();
        const {width: extraWidth, height: extraHeight} = getPseudoElementAdjustment(elem);
        const elemWidth = rect.width + extraWidth;
        const elemHeight = rect.height + extraHeight;
        const tagName = elem.tagName.toLowerCase();
        const role = elem.getAttribute('role');
        const identifier = role ? `role="${role}"` : tagName;
        const isHidden = getComputedStyle(elem).display === 'none' || getComputedStyle(elem).opacity === '0' || getComputedStyle(elem).visibility === 'hidden';
        const isTooSmall = elemWidth <= 1 || elemHeight <= 1;

        // Check if the element is a child of a list item with display inline or inline-block
        const parentLi = elem.closest('li');
        const isChildOfInlineLi = parentLi && (window.getComputedStyle(parentLi).display === 'inline' || window.getComputedStyle(parentLi).display === 'inline-block');

        if (!isHidden && !isTooSmall && (elemWidth < targetSize || elemHeight < targetSize)) {
            if (!isExcluded(elem)) {
                const hasSufficientSpacing = isChildOfInlineLi || checkSpacing(elem, targetSize);
                let extraClass = (hasSufficientSpacing && targetSize <= 24) ? `target-sufficient-8228965` : `target-insufficient-8228965`;

                let message = `The target size for element <${identifier}> is ${elemWidth.toFixed(2)}px x ${elemHeight.toFixed(2)}px`;

                // Adjust message based on spacing and the targetSize
                if (targetSize <= 24 && hasSufficientSpacing) {
                    message += ` which is less than ${targetSize}px x ${targetSize}px. The element has sufficient spacing.`;
                } else {
                    message += ` which is less than ${targetSize}px x ${targetSize}px.`;
                }

                // Create and append the message div
                const messageDiv = document.createElement('div');
                messageDiv.className = `target-size-${targetSize}-8228965`;
                messageDiv.classList.add("target-size-8228965", extraClass, 'spacing-ignore-8228965');
                messageDiv.textContent = message;
                elem.appendChild(messageDiv);

                addCircleShape(elem, targetSize);
            }
        }
    }
    
}

function toggleMessageDivsVisibility() {
    // Select all divs with the class 'target-size-8228965'
    const messageDivs = document.querySelectorAll('.target-size-8228965');
    let areMessagesVisible = false; // Declare the variable here and initialize it

    // Toggle visibility of each div
    messageDivs.forEach(div => {
        const htmlDiv = div as HTMLElement; // Type assertion to HTMLElement
        if (htmlDiv.style.display === 'none') {
            htmlDiv.style.display = 'block';
            areMessagesVisible = true;
        } else {
            htmlDiv.style.display = 'none';
        }
    });

    // Update the button text based on the visibility of messages
    const button = document.getElementById('rmb-8228965') as HTMLButtonElement;
    if (button) {
        button.textContent = areMessagesVisible ? 'Hide messages' : 'Show messages';
        button.setAttribute('aria-pressed', areMessagesVisible.toString()); // Set aria-pressed attribute
    }
}

// Function to inject the button and add the click event listener
function injectButton() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.id = 'rmb-8228965';
    button.className = 'toggleMessage-8228965';
    button.setAttribute('aria-pressed', 'false'); // Set initial aria-pressed attribute
    button.textContent = 'Hide messages'; // Set the default button name

    // Add click event listener to the button
    button.addEventListener('click', toggleMessageDivsVisibility);

    document.body.prepend(button);
}

// Call the function to inject the button
injectButton();