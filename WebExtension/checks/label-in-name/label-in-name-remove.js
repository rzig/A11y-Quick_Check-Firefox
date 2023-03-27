// Function to remove all div elements with the classes "computed-name-9937664" and "mismatch-9937664"
function removeComputedNames() {
  // Get all div elements with the class "computed-name-9937664" and "mismatch-9937664"
  const computedNameDivs = document.querySelectorAll("div.computed-name-9937664, div.mismatch-9937664");
  
  // Loop through each computed name div and remove it from the DOM
  computedNameDivs.forEach(computedNameDiv => {
    computedNameDiv.remove();
  });
}

// Call the removeComputedNames function to remove the computed names from the DOM
removeComputedNames();