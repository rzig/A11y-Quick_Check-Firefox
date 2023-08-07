"use strict";

// Detect if any heading levels are skipped on the page.
function detectSkippedHeadings() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let prevLevel = 0;

  headings.forEach((heading: Element) => {
    const currentLevel = parseInt(heading.tagName.slice(1));

    // Check if there's a skipped level
    if (currentLevel - prevLevel > 1) {
      heading.classList.add('skipped-level-555897');
      const message = `(Warning) Skipped heading level from h${prevLevel} to ${heading.tagName}`;
      addMessageToPrecedingDiv(heading, 'skipped-level-message-555897', message);
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

    // Condition 3: ARIA Heading Role missing a ARIA-LEVEL
    if (!ariaLevel) {
      heading.classList.add('aria-missing-level-555897');
      const message = '(Warning) ARIA Heading Role missing an ARIA-LEVEL.';
      addMessageToPrecedingDiv(heading, 'aria-missing-level-message-555897', message);
    }
  });
}

function detectSkippedARIAHeadings() {
  const ariaHeadings = document.querySelectorAll('[role="heading"]');
  let prevLevel = 0;

  ariaHeadings.forEach((heading: Element) => {
    const ariaLevel = heading.getAttribute('aria-level');

    if (ariaLevel) {
      const currentLevel = parseInt(ariaLevel);

      // Check if there's a skipped level
      if (currentLevel - prevLevel > 1) {
        heading.classList.add('aria-skipped-level-555897');
        const message = `(Warning) Skipped ARIA heading level from aria-level=${prevLevel} to aria-level=${currentLevel}`;
        addMessageToPrecedingDiv(heading, 'aria-skipped-level-message-555897', message);
      }

      prevLevel = currentLevel;
    }
  });
}

// Run the functions
detectSkippedHeadings();
wrapAllHeadingsWithSpan();
detectSkippedARIAHeadings();
checkRedundantARIA();
checkMissingARIALevel();