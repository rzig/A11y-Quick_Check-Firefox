function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

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

function checkAccNameMatchesLabelText(element) {
  let referenceText;

  // Get the text node of the label associated with the element
  const elementId = element.getAttribute("id");
  const associatedLabel = document.querySelector(`label[for="${elementId}"]`);

  if (associatedLabel) {
    referenceText = associatedLabel.textContent.trim();
  } else if (element.getAttribute("aria-label")) {
    referenceText = element.getAttribute("aria-label").trim();
  } else {
    return;
  }

  // Get the accessible name of the element
  const accName = element.getAttribute("aria-label") || element.getAttribute("aria-labelledby") || element.getAttribute("title") || element.getAttribute("placeholder") || (associatedLabel ? associatedLabel.textContent.trim() : element.textContent.trim());

  if (accName.toLowerCase() !== referenceText.toLowerCase()) {
    const elementType = element.nodeName.toLowerCase();
    const messageText = `The accessible name of the ${elementType} "${accName}" does not match its corresponding ${elementType === 'button' ? 'visible text' : 'label text'} "${referenceText}".`;

    const container = createMessageDiv("computed-name-9937664", "mismatch-9937664", messageText);

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

function addComputedNames() {
  const buttonsAndFormControls = document.querySelectorAll("button, input, textarea, select");

  buttonsAndFormControls.forEach(element => {
    const computedNameMethod = getComputedNameMethod(element);
    const ariaComputedName = element.getAttribute(computedNameMethod);
    const { computedName, from } = ariaComputedName ? { computedName: ariaComputedName, from: computedNameMethod } : getComputedName(element);

    const messageText = computedName ? `Computed name is: ${computedName}. From: ${from}` : "No computed name identified";
    const container = createMessageDiv("computed-name-9937664", messageText);

    if (!computedName) {
      container.classList.add("mismatch-9937664");
    }

    element.after(container);
  });
}

function checkAndReportNameMismatches() {
  const buttonsAndFormControls = document.querySelectorAll("button, input, textarea, select");

  buttonsAndFormControls.forEach(element => {
    checkAccNameMatchesLabelText(element);
  });
}

addComputedNames();
checkAndReportNameMismatches();