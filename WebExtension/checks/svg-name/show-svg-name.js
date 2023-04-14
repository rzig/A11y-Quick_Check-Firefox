function checkSvgAccessibleNames() {
    const svgElements = document.querySelectorAll("svg");
    const showSvgTextClass = "svg--hasName-882726654";
    const notNamedDecorativeClass = "svg--nodecorative-noname-882726654";

    for (let k = 0; k < svgElements.length; k++) {
        const svgText = svgElements[k].getAttribute("aria-label");
        const hiddenElement = svgElements[k].getAttribute("aria-hidden");
        const role = svgElements[k].getAttribute("role");
        const accessibleNameMissing = !svgText || svgText.trim() === "";

        if (svgElements[k].hasAttribute("aria-label") && svgText !== "" && hiddenElement !== "true") {
            const message = "This SVG accName is: " + svgText;
            createMessageDiv(svgElements[k], showSvgTextClass, message);
        } else if (hiddenElement !== "true" && (role !== "img" || accessibleNameMissing)) {
            let message;
            if (role === "img" && accessibleNameMissing) {
                message = "Warning: This SVG element has a role of 'img' but is missing an accessible name.";
            } else {
                message = "Warning: This SVG element is missing 'aria-hidden' or 'role img', and or an accessible name.";
            }
            createMessageDiv(svgElements[k], notNamedDecorativeClass, message);
        }
    }
}



function checkSvgRole() {
    const svgElements = document.querySelectorAll("svg");
    const roleWarningClass = "non-imgRole-8228965";

    for (let k = 0; k < svgElements.length; k++) {
        const role = svgElements[k].getAttribute("role");

        if (role && role !== "img" && role !== "none" && role !== "presentation") {
            const message = `This SVG has an accessible name, but the Role is set to ${role}. Change to use Role img.`;
            const roleWarningDiv = createMessageDiv(roleWarningClass, message);
            svgElements[k].after(roleWarningDiv);
        }
    }
}

checkSvgAccessibleNames();
checkSvgRole();