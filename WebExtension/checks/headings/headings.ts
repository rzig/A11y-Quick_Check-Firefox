"use strict";

// Helper function to get the effective heading level
function getEffectiveHeadingLevel(heading: Element | undefined): number {
  if (!heading) return 0;

  const tagName = heading.tagName.toLowerCase();
  const ariaRole = heading.getAttribute("role");
  const ariaLevel = heading.getAttribute("aria-level");

  if (tagName.startsWith("h") && tagName.length === 2) {
    return parseInt(tagName.slice(1), 10);
  }

  if (ariaRole === "heading") {
    return ariaLevel ? parseInt(ariaLevel, 10) : 2; // Defaults to 2 if aria-level is not specified
  }

  return 0; // Return 0 for non-heading elements
}

// Detect if any heading levels are skipped on the page.
function detectSkippedHeadings(): number {
  const allHeadings = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, [role="heading"]'
  );
  const headings = Array.from(allHeadings);
  let skippedCount = 0;

  if (headings.length === 0) return skippedCount; // Exit if no headings are found

  let prevLevel = getEffectiveHeadingLevel(headings[0]);

  headings.forEach((heading: Element, index: number) => {
    // if (isNodeInExcludedContainer(heading)) {
    //   return; // Skip this heading
    // }

    if (index === 0) return; // Skip the first element as there's no previous heading

    const currentLevel = getEffectiveHeadingLevel(heading);

    // Check if there's a skipped level
    if (currentLevel - prevLevel > 1) {
      skippedCount++;
    }

    prevLevel = currentLevel;
  });

  return skippedCount;
}

function wrapAllHeadingsWithSpan(): void {
  const headings = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, [role="heading"]'
  );

  headings.forEach((heading: Element) => {
    const span = document.createElement("span");
    span.className = "headingWrapper-8878";

    while (heading.firstChild) {
      span.appendChild(heading.firstChild);
    }

    heading.appendChild(span);
  });
}

// Function to calculate the headings summary
function calculateHeadingsSummary() {
  const headingsSummary: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  const allHeadings = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, [role="heading"]'
  );

  allHeadings.forEach((heading) => {
    const level = getEffectiveHeadingLevel(heading);
    if (level >= 1 && level <= 6) {
      headingsSummary[level]++;
    }
  });

  return headingsSummary;
}

function checkRedundantARIA() {
  const headings = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, [role="heading"]'
  );

  headings.forEach((heading: Element) => {
    const htmlLevel = parseInt(heading.tagName.slice(1) || "0");
    const ariaRole = heading.getAttribute("role");
    const ariaLevel = heading.getAttribute("aria-level")
      ? parseInt(heading.getAttribute("aria-level")!)
      : null;

    // Update data-aria-heading-555897 for elements with role="heading"
    if (ariaRole === "heading") {
      updateDataAriaHeading(heading, ariaLevel ? ariaLevel.toString() : null);
    }

    // Logic for redundant ARIA Role
    if (htmlLevel && ariaRole === "heading" && !ariaLevel) {
      heading.classList.add("redundant-aria-role-555897");
      const message = "(Warning) ARIA Heading is replacing HTML heading level";
      addMessageToPrecedingDiv(
        heading,
        "redundant-aria-role-message-555897",
        message
      );
    }

    // Logic for changed ARIA Level
    if (
      htmlLevel &&
      ariaRole === "heading" &&
      ariaLevel &&
      htmlLevel !== ariaLevel
    ) {
      heading.classList.add("changed-aria-level-555897");
      const message = `(Warning) ARIA Heading Role replaces HTML heading value. ARIA-LEVEL changes HTML heading level from h${htmlLevel} to H${ariaLevel}`;
      addMessageToPrecedingDiv(
        heading,
        "changed-aria-level-message-555897",
        message
      );
    }
  });
}

function checkMissingARIALevel() {
  const ariaHeadings = document.querySelectorAll('[role="heading"]');

  ariaHeadings.forEach((heading: Element) => {
    const ariaLevel = heading.getAttribute("aria-level");

    if (!ariaLevel) {
      heading.classList.add("aria-missing-level-555897");
      const message =
        "(Warning) ARIA Heading Role missing an ARIA-LEVEL. Defaults to H2";
      addMessageToPrecedingDiv(
        heading,
        "aria-missing-level-message-555897",
        message
      );
    }

    updateDataAriaHeading(heading, ariaLevel);
  });
}

function detectSkippedARIAHeadings() {
  const ariaHeadings = document.querySelectorAll('[role="heading"]');
  let prevLevel = 1; // Start from level 1 as the default

  ariaHeadings.forEach((heading: Element) => {
    const ariaLevelAttr = heading.getAttribute("aria-level");
    const currentLevel = ariaLevelAttr ? parseInt(ariaLevelAttr) : 1; // Default to 1 if aria-level is not set or is 0

    // Check if there's a skipped level and currentLevel is valid
    if (currentLevel - prevLevel > 1 && currentLevel > 0) {
      heading.classList.add("aria-skipped-level-555897");
      const message = `(Warning) Skipped ARIA heading level from aria-level=${prevLevel} to aria-level=${currentLevel}`;
      addMessageToPrecedingDiv(
        heading,
        "aria-skipped-level-message-555897",
        message
      );
    }

    prevLevel = currentLevel > 0 ? currentLevel : prevLevel; // Update prevLevel only if currentLevel is valid
  });
}

function updateDataAriaHeading(heading: Element, ariaLevel: string | null) {
  // If aria-level is missing or is 0, use the default value of 2
  const dataAriaHeadingValue =
    ariaLevel && parseInt(ariaLevel) > 0 ? ariaLevel : "2";
  heading.setAttribute("data-aria-heading-555897", dataAriaHeadingValue);
}

// Run the functions
detectSkippedHeadings();
wrapAllHeadingsWithSpan();
detectSkippedARIAHeadings();
checkRedundantARIA();
checkMissingARIALevel();
wrapAllHeadingsWithSpan();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerHeadings(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-heading-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset["isMinimised"] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing headings",
    "The purpose of this check is to analyze and highlight the structure of HTML headings. It identifies heading levels, including any that are skipped, which could impact navigability and accessibility. Additionally, it examines both HTML and ARIA-marked headings to ensure they conform to best practices."
  );
  innerDiv.appendChild(checkDetails);

  // // Manual notes details component
  // const checkManualDetails = createDetailsComponent(
  //   "How to manually test ( is coming! )",
  //   "This section will be populated with how to manually test"
  // );
  // innerDiv.appendChild(checkManualDetails);

  // Add heading for the list
  const summaryHeadingPara = document.createElement("h2");
  summaryHeadingPara.textContent = "Headings identified on this page";
  summaryHeadingPara.className = "list-heading-9927845";
  innerDiv.appendChild(summaryHeadingPara);

  // Create the list for headings stats
  const findingsUL = document.createElement("ul");
  findingsUL.className = "findings-list-9927845";
  findingsUL.style.margin = "0";
  findingsUL.style.padding = "0";
  const headingsSummary = calculateHeadingsSummary();
  const skippedCount = detectSkippedHeadings();

  // Check if there are headings
  const hasHeadings = Object.keys(headingsSummary).length > 0;

  // Check if there are any non-zero counts
  const nonZeroCounts = Object.entries(headingsSummary).filter(
    ([, count]) => count > 0
  );

  // Check if there are any h1 tags
  const h1Count = headingsSummary["1"] || 0;

  // Add the message "No <h1> tags found..." as the first bullet point if applicable
  if (h1Count === 0) {
    const noH1Li = document.createElement("li");
    noH1Li.innerHTML =
      "No H1 tags found. Best practice suggests there should be one h1 tag per document.";
    findingsUL.appendChild(noH1Li);
  }

  // Populate the list with headings stats or set No headings identified in code
  if (hasHeadings && nonZeroCounts.length > 0) {
    // Populate the list with headings stats
    nonZeroCounts.forEach(([level, count]) => {
      const li = document.createElement("li");
      li.textContent = `H${level} tags found: ${count}`;
      findingsUL.appendChild(li);
    });

    // Append skipped heading levels count as the last list item
    const skippedLi = document.createElement("li");
    skippedLi.textContent = `Skipped Heading Levels: ${skippedCount}`;
    findingsUL.appendChild(skippedLi);
  } else {
    // Set No headings identified in code if applicable
    if (h1Count !== 0) {
      const noHeadingsLi = document.createElement("li");
      noHeadingsLi.textContent = "No headings identified in code";
      findingsUL.appendChild(noHeadingsLi);
    }
  }

  // Add message for multiple h1 tags if applicable
  if (h1Count > 1) {
    const multipleH1Li = document.createElement("li");
    multipleH1Li.textContent =
      "Multiple H1 tags found. Best practice suggests there should be one H1 tag per document.";
    findingsUL.appendChild(multipleH1Li);
  }

  // Append the list to the container
  innerDiv.appendChild(findingsUL);

  // Calculate counts for different uses of role="heading"
  let redundantRoleHeadingCount = 0;
  let roleHeadingWithAriaLevelCount = 0;
  let roleHeadingWithoutAriaLevelCount = 0;

  document.querySelectorAll('[role="heading"]').forEach((heading) => {
    const isHTMLHeading = heading.tagName.match(/^H[1-6]$/);
    const ariaLevel = heading.getAttribute("aria-level");

    if (isHTMLHeading && ariaLevel) {
      redundantRoleHeadingCount++;
    } else if (!isHTMLHeading && ariaLevel) {
      roleHeadingWithAriaLevelCount++;
    } else if (!isHTMLHeading && !ariaLevel) {
      roleHeadingWithoutAriaLevelCount++;
    }
  });

  // Add new list items based on the counts
  if (redundantRoleHeadingCount > 0) {
    const li = document.createElement("li");
    li.textContent = `${redundantRoleHeadingCount} redundant uses of role=heading in HTML heading elements`;
    findingsUL.appendChild(li);
  }

  if (roleHeadingWithAriaLevelCount > 0) {
    const li = document.createElement("li");
    li.textContent = `${roleHeadingWithAriaLevelCount} role headings identified, best practice is to use HTML headings`;
    findingsUL.appendChild(li);
  }

  if (roleHeadingWithoutAriaLevelCount > 0) {
    const li = document.createElement("li");
    li.textContent = `${roleHeadingWithoutAriaLevelCount} role headings identified without an aria-level, if the aria-level is not specified the browser will apply a default heading level of 2, best practice is to use HTML headings`;
    findingsUL.appendChild(li);
  }

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

    // Append specified links function
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

    // Specifying and appending links
    appendLink(wcagLinks, "1.3.1 Info and Relationships (Level A)", "WCAG");
    appendLink(wcagLinks, "Headings and Labels (Level A)", "WCAG");
    appendLink(htmlLinks, "4.3.11 Headings and outlines", "HTML");

    // Add the action buttons
  }
  createDismissButton(innerDiv, "Headings");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerHeadings();
