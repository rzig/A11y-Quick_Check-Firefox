"use strict";

function getWrapperDiv(element: Element): HTMLDivElement {
  const wrapperAttribute = "data-a11y-wrapper-2edbc8ab";

  // Check if we have a sibling, and if we do that it's not our wrapper
  let wrapper = element.nextElementSibling;
  if (wrapper == null || !wrapper.hasAttribute(wrapperAttribute)) {
    // We don't have a wrapper yet, so create it.
    wrapper = document.createElement("div");
    wrapper.setAttribute(wrapperAttribute, "");
    element.after(wrapper);
  }
  return wrapper as HTMLDivElement;
}

// Create the message div as a child of the target element
function createChildMessageDiv(
  element: Element,
  messageClass: string,
  message: string,
  extraClasses: string[] = []
) {
  const wrapper = getWrapperDiv(element);
  // Use createStyledMessageDiv instead of createNewMessageDiv for styling and prefix handling
  wrapper.appendChild(createStyledMessageDiv(messageClass, message, extraClasses));
}

function createNewMessageDiv(
  messageClass: string,
  message: string,
  extraClasses: string[]
) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(messageClass);
  for (const extraClass of extraClasses) {
    messageDiv.classList.add(extraClass);
  }
  messageDiv.classList.add("common-a11y-message-2edbc8ab");
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function createPrecedingDiv(targetElement: Element): HTMLDivElement {
  const attributeLabel = "data-before-div-9f2dc5ea";

  // Check if we have a preceding sibling, and if we do that it's not our custom div
  let precedingDiv = targetElement.previousElementSibling as HTMLDivElement;
  if (precedingDiv == null || !precedingDiv.hasAttribute(attributeLabel)) {
    // We don't have our custom div yet, so create it.
    precedingDiv = document.createElement("div");
    precedingDiv.setAttribute(attributeLabel, "");
    targetElement.before(precedingDiv);
  }
  return precedingDiv;
}

//New common function for a colour topic label on messages
function createStyledMessageDiv(
  messageClass: string,
  message: string,
  extraClasses: string[] = []
): HTMLDivElement {
    const div = document.createElement("div");
    div.className = messageClass;
    extraClasses.forEach(cls => div.classList.add(cls));

    // Mapping from message prefix to the respective CSS class
    const prefixToClass = {
        "Best practice": "messageLabelGeneric",
        "Warning": "messageLabelWarning",
        "Invalid": "messageLabelInvalid",
        "Valid": "messageLabelValid",
        "Accessible name": "messageLabelaccName", //To do
        "Knowledge" : "messageLabelKnowledge",
        "Needs manual confirmation" : "messageLabelManualConfirmation",
    };

    let foundPrefix = false; // Flag to indicate if a prefix is found

    // Iterate over known prefixes to find a match and style it separately
    Object.entries(prefixToClass).forEach(([prefix, labelClass]) => {
        if (message.startsWith(prefix)) {
            foundPrefix = true; // Mark that a prefix is found

            // Create a span for the prefix and add it to the div
            const labelSpan = document.createElement("span");
            labelSpan.className = labelClass;
            labelSpan.textContent = prefix;
            div.appendChild(labelSpan);

            // Append the rest of the message after the prefix
            // Ensure to trim and remove any leading colon
            const restMessageText = message.substring(prefix.length).trimStart(); // Remove prefix from the rest of the message
            if (restMessageText.startsWith(':')) {
                // Remove leading colon if present and trim any extra space
                div.appendChild(document.createTextNode(restMessageText.substring(1).trimStart()));
            } else {
                // No leading colon, just append the rest of the message
                div.appendChild(document.createTextNode(restMessageText));
            }
            return; // Exit the loop after handling the prefix
        }
    });

    if (!foundPrefix) {
        // If no known prefix was found, just add the full message as is
        div.textContent = message;
    }

    return div;
}

// Update addMessageToPrecedingDiv function to use createStyledMessageDiv
function addMessageToPrecedingDiv(
  element: Element,
  messageClass: string,
  message: string,
  extraClasses: string[] = []
) {
  const precedingDiv = createPrecedingDiv(element);
  precedingDiv.appendChild(
    createStyledMessageDiv(messageClass, message, extraClasses)
  );
}

function removeInjectedDivs(messageClasses: string[]) {
  for (const messageClass of messageClasses) {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    for (const messageDiv of messageDivs) {
      const parentWrapper = messageDiv.parentElement!;
      messageDiv.remove();
      if (parentWrapper.children.length == 0) {
        parentWrapper.remove();
      }
    }
  }
}

//Helper for hidden elements !isHidden(imgElement)
function isHidden(element: HTMLElement): boolean {
  const style: CSSStyleDeclaration = getComputedStyle(element);
  return (
    style.display === "none" ||
    style.visibility === "hidden" ||
    element.hasAttribute("hidden")
  );
}

// Declare linkObjects with empty objects as default values
var linkObjects: {
  wcag: Record<string, string>;
  aria: Record<string, string>;
  custom: Record<string, string>;
} = { wcag: {}, aria: {}, custom: {} };

// Initialize link objects as empty objects
var wcagLinks: Record<string, string> = {};
var ariaLinks: Record<string, string> = {};
var customLinks: Record<string, string> = {};

// Function to populate link objects if they are not empty
function populateLinkObjects() {
  if (Object.keys(wcagLinks).length === 0) {
    wcagLinks = {
      "1.3.1 Info and Relationships": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      // Add more WCAG criteria and URLs as needed
    };
  }

  if (Object.keys(ariaLinks).length === 0) {
    ariaLinks = {
      "aria-labelledby": "https://www.w3.org/TR/wai-aria/#aria-labelledby"
      // Add more ARIA attributes and URLs as needed
    };
  }

  if (Object.keys(customLinks).length === 0) {
    customLinks = {
      "Inline": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html#key-terms:~:text=the%20%22Equivalent%22%20exception.-,Inline,-%3A%20The%20Success",
      "Spacing": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html#key-terms:~:text=are%20five%20exceptions%3A-,Spacing,-%3A%20Undersized%20targets"
      // Add more custom links as needed
    };
  }

  // Assign the link objects if they are not empty
  if (Object.keys(wcagLinks).length !== 0) {
    linkObjects.wcag = wcagLinks;
  }
  if (Object.keys(ariaLinks).length !== 0) {
    linkObjects.aria = ariaLinks;
  }
  if (Object.keys(customLinks).length !== 0) {
    linkObjects.custom = customLinks;
  }
}

// Call function to populate link objects
populateLinkObjects();

// Function to append hyperlinks to messages with specified link type
function appendHyperlinksToMessage(
  message: string,
  linkType: 'wcag' | 'aria' | 'custom' = 'custom'
): string {
  const links: Record<string, string> = linkObjects[linkType];

  // Replace all occurrences of link keys in the message with hyperlinked versions
  Object.entries(links).forEach(([key, value]) => {
    const linkHTML = `<a href="${value}" class="hyperlinked-text-9927845" rel="noopener noreferrer">${key}</a>`;
    message = message.replace(new RegExp(key, 'g'), linkHTML);
  });

  return message;
}

// Function to create dismiss button
function createDismissButton(containerDiv: HTMLDivElement): void {
  const dismissButton = document.createElement('button');
  dismissButton.className = 'dismiss-button-9927845';
  dismissButton.textContent = 'Dismiss';

  // Add event listener to the dismiss button
  dismissButton.addEventListener('click', () => {
    containerDiv.remove();
  });

  // Append the dismiss button to the container div
  containerDiv.appendChild(dismissButton);
}

// Function to create the reference container
function createReferenceContainer(): HTMLDivElement {
  // Create the div element for the reference container
  const referenceContainer = document.createElement('div');
  referenceContainer.className = 'reference-container-9927845';

  // Create text node for the word "Reference"
  const referenceText = document.createTextNode('Reference');
  const strongReference = document.createElement('strong');
  strongReference.appendChild(referenceText);

  // Create the paragraph element for the reference
  const referencePara = document.createElement('p');
  referencePara.className = 'reference-9927845';
  referencePara.appendChild(strongReference);

  // Check if wcagLinks["1.3.1 Info and Relationships"] is defined before accessing
  const wcagLink = linkObjects.wcag["1.3.1 Info and Relationships"];
  if (wcagLink) {
    // Create the anchor element for the hyperlink
    const anchorElement = document.createElement('a');
    anchorElement.href = wcagLink;
    anchorElement.textContent = "1.3.1 Info and Relationships";
    anchorElement.setAttribute("rel", "noopener noreferrer");
    anchorElement.style.textDecoration = 'underline';
    anchorElement.style.color = 'var(--neutral-text)';

    // Create the paragraph element to wrap the anchor element
    const linkWrapper = document.createElement('p');
    linkWrapper.className = 'linkstyler-88976';
    linkWrapper.appendChild(anchorElement);

    // Append the elements to the reference container
    referenceContainer.appendChild(referencePara);
    referenceContainer.appendChild(linkWrapper);
  }

  return referenceContainer;
}