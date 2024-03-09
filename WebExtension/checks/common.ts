"use strict";

function getWrapperDiv(element: Element) {
  const wrapperAttribute = "data-a11y-wrapper-2edbc8ab";

  // Check if we have a sibling, and if we do that it's not our wrapper
  let wrapper = element.nextElementSibling;
  if (wrapper == null || !wrapper.hasAttribute(wrapperAttribute)) {
    // We don't have a wrapper yet, so create it.
    wrapper = document.createElement("div");
    wrapper.setAttribute(wrapperAttribute, "");
    element.after(wrapper);
  }
  return wrapper;
}

// Create the message div as a child of the target element
function createChildMessageDiv(
  element: Element,
  messageClass: string,
  message: string,
  extraClasses: string[] = []
) {
  const wrapper = getWrapperDiv(element);
  wrapper.appendChild(createNewMessageDiv(messageClass, message, extraClasses));
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
