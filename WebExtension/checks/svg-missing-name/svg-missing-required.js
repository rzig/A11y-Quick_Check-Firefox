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
svgElements4 = document.querySelectorAll("svg");
svgRoleImg = document.querySelectorAll('[role="img"]');
missingRQ = document.createElement("div");
missingRQ.classList.add("svg--missing-required");

for (let i = 0; i < svgElements4.length; i++) {
    const missingAH = svgElements4[i].hasAttribute('aria-hidden');
    const svgName = svgElements4[i].hasAttribute('aria-label');
    const svgElement4 = missingRQ.cloneNode(true);
    if (missingAH !== "true") {
        svgElement4.innerHTML = "This SVG is missing required ARIA";
        svgElements4[i].after(svgElement4);
    }
}

//missingAH !== true &&

undefined;