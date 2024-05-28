"use strict";

// Remove classes related to aria-hidden
for (const element of document.querySelectorAll(
  ".aria-hidden-true-66786, .aria-hidden-true-focusable-66786, .aria-hidden-false-66786"
)) {
  element.classList.remove(
    "aria-hidden-true-66786",
    "aria-hidden-true-focusable-66786",
    "aria-hidden-false-66786"
  );
}

// Removing the data-ariahidden66786 attribute from elements with aria-hidden
for (const element of document.querySelectorAll("[aria-hidden]")) {
  element.removeAttribute("data-ariahidden66786");
  element.removeAttribute("data-invalidariahidden66786");
  element.removeAttribute("data-warningariahidden66786");
}

// Removing the data-fixed-sticky-77865 attribute from all elements
for (const element of document.querySelectorAll("[data-fixed-sticky-77865]")) {
  element.removeAttribute("data-fixed-sticky-77865");
}

// Remove the message divs related to aria-hidden
removeInjectedDivs([
  "aria-hidden-true-message-66786",
  "aria-hidden-true-focusable-message-66786",
  "aria-hidden-false-message-66786",
  "remove-inner-ahid-9927845",
  "remove-outerdiv-9927845"
]);

// Function to detect elements with position: fixed or position: sticky
function detectFixedOrStickyElementsRemove(): void {
  const allElements = document.querySelectorAll("*");

  allElements.forEach((element: Element) => {
    const computedStyle = window.getComputedStyle(element);
    const positionValue = computedStyle.position;

    if (positionValue === "fixed" || positionValue === "sticky") {
      element.setAttribute("data-fixed-sticky-77865", "true");
    }
  });
}

// Run the function
detectFixedOrStickyElementsRemove();