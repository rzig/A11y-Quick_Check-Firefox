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

removeInjectedDivs([
  "skipped-level-message-555897",
  "aria-skipped-level-message-555897",
  "aria-level-missing-message-555897",
  "redundant-aria-role-message-555897",
  "changed-aria-level-message-555897",
  "aria-missing-level-message-555897",
]);
