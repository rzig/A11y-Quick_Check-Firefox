"use strict";

// Helper function to get the effective heading level
function getEffectiveHeadingLevel(heading: Element | undefined): number {
  if (!heading) return 0; // Return 0 if the heading is undefined

  const tagName = heading.tagName.toLowerCase();
  if (tagName.startsWith('h') && tagName.length === 2) {
    return parseInt(tagName.slice(1));
  }

  const ariaLevel = heading.getAttribute('aria-level');
  return ariaLevel ? parseInt(ariaLevel) : 2; // Default ARIA level to 2 if not specified
}

// Detect if any heading levels are skipped on the page.
function detectSkippedHeadings() {
  const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]');
  const headings = Array.from(allHeadings);

  if (headings.length === 0) return; // Exit if no headings are found

  let prevLevel = getEffectiveHeadingLevel(headings[0]);

  headings.forEach((heading: Element, index: number) => {
    if (index === 0) return; // Skip the first element as there's no previous heading

    const currentLevel = getEffectiveHeadingLevel(heading);
    const prevHeading = headings[index - 1] ? headings[index - 1] : undefined;

    // Ensure prevHeading is not undefined before proceeding
    if (prevHeading) {
      const prevTag = prevHeading.tagName.toLowerCase();
      const prevTagLevel = prevTag.startsWith('h') ? parseInt(prevTag.slice(1)) : null;

      // Check if there's a skipped level
      if (currentLevel - prevLevel > 1 && (!prevTagLevel || prevTagLevel !== currentLevel)) {
        const message = `(Warning) Skipped heading level from h${prevLevel} to h${currentLevel}`;
        heading.classList.add('skipped-level-555897');
        addMessageToPrecedingDiv(heading, 'skipped-level-message-555897', message);
      }
    }

    prevLevel = currentLevel;
  });
}

function wrapAllHeadingsWithSpan(): void {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]');
    
  headings.forEach((heading: Element) => {
      const span = document.createElement('span');
      span.className = "headingWrapper-8878";

      // Move all children of the heading into the span
      while (heading.firstChild) {
          span.appendChild(heading.firstChild);
      }

      // Append the span to the heading
      heading.appendChild(span);
  });
}

function checkRedundantARIA() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]');

  headings.forEach((heading: Element) => {
    const htmlLevel = parseInt(heading.tagName.slice(1) || '0');
    const ariaRole = heading.getAttribute('role');
    const ariaLevel = heading.getAttribute('aria-level') ? parseInt(heading.getAttribute('aria-level')!) : null;

    // Condition 1: Redundant ARIA Heading Role
    if (htmlLevel && ariaRole === 'heading' && !ariaLevel) {
      heading.classList.add('redundant-aria-role-555897');
      const message = '(Warning) Redundant ARIA Heading Role';
      addMessageToPrecedingDiv(heading, 'redundant-aria-role-message-555897', message);
    }

    // Condition 2: ARIA-LEVEL changes HTML heading level
    if (htmlLevel && ariaRole === 'heading' && ariaLevel && htmlLevel !== ariaLevel) {
      heading.classList.add('changed-aria-level-555897');
      const message = `(Warning) Redundant ARIA Heading Role. ARIA-LEVEL changes HTML heading level from h${htmlLevel} to aria-level=${ariaLevel}`;
      addMessageToPrecedingDiv(heading, 'changed-aria-level-message-555897', message);
  }
  });
}

function checkMissingARIALevel() {
  const ariaHeadings = document.querySelectorAll('[role="heading"]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6)');

  ariaHeadings.forEach((heading: Element) => {
    const ariaLevel = heading.getAttribute('aria-level');

    // Condition 3: ARIA Heading Role missing an ARIA-LEVEL
    if (!ariaLevel) {
      heading.classList.add('aria-missing-level-555897');
      const message = '(Warning) ARIA Heading Role missing an ARIA-LEVEL. Defaults to H2';
      addMessageToPrecedingDiv(heading, 'aria-missing-level-message-555897', message);
    }

    // Update the data-aria-heading attribute
    updateDataAriaHeading(heading, ariaLevel);
  });
}

function detectSkippedARIAHeadings() {
  const ariaHeadings = document.querySelectorAll('[role="heading"]');
  let prevLevel = 1;  // Start from level 1 as the default

  ariaHeadings.forEach((heading: Element) => {
    const ariaLevelAttr = heading.getAttribute('aria-level');
    const currentLevel = ariaLevelAttr ? parseInt(ariaLevelAttr) : 1;  // Default to 1 if aria-level is not set or is 0

    // Check if there's a skipped level and currentLevel is valid
    if (currentLevel - prevLevel > 1 && currentLevel > 0) {
      heading.classList.add('aria-skipped-level-555897');
      const message = `(Warning) Skipped ARIA heading level from aria-level=${prevLevel} to aria-level=${currentLevel}`;
      addMessageToPrecedingDiv(heading, 'aria-skipped-level-message-555897', message);
    }

    prevLevel = currentLevel > 0 ? currentLevel : prevLevel;  // Update prevLevel only if currentLevel is valid
  });
}

function updateDataAriaHeading(heading: Element, ariaLevel: string | null) {
  // If aria-level is missing or is 0, use the default value of 2
  const dataAriaHeadingValue = (ariaLevel && parseInt(ariaLevel) > 0) ? ariaLevel : '2';
  heading.setAttribute('data-aria-heading-555897', dataAriaHeadingValue);
}

// Run the functions
detectSkippedHeadings();
wrapAllHeadingsWithSpan();
detectSkippedARIAHeadings();
checkRedundantARIA();
checkMissingARIALevel();