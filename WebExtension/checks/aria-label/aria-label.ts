"use strict";

function ariaNameProhibited() {
  let nodes = document.querySelectorAll(
    "div:not([role])[aria-label], " +
      "div:not([role])[aria-labelledby], " +
      "span:not([role])[aria-labelledby], " +
      "span:not([role])[aria-label], " +
      '[role="caption"][aria-labelledby], ' +
      '[role="code"][aria-labelledby], ' +
      '[role="deletion"][aria-labelledby], ' +
      '[role="emphasis"][aria-labelledby], ' +
      '[role="generic"][aria-labelledby], ' +
      '[role="insertion"][aria-labelledby], ' +
      '[role="paragraph"][aria-labelledby], ' +
      '[role="presentation"][aria-labelledby], ' +
      '[role="strong"][aria-labelledby], ' +
      '[role="subscript"][aria-labelledby], ' +
      '[role="superscript"][aria-labelledby], ' +
      '[role="caption"][aria-label], ' +
      '[role="code"][aria-label], ' +
      '[role="deletion"][aria-label], ' +
      '[role="emphasis"][aria-label], ' +
      '[role="generic"][aria-label], ' +
      '[role="insertion"][aria-label], ' +
      '[role="paragraph"][aria-label], ' +
      '[role="presentation"][aria-label], ' +
      '[role="none"][aria-label], ' +
      '[role="strong"][aria-label], ' +
      '[role="subscript"][aria-label], ' +
      '[role="superscript"][aria-label]'
  ) as NodeListOf<HTMLElement>;

  for (const currentNode of nodes) {
    currentNode.setAttribute("data-name-prohibited-aria", "role");
  }
}

function ariaNamePermitted() {
  let nodes = document.querySelectorAll(
    "div[aria-label]:not([role]), " +
      "span[aria-label]:not([role]), " +
      'div[role="region"][aria-label], ' +
      '[role="generic"][aria-label], ' +
      '[role="caption"][aria-label], ' +
      "caption[aria-label], " +
      '[role="deletion"][aria-label], ' +
      "del[aria-label], " +
      '[role="emphasis"][aria-label], ' +
      "em[aria-label], " +
      '[role="insertion"][aria-label], ' +
      "ins[aria-label], " +
      '[role="paragraph"][aria-label], ' +
      "p[aria-label], " +
      '[role="presentation"][aria-label], ' +
      '[role="none"][aria-label], ' +
      '[role="strong"][aria-label], ' +
      "strong[aria-label], " +
      '[role="subscript"][aria-label], ' +
      "sub[aria-label], " +
      '[role="superscript"][aria-label], ' +
      "sup[aria-label], " +
      '[role="table"][aria-label], ' +
      "sub[aria-label]"
  ) as NodeListOf<HTMLElement>;

  for (const currentNode of nodes) {
    currentNode.setAttribute("data-name-permitted-aria", "role");
  }
}

ariaNameProhibited();
ariaNamePermitted();
