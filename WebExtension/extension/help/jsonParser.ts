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

// This function generates HTML based on the data structure of a the JSON and uses template literals
function generateHTML(tabData: Tab): string {
  //console.log("Generating HTML for tab data:", tabData);
  //console.log(`Generating HTML for tab: ${tabData.name}`);  // for debugging
  let htmlString = "";
  console.log(`Processing tab: ${tabData.name}`); // for debugging

  htmlString += `<section>`;
  
  const tabNameID = `${tabData.name}-8894767`;
  htmlString += `<h1 id="${tabNameID}" class="tabTitle">${tabData.name}</h1>`;

  for (const fieldset of tabData.fieldsets) {
    console.log(`Processing fieldset: ${fieldset.name}`); // Debugging the current fieldset
    const fieldsetNameID = `${fieldset.name}-8894767`;
    htmlString += `<h2 id="${fieldsetNameID}" class="h2-class">${fieldset.name}</h2>`;
    htmlString += `<p>${fieldset.helpSection}</p>`;

    // Check if refForGroup and refForGroupLink exist, then add them to htmlString
    if (fieldset.refForGroup && fieldset.refForGroupLink) {
        const refs = Array.isArray(fieldset.refForGroup) ? fieldset.refForGroup : fieldset.refForGroup.split(", ");
        const links = Array.isArray(fieldset.refForGroupLink) ? fieldset.refForGroupLink : fieldset.refForGroupLink.split(", ");
        
        if (refs.length === links.length) {
          htmlString += `<h3 class="ref-links-header">References for ${fieldset.name}</h3><ul>`;
          for (let i = 0; i < refs.length; i++) {
            htmlString += `<li><a href="${links[i]}" class="groupRefClass">${refs[i]}</a></li>`;
          }
          htmlString += `</ul>`;
        } else {
          //console.error("Mismatch between number of refs and links for fieldset:", fieldset);
        }
      }

      for (const item of fieldset.items) {
        console.log(`Processing item: ${item.name}`); // Debugging the current item
        htmlString += `<hr>`;
        htmlString += `<h3 id="${item.id}" class="h3Class">${item.name}</h3>`;
        
        // Check if item.description exists before adding it to htmlString
        if (item.description) {
          htmlString += `<p>${item.description}</p>`;
        } else {
          htmlString += `<p>Description to be updated!</p>`;  // Placeholder text
        }
        
        //console.log("Generated HTML string:", htmlString);
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

  htmlString += "</section>";
  //console.log("Generated HTML string:", htmlString);  debugging
  return htmlString;
}

// Fetch the JSON and then use the data to populate the HTML content
fetch("../ui/options.json")
  .then((response) => response.json())
  .then((data: RootObject) => {
    //console.log("Received JSON data:", JSON.stringify(data, null, 2));
    const contentElement = document.getElementById("content");
    if (contentElement && data.tabs.length > 0) {
      let allTabsHTML = "";
      for (const tab of data.tabs) {
        //console.log(`Processing tab: ${tab.name}`);  //debugging
        //console.log(`Looping through tabs, currently at: ${tab.name}`);  // debugging
        console.log("Final HTML content:", allTabsHTML); // Debugging the final HTML content
        allTabsHTML += generateHTML(tab);  // Generate HTML for each tab
      }
      contentElement.innerHTML = allTabsHTML;  // Set the HTML content for all tabs
    }
  })
  .catch((error) => console.error("Error fetching the JSON:", error));
