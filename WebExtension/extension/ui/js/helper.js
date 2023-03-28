function createComputedNameDiv(accName, referenceText, messagePlaceholder, class1Placeholder, class2Placeholder) {
  const elementType = this.nodeName.toLowerCase();
  const messageText = `"${referenceText.trim()}". ${messagePlaceholder}`;
  const message = document.createTextNode(messageText);

  // Create a div element with classes and add the text node to it
  const container = document.createElement('div');
  container.classList.add(class1Placeholder, class2Placeholder);
  container.appendChild(message);

  return container;
}

export { createComputedNameDiv };

// //Call into external js
// // Import the createComputedNameDiv function from helper.js
// import { createComputedNameDiv } from './helper.js';

// // Get the element and reference text
// const element = document.getElementById('my-element');
// const referenceText = document.getElementById('my-reference-text').textContent.trim();

// // Call the createComputedNameDiv function to create the computed name div
// const computedNameDiv = createComputedNameDiv.call(element, referenceText, 'Custom message', 'custom-class-1', 'custom-class-2');

// // Insert the computed name div after the element
// element.after(computedNameDiv);
