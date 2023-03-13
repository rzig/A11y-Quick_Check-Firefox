svgElements = document.querySelectorAll("svg");
showSvgText = document.createElement("div");
showSvgText.classList.add("show-svg-name");

//imgRole = document.querySelectorAll("svg:not([role=img])");
//imgRole.forEach((img) => img.classList.add("ero"));

//imgRoleClass = document.querySelectorAll(".ero");
//imgRoleDiv = document.createElement("div");
//imgRoleDiv.classList.add("missing--imgRole");
//
//for (let i = 0; i < imgRoleClass.length; i++) {
//    const imgRoleName = imgRole[i].ariaLabel;
//    const hiddenSvg = imgRole[i].ariaHidden;
//    const RoleElement = imgRoleDiv.cloneNode(true);
//    if (imgRoleName !== "" && hiddenSvg !== "true") {
//        RoleElement.innerHTML = "[Warning] This SVG is missing an img role";
//    } else if (hiddenSvg !== "true") {
//        imgRoleDiv.classList.remove('missing--imgRole');
//    }
//    imgRoleClass[i].before(RoleElement);
//}
//
//for (let j = 0; j < imgRoleClass.length; j++) {
//    const hiddenSvg2 = imgRole[j].ariaHidden;
//    if (hiddenSvg2 !== "true") {
//        document.querySelectorAll(".missing--imgRole").forEach(noSvgName => noSvgName.remove());
//    }
//}


for (let k = 0; k < svgElements.length; k++) {
    const svgText = svgElements[k].ariaLabel;
    const hiddenElement = svgElements[k].ariaHidden;
    const svgElement = showSvgText.cloneNode(true);
    if (svgElements[k].hasAttribute("aria-label") && svgText !== "" && hiddenElement !== "true") {
        svgElement.innerHTML = "This SVG accName is: " + svgText;
        svgElements[k].after(svgElement);
    }
}

undefined;