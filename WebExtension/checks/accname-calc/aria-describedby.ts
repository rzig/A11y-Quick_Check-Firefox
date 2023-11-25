// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {

"use strict";

// Global counter for data attribute numbering
let dataDescAttributeCounter = 1;

/**
 * Main function to check and process nodes with aria-describedby attribute.
 * It selects nodes and processes them.
 */
function ariaDescribedbyCheck() {
    // Select all nodes with aria-describedby
    let nodes = document.querySelectorAll('[aria-describedby]');

    // Process the nodes
    adbprocessNodes(nodes);
}

/**
 * Processes a collection of nodes to determine the usage of their aria-describedby attribute.
 * Generates and attaches appropriate messages based on the computed description.
 * 
 * @param {NodeListOf<Element>} nodes - Collection of DOM nodes to be processed.
 */
function adbprocessNodes(nodes: NodeListOf<Element>) {
    for (const currentNode of nodes) {
        const ariaDescribedby = currentNode.getAttribute('aria-describedby');
        if (ariaDescribedby) {
            const describedByIds = ariaDescribedby.split(' ');
            let computedDescription = '';

            // Add the neutral class and reset data attribute to the current node
            currentNode.classList.add('neutral-9927845');
            currentNode.setAttribute('data-namedfrom-9927845', '');

            for (const id of describedByIds) {
                const describedByElement = document.getElementById(id);
                if (describedByElement) {
                    // Convert counter to a padded string
                    let counterString = String(dataDescAttributeCounter).padStart(5, '0');

                    // Add data attributes to the elements
                    describedByElement.classList.add('neutral-9927845');
                    describedByElement.setAttribute('data-elementnamedby-9927845', counterString);

                    // Update the data attribute of the current node to include this counter
                    let currentNamedFrom = currentNode.getAttribute('data-namedfrom-9927845');
                    currentNode.setAttribute('data-namedfrom-9927845', `${currentNamedFrom} ${counterString}`);

                    // Add numbered squares next to the elements
                    addNumberedSquare(describedByElement, dataDescAttributeCounter);
                    addNumberedSquare(currentNode, dataDescAttributeCounter);

                    computedDescription += describedByElement.textContent + ' ';

                    // Increment the global counter
                    dataDescAttributeCounter++;
                }
            }

            const elementType = currentNode.nodeName.toUpperCase();
            let messageClassName = `neutral-message-9927845`;
            let message: string;

            if (computedDescription) {
                computedDescription = computedDescription.trim();
                message = `The description for <${elementType}> is ${computedDescription}.`;
            } else {
                message = `No description found for <${elementType}>.`;
            }

            createChildMessageDiv(currentNode, messageClassName, message);
        }
    }
}

function addNumberedSquare(element: Element, number: number) {
    // Create a div element to represent the square
    let square = document.createElement('div');
    square.textContent = number.toString();
    square.classList.add('numbered-square-9927845');

    // Insert the square after the element
    element.insertAdjacentElement('afterend', square);
}

// Initiate the check process
ariaDescribedbyCheck();

})();