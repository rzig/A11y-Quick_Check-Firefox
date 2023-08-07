"use strict";

for (const element of document.querySelectorAll(
  ".skipped-level-555897, .aria-skipped-level-555897, .aria-level-missing-555897, redundant-aria-role-555897, changed-aria-level-555897, aria-missing-level-555897"
)) {
  element.classList.remove(
    "skipped-level-555897",
    "aria-skipped-level-555897",
    "aria-level-missing-555897"
  );
}

// Remove the added span element
for (const span of document.querySelectorAll(".headingWrapper-8878")) {
  const parent = span.parentElement;
  if (parent) {
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
  }
}

removeInjectedDivs([
  "skipped-level-message-555897",
  "aria-skipped-level-message-555897",
  "aria-level-missing-message-555897",
  "redundant-aria-role-message-555897",
  "changed-aria-level-message-555897",
  "aria-missing-level-message-555897",
]);