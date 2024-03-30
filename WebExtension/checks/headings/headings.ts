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

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerHeadings(): void {
  const containerDiv = document.createElement("div");
  containerDiv.className = "top-right-container-9927845";

  const importantNotePara: HTMLParagraphElement = document.createElement("p");
  importantNotePara.className = "message-heading-9927845";
  const strongImportantNote: HTMLElement = document.createElement("strong");
  strongImportantNote.textContent = "Feature Summary";
  importantNotePara.appendChild(strongImportantNote);
  containerDiv.appendChild(importantNotePara);

  // Message Paragraph - directly under the title
  const messagePara = document.createElement("p");
  messagePara.textContent = "Headings identified on this page.";
  containerDiv.appendChild(messagePara);

  // Add the original paragraph as a heading for the list
  const summaryHeadingPara = document.createElement("p");
  const summaryStrong = document.createElement("strong");
  summaryStrong.textContent = "Headings";
  summaryHeadingPara.className = "list-heading-9927845";
  summaryHeadingPara.appendChild(summaryStrong);
  containerDiv.appendChild(summaryHeadingPara);

  // Create the list for headings stats
  const findingsUL = document.createElement("ul");
  findingsUL.className = "findings-list-9927845";
  const headingsSummary = calculateHeadingsSummary();
  const skippedCount = detectSkippedHeadings();

  // Populate the list with headings stats
  Object.entries(headingsSummary).forEach(([level, count]) => {
    const li = document.createElement("li");
    li.textContent = `H${level}: ${count}`;
    findingsUL.appendChild(li);
  });

  // Append skipped heading levels count as the last list item
  const skippedLi = document.createElement("li");
  skippedLi.textContent = `Skipped Heading Levels: ${skippedCount}`;
  findingsUL.appendChild(skippedLi);

  // Append the list to the container
  containerDiv.appendChild(findingsUL);

  // Use createReferenceContainer to generate the reference section
  const referenceContainer = createReferenceContainer();
  containerDiv.appendChild(referenceContainer);

  // Link List
  const linkList = document.createElement("ul");
  linkList.className = "reference-list-9927845";
  referenceContainer.appendChild(linkList); // This is key to match your HTML structure

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
  appendLink(wcagLinks, "1.3.1 Info and Relationships", "WCAG");
  appendLink(wcagLinks, "Headings and Labels", "WCAG");
  appendLink(htmlLinks, "4.3.11 Headings and outlines", "HTML");

  // Add the Dismiss Button
  createDismissButton(containerDiv);

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

wrapAllHeadingsWithSpan();
createTopRightContainerHeadings();
