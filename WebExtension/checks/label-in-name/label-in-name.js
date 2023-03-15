function checkInputLabels() {
    // Get all input elements on the page
    const inputs = document.getElementsByTagName("input");
  
    // Loop through each input element
    for (const input of inputs) {
      // Get the label element associated with the input
      const id = input.getAttribute("id");
      if (!id) {
        continue;
      }
      const label = document.querySelector(`label[for="${id}"]`);
      if (!label) {
        continue;
      }
  
      // Get the visible label text and the programmatic name
      const visibleLabel = label.innerText.trim();
      const programmaticName = input.getAttribute("name") || input.getAttribute("aria-label") || input.getAttribute("aria-labelledby") || input.getAttribute("title");
  
      // Compare the visible label text and the programmatic name
      if (visibleLabel !== programmaticName) {
        // Add a div container to the input element with a meaningful message
        const message = document.createTextNode("The input's programmatic name does not match its visible label text.");
        const container = document.createElement("div");
        container.classList.add("not-a-match");
        container.appendChild(message);
        input.after(container);
      }
    }
  }
  
  function checkSelectLabels() {
    // Get all select elements on the page
    const selects = document.getElementsByTagName("select");
  
    // Loop through each select element
    for (const select of selects) {
      // Get the label element associated with the select
      const id = select.getAttribute("id");
      if (!id) {
        continue;
      }
      const label = document.querySelector(`label[for="${id}"]`);
      if (!label) {
        continue;
      }
  
      // Get the visible label text and the programmatic name
      const visibleLabel = label.innerText.trim();
      const programmaticName = select.getAttribute("name") || select.getAttribute("aria-label") || select.getAttribute("aria-labelledby") || select.getAttribute("title");
  
      // Get the selected option element
      const selectedOption = select.options[select.selectedIndex];
  
      // Compare the visible label text and the selected option text
      if (visibleLabel !== selectedOption.innerText.trim()) {
        // Add a div container to the select element with a meaningful message
        const message = document.createTextNode("The selected option of the select element does not match its visible label text.");
        const container = document.createElement("div");
        container.classList.add("not-a-match");
        container.appendChild(message);
        select.after(container);
      }
    }
  }
  
  checkInputLabels();
  checkSelectLabels();
  