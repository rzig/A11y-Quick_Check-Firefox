(function () {
    "use strict";

    // Arrays for roles
    const rolesNameFromContent = ['button', 'cell', 'checkbox', 'columnheader', 'gridcell', 'heading', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'row', 'rowheader', 'sectionhead', 'switch', 'tab', 'tooltip', 'treeitem'];
    const rolesNameFromAuthor = ['alert', 'alertdialog', 'application', 'article', 'banner', 'blockquote', 'button', 'cell', 'checkbox', 'columnheader', 'combobox', 'command', 'complementary', 'composite', 'contentinfo', 'definition', 'dialog', 'directory', 'document', 'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading', 'img', 'input', 'landmark', 'link', 'list', 'listbox', 'listitem', 'log', 'main', 'marquee', 'math', 'meter', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'navigation', 'note', 'option', 'progressbar', 'radio', 'radiogroup', 'range', 'region', 'row', 'rowgroup', 'rowheader', 'scrollbar', 'search', 'searchbox', 'sectionhead', 'select', 'separator', 'slider', 'spinbutton', 'status', 'switch', 'tab', 'table', 'tablist', 'tabpanel', 'term', 'textbox', 'time', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem', 'window'];

    // Combine both arrays and create a unique set of roles
    const uniqueRoles = Array.from(new Set([...rolesNameFromContent, ...rolesNameFromAuthor]));

    // Construct the selector string for these roles
    const roleSelectors = uniqueRoles.map(role => `[role="${role}"]`).join(', ');

    // HTML equivalents for some ARIA roles
    const htmlEquivalents = ['button', 'input', 'a[href]', 'textarea', 'select', 'details', 'summary'];

    // Combine role selectors and HTML equivalents
    const combinedSelector = roleSelectors + ', ' + htmlEquivalents.join(', ');

    function accessibleNameCheck() {
        // Select nodes based on roles and HTML equivalents
        let nodes = document.querySelectorAll(combinedSelector);

        // Process the nodes
        processNodes(nodes);
    }
    
    /**
     * Processes a collection of nodes to determine the accessible name.
     * Generates and attaches appropriate messages based on the computed name.
     * 
     * @param {NodeListOf<Element>} nodes - Collection of DOM nodes to be processed.
     */
    function processNodes(nodes: NodeListOf<Element>) {
        for (const node of nodes) {
            let accessibleName = getAccessibleName(node);
    
            // Generate message for the accessible name
            // let message = `Element <${node.nodeName.toLowerCase()}> gets name "${accessibleName.name}" from ${accessibleName.method}.`;
            let message = `Element <${node.nodeName.toLowerCase()}> gets name from ${accessibleName.method}.`;
            createChildMessageDiv(node, 'neutral-message-9927845', message);
        }
    }
    
    /**
     * Function to calculate the accessible name of a node.
     * 
     * @param {Element} node - DOM node to calculate the name for.
     * @returns {object} Object containing the accessible name and the technique used.
     */
    function getAccessibleName(node: Element): { name: string, method: string } {
        // Priority 1: aria-labelledby
        let labelledby = node.getAttribute('aria-labelledby');
        if (labelledby) {
            let names = labelledby.split(' ')
                                .map(id => document.getElementById(id)?.textContent?.trim() ?? '')
                                .filter(text => text.length > 0)
                                .join(' ');
            if (names.length > 0) {
                return { name: names, method: 'aria-labelledby' };
            }
        }
    
        // Priority 2: aria-label
        let label = node.getAttribute('aria-label');
        if (label) {
            return { name: label, method: 'aria-label' };
        }
    
        // Priority 3: Text content
        let textContent = node.textContent?.trim();
        if (textContent && textContent.length > 0) {
            return { name: textContent, method: 'text content' };
        }
    
        // Priority 4: Title
        let title = node.getAttribute('title');
        if (title) {
            return { name: title, method: 'title' };
        }
    
        // Default case: No accessible name found
        return { name: 'No accessible name', method: 'none' };
    }
    
function createChildMessageDiv(node: Element, className: string, message: string) {
    let messageDiv = document.createElement('div');
    messageDiv.textContent = message;

    // Get role of the element
    const role = node.getAttribute('role') || node.nodeName.toLowerCase();
    
    // Assign class based on the role
    if (rolesNameFromContent.includes(role)) {
        messageDiv.classList.add(className, 'from-content-class-9927845');
    } else if (rolesNameFromAuthor.includes(role)) {
        messageDiv.classList.add(className, 'from-author-class-9927845');
    } else {
        messageDiv.classList.add(className);
    }

    node.insertAdjacentElement('afterend', messageDiv);
}
    
    // Initiate the check process
    accessibleNameCheck();
    
    })();    