populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightContainer(): void {
  const containerDiv = getOrCreateContainer();

  // Early return if containerDiv is null or within the excluded container
  if (containerDiv === null || isNodeInExcludedContainer(containerDiv)) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-tls-9927845";

  if (containerDiv.dataset["isMinimized"] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Identifying text-level semantics",
    "Text-level semantics are elements used to describe the structure and meaning of text within a web page, for example <strong>, <em> and <code>. Sometimes referred to as inline elements, these tags add semantic meaning or styling to text."
  );
  innerDiv.appendChild(checkDetails);

  const referenceContainer = createReferenceContainer();
  if (referenceContainer) {
    innerDiv.appendChild(referenceContainer);

    const linkList = document.createElement("ul");
    linkList.className = "reference-list-9927845";
    linkList.style.margin = "0";
    linkList.style.padding = "0";
    referenceContainer.appendChild(linkList);

    // Append specified links function reintroduced
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

    // Example usage of appendLink
    appendLink(ariaLinks, "Accessible Name and Description Computation 1.2", "ARIA");
  }
  createDismissButton(innerDiv, "Text-level semantics");

  document.body.appendChild(containerDiv);
}

createTopRightContainer();