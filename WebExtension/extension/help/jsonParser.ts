import { Item, Fieldset, Tab, TabClass, FieldsetClass, ItemClass } from '../ui/js/dataDefinitions';

interface RootObject {
    tabs: Tab[];
}

// This function generates HTML based on the data structure of a Tab
function generateHTML(tabData: Tab): string {
    let htmlString = '';

    for (const fieldset of tabData.fieldsets) {
        const firstItem = fieldset.items[0];
        if (firstItem) {
            htmlString += `<h2 id="${firstItem.id}">${fieldset.name}</h2>`;
        }
        htmlString += `<p>${fieldset.helpSection}</p>`;
        htmlString += '<ul>';
        
        for (const item of fieldset.items) {
            htmlString += '<li>';
            htmlString += `${item.helpIcon} ${item.helpIconText ? `(${item.helpIconText})` : ''}<br>`;
            htmlString += `${item.name}<br>`;
            htmlString += `${item.resource_path}<br>`;
            htmlString += `${item.css}<br>`;
            htmlString += `${item.addScript}<br>`;
            htmlString += `${item.removeScript}<br>`;
            
            if (item.ref && item.reflink) {
                htmlString += `<a href="${item.reflink}">${item.ref}</a>`;
            }
            
            htmlString += '</li>';
        }
        
        htmlString += '</ul>';
    }

    return htmlString;
}

// Fetch the JSON and then use the data to populate the HTML content
fetch('../ui/options.json')
    .then(response => response.json())
    .then((data: RootObject) => {
        const contentElement = document.getElementById("content");
        if (contentElement && data.tabs.length > 0) {
            const firstTab = data.tabs[0];
            if (firstTab) {
                contentElement.innerHTML = generateHTML(firstTab); 
            }
        }
    })
    .catch(error => console.error('Error fetching the JSON:', error));
