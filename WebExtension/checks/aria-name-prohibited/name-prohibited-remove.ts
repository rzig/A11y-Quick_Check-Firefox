"use strict";

function removedataNameProhibited() {
    const targets = document.querySelectorAll("[data-name-prohibited-aria], [data-name-prohibited-html]")
    for (const noName of targets) {
        if (noName.hasAttribute("data-name-prohibited-aria")) {
            noName.removeAttribute("data-name-prohibited-aria")
        }
        if (noName.hasAttribute("data-name-prohibited-html")) {
            noName.removeAttribute("data-name-prohibited-html")
        }
    }
}
removedataNameProhibited()