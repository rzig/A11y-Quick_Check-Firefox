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

  // Check if the element has a title attribute
  if (element.getAttribute("title")) {
    return "title";
  }

  // Check if the element has a placeholder attribute
  if (element.getAttribute("placeholder")) {
    return "placeholder";
  }

  // If none of the above methods are used, return "computed name"
  return "computed name";
}

// Function to check if the accessible name of an element matches its corresponding label text or visible text
function checkAccNameMatchesLabelText(element) {
  let referenceText;

  // Get the text node of the label associated with the element
  const elementId = element.getAttribute("id");
  const associatedLabel = document.querySelector(`label[for="${elementId}"]`);

  if (associatedLabel) {
    referenceText = associatedLabel.firstChild;
  } else if (element.getAttribute("aria-label")) {
    referenceText = document.createTextNode(element.textContent.trim());
  } else {
    return;
  }

  // Get the accessible name of the element
  const accName = element.getAttribute("aria-label") || element.getAttribute("aria-labelledby") || element.getAttribute("title") || element.getAttribute("placeholder") || element.textContent.trim();

  // Check if the accessible name matches the label text or visible text
  if (accName.toLowerCase() !== referenceText.textContent.trim().toLowerCase()) {
    const elementType = element.nodeName.toLowerCase();
    const messageText = `The accessible name of the ${elementType} "${accName}" does not match its corresponding ${elementType === 'button' ? 'visible text' : 'label text'} "${referenceText.textContent.trim()}".`;
    const message = document.createTextNode(messageText);

    // Create a div element with a class of "computed-name" and add the text node to it
    const container = document.createElement("div");
    container.classList.add("computed-name-9937664", "mismatch-9937664");
    container.appendChild(message);

    // Insert the computed name div after the element
    element.after(container);
  }
}

// Function to get the computed name of an element
function getComputedName(element) {
  const computedNameMethod = getComputedNameMethod(element);
  
  if (computedNameMethod === "aria-label") {
    return {
      computedName: element.getAttribute("aria-label"),
      from: "aria-label"
    };
  }

  if (element.matches('button')) {
    return {
      computedName: element.textContent.trim(),
      from: "Text"
    };
  }

  const controlId = element.getAttribute("id");
  const associatedLabel = document.querySelector(`label[for="${controlId}"]`);
  if (associatedLabel) {
    return {
      computedName: associatedLabel.textContent.trim(),
      from: "Label"
    };
  }

  const parentLabel = element.closest('label');
  if (parentLabel) {
    return {
      computedName: parentLabel.textContent.trim().replace(/\s+/g, ' '),
      from: "Text"
    };
  }

  return {
    computedName: '',
    from: ''
  };
}



// Function to add computed names to all buttons and form controls on the page
function addComputedNames() {
  // Get all buttons and form controls on the page (excluding links)
  const buttonsAndFormControls = document.querySelectorAll("button, input, textarea, select, option, fieldset");

  // Loop through each element and add its computed name and method to the page
  buttonsAndFormControls.forEach(element => {
    // Get the computed name of the element
    const computedNameMethod = getComputedNameMethod(element);
    const ariaComputedName = element.getAttribute(computedNameMethod);
    const { computedName, from } = ariaComputedName ? { computedName: ariaComputedName, from: computedNameMethod } : getComputedName(element);

    // If the computed name is not empty, display the message
    const messageText = computedName ? `Computed name is: ${computedName}. From: ${from}` : "No computed name identified";
    const message = document.createTextNode(messageText);

    // Create a div element with a class of "computed-name" and add the text node to it
    const container = document.createElement("div");
    container.classList.add("computed-name-9937664");

    // Add the "mismatch-9937664" class if there is no computed name
    if (!computedName) {
      container.classList.add("mismatch-9937664");
    }

    container.appendChild(message);

    // Insert the computed name div after the element
    element.after(container);
  });
}




function checkAndReportNameMismatches() {
  // Get all buttons and form controls on the page (excluding links)
  const buttonsAndFormControls = document.querySelectorAll("button, input, textarea, select");

  // Loop through each element and check if the accessible name matches the label text or visible text
  buttonsAndFormControls.forEach(element => {
    checkAccNameMatchesLabelText(element);
  });
}

// Call the addComputedNames function to add computed names to all buttons and form controls on the page
addComputedNames();

// Call the checkAndReportNameMismatches function to check and report mismatches of visible text to accessible name
checkAndReportNameMismatches();

