// Function to remove all div elements with the class "computed-name"
function removeComputedNames() {
  // Get all div elements with the class "computed-name"
  const computedNameDivs = document.querySelectorAll("div.computed-name");
  
  // Loop through each computed name div and remove it from the DOM
  computedNameDivs.forEach(computedNameDiv => {
    computedNameDiv.remove();
  });
}

// Call the removeComputedNames function to remove the computed names from the DOM
removeComputedNames();
