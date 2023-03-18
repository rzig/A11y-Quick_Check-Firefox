// Function to remove all injected divs, classes, and text nodes created by the script
function removeAllInjectedDivs() {
    // Select all div elements with the 'computedProperties-9984746' class
    const injectedDivs = document.querySelectorAll('div.computedProperties-9984746');
  
    // Loop through each div element and remove it from the DOM
    injectedDivs.forEach((div) => {
      div.remove();
    });
  }
  
  // Call the function to remove all injected divs, classes, and text nodes
  removeAllInjectedDivs();
  