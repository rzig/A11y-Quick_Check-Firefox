// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function () {
    "use strict";

    // Global counter for data attribute numbering
    let dataControlsAttributeCounter = 1;

    /**
     * Main function to check and process nodes with aria-controls attribute.
     * It selects nodes and processes them.
     */
    function ariaControlsCheck() {
        // Select all nodes with aria-controls
        let nodes = document.querySelectorAll('[aria-controls]');

        // Process the nodes
        processControlledNodes(nodes);
    }

    /**
     * Processes a collection of nodes to determine the usage of their aria-controls attribute.
     * Generates and attaches appropriate messages based on the existence of controlled elements and their roles.
     * 
     * @param {NodeListOf<Element>} nodes - Collection of DOM nodes to be processed.
     */
    function processControlledNodes(nodes: NodeListOf<Element>) {
        for (const currentNode of nodes) {
            const ariaControls = currentNode.getAttribute('aria-controls');
            if (ariaControls) {
                const controlledElement = document.getElementById(ariaControls);
    
                // Add the neutral class and reset data attribute to the current node
                currentNode.classList.add('neutral-control-9927845');
                currentNode.setAttribute('data-namedfrom-control-9927845', '');
    
                let messageClassName = `neutral-control-message-9927845`;
                let message;
    
                if (controlledElement) {
                    // Convert counter to a padded string
                    let counterString = String(dataControlsAttributeCounter).padStart(5, '0');
    
                    // Add data attributes to the elements
                    controlledElement.classList.add('neutral-control-9927845');
                    controlledElement.setAttribute('data-controlledby-9927845', counterString);
    
                    // Update the data attribute of the current node to include this counter
                    currentNode.setAttribute('data-namedfrom-control-9927845', counterString);
    
                    // Add numbered squares next to the elements
                    addNumberedSquare(controlledElement, dataControlsAttributeCounter);
                    addNumberedSquare(currentNode, dataControlsAttributeCounter);
    
                    // Determine the role of the controlled element or use "generic" if no role is set
                    const role = controlledElement.getAttribute('role') || 'generic';
                    message = `${currentNode.nodeName.toUpperCase()} controls ${controlledElement.nodeName.toUpperCase()} role ${role}.`;
    
                    // Increment the global counter
                    dataControlsAttributeCounter++;
                } else {
                    message = `Needs manual confirmation aria-controls id "${ariaControls}" present, but no controlled element found!`;
                }
    
                createChildMessageDiv(currentNode, messageClassName, message);
            }
        }
    }

    function addNumberedSquare(element: Element, number: number) {
        // Create a div element to represent the square
        let square = document.createElement('div');
        square.textContent = number.toString();
        square.classList.add('numbered-controlled-square-9927845');
    
        // Insert the square after the element
        element.insertAdjacentElement('afterend', square);
    }

    // Initiate the check process
    ariaControlsCheck();

})();