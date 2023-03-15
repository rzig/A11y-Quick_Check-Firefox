function removeAddedElements() {
    // Remove all div containers with the "not-a-match" class
    const notAMatchDivs = document.querySelectorAll(".not-a-match");
    for (const div of notAMatchDivs) {
      div.remove();
    }
  
    // Remove all text nodes added by the script
    const textNodes = document.querySelectorAll(":scope > #text");
    for (const node of textNodes) {
      node.remove();
    }
  }
  
  removeAddedElements();
  