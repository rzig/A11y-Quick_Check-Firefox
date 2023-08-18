"use strict";

function ariaNameProhibited() {
  let nodes = document.querySelectorAll(
    'div:not([role])[aria-label],div:not([role])[aria-labelledby],span:not([role])[aria-labelledby],span:not([role])[aria-label],[role=caption][aria-labelledby],[role=code][aria-labelledby],[role=deletion][aria-labelledby],[role=emphasis][aria-labelledby],[role=generic][aria-labelledby],[role=insertion][aria-labelledby],[role=paragraph][aria-labelledby],[role=presentation][aria-labelledby],[role=strong][aria-labelledby],[role=subscript][aria-labelledby],[role=superscript][aria-labelledby],[role=caption][aria-label],[role=code][aria-label],[role=deletion][aria-label],[role="emphasis"][aria-label],[role="generic"][aria-label],[role="insertion"][aria-label],[role="paragraph"][aria-label],[role=presentation][aria-label], [role=none][aria-label],[role=strong][aria-label],[role=subscript][aria-label],[role=superscript][aria-label]'
  );

  for (const currentNode of nodes) {
    const role = currentNode.getAttribute("role");
    currentNode.setAttribute("data-name-prohibited-aria", "role");
  }

  nodes = document.querySelectorAll(
    "div:not([role])[aria-labelledby], span:not([role])[aria-labelledby], caption:not([role])[aria-labelledby], figcaption:not([role])[aria-labelledby], code:not([role])[aria-labelledby], del:not([role])[aria-labelledby], em:not([role])[aria-labelledby], ins:not([role])[aria-labelledby], p:not([role])[aria-labelledby], strong:not([role])[aria-labelledby], sub:not([role])[aria-labelledby], sup:not([role])[aria-labelledby], div:not([role])[aria-label], span:not([role])[aria-label], caption:not([role])[aria-label], figcaption:not([role])[aria-label], code:not([role])[aria-label], del:not([role])[aria-label], em:not([role])[aria-label], ins:not([role])[aria-label], p:not([role])[aria-label], strong:not([role])[aria-label], sub:not([role])[aria-label], sup:not([role])[aria-label]"
  );

  for (const currentNode of nodes) {
    currentNode.setAttribute("data-name-prohibited-html", currentNode.nodeName);
  }
}

ariaNameProhibited();

function ariaNamePermitted() {
  let nodes = document.querySelectorAll(
    'div[aria-label]:not([role]),span[aria-label]:not([role]),[role="generic"][aria-label],[role="caption"][aria-label],caption[aria-label],[role="deletion"][aria-label],del[aria-label],[role="emphasis"][aria-label],em[aria-label],[role="insertion"][aria-label],ins[aria-label],[role="paragraph"][aria-label],p[aria-label],[role="presentation"][aria-label],[role="none"][aria-label],[role="strong"][aria-label],strong[aria-label],[role="subscript"][aria-label],sub[aria-label],[role="superscript"][aria-label],sup[aria-label],[role="table"][aria-label],sub[aria-label]'
  );

  for (const currentNode of nodes) {
    currentNode.setAttribute("data-name-permitted-aria", "role");
  }
}

ariaNamePermitted();
