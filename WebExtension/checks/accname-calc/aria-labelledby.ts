(function() {
    "use strict";

    const prohibitedRoles = ['caption', 'code', 'deletion', 'emphasis', 'generic', 'insertion', 'paragraph', 'presentation', 'strong', 'subscript', 'superscript'];

    function ariaLbNameCheck() {
        let allNodes = document.querySelectorAll('[aria-labelledby]');
        processNodes(allNodes);
    }

    function processNodes(nodes: NodeListOf<Element>) {
        for (const currentNode of nodes) {
            const ariaLabelledBy = currentNode.getAttribute('aria-labelledby');
            if (ariaLabelledBy) {
                const labelledByIds = ariaLabelledBy.split(' ');
                let computedName = '';

                for (const id of labelledByIds) {
                    const labelledByElement = document.getElementById(id);
                    if (labelledByElement) {
                        computedName += labelledByElement.textContent + ' ';
                    }
                }

                const elementType = currentNode.nodeName.toUpperCase();
                let currentRole = currentNode.getAttribute('role') || inferRoleFromElement(elementType);

                let messageClassName = '';
                let message;

                if (elementType === 'DIV' && !currentRole) {
                    // <div> without a role is considered invalid
                    messageClassName = `message-aria-labelledby-invalid-889756`;
                    message = `aria-labelledby is not valid on <${elementType}> without a valid Role.`;
                } else {
                    const isInherentlyInvalid = prohibitedRoles.includes(currentRole.toLowerCase());

                    if (!isInherentlyInvalid) {
                        if (computedName) {
                            computedName = computedName.trim();
                            messageClassName = `message-aria-labelledby-valid-889756`;
                            message = `Valid: The calculated name for <${elementType}> is \"${computedName}\".`;
                        }
                    } else {
                        messageClassName = `message-aria-labelledby-invalid-889756`;
                        message = `aria-labelledby is not valid on <${elementType}> with a role of ${currentRole.toUpperCase()}.`;
                    }
                }

                if (message) {
                    addMessageToPrecedingDiv(currentNode, messageClassName, message);
                }
            }
        }
    }

    function inferRoleFromElement(elementType: string): string {
        switch (elementType) {
            case 'DEL':
                return 'deletion';
            case 'EM':
            case 'I': // Typically treated as emphasis
                return 'emphasis';
            case 'STRONG':
            case 'B': // Typically treated as strong
                return 'strong';
            case 'INS':
                return 'insertion';
            case 'P':
                return 'paragraph';
            case 'CODE':
                return 'code';
            case 'SUP':
                return 'superscript';
            case 'SUB':
                return 'subscript';
            default:
                return '';
        }
    }

    ariaLbNameCheck();
})();
