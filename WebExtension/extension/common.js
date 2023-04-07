function getWrapperDiv(element) {
    const wrapperAttribute='data-a11y-wrapper-2edbc8ab';

    // Check if we have a sibling, and if we do that it's not our wrapper
    let wrapper=element.nextElementSibling;
    if (wrapper === undefined  || wrapper === null || !wrapper.hasAttribute(wrapperAttribute)) {
        // We don't have a wrapper yet, so create it.
        wrapper=document.createElement('div');
        wrapper.setAttribute(wrapperAttribute,'');
        element.after(wrapper);
    }
    return wrapper;
}

function createMessageDiv(element, messageClass, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  const wrapper=getWrapperDiv(element);
  wrapper.appendChild(messageDiv);
}

function removeInjectedDivs(messageClasses) {
  messageClasses.forEach((messageClass) => {
    const messageDivs = document.querySelectorAll(`.${messageClass}`);

    messageDivs.forEach((messageDiv) => {
      parentWrapper=messageDiv.parentElement;
      messageDiv.remove();
      if (parent.children.length == 0) {
        parent.remove();
      }  
    });
  });
}
