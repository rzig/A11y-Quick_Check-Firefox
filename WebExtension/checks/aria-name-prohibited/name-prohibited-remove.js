document.querySelectorAll("[data-name-prohibited-aria], [data-name-prohibited-html]").forEach(noName => {
    if(noName.hasAttribute("data-name-prohibited-aria")) {
        noName.removeAttribute("data-name-prohibited-aria")
    }
    if(noName.hasAttribute("data-name-prohibited-html")) {
        noName.removeAttribute("data-name-prohibited-html")
    }
});

undefined;