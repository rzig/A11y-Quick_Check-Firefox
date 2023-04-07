function checkSvgDecorative() {
    const svgElements = document.querySelectorAll("svg");
    const decorativeSvgClass = "svg--decorative-8892664";
    const decorativeSvgWithNameClass = "svg--decorative-with-name-8892664";
    const notNamedDecorativeClass = "svg--nodecorative-noname-8892664";

    for (let i = 0; i < svgElements.length; i++) {
        const ariaHidden = svgElements[i].getAttribute("aria-hidden");
        const role = svgElements[i].getAttribute("role");
        const ariaLabel = svgElements[i].getAttribute("aria-label");
        const accessibleNameMissing = !ariaLabel || ariaLabel.trim() === "";
        const accessibleNamePresent = ariaLabel && ariaLabel.trim() !== "";

        if (ariaHidden === "true") {
            if (accessibleNameMissing) {
                const message = "This SVG is marked as decorative with 'aria-hidden'";
                createMessageDiv(svgElements[i], decorativeSvgClass, message);
            } else if (accessibleNamePresent) {
                const message = "This SVG has an accessible name but is marked as decorative with 'aria-hidden'";
                createMessageDiv(svgElements[i], decorativeSvgWithNameClass, message);
            }
        } else if (ariaHidden !== "true" && (role !== "img" || accessibleNameMissing)) {
            let message;
            if (role === "img" && accessibleNameMissing) {
                message = "Warning: This SVG element has a role of 'img' but is missing an accessible name.";
            } else {
                message = "Warning: This SVG element is missing 'aria-hidden' or 'role img', and or an accessible name.";
            }
            createMessageDiv(svgElements[i], notNamedDecorativeClass, message);
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
            createMessageDiv(svgElements[k], roleWarningClass, message);
        }
    }
}

checkSvgDecorative();
checkSvgRole();