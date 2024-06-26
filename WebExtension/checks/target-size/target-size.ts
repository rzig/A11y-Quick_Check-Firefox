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
function addCircleShape(
  elem: Element,
  targetSize: number,
  addSpacingCircle: boolean = false
) {
  const circle = document.createElement("div");
  circle.classList.add("circle-shape-8228965");
  circle.classList.add(`circle-shape-size-${targetSize}-8228965`);

  // Conditionally add the spacing-circle class
  if (addSpacingCircle && targetSize <= 24) {
    circle.classList.add("spacing-circle-8228965");
  }

  circle.style.width = `${targetSize}px`;
  circle.style.height = `${targetSize}px`;
  elem.classList.add(`pos-rel-size-${targetSize}-8228965`);
  elem.classList.add(`pos-rel-8228965`);
  elem.appendChild(circle);
}

function isExcluded(elem: Element): boolean {
  // Regex to match anchor links that are in-page (i.e., start with "#")
  const anchorLinkRegex = /^#[\w-]+$/;
  const isAnchor = elem.tagName === "A";
  const isButton =
    elem.tagName === "BUTTON" || elem.getAttribute("role") === "button";

  // Check if the element is an anchor and if its href matches the in-page link pattern
  const isInPageLink =
    isAnchor && anchorLinkRegex.test(elem.getAttribute("href") ?? "");

  // Extend the check for being inside a paragraph to include checking for inline elements
  let isInParagraph =
    (isAnchor || isButton) && elem.closest("p, span") !== null;

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

function isNodeInExcludedinContainer(node: Element): boolean {
  let ancestor = node.parentElement;
  while (ancestor) {
    if (ancestor.classList.contains("top-right-container-9927845")) {
      return true;
    }
    ancestor = ancestor.parentElement;
  }
  return false;
}

function addTargetSize(targetSize: number): void {
  let hasIssues: boolean = false; // Reset hasIssues for each invocation

  const inputElements: NodeListOf<Element> = document.querySelectorAll(
    'a, button, input[type="button"], input[type="submit"], select, [role="button"], [role="link"]'
  );

  inputElements.forEach((elem: Element) => {
    // Check if the element is within an excluded container
    if (isNodeInExcludedinContainer(elem)) {
      return;
    }

    // Check if the element is exempt (e.g., a link in a paragraph)
    if (isExcluded(elem)) {
      return; // Skip this element if it's exempt
    }

    // Skip certain elements as needed
    if (elem.id === "rmb-8228965") return;

    const rect: DOMRect = elem.getBoundingClientRect();
    const {
      width: extraWidth,
      height: extraHeight,
      extendsTarget,
    } = getPseudoElementAdjustment(elem);
    const elemWidth: number = rect.width + extraWidth;
    const elemHeight: number = rect.height + extraHeight;
    const tagName: string = elem.tagName.toLowerCase();
    const role: string | null = elem.getAttribute("role");
    const identifier: string = role ? `role="${role}"` : `<${tagName}>`;
    const isHidden: boolean =
      getComputedStyle(elem).display === "none" ||
      getComputedStyle(elem).visibility === "hidden";
    const isTooSmall: boolean = elemWidth <= 1 || elemHeight <= 1;

    if (!isHidden && !isTooSmall) {
      if (
        !extendsTarget &&
        (elemWidth < targetSize || elemHeight < targetSize)
      ) {
        hasIssues = true; // Flag that there's an issue

        const hasSufficientSpacing: boolean = checkSpacing(elem, targetSize);
        let baseMessage: string = `The target size for ${identifier} is ${elemWidth.toFixed(
          2
        )}px x ${elemHeight.toFixed(2)}px.`;

        let message: string = appendHyperlinksToMessage(baseMessage); // Integrate dynamic hyperlinks

        const messageDiv: HTMLDivElement = document.createElement("div");
        messageDiv.className = `target-size-${targetSize}-8228965`;
        messageDiv.classList.add("target-size-8228965");
        messageDiv.classList.add("message-66786");

        // Apply different classes based on spacing and size
        if (hasSufficientSpacing && targetSize <= 24) {
          messageDiv.classList.add("target-sufficient-8228965");
        } else {
          messageDiv.classList.add("target-insufficient-8228965");
        }

        // Conditional logic based on the target size
        if (targetSize >= 44) {
          messageDiv.classList.add("spacing-ignore-8228965");
          messageDiv.textContent = `Invalid The target size for ${identifier} is ${elemWidth.toFixed(
            2
          )}px x ${elemHeight.toFixed(2)}px.`;
        } else {
          messageDiv.textContent = `The target size for ${identifier} is ${elemWidth.toFixed(
            2
          )}px x ${elemHeight.toFixed(2)}px.`;
        }

        if (hasSufficientSpacing) {
          if (targetSize <= 24) {
            // Handle cases where target size is 24 or less
            const exceptionSpan: HTMLSpanElement = document.createElement("span");
            exceptionSpan.className = "target-size-exception-8228965";
            exceptionSpan.textContent =
              "This element is exempt by the Level AA Spacing exception."; // Exemption message for <=24
            messageDiv.appendChild(exceptionSpan);
          } else if (targetSize <= 44) {
            // Handle cases where target size is greater than 24 but 44 or less
            const exceptionSpan: HTMLSpanElement = document.createElement("span");
            exceptionSpan.className = "target-size-noexception-8228965";
            exceptionSpan.textContent =
              ""; //Add message if messageexceptionSpan);
          }
        }

        elem.appendChild(messageDiv);
        addCircleShape(elem, targetSize, hasSufficientSpacing);
      }
    }
  });

  // Start new code block for handling lists
  const lists = document.querySelectorAll("ul, ol");
  lists.forEach((list) => {
    let listHasIssues = false; // Initially, assume the list has no issues

    const listItems = list.querySelectorAll("li");
    listItems.forEach((li) => {
      if (li.querySelector(".target-size-8228965")) {
        listHasIssues = true;
      }
    });

    // Check if the list itself should display the message
    if (listHasIssues) {
      hasIssues = true; // This flags that there are overall issues for lists
      //console.log(`[List Issue Detected] Displaying message for list due to target size issues in list ID: ${list.id}`);

      const messageText =
        "If the list is a sentence or contains both active elements and non-target text, exceptions for inline elements may apply!";
      // Use appendHyperlinksToMessage
      const updatedMessageText = appendHyperlinksToMessage(messageText);
      const fullMessageClassName = "manual-confirmation-9927845 message-66786";

      // Create and append the message div only if it has not been added already
      if (!list.querySelector(`.${fullMessageClassName}`)) {
        const messageDiv = document.createElement("div");
        messageDiv.className = fullMessageClassName;

        const span = document.createElement("span");
        span.className = "messageLabelManualConfirmation";
        messageDiv.classList.add("message-66786");
        span.textContent = "Needs manual confirmation: ";
        messageDiv.appendChild(span);

        const textNode = document.createTextNode(messageText);
        messageDiv.appendChild(textNode);

        const lineBreak = document.createElement("br");
        messageDiv.appendChild(lineBreak);

        const link = document.createElement("a");
        link.href =
          "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#:~:text=the%22Equivalent%22exception.-,Inline%3A,-The%20Success%20Criterion";
        link.textContent = "W3C Inline exception definition";
        link.classList.add("hyperlinked-text-9927845");
        link.setAttribute("rel", "noopener noreferrer");
        messageDiv.appendChild(link);

        list.prepend(messageDiv); // Add the message at the start of the list, making it the first child
      }
    }
  });
  // End new code block for handling lists

  //console.log(`[Final Status] hasIssues: ${hasIssues}`);
  if (hasIssues) {
    //console.log("[Action] Injecting toggle button due to detected issues.");
    // Inject button function call removed
  } else {
    //console.log("[No Issues] No issues detected, no button injected.");
  }
}

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerTargetSize(): void {
  const containerDiv = getOrCreateContainer();

  // Check if containerDiv is null and return early if so
  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-ts-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset["isMinimised"] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing target-size",
    "The purpose of this check is to ensure web elements conform to the target size success criteria. It evaluates elements like buttons, links, and form controls, verifying that they meet the minimum target size requirements. This includes notifications when the Spacing exception applies. Lists are indicated as requiring manual testing verification if an exception applies when it cannot be determined automatically. The Target Size messages can be toggled on/off. If a target is undersize, and the circles do not intersect (overlap), the spacing exemption applies. Note that the Spacing exception is only applicable to 2.5.8 Target Size (Minimum) (Level AA). Due to the complexity of Target-size, some false positives may occur. For example a link contained in a DIV element that includes content and is thus an inline exemption, may be identified as an issue. Currenly this is the only false positive result we are aware of, and are working to fix this issue."
  );
  innerDiv.appendChild(checkDetails);

  // // Manual notes details component
  // const checkManualDetails = createDetailsComponent(
  //   "How to manually test ( is coming! )",
  //   "This section will be populated with how to manually test"
  // );
  // innerDiv.appendChild(checkManualDetails);

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

    // Specified links function
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

    // Append specific links
    appendLink(wcagLinks, "2.5.8 Target Size (Minimum) (Level AA)", "WCAG");
    appendLink(wcagLinks, "2.5.5 Target Size (Enhanced) (Level AAA)", "WCAG");

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Target-Size");

  // Create the toggle button for messages and append it to the containerDiv
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Hide Messages";
  toggleButton.setAttribute("aria-pressed", "false");
  toggleButton.className = "toggle-button-9927845";

  toggleButton.addEventListener("click", () => {
    const messages = document.querySelectorAll(".message-66786");
    const isPressed = toggleButton.getAttribute("aria-pressed") === "true";

    messages.forEach((message) => {
      const msg = message as HTMLElement; // Cast Element to HTMLElement
      if (isPressed) {
        msg.style.display = "block";
      } else {
        msg.style.display = "none";
      }
    });

    toggleButton.setAttribute("aria-pressed", isPressed ? "false" : "true");
    toggleButton.textContent = isPressed ? "Hide Messages" : "Show Messages";
  });

  containerDiv.appendChild(toggleButton);

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerTargetSize();
