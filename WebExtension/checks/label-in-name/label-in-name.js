//getComputedNameMethod.js
// Function to get the method used to provide the computed name of an element
function getComputedNameMethod(element) {
  // Check if the element has an aria-label attribute
  if (element.getAttribute("aria-label")) {
    return "aria-label";
  }
  
  // Check if the element has an aria-labelledby attribute
  if (element.getAttribute("aria-labelledby")) {
    return "aria-labelledby";
  }
  
  // If none of the above methods are used, return "computed name"
  return "computed name";
}
//checkAccNameMatchesLabelText.js
// Function to check if the accessible name of an element matches its corresponding label text
function checkAccNameMatchesLabelText(element) {
  // Get the text node of the label associated with the element
  const elementId = element.getAttribute("id");
  const associatedLabel = document.querySelector(`label[for="${elementId}"]`);
  if (associatedLabel) {
    const labelText = associatedLabel.firstChild;
  
    // Get the accessible name of the element
    const accName = element.getAttribute("aria-label") || element.getAttribute("aria-labelledby") || element.getAttribute("title") || element.textContent.trim();
  
    // Check if the accessible name matches the label text
    if (accName.toLowerCase() !== labelText.textContent.trim().toLowerCase()) {
      console.warn(`The accessible name of the ${element.nodeName.toLowerCase()} "${accName}" does not match its corresponding label text "${labelText.textContent.trim()}".`);
    }
  }
}
//addComputedNamesFromLabels.js
// Function to add computed names to form controls with associated labels
function addComputedNamesFromLabels() {
  // Get all form controls on the page
  const formControls = document.querySelectorAll("button, input, textarea, select, option, fieldset");

  // Loop through each form control
  formControls.forEach(formControl => {
    // Check if the form control has an associated label with a for attribute that matches the form control's ID
    const controlId = formControl.getAttribute("id");
    const associatedLabel = document.querySelector(`label[for="${controlId}"]`);
    if (associatedLabel) {
      // Get the text node of the associated label
      const labelText = associatedLabel.firstChild;
  
      // Get the computed name of the form control
      const computedNameMethod = getComputedNameMethod(formControl);
      const computedName = formControl.getAttribute(computedNameMethod);
  
      // Create a text node with the computed name and method
      const messageText = `Name from Label. Computed name is: ${labelText.textContent.trim()}${computedName ? ` (${computedNameMethod}: ${computedName})` : ""}`;
      const message = document.createTextNode(messageText);
  
      // Create a div element with a class of "computed-name" and add the text node to it
      const container = document.createElement("div");
      container.classList.add("computed-name");
      container.appendChild(message);
  
      // Insert the computed name div after the form control
      formControl.after(container);
    }
  });
}
//addComputedNames.js
// Function to add computed names to all buttons and form controls on the page
function addComputedNames() {
  // Get all buttons and form controls on the page (excluding links)
  const buttonsAndFormControls = document.querySelectorAll("button, input, textarea, select, option, fieldset");

  // Loop through each element and add its computed name and method to the page
  buttonsAndFormControls.forEach(element => {
    const elementId = element.getAttribute("id");
    const associatedLabel = document.querySelector(`label[for="${elementId}"]`);

    // Get the computed name of the element
    const computedNameMethod = getComputedNameMethod(element);
    const computedName = element.getAttribute(computedNameMethod);

    // Create a text node with the computed name and method
    let messageText;
    if (associatedLabel) {
      const labelText = associatedLabel.textContent.trim();
      messageText = `Computed name is: ${labelText}. From Label`;
    } else {
      messageText = `Computed name is: ${computedName}. From ${computedNameMethod}`;
    }
    const message = document.createTextNode(messageText);

    // Create a div element with a class of "computed-name" and add the text node to it
    const container = document.createElement("div");
    container.classList.add("computed-name");
    container.appendChild(message);

    // Insert the computed name div after the element
    element.after(container);
  });
}

// Call the addComputedNames function to add computed names to all buttons and form controls on the page
addComputedNames();
