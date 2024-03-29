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

// Declare linkObjects with types and initial empty objects
var linkObjects: {
  wcag: Record<string, string>;
  aria: Record<string, string>;
  html: Record<string, string>;
  custom: Record<string, string>;
} = { wcag: {}, aria: {}, html: {}, custom: {} };

// Initialize link objects with empty objects
var wcagLinks: Record<string, string> = {};
var ariaLinks: Record<string, string> = {};
var htmlLinks: Record<string, string> = {};
var customLinks: Record<string, string> = {};

function populateLinkObjects() {
  if (Object.keys(wcagLinks).length === 0) {
    wcagLinks = {
      "1.1.1 Non-text Content": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content",
      "1.2.1 Audio-only and Video-only (Prerecorded)": "https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded",
      "1.2.2 Captions (Prerecorded)": "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded",
      "1.2.3 Audio Description or Media Alternative (Prerecorded)": "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded",
      "1.2.4 Captions (Live)": "https://www.w3.org/WAI/WCAG22/Understanding/captions-live",
      "1.2.5 Audio Description (Prerecorded)": "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded",
      "1.2.8 Media Alternative (Prerecorded)": "https://www.w3.org/WAI/WCAG22/Understanding/media-alternative-prerecorded",
      "1.3.1 Info and Relationships": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      "1.3.2 Meaningful Sequence": "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence",
      "1.3.3 Sensory Characteristics": "https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics",
      "1.4.1 Use of Color": "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color",
      "1.4.2 Audio Control": "https://www.w3.org/WAI/WCAG22/Understanding/audio-control",
      "1.4.3 Contrast (Minimum)": "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum",
      "1.4.4 Resize text": "https://www.w3.org/WAI/WCAG22/Understanding/resize-text",
      "1.4.5 Images of Text": "https://www.w3.org/WAI/WCAG22/Understanding/images-of-text",
      "1.4.6 Contrast (Enhanced)": "https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced",
      "1.4.7 Low or No Background Audio": "https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio",
      "1.4.8 Visual Presentation": "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation",
      "1.4.9 Images of Text (No Exception)": "https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception",
      "1.4.10 Reflow": "https://www.w3.org/WAI/WCAG22/Understanding/reflow",
      "1.4.11 Non-text Contrast": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast",
      "1.4.12 Text Spacing": "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing",
      "1.4.13 Content on Hover or Focus": "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus",
      "2.1.1 Keyboard": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
      "2.1.2 No Keyboard Trap": "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap",
      "2.2.1 Timing Adjustable": "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable",
      "2.2.2 Pause, Stop, Hide": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide",
      "2.3.1 Three Flashes or Below Threshold": "https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold",
      "2.4.1 Bypass Blocks": "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks",
      "2.4.2 Page Titled": "https://www.w3.org/WAI/WCAG22/Understanding/page-titled",
      "2.4.3 Focus Order": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
      "2.4.4 Link Purpose (In Context)": "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context",
      "2.4.5 Multiple Ways": "https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways",
      "2.4.6 Headings and Labels": "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels",
      "2.4.7 Focus Visible": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
      "3.1.1 Language of Page": "https://www.w3.org/WAI/WCAG22/Understanding/language-of-page",
      "3.1.2 Language of Parts": "https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts",
      "3.2.1 On Focus": "https://www.w3.org/WAI/WCAG22/Understanding/on-focus",
      "3.2.2 On Input": "https://www.w3.org/WAI/WCAG22/Understanding/on-input",
      "3.2.3 Consistent Navigation": "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation",
      "3.2.4 Consistent Identification": "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification",
      "3.3.1 Error Identification": "https://www.w3.org/WAI/WCAG22/Understanding/error-identification",
      "3.3.2 Labels or Instructions": "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions",
      "3.3.3 Error Suggestion": "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion",
      "3.3.4 Error Prevention (Legal, Financial, Data)": "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data",
      "4.1.1 Parsing": "https://www.w3.org/WAI/WCAG22/Understanding/parsing",
      "4.1.2 Name, Role, Value": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
  };
  
  }
//Add ARIA related URLs as needed
  if (Object.keys(ariaLinks).length === 0) {
    ariaLinks = {
      "aria-labelledby": "https://www.w3.org/TR/wai-aria/#aria-labelledby",
      "Accessible Name and Description Computation 1.2": "https://www.w3.org/TR/accname-1.2/",
    };
  }

  //Add HTML related URLs as needed
  if (Object.keys(htmlLinks).length === 0) {
    htmlLinks = {
      "6.6.3 The tabindex attribute": "https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute",
    };
  }

//Add URLs of explanation pages and other useful links
  if (Object.keys(customLinks).length === 0) {
    customLinks = {
      "Inline": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#:~:text=the%20%22Equivalent%22%20exception.-,Inline,-%3A%20The%20Success",
      "Spacing": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#:~:text=are%20five%20exceptions%3A-,Spacing,-%3A%20Undersized%20targets",
    };
  }

  linkObjects.wcag = wcagLinks;
  linkObjects.aria = ariaLinks;
  linkObjects.html = htmlLinks;
  linkObjects.custom = customLinks;
}

populateLinkObjects();

function appendHyperlinksToMessage(message: string, linkType: 'wcag' | 'aria' | 'html' | 'custom' = 'custom'): string {
  const links = linkObjects[linkType];
  Object.entries(links).forEach(([key, value]) => {
    const anchor = document.createElement('a');
    anchor.href = value;
    anchor.className = 'hyperlinked-text-9927845';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = key;

    // Create a RegExp to match the key globally in the message
    const regex = new RegExp(key, 'g');
    
    // Replace occurrences of the key with the anchor tag in the message
    message = message.replace(regex, anchor.outerHTML);
  });

  return message;
}

function createReferenceContainer(): HTMLDivElement {
  const referenceContainer = document.createElement('div');
  referenceContainer.className = 'reference-container-9927845';

  const referencePara = document.createElement('p');
  referencePara.className = 'reference-9927845';
  const strongReference = document.createElement('strong');
  const referenceText = document.createTextNode('Reference');
  strongReference.appendChild(referenceText);
  referencePara.appendChild(strongReference);

  referenceContainer.appendChild(referencePara);

  return referenceContainer;
}

function createDismissButton(containerDiv: HTMLDivElement): void {
  const dismissButton = document.createElement('button');
  dismissButton.className = 'dismiss-button-9927845';
  dismissButton.textContent = 'Dismiss';
  dismissButton.addEventListener('click', () => containerDiv.remove());
  containerDiv.appendChild(dismissButton);
}