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
    if (ariaRole) {
      const htmlRole = ariaToHtmlMapping[ariaRole];
      if (htmlRole && htmlRole !== element.tagName.toLowerCase()) {
        const message = `Invalid The HTML role '${element.tagName.toLowerCase()}' and ARIA role '${ariaRole}' on this element conflict.`;
        addMessageToPrecedingDiv(element, "invalid-message-9927845", message);
        element.classList.add("invalid-9927845");
      }
    }
  }

  function checkMainElements(): void {
    // Select all main elements and elements with role="main"
    const mainElements = Array.from(document.querySelectorAll('main, [role="main"]'));

    // Distinguish between <main> elements and elements with role="main"
    const mainTags = mainElements.filter(element => element.tagName.toLowerCase() === 'main');
    const roleMains = mainElements.filter(element => element.getAttribute('role') === 'main' && element.tagName.toLowerCase() !== 'main');

    // Count distinct main regions
    let distinctMainRegions = new Set([...mainTags, ...roleMains]).size;

    // Adjust for cases where <main> has a role="main"
    if (mainTags.some(tag => tag.getAttribute('role') === 'main')) {
        // This will prevent counting <main role="main"> as two separate regions
        distinctMainRegions = Math.max(mainTags.length, roleMains.length);
    }

    // If more than one distinct main region, mark each as invalid
    if (distinctMainRegions > 1) {
        mainElements.forEach(element => {
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

        // if (isInRestrictedParent && landmark !== "footer") {
        //   const parentTagName = element.parentElement?.tagName.toLowerCase();
        //   message = `Knowledge Testing with a screen reader, the <${landmark}> role should not be announced when nested inside a <${parentTagName}> element.`;
        //   messageClassSuffix = "generic";
        // }

        if (
          ["article", "section", "header"].includes(
            landmark
          ) &&
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
