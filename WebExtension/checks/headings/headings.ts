function detectSkippedHeadings() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let prevLevel = 0;

  headings.forEach((heading: Element) => {
    const currentLevel = parseInt(heading.tagName.slice(1));

    // Check if there's a skipped level
    if (currentLevel - prevLevel > 1) {
      heading.classList.add('skipped-level-555897');
      //heading.setAttribute('data-skipped-555897', '');

      const message = `(Warning) Skipped heading level from h${prevLevel} to ${heading.tagName}`;
      addMessageToPrecedingDiv(heading, 'skipped-level-message-555897', message);
    }

    prevLevel = currentLevel;
  });
}

// Run the function
detectSkippedHeadings();