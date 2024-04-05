"use strict";

function removedataNameProhibited() {
  const targets = document.querySelectorAll(
    "[data-name-prohibited-aria], [data-name-prohibited-html], [data-name-permitted-aria]"
  );
  for (const noName of targets) {
    if (noName.hasAttribute("data-name-prohibited-aria")) {
      noName.removeAttribute("data-name-prohibited-aria");
    }
    if (noName.hasAttribute("data-name-prohibited-html")) {
      noName.removeAttribute("data-name-prohibited-html");
    }
    if (noName.hasAttribute("data-name-permitted-aria")) {
      noName.removeAttribute("data-name-permitted-aria");
    }
  }
}
removedataNameProhibited();

removeInjectedDivs([
  "remove-inner-al-9927845",
  "remove-outerdiv-9927845"
]);
