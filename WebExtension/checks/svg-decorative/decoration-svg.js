//svgElements3 = document.querySelectorAll("svg");
//missingAL = document.createElement("div");
//missingAL.classList.add("missing--ariaLabel");
//
//for (let i = 0; i < svgElements3.length; i++) {
//    const svgText3 = svgElements3[i].hasAttribute('aria-label');
//    const svgElement3 = missingAL.cloneNode(true);
//    if (svgText3 === false) {
//        svgElement3.innerHTML = "This SVG is missing an accName";
//        svgElements3[i].after(svgElement3);
//    }
//}
svgElements3 = document.querySelectorAll("svg");
missingAL = document.createElement("div");
missingAL.classList.add("hidden--svg");

for (let i = 0; i < svgElements3.length; i++) {
    const svgText3 = svgElements3[i].hasAttribute('aria-hidden');
    const svgElement3 = missingAL.cloneNode(true);
    if (svgText3 !== false) {
        svgElement3.innerHTML = "This SVG is decorative";
        svgElements3[i].after(svgElement3);
    }
}

undefined;