"use strict";

interface AccessibleNameResult {
  name: string;
  method: string;
  isLabelledByIdMissing: boolean;
  additionalMessage?: string; // Optional property for additional warnings or messages
}

interface AncestorCheckResult {
  element: Element;
  accessibleName?: string;
  isHidden: boolean;
  role?: string | undefined; // Allow both omitted and explicitly undefined
}

function observeSvgAriaLabelChanges(): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'aria-label' && mutation.target instanceof SVGSVGElement) {
        const svgElement = mutation.target;
        const newAriaLabel = svgElement.getAttribute('aria-label') ?? "not specified";
        const previousAriaLabel = mutation.oldValue ?? "previously undefined";

        // Construct the message
        const message = `Dynamic update: The SVG is named using aria-label: "${previousAriaLabel}". Name updated to "${newAriaLabel}"`;

        // Remove existing messages to prevent duplication
        const existingMessages = svgElement.querySelectorAll('.warning-for-valid-message-9927845');
        existingMessages.forEach(msg => msg.remove());

        // Create new message div
        createChildMessageDiv(svgElement, "warning-for-valid-message-9927845", message);
      }
    });
  });

  const config: MutationObserverInit = {
    attributes: true,
    attributeFilter: ['aria-label'],
    subtree: true,
    attributeOldValue: true  // Ensures the previous value of the attribute is passed to the mutation callback
  };

  const svgs = document.querySelectorAll('svg');
  svgs.forEach((svg) => {
    // Disconnect any existing observer on this element to prevent duplicates
    const existingObserver = (svg as any).__observer;
    if (existingObserver) {
      existingObserver.disconnect();
    }
    
    // Attach the new observer and store a reference to it on the element
    observer.observe(svg, config);
    (svg as any).__observer = observer;
  });
}

// Run the observer function
observeSvgAriaLabelChanges();

function getAccessibleName(node: Element): AccessibleNameResult {
  let result: AccessibleNameResult = {
    name: "",
    method: "none",
    isLabelledByIdMissing: false,
  };
  let labelledby = node.getAttribute("aria-labelledby");
  let label = node.getAttribute("aria-label");
  let titleElement = node.querySelector("title");
  let titleAttribute = node.getAttribute("title"); // Direct title attribute of the SVG
  let textElement = node.querySelector("text"); // Check for <text> element inside SVG

  // Check aria-labelledby
  if (labelledby) {
    let names = labelledby
      .split(" ")
      .map((id) => {
        const element = document.getElementById(id);
        if (!element) {
          result.isLabelledByIdMissing = true;
          return "";
        }
        return element.textContent?.trim() ?? "";
      })
      .filter((text) => text.length > 0)
      .join(" ");
    if (names.length > 0) {
      result.name = names;
      result.method = "aria-labelledby";
    }
  }

  // Check aria-label
  if (!result.name && label) {
    result.name = label;
    result.method = "aria-label";
  }

  // The <title> element check is updated to consider it as providing a description rather than a direct name
  // This ensures that <title> is not incorrectly used as the primary accessible name when better methods are available
  if (!result.name && titleElement && titleElement.textContent) {
    // Name is now set based on <title> only if other more appropriate methods are not available
    result.additionalMessage =
      "Warning The <title> element provides a description, not a direct accessible name.";
    result.method = "<title> element"; // This is kept for backward compatibility but should be revisited for correct usage
  }

  // Check title attribute on SVG
  if (!result.name && titleAttribute) {
    result.name = titleAttribute;
    result.method = "title attribute";
  }

  // Check <text> element inside SVG
  if (!result.name && textElement && textElement.textContent) {
    result.name = textElement.textContent.trim();
    result.method = "<text>";
  }

  return result;
}

function checkAncestors(element: Element): AncestorCheckResult | null {
  let currentElement = element;

  while (currentElement.parentElement) {
    currentElement = currentElement.parentElement;

    const tagName = currentElement.tagName.toLowerCase();
    const roleAttr = currentElement.getAttribute("role"); // Use roleAttr for the attribute value

    if (
      tagName === "a" ||
      tagName === "button" ||
      roleAttr === "link" ||
      roleAttr === "button"
    ) {
      const accessibleName =
        currentElement.getAttribute("aria-label") ||
        currentElement.textContent ||
        "";
      return {
        element: currentElement,
        accessibleName: accessibleName.trim(),
        isHidden: false,
        ...(roleAttr !== null && { role: roleAttr }), // Only add role if it's not null
      };
    }

    if (roleAttr === "none" || roleAttr === "presentation") {
      return {
        element: currentElement,
        isHidden: false,
        ...(roleAttr !== null && { role: roleAttr }), // Only add role if it's not null
      };
    }

    if (currentElement.getAttribute("aria-hidden") === "true") {
      return {
        element: currentElement,
        isHidden: true,
      };
    }
  }

  return null;
}

function checkSvgAccessibleNames() {
  const svgElements = document.querySelectorAll("svg");
  const showSvgTextClass = "valid-message-9927845"; // Used for valid naming
  const notNamedDecorativeClass = "invalid-message-9927845"; // Used for missing names
  const imgRoleWithLabelClass = "warning-message-9927845"; // Used for warnings
  const generalTips = "tips-message-9927845"; // Used for general tips

  for (const svgElement of svgElements) {
    const ancestorCheck = checkAncestors(svgElement);
    if (ancestorCheck?.isHidden) {
      continue; // Skip SVGs with hidden ancestors
    }

    const { name, method, isLabelledByIdMissing } =
      getAccessibleName(svgElement);
    const role = svgElement.getAttribute("role");
    const hiddenElement = svgElement.getAttribute("aria-hidden");
    const titleElement = svgElement.querySelector("title"); // Retrieve title element for current SVG

    if (hiddenElement === "true") {
      continue; // Skip SVGs that are explicitly hidden
    }

    let messageGenerated = false; // Flag to track if the new function generates a message

    // New function to check if the parent of the SVG has an accessible name
    if (ancestorCheck?.accessibleName) {
      const parentRole = ancestorCheck.role ?? ancestorCheck.element.tagName.toLowerCase();
      const parentName = ancestorCheck.accessibleName;
      if (role === "img" && !name && hiddenElement !== "true") {
        const message = `Warning SVG has parent with role ${parentRole} has an accessible name "${parentName}". This SVG should be marked as decorative with aria-hidden="true".`;
        createChildMessageDiv(svgElement, imgRoleWithLabelClass, message);
        messageGenerated = true;
      } else if (role === "img" && name && hiddenElement !== "true") {
        const message = `Warning SVG has parent with role ${parentRole} has accessible name "${parentName}". Check if this SVG should be marked as decorative with aria-hidden="true".`;
        createChildMessageDiv(svgElement, imgRoleWithLabelClass, message);
        messageGenerated = true;
      } else if (!role && !name && hiddenElement !== "true") {
        const message = `Warning SVG has parent with role ${parentRole} has an accessible name "${parentName}". This SVG should be marked as decorative with aria-hidden="true".`;
        createChildMessageDiv(svgElement, imgRoleWithLabelClass, message);
        messageGenerated = true;
      }
    }

    // Skip other checks if the new function has generated a message
    if (messageGenerated) {
      continue;
    }

    if (name) {
      const nameMessage = `Valid The SVG is named using ${method}: "${name}".`;
      createChildMessageDiv(svgElement, showSvgTextClass, nameMessage);
    }

    if (titleElement) {
      // This line checks if there is a <title> element present
      // Safely accessing the text content of the <title> element, providing a fallback if it is null
      const svgDesc = titleElement.textContent
        ? titleElement.textContent.trim()
        : "Warning No description provided";
      const titleElementWarning = `Best practice The <title> element provides a short description (“${svgDesc}”). Make sure this supports the name provided. This will be announced after the name where supported.`;
      createChildMessageDiv(svgElement, generalTips, titleElementWarning);
    }

    // Warning for <text> element usage regarding cross-browser and AT support
    if (method === "<text>") {
      const textWarning =
        "Warning: The SVG is named using <text>. This does not have reliable cross-browser and AT support.";
      createChildMessageDiv(svgElement, imgRoleWithLabelClass, textWarning);
    }

    // Add check for role="presentation" or role="none"
    if (role === "presentation" || role === "none") {
      const roleRemovedWarning = `Warning: The SVG has 'role=${role}' which negates the implicit semantics. Consider revising if the SVG is intended to convey meaning.`;
      createChildMessageDiv(
        svgElement,
        notNamedDecorativeClass,
        roleRemovedWarning
      );
    }

    let showGeneralMissingNameMessage = true; // Flag to determine if general missing name message should be shown

    if (role === "img") {
      if (method === "none" || method === "<title> element") {
        // Updated condition
        const roleImgWarning =
          "Warning: SVG element has 'role=img' but is missing an accessible name.";
        createChildMessageDiv(
          svgElement,
          notNamedDecorativeClass,
          roleImgWarning
        );
        showGeneralMissingNameMessage = false; // Prevent general missing name message if this specific message is shown
      }
    } else if (
      role !== "img" &&
      method !== "none" &&
      method !== "<title> element"
    ) {
      // Updated condition
      const roleWarning = "Warning: SVG element is missing 'role=img'.";
      createChildMessageDiv(svgElement, imgRoleWithLabelClass, roleWarning);
    }

    if (
      showGeneralMissingNameMessage &&
      (method === "none" || method === "<title> element")
    ) {
      // Updated condition
      const missingNameMessage =
        "Warning: SVG element is missing an accessible name.";
      createChildMessageDiv(
        svgElement,
        notNamedDecorativeClass,
        missingNameMessage
      );
    }

    if (isLabelledByIdMissing) {
      const missingIdMessage =
        "Warning: SVG element uses 'aria-labelledby', but the ID referenced does not exist.";
      createChildMessageDiv(
        svgElement,
        notNamedDecorativeClass,
        missingIdMessage
      );
    }
  }
}

checkSvgAccessibleNames();

populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainerSVGname(): void {
  const containerDiv = getOrCreateContainer();

  if (containerDiv === null) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-showsvg-9927845";

  // Check if the container is minimized
  if (containerDiv.dataset["isMinimised"] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Analysing SVG accessible name",
    "The purpose of this check is to ensure that SVG elements are accessible through proper naming. It validates the presence and proper usage of accessibility attributes such as aria-label, aria-labelledby, and title within SVG elements. The script also monitors for dynamic changes to SVG names, automatically adding a message detailing each name change. If issues are found, it flags the SVGs as requiring attention and provides feedback to improve accessibility. Valid implementations are confirmed as correctly named to assist in making web content more accessible to users relying on assistive technologies."
  );
  innerDiv.appendChild(checkDetails);

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
    appendLink(ariaLinks, "aria-label property", "ARIA");
    appendLink(ariaLinks, "aria-labelledby property", "ARIA");
    appendLink(htmlLinks, "3.2.6.1 The title attribute", "HTML");
    appendLink(svgLinks, "titleElement", "SVG");
    appendLink(svgLinks, "textElement", "SVG");

    // Add the Dismiss Button
  }
  createDismissButton(innerDiv, "Ordered List");

  // Append the main container to the document's body
  document.body.appendChild(containerDiv);
}

createTopRightContainerSVGname();

