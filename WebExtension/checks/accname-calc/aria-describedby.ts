"use strict";

/**
 * Main function to check and process nodes with aria-describedby attribute.
 * It selects nodes and processes them.
 */
function ariaDescribedbyCheck() {
    // Select all nodes with aria-describedby
    let nodes = document.querySelectorAll('[aria-describedby]');

    console.log(`[ariaDescribedbyCheck] Found ${nodes.length} nodes`);

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
            // Split the aria-describedby attribute to get individual IDs
            const describedByIds = ariaDescribedby.split(' ');
            let computedDescription = '';

            // Construct the computed description from referenced elements
            for (const id of describedByIds) {
                const describedByElement = document.getElementById(id);
                if (describedByElement) {
                    computedDescription += describedByElement.textContent + ' ';
                }
            }

            // Convert elementType to uppercase for display purposes
            const elementType = currentNode.nodeName.toUpperCase();
            let messageClassName = `message-aria-describedby-889756`;
            let message: string;

            // Handle nodes with computed description
            if (computedDescription) {
                computedDescription = computedDescription.trim();
                message = `The calculated description for <${elementType}> is ${computedDescription}.`;
            } else {
                message = `No computed description found for <${elementType}>.`;
            }

            // Attach the generated message to the document
            addMessageToPrecedingDiv(currentNode, messageClassName, message);
        }
    }
}

// Initiate the check process
ariaDescribedbyCheck();