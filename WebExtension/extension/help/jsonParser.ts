import {
  Item,
  Fieldset,
  Tab,
  TabClass,
  FieldsetClass,
  ItemClass,
} from "../ui/js/dataDefinitions";

interface RootObject {
  tabs: Tab[];
}

// This function generates HTML based on the data structure of a Tab
// template literals
function generateHTML(tabData: Tab): string {
  let htmlString = "";

  for (const fieldset of tabData.fieldsets) {
    htmlString += `<h2 class="h2Class">${fieldset.name}</h2>`;
    htmlString += `<p>${fieldset.helpSection}</p>`;

    // Check if refForGroup and refForGroupLink exist, then add them to htmlString
    if (fieldset.refForGroup && fieldset.refForGroupLink) {
        const refs = Array.isArray(fieldset.refForGroup) ? fieldset.refForGroup : fieldset.refForGroup.split(", ");
        const links = Array.isArray(fieldset.refForGroupLink) ? fieldset.refForGroupLink : fieldset.refForGroupLink.split(", ");
        
        if (refs.length === links.length) {
          htmlString += `<h3 class="ref--links-header">References for ${fieldset.name}</h3><ul>`;
          for (let i = 0; i < refs.length; i++) {
            htmlString += `<li><a href="${links[i]}" class="groupRefClass">${refs[i]}</a></li>`;
          }
          htmlString += `</ul>`;
        } else {
          console.error("Mismatch between number of refs and links for fieldset:", fieldset);
        }
      }

      for (const item of fieldset.items) {
        htmlString += `<hr>`;
        htmlString += `<h3 id="${item.id}" class="h3Class">${item.name}</h3>`;
        
        // Check if item.description exists before adding it to htmlString
        if (item.description) {
          htmlString += `<p>${item.description}</p>`;
        } else {
          htmlString += `<p>Description to be updated!</p>`;  // Placeholder text
        }
        
        htmlString += "<ul>";
      
        // Handle multiple linked refs
        if (item.refForCheck && item.refForCheckLink) {
          const refs = item.refForCheck.split(", ");
          const links = item.refForCheckLink.split(", ");
      
          if (refs.length === links.length) {
            for (let i = 0; i < refs.length; i++) {
              htmlString += `<li><a href="${links[i]}" class="checkRefClass">${refs[i]}</a></li>`;
            }
          } else {
            console.error(
              "Mismatch between number of refs and links for item:",
              item
            );
          }
        }
      
        htmlString += "</ul>";
      }      
  }

  return htmlString;
}

// Fetch the JSON and then use the data to populate the HTML content
fetch("../ui/options.json")
  .then((response) => response.json())
  .then((data: RootObject) => {
    const contentElement = document.getElementById("content");
    if (contentElement && data.tabs.length > 0) {
      const firstTab = data.tabs[0];
      if (firstTab) {
        contentElement.innerHTML = generateHTML(firstTab);
      }
    }
  })
  .catch((error) => console.error("Error fetching the JSON:", error));
