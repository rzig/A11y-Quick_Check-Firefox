"use strict";

// Function to check if an element is focusable
function isFocusable(element: Element): boolean {
  const focusableTags = ["a", "button", "input", "select", "textarea"];
  const tabIndex = element.getAttribute("tabindex");

  if (focusableTags.includes(element.tagName.toLowerCase())) {
    return true;
  }

  if (tabIndex !== null && parseInt(tabIndex) >= 0) {
    return true;
  }

  return false;
}

// Function to detect aria-hidden elements and add appropriate attributes and messages
function detectAriaHidden(): void {
  const ariaHiddenElements = document.querySelectorAll("[aria-hidden]");

  ariaHiddenElements.forEach((element: Element) => {
    const ariaHiddenValue = element.getAttribute("aria-hidden");

    if (ariaHiddenValue === "true") {
      const isVisuallyHidden = isHidden(element as HTMLElement);
      
      if (!isVisuallyHidden) {
        element.setAttribute("data-ariahidden66786", "true");
        if (isFocusable(element) && element.getAttribute("tabindex") !== "-1") {
          element.classList.add("aria-hidden-true-focusable-66786");
          const message = "Invalid aria-hidden true MUST NOT be used on focusable elements.";
          addMessageToPrecedingDiv(element, "aria-hidden-true-focusable-message-66786", message);
        } else {
          element.classList.add("aria-hidden-true-66786");
          const message = "Valid aria-hidden is set to true.";
          addMessageToPrecedingDiv(element, "aria-hidden-true-message-66786", message);
        }
      }
    } else if (ariaHiddenValue === "false") {
      element.setAttribute("data-warningariahidden66786", "false");
      element.classList.add("aria-hidden-false-66786");
      const message = "Warning aria-hidden is set to false.";
      addMessageToPrecedingDiv(element, "aria-hidden-false-message-66786", message);
    }
  });
}

// Run the functions
detectAriaHidden();

// Ensure the links are populated before use
populateLinkObjects(); 

function createTopRightContainerAriaHidden(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-ahid-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimised'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing aria-hidden",
    "The purpose of this check is to confirm that elements using the aria-hidden attribute are correctly applied to enhance accessibility. It examines each element with aria-hidden, ensuring that true values hide content appropriately from screen readers and that false values are not improperly used. Additionally, the check highlights when aria-hidden=true is applied to focusable elements, which is invalid. Generating and attaching messages to these elements, the check provides clear feedback on the use of aria-hidden, promoting effective hidden content management or noting when aria-hidden usage may be problematic.",
    //true // Set to true to have the details open by default
  );
  innerDiv.appendChild(checkDetails);

  // Additional notes
  const checkAdditionalDetails = createDetailsComponent(
    "Legend for aria-hidden",
    undefined, // No content text provided
    true // Set to true to have the details open by default
  );

  const ul = document.createElement("ul");

  const liBorder = document.createElement("li");
  liBorder.textContent = "Dashed border: Identifies element that includes aria-hidden.";
  ul.appendChild(liBorder);

  const liFalse = document.createElement("li");
  liFalse.textContent = "false: If you are reversing a true value, it is best to remove the attribute. aria-hidden false is known to work inconsistently in browsers, use caution and test thoroughly before relying on this approach.";
  ul.appendChild(liFalse);

  const liTrue = document.createElement("li");
  liTrue.textContent = "true: The element and its children are hidden from screen reader users. Use aria-hidden with care.";
  ul.appendChild(liTrue);

  checkAdditionalDetails.appendChild(ul);
  innerDiv.appendChild(checkAdditionalDetails);

  // Use createReferenceContainer to generate the reference section
  const referenceContainer = createReferenceContainer();
  if (referenceContainer) {
    innerDiv.appendChild(referenceContainer);

    // Link List
    const linkList = document.createElement("ul");
    linkList.className = "reference-list-9927845";
    linkList.style.margin = "0";
    linkList.style.padding = "0";
    
    referenceContainer.appendChild(linkList);

    // Specified links function
    function appendLink(
      links: Record<string, string>,
      key: string,
      category: string
    ): void {
      const href = links[key];
      if (href) {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.textContent = `${category} - ${key}`;
        listItem.appendChild(anchor);
        linkList.appendChild(listItem);
      }
    }

    // Append specific links
    appendLink(ariaLinks, "aria-hidden property", "ARIA");

    // Add the action buttons
  }
  createDismissButton(innerDiv, "Aria-Hidden");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);

  // Create the toggle button for messages and append it to the containerDiv
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Hide Messages";
  toggleButton.setAttribute("aria-pressed", "false");
  toggleButton.className = "toggle-button-9927845";

  toggleButton.addEventListener("click", () => {
    const messages = document.querySelectorAll(".message-66786");
    const isPressed = toggleButton.getAttribute("aria-pressed") === "true";

    messages.forEach((message) => {
      const msg = message as HTMLElement; // Cast Element to HTMLElement
      if (isPressed) {
        msg.style.display = "block";
      } else {
        msg.style.display = "none";
      }
    });

    toggleButton.setAttribute("aria-pressed", isPressed ? "false" : "true");
    toggleButton.textContent = isPressed ? "Hide Messages" : "Show Messages";
  });

  containerDiv.appendChild(toggleButton);
}

createTopRightContainerAriaHidden();