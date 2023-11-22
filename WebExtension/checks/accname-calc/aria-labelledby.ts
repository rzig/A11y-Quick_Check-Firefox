"use strict";

/**
 * Main function to check and process nodes with aria-labelledby attribute.
 * It selects valid and invalid nodes based on specified roles and processes them.
 */
function ariaLbNameCheck() {
    // Select valid nodes: those with aria-labelledby but not having prohibited roles
    let validNodes = document.querySelectorAll(
        '[aria-labelledby]:not([role="caption"]):not([role="code"]):not([role="deletion"]):not([role="emphasis"]):not([role="generic"]):not([role="insertion"]):not([role="paragraph"]):not([role="presentation"]):not([role="strong"]):not([role="subscript"]):not([role="superscript"])'
    );

    // Process the valid nodes
    processNodes(validNodes, true);

    // Select invalid nodes: those with aria-labelledby and having prohibited roles
    let invalidNodes = document.querySelectorAll(
        '[aria-labelledby][role="caption"], [aria-labelledby][role="code"], [aria-labelledby][role="deletion"], [aria-labelledby][role="emphasis"], [aria-labelledby][role="generic"], [aria-labelledby][role="insertion"], [aria-labelledby][role="paragraph"], [aria-labelledby][role="presentation"], [aria-labelledby][role="strong"], [aria-labelledby][role="subscript"], [aria-labelledby][role="superscript"]'
    );

    // Process the invalid nodes
    processNodes(invalidNodes, false);
}

/**
 * Processes a collection of nodes to determine the validity of their aria-labelledby usage.
 * Generates and attaches appropriate messages based on their validity.
 * 
 * @param {NodeListOf<Element>} nodes - Collection of DOM nodes to be processed.
 * @param {boolean} isValid - Indicates if the nodes are to be processed as valid or invalid.
 */
function processNodes(nodes: NodeListOf<Element>, isValid: boolean) {
    for (const currentNode of nodes) {
        const ariaLabelledBy = currentNode.getAttribute('aria-labelledby');
        if (ariaLabelledBy) {
            // Split the aria-labelledby attribute to get individual IDs
            const labelledByIds = ariaLabelledBy.split(' ');
            let computedName = '';

            // Construct the computed name from referenced elements
            for (const id of labelledByIds) {
                const labelledByElement = document.getElementById(id);
                if (labelledByElement) {
                    computedName += labelledByElement.textContent + ' ';
                }
            }

            // Convert elementType and role to uppercase for display purposes
            const elementType = currentNode.nodeName.toUpperCase();
            let messageClassName = ''; // Initialize with empty string to avoid undefined
            let message: string | undefined;

            if (isValid) {
                // Handle valid nodes
                if (computedName) {
                    computedName = computedName.trim();
                    messageClassName = `message-aria-labelledby-valid-889756`;
                    message = `Valid: The calculated name for <${elementType}> is ${computedName}.`;
                }
            } else {
                // Handle invalid nodes
                const invalidRole = (currentNode.getAttribute('role') || 'unknown').toUpperCase(); // Handle potential undefined value and convert to uppercase
                messageClassName = `message-aria-labelledby-invalid-889756`;
                message = `aria-labelledby is not valid on <${elementType}> with a ${invalidRole} Role.`;
            }

            // Attach the generated message to the document
            if (message) {
                addMessageToPrecedingDiv(currentNode, messageClassName, message);
            }
        }
    }
}

// Initiate the check process
ariaLbNameCheck();