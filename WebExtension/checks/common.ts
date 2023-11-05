"use strict";

function getWrapperDiv(element: Element) {
  const wrapperAttribute = 'data-a11y-wrapper-2edbc8ab';

  // Check if we have a sibling, and if we do that it's not our wrapper
  let wrapper = element.nextElementSibling;
  if (wrapper == null || !wrapper.hasAttribute(wrapperAttribute)) {
    // We don't have a wrapper yet, so create it.
    wrapper = document.createElement('div');
    wrapper.setAttribute(wrapperAttribute, '');
    element.after(wrapper);
  }
  return wrapper;
}

// Create the message div as a child of the target element
function createChildMessageDiv(element: Element, messageClass: string, message: string, extraClasses: string[] = []) {
  const wrapper = getWrapperDiv(element);
  wrapper.appendChild(createNewMessageDiv(messageClass, message, extraClasses));
}

function createNewMessageDiv(messageClass: string, message: string, extraClasses: string[]) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(messageClass);
  for (const extraClass of extraClasses) {
    messageDiv.classList.add(extraClass);
  }
  messageDiv.classList.add('common-a11y-message-2edbc8ab');
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function createPrecedingDiv(targetElement: Element): HTMLDivElement {
  const attributeLabel = 'data-before-div-9f2dc5ea';

  // Check if we have a preceding sibling, and if we do that it's not our custom div
  let precedingDiv = targetElement.previousElementSibling as HTMLDivElement;
  if (precedingDiv == null || !precedingDiv.hasAttribute(attributeLabel)) {
    // We don't have our custom div yet, so create it.
    precedingDiv = document.createElement('div');
    precedingDiv.setAttribute(attributeLabel, '');
    targetElement.before(precedingDiv);
  }
  return precedingDiv;
}

// Create the message div as a child of the preceding div
function addMessageToPrecedingDiv(element: Element, messageClass: string, message: string, extraClasses: string[] = []) {
  const precedingDiv = createPrecedingDiv(element);
  precedingDiv.appendChild(createNewMessageDiv(messageClass, message, extraClasses));
}

function removeInjectedDivs(messageClasses: string[]) {
  for (const messageClass of messageClasses) {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    for (const messageDiv of messageDivs) {
      const parentWrapper = messageDiv.parentElement!;
      messageDiv.remove();
      if (parentWrapper.children.length == 0) {
        parentWrapper.remove();
      }
    }
  }
}

//Helper for hidden elements !isHidden(imgElement)
function isHidden(element: HTMLElement): boolean {
  const style: CSSStyleDeclaration = getComputedStyle(element);
  return style.display === 'none' || style.visibility === 'hidden' || element.hasAttribute('hidden');
} 