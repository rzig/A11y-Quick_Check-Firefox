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
        "1.1.1 Non-text Content (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content",
        "1.2.1 Audio-only and Video-only (Prerecorded) (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded",
        "1.2.2 Captions (Prerecorded) (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded",
        "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded",
        "1.2.5 Audio Description (Prerecorded) (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded",
        "1.2.8 Media Alternative (Prerecorded) (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/media-alternative-prerecorded",
        "1.3.1 Info and Relationships (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
        "1.3.2 Meaningful Sequence (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence",
        "1.3.3 Sensory Characteristics (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics",
        "1.4.1 Use of Color (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color",
        "1.4.2 Audio Control (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/audio-control",
        "1.4.4 Resize text (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/resize-text",
        "2.1.1 Keyboard (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
        "2.1.2 No Keyboard Trap (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap",
        "2.2.1 Timing Adjustable (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable",
        "2.2.2 Pause, Stop, Hide (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide",
        "2.4.1 Bypass Blocks (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks",
        "2.4.2 Page Titled (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/page-titled",
        "2.4.3 Focus Order (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
        "2.4.4 Link Purpose (In Context) (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context",
        "2.4.5 Multiple Ways (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways",
        "2.4.6 Headings and Labels (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels",
        "2.4.7 Focus Visible (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
        "3.1.1 Language of Page (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/language-of-page",
        "3.1.2 Language of Parts (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts",
        "3.2.1 On Focus (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/on-focus",
        "3.2.2 On Input (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/on-input",
        "3.2.3 Consistent Navigation (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation",
        "3.2.4 Consistent Identification (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification",
        "3.3.1 Error Identification (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/error-identification",
        "3.3.2 Labels or Instructions (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions",
        "3.3.3 Error Suggestion (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion",
        "3.3.4 Error Prevention (Legal, Financial, Data) (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data",
        "4.1.1 Parsing (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/parsing",
        "4.1.2 Name, Role, Value (Level A)":
          "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
        "1.3.5 Identify Input Purpose (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose",
        "1.4.3 Contrast (Minimum) (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum",
        "1.4.6 Contrast (Enhanced) (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced",
        "1.4.7 Low or No Background Audio (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio",
        "1.4.8 Visual Presentation (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation",
        "1.4.10 Reflow (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/reflow",
        "1.4.11 Non-text Contrast (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast",
        "1.4.12 Text Spacing (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing",
        "1.4.13 Content on Hover or Focus (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus",
        "2.5.8 Target Size (Minimum) (Level AA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum",
        "2.5.5 Target Size (Enhanced) (Level AAA)":
          "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced",
      };
    }
    //Add ARIA related URLs as needed
    if (Object.keys(ariaLinks).length === 0) {
      ariaLinks = {
        "aria-label property": "https://www.w3.org/TR/wai-aria-1.2/#aria-label",
        "aria-labelledby property":
          "https://www.w3.org/TR/wai-aria/#aria-labelledby",
        "aria-controls property":
          "https://www.w3.org/TR/wai-aria-1.2/#aria-controls",
        "aria-describedby property":
          "https://www.w3.org/TR/wai-aria-1.2/#aria-describedby",
        "Accessible Name and Description Computation 1.2":
          "https://www.w3.org/TR/accname-1.2/",
      };
    }
  
    //Add HTML related URLs as needed
    if (Object.keys(htmlLinks).length === 0) {
      htmlLinks = {
        "4.3.7 The hgroup element":
          "https://html.spec.whatwg.org/multipage/sections.html#the-hgroup-element",
        "4.3.11 Headings and outlines":
          "https://html.spec.whatwg.org/multipage/sections.html#headings-and-outlines-2",
          "4.4 Grouping content": "https://html.spec.whatwg.org/multipage/grouping-content.html#grouping-content",
        "4.4.5 The ol element":
          "https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element",
        "4.4.6 The ul element":
          "https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element",
        "4.4.8 The li element":
          "https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element",
        "4.4.9 The dl element":
          "https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element",
        "4.4.10 The dt element":
          "https://html.spec.whatwg.org/multipage/grouping-content.html#the-dt-element",
        "4.4.11 The dd element":
          "https://html.spec.whatwg.org/multipage/grouping-content.html#the-dd-element",
        "4.10.15 The fieldset element":
          "https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element",
        "4.10.16 The legend element":
          "https://html.spec.whatwg.org/multipage/form-elements.html#the-legend-element",
        "4.5 Text-level semantics": "https://html.spec.whatwg.org/multipage/text-level-semantics.html#text-level-semantics",
        "6.6.3 The tabindex attribute":
          "https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute",
        "4.10.18.7.1 Autofilling form controls: the autocomplete attribute":
          "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute",
          "The for attribute": "https://html.spec.whatwg.org/multipage/forms.html#the-label-element:~:text=%E2%9C%94MDN-,The%20for%20attribute,-may%20be%20specified",
      };
    }
  
    //Add URLs of explanation pages and other useful links
    if (Object.keys(customLinks).length === 0) {
      customLinks = {
        Inline:
          "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#:~:text=the%20%22Equivalent%22%20exception.-,Inline,-%3A%20The%20Success",
        Spacing:
          "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#:~:text=are%20five%20exceptions%3A-,Spacing,-%3A%20Undersized%20targets",
      };
    }
  
    //Add URLs of CanIUse
    if (Object.keys(canUseLinks).length === 0) {
      canUseLinks = {
        hgroup: "https://caniuse.com/?search=hgroup",
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
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
      };
      // Provide a default case to ensure a string is always returned
      return escape[match] || match;
    });
  }
  
  // Utility function to escape RegExp special characters in a string
  function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  
  function appendHyperlinksToMessage(
    message: string,
    linkType: "wcag" | "aria" | "html" | "custom" = "custom"
  ): string {
    const links = linkObjects[linkType];
    Object.entries(links).forEach(([key, value]) => {
      const safeKey = escapeRegExp(key);
      const safeValue = escapeHTML(value);
      const safeLinkText = escapeHTML(key);
  
      // Construct the HTML string for the anchor tag
      const anchorTagString = `<a href="${safeValue}" class="hyperlinked-text-9927845" rel="noopener noreferrer">${safeLinkText}</a>`;
      const regex = new RegExp(safeKey, "g");
  
      message = message.replace(regex, anchorTagString);
    });
  
    return message;
  }
  
  function isNodeInExcludedContainer(node: Node): boolean {
    let ancestor = node.parentElement;
    while (ancestor) {
      if (
        ancestor.classList.contains("top-right-container-9927845") ||
        ancestor.classList.contains("inner-container-9927845")
      ) {
        return true;
      }
      ancestor = ancestor.parentElement;
    }
    return false;
  }
  function withExclusionCheck(fn: Function) {
    return function(...args: any[]) {
      const containerDiv = document.querySelector('.top-right-container-9927845');
      if (!containerDiv || !isNodeInExcludedContainer(containerDiv)) {
        return fn(...args);
      }
    };
  }
  
  function getOrCreateContainer(): HTMLDivElement | null {
    if (window !== window.top) {
      return null; // Return null if not in the top window frame
    }
  
    let containerDiv = document.querySelector(".top-right-container-9927845") as HTMLDivElement | null;
  
    if (!containerDiv) {
      containerDiv = document.createElement("div");
      containerDiv.className = "top-right-container-9927845";
      document.body.appendChild(containerDiv);
  
      createMinMaxButton(containerDiv);
    }
  
    // Given containerDiv is confirmed not null here, safe to assert as HTMLDivElement
    updateParentContainerClass(containerDiv as HTMLDivElement);
  
    // Setup the MutationObserver, assuming containerDiv exists
    const observer = new MutationObserver(() => {
      if (containerDiv) { // This check is technically redundant given the creation logic above but adds a layer of type safety
        updateParentContainerClass(containerDiv);
      }
    });
  
    if (containerDiv) { // Ensure containerDiv is not null before observing
      observer.observe(containerDiv, {
        childList: true, // Monitor for the addition or removal of child elements
      });
    }
  
    return containerDiv;
  }
  
  function updateParentContainerClass(parentContainer: HTMLElement): void {
    // Query all inner containers within the parent container
    const innerContainers = parentContainer.querySelectorAll('.inner-container-9927845');
    
    // Remove the 'the-last' class to reset state
    parentContainer.classList.remove('remove-outerdiv-9927845');
    
    // If exactly one innerContainer exists, add the 'the-last' class back
    if (innerContainers.length === 1) {
      parentContainer.classList.add('remove-outerdiv-9927845');
    }
  }
  
  function createReferenceContainer(): HTMLDivElement | null {
    const referenceContainer = document.createElement("div");
    referenceContainer.className = "reference-container-9927845";
  
    const referencePara = document.createElement("h2");
    referencePara.className = "reference-9927845";
    const referenceText = document.createTextNode("References");
    referencePara.appendChild(referenceText);
  
    referenceContainer.appendChild(referencePara);
  
    document.body.appendChild(referenceContainer);
  
    return referenceContainer;
  }
  
  // Single reusable function for creating a details component
  function createDetailsComponent(summaryText: string, ContentText?: string): HTMLDetailsElement {
    const details = document.createElement("details");
    details.className = "check-details-9927845";
  
    const summary = document.createElement("summary");
    summary.className = "check-summary-9927845";
  
    // Create a strong element for the summary text. Change to heading at some stage
    const summaryTextHeading = document.createElement("h2");
    summaryTextHeading.textContent = summaryText;
    summaryTextHeading.className = "summary-heading-9927845";
    summary.appendChild(summaryTextHeading);
  
    details.appendChild(summary);
  
    // Add content it directly under details
    if (ContentText) {
      const ContentPara = document.createElement("p");
      ContentPara.textContent = ContentText;
      ContentPara.className = "check-paragraph-9927845";
      details.appendChild(ContentPara);
    }
  
    return details;
  }
  
  function createMinMaxButton(containerDiv: HTMLDivElement): void {
    if (!containerDiv.querySelector(".minimize-button-9927845")) {
      const minMaxButton = document.createElement("button");
      minMaxButton.className = "minimize-button-9927845";
      minMaxButton.textContent = "Minimize";
  
      containerDiv.dataset['isMinimized'] = "false"; // Initialize state
  
      minMaxButton.addEventListener("click", () => {
        const isMinimized = containerDiv.dataset['isMinimized'] === "true";
        containerDiv.dataset['isMinimized'] = isMinimized ? "false" : "true";
  
        if (isMinimized) {
          minMaxButton.textContent = "Minimize";
        } else {
          minMaxButton.textContent = "Maximize";
        }
  
        const innerDivs = containerDiv.querySelectorAll(".inner-container-9927845");
        innerDivs.forEach((innerDiv) => {
          innerDiv.classList.toggle("hidden-feature-message-9927845", !isMinimized);
        });
        minMaxButton.textContent = isMinimized ? "Minimise" : "Maximise";
      });
  
      containerDiv.appendChild(minMaxButton);
    }
  }
  
  function createDismissButton(innerDiv: HTMLDivElement, importantNote: string = ""): void {
    if (!innerDiv) return;
  
    const dismissButton = document.createElement("button");
    dismissButton.className = "dismiss-button-9927845";
    dismissButton.textContent = `Dismiss ${importantNote}`;
    
    dismissButton.addEventListener("click", function () {
      const innerDiv = this.closest(
        ".inner-container-9927845"
      ) as HTMLElement | null;
  
      if (innerDiv) {
        const containerDiv = innerDiv.parentElement;
  
        if (containerDiv) {
          const innerDivs = containerDiv.querySelectorAll(
            ".inner-container-9927845"
          );
  
          if (innerDivs.length > 1) {
            innerDiv.remove();
          } else {
            containerDiv.remove();
          }
        }
      }
    });
  
    innerDiv.appendChild(dismissButton);
  
    // // Create a new <p> element with the specified class and text
    // const panicParagraph = document.createElement("p");
    // panicParagraph.className = "do-not-panic";
    // panicParagraph.textContent = "Don't Panic! I'll be here if you run the check again";
    
    // // Append the new <p> element under the button in the innerDiv
    // innerDiv.appendChild(panicParagraph);
  }