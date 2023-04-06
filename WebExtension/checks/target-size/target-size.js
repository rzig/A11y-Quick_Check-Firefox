function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function addCircleShape(elem) {
  const circle = document.createElement('div');
  circle.classList.add('circle-shape-8228965');
  circle.style.width = '48px';
  circle.style.height = '48px';
  elem.classList.add('pos-rel-8228965'); // Add the class to the element
  elem.appendChild(circle);
}

function isExcluded(elem) {
  const anchorLinkRegex = /^#[\w-]+$/;
  const isInPageLink = elem.tagName === 'A' && anchorLinkRegex.test(elem.getAttribute('href'));
  const isInParagraph = elem.tagName === 'A' && elem.parentNode.tagName === 'P';
  const isInSentence = elem.tagName === 'A' && elem.parentNode.tagName === 'SPAN';
  const isFootnote = elem.tagName === 'A' && elem.classList.contains('footnote');

  return isInPageLink || isInParagraph || isInSentence || isFootnote;
}

//target-size.js
document.querySelectorAll('a, button, input[type="button"], input[type="submit"], select, [role="button"]')
  .forEach(elem => {
    const rect = elem.getBoundingClientRect();
    const elemWidth = rect.width;
    const elemHeight = rect.height;
    const isInline = getComputedStyle(elem).display === 'inline';
    const parentTag = elem.parentNode.tagName;
    const isHidden = getComputedStyle(elem).display === 'none' || getComputedStyle(elem).opacity === '0' || getComputedStyle(elem).visibility === 'hidden';
    const isTooSmall = elemWidth <= 1 || elemHeight <= 1;

    if ((elemWidth < 48 || elemHeight < 48) && !isInline && !['OL', 'UL', 'DL', 'LI', 'DT', 'DD'].includes(parentTag) && !isHidden && !isTooSmall && !isExcluded(elem)) {
      elem.classList.add('small-target-8228965');

      const messageDiv = createMessageDiv('target-size-8228965', `The target size in pixels for this element is ${elemWidth} x ${elemHeight}`);
      elem.insertAdjacentElement('afterend', messageDiv);

      if (elemWidth < 48 || elemHeight < 48) {
        addCircleShape(elem);
      }
    }
  });