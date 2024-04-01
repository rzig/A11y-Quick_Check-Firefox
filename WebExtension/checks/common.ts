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

function createFollowingDiv(targetElement: Element): HTMLDivElement {
  const attributeLabel = "data-after-div-9f2dc5ea";

  let followingDiv = targetElement.nextElementSibling as HTMLDivElement;
  if (followingDiv == null || !followingDiv.hasAttribute(attributeLabel)) {
    followingDiv = document.createElement("div");
    followingDiv.setAttribute(attributeLabel, "");
    targetElement.after(followingDiv);
  }
  return followingDiv;
}

//New global helper message for checks that include the numbered circle
function addMessageToFollowingDiv(
  element: Element,
  messageClass: string,
  message: string,
  extraClasses: string[] = [] 
) {
  const followingDiv = createFollowingDiv(element);
  followingDiv.appendChild(
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
  canUse: Record<string, string>;
} = { wcag: {}, aria: {}, html: {}, custom: {}, canUse: {} };

// Initialize link objects with empty objects
var wcagLinks: Record<string, string> = {};
var ariaLinks: Record<string, string> = {};
var htmlLinks: Record<string, string> = {};
var customLinks: Record<string, string> = {};
var canUseLinks: Record<string, string> = {};

function populateLinkObjects() {
  if (Object.keys(wcagLinks).length === 0) {
    wcagLinks = {
      "1.1.1 Non-text Content (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content",
      "1.2.1 Audio-only and Video-only (Prerecorded) (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded",
      "1.2.2 Captions (Prerecorded) (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded",
      "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded",
      "1.2.5 Audio Description (Prerecorded) (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded",
      "1.2.8 Media Alternative (Prerecorded) (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/media-alternative-prerecorded",
      "1.3.1 Info and Relationships (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      "1.3.2 Meaningful Sequence (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence",
      "1.3.3 Sensory Characteristics (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics",
      "1.4.1 Use of Color (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color",
      "1.4.2 Audio Control (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/audio-control",
      "1.4.4 Resize text (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/resize-text",
      "2.1.1 Keyboard (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
      "2.1.2 No Keyboard Trap (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap",
      "2.2.1 Timing Adjustable (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable",
      "2.2.2 Pause, Stop, Hide (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide",
      "2.4.1 Bypass Blocks (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks",
      "2.4.2 Page Titled (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/page-titled",
      "2.4.3 Focus Order (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
      "2.4.4 Link Purpose (In Context) (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context",
      "2.4.5 Multiple Ways (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways",
      "2.4.6 Headings and Labels (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels",
      "2.4.7 Focus Visible (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
      "3.1.1 Language of Page (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/language-of-page",
      "3.1.2 Language of Parts (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts",
      "3.2.1 On Focus (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/on-focus",
      "3.2.2 On Input (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/on-input",
      "3.2.3 Consistent Navigation (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation",
      "3.2.4 Consistent Identification (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification",
      "3.3.1 Error Identification (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/error-identification",
      "3.3.2 Labels or Instructions (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions",
      "3.3.3 Error Suggestion (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion",
      "3.3.4 Error Prevention (Legal, Financial, Data) (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data",
      "4.1.1 Parsing (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/parsing",
      "4.1.2 Name, Role, Value (Level A)": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
      "1.3.5 Identify Input Purpose (Level AA)": "https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose",
      "1.4.3 Contrast (Minimum) (Level AA)": "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum",
      "1.4.6 Contrast (Enhanced) (Level AA)": "https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced",
      "1.4.7 Low or No Background Audio (Level AA)": "https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio",
      "1.4.8 Visual Presentation (Level AA)": "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation",
      "1.4.10 Reflow (Level AA)": "https://www.w3.org/WAI/WCAG22/Understanding/reflow",
      "1.4.11 Non-text Contrast (Level AA)": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast",
      "1.4.12 Text Spacing (Level AA)": "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing",
      "1.4.13 Content on Hover or Focus (Level AA)": "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus"
    };
  
  }
//Add ARIA related URLs as needed
  if (Object.keys(ariaLinks).length === 0) {
    ariaLinks = {
      "aria-label property": "https://www.w3.org/TR/wai-aria-1.2/#aria-label",
      "aria-labelledby property": "https://www.w3.org/TR/wai-aria/#aria-labelledby",
      "aria-controls property": "https://www.w3.org/TR/wai-aria-1.2/#aria-controls",
      "aria-describedby property": "https://www.w3.org/TR/wai-aria-1.2/#aria-describedby",
      "Accessible Name and Description Computation 1.2": "https://www.w3.org/TR/accname-1.2/",
    };
  }

  //Add HTML related URLs as needed
  if (Object.keys(htmlLinks).length === 0) {
    htmlLinks = {
      "4.3.7 The hgroup element": "https://html.spec.whatwg.org/multipage/sections.html#the-hgroup-element",
      "4.3.11 Headings and outlines": "https://html.spec.whatwg.org/multipage/sections.html#headings-and-outlines-2",
      "4.4.5 The ol element": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element",
      "4.4.6 The ul element": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element",
      "4.4.8 The li element": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element",
      "4.4.9 The dl element":"https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element",
      "4.4.10 The dt element": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-dt-element",
      "4.4.11 The dd element": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-dd-element",
      "6.6.3 The tabindex attribute": "https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute",
      "4.10.18.7.1 Autofilling form controls: the autocomplete attribute": "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute",
    };
  }

//Add URLs of explanation pages and other useful links
  if (Object.keys(customLinks).length === 0) {
    customLinks = {
      "Inline": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#:~:text=the%20%22Equivalent%22%20exception.-,Inline,-%3A%20The%20Success",
      "Spacing": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#:~:text=are%20five%20exceptions%3A-,Spacing,-%3A%20Undersized%20targets",
    };
  }

  //Add URLs of CanIUse
  if (Object.keys(canUseLinks).length === 0) {
    canUseLinks = {
      "hgroup": "https://caniuse.com/?search=hgroup",
    };
  }

  linkObjects.wcag = wcagLinks;
  linkObjects.aria = ariaLinks;
  linkObjects.html = htmlLinks;
  linkObjects.custom = customLinks;
  linkObjects.canUse = canUseLinks;
}

populateLinkObjects();

// Utility function to escape HTML special characters in a string
function escapeHTML(str: string): string {
  return str.replace(/[&<>"'/]/g, (match) => {
    const escape: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
    };
    // Provide a default case to ensure a string is always returned
    return escape[match] || match;
  });
}

// Utility function to escape RegExp special characters in a string
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function appendHyperlinksToMessage(message: string, linkType: 'wcag' | 'aria' | 'html' | 'custom' = 'custom'): string {
  const links = linkObjects[linkType];
  Object.entries(links).forEach(([key, value]) => {
    const safeKey = escapeRegExp(key);
    const safeValue = escapeHTML(value);
    const safeLinkText = escapeHTML(key);
    
    // Construct the HTML string for the anchor tag
    const anchorTagString = `<a href="${safeValue}" class="hyperlinked-text-9927845" rel="noopener noreferrer">${safeLinkText}</a>`;
    const regex = new RegExp(safeKey, 'g');
    
    // Replace occurrences of the key with the safely constructed anchor tag string
    message = message.replace(regex, anchorTagString);
  });

  return message;
}

function createReferenceContainer(): HTMLDivElement | null {
  // Check if the container already exists
  if (document.querySelector('.reference-container-9927845')) {
    return null; // Container already exists, no need to create another.
  }

  // Check if the current window is the main window and not an iframe
  if (window === window.parent) {
    const referenceContainer = document.createElement('div');
    referenceContainer.className = 'reference-container-9927845';

    const referencePara = document.createElement('p');
    referencePara.className = 'reference-9927845';
    const strongReference = document.createElement('strong');
    const referenceText = document.createTextNode('References');
    strongReference.appendChild(referenceText);
    referencePara.appendChild(strongReference);

    referenceContainer.appendChild(referencePara);

    document.body.appendChild(referenceContainer); // Append only if it's the main window

    return referenceContainer;
  }

  return null; // If in an iframe, do not create or append the container.
}

function createMinMaxButton(containerDiv: HTMLDivElement): void {
  if (!containerDiv) return; // Ensure the containerDiv is valid

  // Minimize button
  const minButton = document.createElement('button');
  minButton.className = 'minimize-button-9927845';
  minButton.textContent = 'Minimize';
  
  // Maximize button
  const maxButton = document.createElement('button');
  maxButton.className = 'maximise-button-9927845';
  maxButton.textContent = 'Maximize';

  // Minimize action
  minButton.addEventListener('click', () => {
    Array.from(containerDiv.children).forEach(child => {
      if (child !== minButton) child.classList.add('hidden-feature-message-9927845');
    });
    document.body.appendChild(maxButton); // Move Maximize button to body when minimized
    minButton.remove(); // Remove Minimize button after action
  });

  // Maximize action
  maxButton.addEventListener('click', () => {
    Array.from(containerDiv.children).forEach(child => {
      child.classList.remove('hidden-feature-message-9927845');
    });
    containerDiv.appendChild(minButton); // Add Minimize button back to the containerDiv
    maxButton.remove(); // Remove Maximize button after action
  });

  containerDiv.appendChild(minButton); // Initially append Minimize button
}

// function createMinMaxButton(containerDiv: HTMLDivElement): void {
//   if (!containerDiv) return; // Ensure the containerDiv is valid

//   const minmaxButton = document.createElement('button');
//   minmaxButton.className = 'minimize-button-9927845';
//   minmaxButton.textContent = 'Minimize';

//   minmaxButton.addEventListener('click', () => {
//     const isMinimized = minmaxButton.textContent === 'Minimize';
//     Array.from(containerDiv.children).forEach(child => {
//       if (child !== minmaxButton) child.classList.toggle('hidden-feature-message-9927845', isMinimized);
//     });

//     if (isMinimized) {
//       minmaxButton.classList.remove('maximise-button-9927845');
//       minmaxButton.classList.add('button-fixed-9927845');
//       minmaxButton.textContent = 'Maximize';
//     } else {
//       minmaxButton.classList.remove('button-fixed-9927845');
//       minmaxButton.classList.add('maximise-button-9927845');
//       minmaxButton.textContent = 'Minimize';
//     }
//   });

//   containerDiv.appendChild(minmaxButton);
// }

function createDismissButton(containerDiv: HTMLDivElement): void {
  if (!containerDiv) return;

  const dismissButton = document.createElement('button');
  dismissButton.className = 'dismiss-button-9927845';
  dismissButton.textContent = 'Dismiss Feature message';
  dismissButton.addEventListener('click', () => containerDiv.remove());
  containerDiv.appendChild(dismissButton);
}