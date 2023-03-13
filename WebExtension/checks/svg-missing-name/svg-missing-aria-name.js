svgElements3 = document.querySelectorAll("svg");
missingAL = document.createElement("div");
missingAL.classList.add("missing--ariaLabel");

for (let i = 0; i < svgElements3.length; i++) {
    //const svgText3 = svgElements3[i].hasAttribute('aria-hidden');
    const hiddenElement = svgElements[i].ariaHidden;
    const svgElement3 = missingAL.cloneNode(true);
    if (hiddenElement !== false) {
        svgElement3.innerHTML = "This SVG is decoration";
        svgElements3[i].after(svgElement3);
    }
}

undefined;