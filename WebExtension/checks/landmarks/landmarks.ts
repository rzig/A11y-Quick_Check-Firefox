"use strict";

function addLandmarkMessages(): void {
  const htmlLandmarks: string[] = [
    "article",
    "aside",
    "section",
    "header",
    "form",
    "footer",
    "nav",
    "main",
    "search",
  ];

  const restrictedParents = ["article", "aside", "main", "nav", "section"];

  const ariaToHtmlMapping: Record<string, string> = {
    article: "article",
    banner: "header",
    form: "form",
    contentinfo: "footer",
    navigation: "nav",
    main: "main",
    aside: "complementary",
    search: "search",
    complementary: "aside",
    region: "section",
  };

  function isElementInside(
    element: HTMLElement,
    parentTags: string[]
  ): boolean {
    let currentElement: HTMLElement | null = element.parentElement;
    while (currentElement) {
      const tagName = currentElement.tagName.toLowerCase();
      const role = currentElement.getAttribute("role");
      if (parentTags.includes(tagName) || (role && parentTags.includes(role))) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }

  function hasHeadingChild(element: HTMLElement): boolean {
    return !!element.querySelector("h1, h2, h3, h4, h5, h6");
  }

  function checkConflictingRoles(element: HTMLElement): void {
    const ariaRole = element.getAttribute("role");
    // Add a condition to allow 'search' role on 'form' elements without flagging as invalid
    if (ariaRole === "search" && element.tagName.toLowerCase() === "form") {
      // If the element is a form with a 'search' role, exit the function early to avoid flagging as invalid
      return;
    }

    if (ariaRole) {
      const htmlRole = ariaToHtmlMapping[ariaRole];
      if (htmlRole && htmlRole !== element.tagName.toLowerCase()) {
        const message = `Invalid: The HTML role '${element.tagName.toLowerCase()}' and ARIA role '${ariaRole}' on this element conflict.`;
        addMessageToPrecedingDiv(element, "invalid-message-9927845", message);
        element.classList.add("invalid-9927845");
      }
    }
  }

  function checkMainElements(): void {
    // Select all main elements and elements with role="main"
    const mainElements = Array.from(
      document.querySelectorAll('main, [role="main"]')
    );

    // Distinguish between <main> elements and elements with role="main"
    const mainTags = mainElements.filter(
      (element) => element.tagName.toLowerCase() === "main"
    );
    const roleMains = mainElements.filter(
      (element) =>
        element.getAttribute("role") === "main" &&
        element.tagName.toLowerCase() !== "main"
    );

    // Count distinct main regions
    let distinctMainRegions = new Set([...mainTags, ...roleMains]).size;

    // Adjust for cases where <main> has a role="main"
    if (mainTags.some((tag) => tag.getAttribute("role") === "main")) {
      // This will prevent counting <main role="main"> as two separate regions
      distinctMainRegions = Math.max(mainTags.length, roleMains.length);
    }

    // If more than one distinct main region, mark each as invalid
    if (distinctMainRegions > 1) {
      mainElements.forEach((element) => {
        if (element instanceof HTMLElement && !isHidden(element)) {
          const message = "Invalid: Only one main role per document.";
          addMessageToPrecedingDiv(element, "invalid-message-9927845", message);
          element.classList.add("invalid-9927845");
        }
      });
    }
  }

  htmlLandmarks.forEach((landmark) => {
    document.querySelectorAll(landmark).forEach((element) => {
      if (element instanceof HTMLElement && !isHidden(element)) {
        // Ensure the element is an HTMLElement and not hidden
        let accessibleName =
          element.getAttribute("aria-label") ||
          element.getAttribute("title") ||
          "not named";
        let tagName = element.tagName.toLowerCase();
        let message = "";
        let messageClassSuffix = "valid";

        const isInRestrictedParent = isElementInside(
          element,
          restrictedParents
        );
        const isInNavigationLandmark =
          isElementInside(element, ["nav"]) ||
          element.closest('[role="navigation"]') != null;
        const roleAttribute = element.getAttribute("role");
        const hasDuplicateRole = roleAttribute
          ? ariaToHtmlMapping[roleAttribute] === landmark
          : false;

        if (
          accessibleName === "not named" &&
          landmark !== "footer" &&
          landmark !== "main" &&
          landmark !== "article" &&
          landmark !== "section" &&
          landmark !== "header"
        ) {
          message = `Warning: <${landmark}> landmark is missing an accessible name.`;
          messageClassSuffix = "warning";
        }

        // if (
        //   (accessibleName === "not named" || landmark === "section") &&
        //   landmark !== "footer" &&
        //   landmark !== "main" &&
        //   landmark !== "article" &&
        //   landmark !== "header" &&
        //   landmark !== "form"
        // ) {
        //   message = `Needs manual confirmation <${landmark}> may not have an accessible name and is assigned a region role, <${landmark}> without an accessible name should have a role of generic.`;
        //   messageClassSuffix = "messageLabelManualConfirmation ";
        // }

        // if (isInRestrictedParent && landmark !== "footer") {
        //   const parentTagName = element.parentElement?.tagName.toLowerCase();
        //   message = `Knowledge Testing with a screen reader, the <${landmark}> role should not be announced when nested inside a <${parentTagName}> element.`;
        //   messageClassSuffix = "generic";
        // }

        if (
          ["article", "section", "header"].includes(landmark) &&
          !hasHeadingChild(element) &&
          !isInNavigationLandmark
        ) {
          message = `Best practice This <${landmark}> may be missing an identifying heading. Best practice suggests <${landmark}> should be identified, typically by including a heading (<h1> - <h6>) as a child.`;
          messageClassSuffix = "generic";
        }

        if (hasDuplicateRole) {
          message = `Best practice HTML <${landmark}> landmark has role=${element.getAttribute(
            "role"
          )} which is allowed, but NOT RECOMMENDED.`;
          messageClassSuffix = "generic";
        }

        if (message) {
          const fullMessageClassName = `${messageClassSuffix}-message-9927845`;
          addMessageToPrecedingDiv(element, fullMessageClassName, message);
          element.classList.add(`${messageClassSuffix}-9927845`);
        }

        // Always perform this check
        checkConflictingRoles(element);
      }
    });
  });

  // ARIA role to HTML element checks
  Object.entries(ariaToHtmlMapping).forEach(([ariaRole, htmlEquivalent]) => {
    document
      .querySelectorAll(`[role='${ariaRole}']:not(${htmlEquivalent})`)
      .forEach((element) => {
        if (element instanceof HTMLElement && !isHidden(element)) {
          // Ensure the element is an HTMLElement and not hidden
          const message = `Best practice This element has an ARIA role='${ariaRole}'. Replace with HTML <${htmlEquivalent}> landmark. Support for <${htmlEquivalent}> is listed at https://caniuse.com/?search=${htmlEquivalent}`;
          const fullMessageClassName = "generic-message-9927845";
          addMessageToPrecedingDiv(element, fullMessageClassName, message);
          element.classList.add("generic-9927845");
        }
      });
  });

  // Check for multiple 'main' elements
  checkMainElements();
}

addLandmarkMessages();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerLandmarks(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-lm-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset['isMinimized'] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  // Use createCommonDetailsContainer from common.ts to create the common details structure
  const checkDetails = createCommonDetailsContainer();
  innerDiv.appendChild(checkDetails);

  // Unique content for this instance
  const importantNotePara: HTMLParagraphElement = document.createElement("p");
  importantNotePara.className = "message-heading-9927845";
  const strongImportantNote: HTMLElement = document.createElement("strong");
  strongImportantNote.textContent = "Landmarks Summary";
  importantNotePara.appendChild(strongImportantNote);

  // Append the unique content to the summary
  const checkSummary = checkDetails.querySelector("summary");
  if (checkSummary) {
    checkSummary.appendChild(strongImportantNote);
  }

  // Additional unique content - directly under the summary
  const messagePara = document.createElement("p");
  messagePara.textContent =
    "The purpose of this check is to verify the proper use of HTML landmarks and ARIA landmark roles. It checks for accessible naming, role conflicts, and correct landmark nesting.";
  checkDetails.appendChild(messagePara);

  const checkManualDetails = createManualNotesDetailsContainer();
  innerDiv.appendChild(checkManualDetails);

  // Manual testing summary title for details
  const manualTestingPara: HTMLParagraphElement = document.createElement("p");
  manualTestingPara.className = "message-heading-9927845";
  const manualTestingParaHeadingStrong: HTMLElement = document.createElement("strong");
  manualTestingParaHeadingStrong.textContent = "How to manually test ( is coming! )";
  manualTestingPara.appendChild(manualTestingParaHeadingStrong);
  
  // Append the unique content to the manual testing summary
  const manualTestingSummary = checkManualDetails.querySelector("summary");
  if (manualTestingSummary) {
    manualTestingSummary.appendChild(manualTestingParaHeadingStrong);
  }

  // Additional unique content for manual testing
  const manualPara = document.createElement("p");
  manualPara.textContent = "This section will be populated with how to manually test";
  manualPara.className = "check-paragraph-9927845";
  checkManualDetails.appendChild(manualPara);


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
    appendLink(wcagLinks, "1.3.1 Info and Relationships (Level A)", "WCAG");

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Landmarks");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerLandmarks();
