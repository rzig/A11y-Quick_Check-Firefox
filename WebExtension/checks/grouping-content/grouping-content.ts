populateLinkObjects(); // Ensure the links are populated before use.

function createTopRightGCContainer(): void {
  const containerDiv = getOrCreateContainer();

  // Early return if containerDiv is null or within the excluded container
  if (containerDiv === null || isNodeInExcludedContainer(containerDiv)) {
    return;
  }

  const innerDiv = document.createElement("div");
  innerDiv.className = "inner-container-9927845 remove-inner-gc-9927845";

  if (containerDiv.dataset["isMinimised"] === "true") {
    innerDiv.classList.add("hidden-feature-message-9927845");
  }

  containerDiv.appendChild(innerDiv);
  updateParentContainerClass(containerDiv);

  const checkDetails = createDetailsComponent(
    "Identifying how content is grouped",
    "The purpose of this check is to identify grouping content. Grouping content in HTML is p, hr, pre, blockquote, ol, ul, menu, li, dl, dt, dd, figcaption, main, search and div. <div> is not included in the check. Related form control checks for the use of <fieldset>, <legend>, role=group and role=radiogroup."
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
    appendLink(htmlLinks, "4.4 Grouping content", "HTML");
  }
  createDismissButton(innerDiv, "Grouping content");

  document.body.appendChild(containerDiv);
}

createTopRightGCContainer();