"use strict";

// Function to get adjustment made by :before and :after pseudo-elements
function getPseudoElementAdjustment(elem: Element): {
  width: number;
  height: number;
  extendsTarget: boolean;
} {
  const after = window.getComputedStyle(elem, "::after");
  const before = window.getComputedStyle(elem, "::before");

  const topAfter = parseFloat(after.getPropertyValue("top")) || 0;
  const bottomAfter = parseFloat(after.getPropertyValue("bottom")) || 0;
  const topBefore = parseFloat(before.getPropertyValue("top")) || 0;
  const bottomBefore = parseFloat(before.getPropertyValue("bottom")) || 0;

  const leftAfter = parseFloat(after.getPropertyValue("left")) || 0;
  const rightAfter = parseFloat(after.getPropertyValue("right")) || 0;
  const leftBefore = parseFloat(before.getPropertyValue("left")) || 0;
  const rightBefore = parseFloat(before.getPropertyValue("right")) || 0;

  const extraHeight =
    Math.abs(topAfter) +
    Math.abs(bottomAfter) +
    Math.abs(topBefore) +
    Math.abs(bottomBefore);
  const extraWidth =
    Math.abs(leftAfter) +
    Math.abs(rightAfter) +
    Math.abs(leftBefore) +
    Math.abs(rightBefore);

  function pseudoElementExtendsTarget(
    pseudoElemStyle: CSSStyleDeclaration
  ): boolean {
    return (
      pseudoElemStyle.content === '""' &&
      pseudoElemStyle.position === "absolute" &&
      pseudoElemStyle.left === "0px" &&
      pseudoElemStyle.top === "0px" &&
      pseudoElemStyle.right === "0px" &&
      pseudoElemStyle.bottom === "0px"
    );
  }

  const extendsTarget =
    pseudoElementExtendsTarget(after) || pseudoElementExtendsTarget(before);

  return { width: extraWidth, height: extraHeight, extendsTarget };
}

// Add a circle shape to a specific element
function addCircleShape(elem: Element, targetSize: number) {
  const circle = document.createElement("div");
  circle.classList.add("circle-shape-8228965");
  circle.classList.add(`circle-shape-size-${targetSize}-8228965`);
  circle.style.width = `${targetSize}px`;
  circle.style.height = `${targetSize}px`;
  elem.classList.add(`pos-rel-size-${targetSize}-8228965`);
  elem.classList.add(`pos-rel-8228965`);
  elem.appendChild(circle);
}

// Check if the element is excluded
function isExcluded(elem: Element): boolean {
  const anchorLinkRegex = /^#[\w-]+$/;
  const isAnchor = elem.tagName === "A";
  const isButton =
    elem.tagName === "BUTTON" || elem.getAttribute("role") === "button";
  const isInPageLink =
    isAnchor && anchorLinkRegex.test(elem.getAttribute("href") ?? "");
  let isInParagraph = (isAnchor || isButton) && elem.closest("p") !== null;
  const isFootnote = isAnchor && elem.classList.contains("footnote");

  return isInPageLink || isInParagraph || isFootnote;
}

function checkSpacing(elem: Element, targetSize: number): boolean {
  const rect = elem.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(elem);

  // Calculate total height including pseudo-elements
  const totalHeight = rect.height + getPseudoElementAdjustment(elem).height;

  // Expand the rectangle to the target size for spacing check
  const expandedRect = {
    top: rect.top - (targetSize - rect.height) / 2,
    left: rect.left - (targetSize - rect.width) / 2,
    bottom: rect.bottom + (targetSize - rect.height) / 2,
    right: rect.right + (targetSize - rect.width) / 2,
  };

  const inputElements = document.querySelectorAll(
    'a, button, input[type="button"], input[type="submit"], select, [role="button"], [role="link"], li'
  );

  for (let otherElem of inputElements) {
    if (
      otherElem === elem ||
      otherElem.classList.contains("spacing-ignore-8228965")
    )
      continue;

    const otherRect = otherElem.getBoundingClientRect();

    // Expand the other element's rectangle to the target size
    const otherExpandedRect = {
      top: otherRect.top - (targetSize - otherRect.height) / 2,
      left: otherRect.left - (targetSize - otherRect.width) / 2,
      bottom: otherRect.bottom + (targetSize - otherRect.height) / 2,
      right: otherRect.right + (targetSize - otherRect.width) / 2,
    };

    // Check if the expanded rectangles intersect
    const intersects = !(
      expandedRect.right < otherExpandedRect.left ||
      expandedRect.left > otherExpandedRect.right ||
      expandedRect.bottom < otherExpandedRect.top ||
      expandedRect.top > otherExpandedRect.bottom
    );

    if (intersects) {
      return false;
    }
  }

  // If the height is slightly less than the target size but does not intersect with other elements, consider it sufficient
  return true;
}

function addTargetSize(targetSize: number) {
  let hasIssues = false;

  // Handling individual elements such as links, buttons, etc.
  const inputElements = document.querySelectorAll(
    'a, button, input[type="button"], input[type="submit"], select, [role="button"], [role="link"]'
  );

  for (const elem of inputElements) {
    // Exclude the 'Toggle messages' button
    if (elem.id === "rmb-8228965") {
      continue;
    }

    const rect = elem.getBoundingClientRect();
    const {
      width: extraWidth,
      height: extraHeight,
      extendsTarget,
    } = getPseudoElementAdjustment(elem);
    const elemWidth = rect.width + extraWidth;
    const elemHeight = rect.height + extraHeight;
    const tagName = elem.tagName.toLowerCase();
    const role = elem.getAttribute("role");
    const identifier = role ? `role="${role}"` : tagName;
    const isHidden =
      getComputedStyle(elem).display === "none" ||
      getComputedStyle(elem).opacity === "0" ||
      getComputedStyle(elem).visibility === "hidden";
    const isTooSmall = elemWidth <= 1 || elemHeight <= 1;

    if (!isHidden && !isTooSmall) {
      // If pseudo-elements extend the target area to an acceptable size, consider it a pass
      if (
        !extendsTarget ||
        (elemWidth >= targetSize && elemHeight >= targetSize)
      ) {
        if (
          elemWidth < targetSize ||
          (elemHeight < targetSize && !isExcluded(elem))
        ) {
          // Existing logic for handling target size issues
          hasIssues = true;
          const hasSufficientSpacing = checkSpacing(elem, targetSize);
          let extraClass =
            hasSufficientSpacing && targetSize <= 24
              ? `target-sufficient-8228965`
              : `target-insufficient-8228965`;

          let message = `The target size for element <${identifier}> is ${elemWidth.toFixed(
            2
          )}px x ${elemHeight.toFixed(2)}px`;
          if (targetSize <= 24 && hasSufficientSpacing) {
            message += ` which is less than ${targetSize}px x ${targetSize}px. The element has sufficient spacing.`;
          } else {
            message += ` which is less than ${targetSize}px x ${targetSize}px.`;
          }
          const messageDiv = document.createElement("div");
          messageDiv.className = `target-size-${targetSize}-8228965`;
          messageDiv.classList.add(
            "target-size-8228965",
            extraClass,
            "spacing-ignore-8228965"
          );
          messageDiv.textContent = message;
          elem.appendChild(messageDiv);
          addCircleShape(elem, targetSize);
        }
      }
    }
  }

  // New code for handling lists - start
  // Check for lists containing both links and non-link text
  const lists = document.querySelectorAll("ul, ol");
  lists.forEach((list) => {
    let hasMixedContent = false;
    const listItems = list.querySelectorAll("li");

    listItems.forEach((li) => {
      const textContent = li.textContent || "";
      const links = li.querySelectorAll("a");
      const hasNonLinkText =
        textContent.trim().length > 0 &&
        li.querySelectorAll("*:not(a)").length > 0; // Check for mixed content
      hasMixedContent = hasMixedContent || (links.length > 0 && hasNonLinkText);
    });

    if (hasMixedContent) {
      // Add 'Excluded by Inline' message once per list with mixed content
      hasIssues = true;
      const messageText =
        "If the list is a sentence or contains both active elements and non-target text, exceptions for inline elements may apply!";
      const fullMessageClassName = "manual-confirmation-9927845"; // New class name to match pattern

      // Create the message div and append it using the existing function
      const messageDiv = document.createElement("div");
      messageDiv.className = fullMessageClassName;

      const span = document.createElement("span");
      span.className = "messageLabelManualConfirmation";
      span.textContent = "Needs manual confirmation "; // Space added after the text
      messageDiv.appendChild(span);

      const textNode = document.createTextNode(messageText);
      messageDiv.appendChild(textNode);

      // Adding line break
      const lineBreak = document.createElement("br");
      messageDiv.appendChild(lineBreak);

      // Creating and appending the link
      const link = document.createElement("a");
      link.href =
        "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#:~:text=the%20%22Equivalent%22%20exception.-,Inline%3A,-The%20Success%20Criterion";
      link.textContent = "W3C Inline exception definition";
      link.classList.add("hyperlinked-text-9927845");
      link.setAttribute("rel", "noopener noreferrer");
      messageDiv.appendChild(link);

      // Append the constructed message div to the list item
      const precedingDiv = createPrecedingDiv(list);
      precedingDiv.appendChild(messageDiv);

      list.classList.add("manual-9927845");
    }
  });
  // New code for handling lists - end

  if (hasIssues) {
    injectButton();
  }
}

function toggleMessageDivsVisibility() {
  // Select all divs with the class 'target-size-8228965'
  const messageDivs = document.querySelectorAll(".target-size-8228965");
  let areMessagesVisible = false; // Declare the variable here and initialize it

  // Toggle visibility of each div
  messageDivs.forEach((div) => {
    const htmlDiv = div as HTMLElement; // Type assertion to HTMLElement
    if (htmlDiv.style.display === "none") {
      htmlDiv.style.setProperty("display", "block", "important");
      areMessagesVisible = true;
    } else {
      htmlDiv.style.setProperty("display", "none", "important");
    }
  });

  // Update the button text based on the visibility of messages
  const button = document.getElementById("rmb-8228965") as HTMLButtonElement;
  if (button) {
    button.textContent = areMessagesVisible ? "Hide messages" : "Show messages";
    button.setAttribute("aria-pressed", areMessagesVisible.toString()); // Set aria-pressed attribute
  }
}

// Function to inject the button and add the click event listener
function injectButton() {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.id = "rmb-8228965";
  button.className = "toggleMessage-8228965";
  button.setAttribute("aria-pressed", "false"); // Set initial aria-pressed attribute
  button.textContent = "Hide messages"; // Set the default button name

  // Add click event listener to the button
  button.addEventListener("click", toggleMessageDivsVisibility);

  document.body.prepend(button);
}
