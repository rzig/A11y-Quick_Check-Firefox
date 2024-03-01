"use strict";

interface AccessibleNameResult {
    name: string;
    method: string;
    isLabelledByIdMissing: boolean;
}

interface AncestorCheckResult {
    element: Element;
    accessibleName?: string;
    isHidden?: boolean;
    role?: string;
}

function getAccessibleName(node: Element): AccessibleNameResult {
    let labelledby = node.getAttribute("aria-labelledby");
    let isLabelledByIdMissing = false;
    if (labelledby) {
        let names = labelledby.split(" ")
            .map(id => {
                const element = document.getElementById(id);
                if (!element) {
                    isLabelledByIdMissing = true;
                    return "";
                }
                return element.textContent?.trim() ?? "";
            })
            .filter(text => text.length > 0)
            .join(" ");
        if (names.length > 0) {
            return { name: names, method: "aria-labelledby", isLabelledByIdMissing };
        }
    }

    let label = node.getAttribute("aria-label");
    if (label) {
        return { name: label, method: "aria-label", isLabelledByIdMissing };
    }

    let titleElement = node.querySelector('title');
    if (titleElement && titleElement.textContent) {
        return { name: titleElement.textContent.trim(), method: "title", isLabelledByIdMissing };
    }

    return { name: "", method: "none", isLabelledByIdMissing };
}

// Function to check all ancestors for <a>, <button>, role="link", role="button" and aria-hidden="true"
function checkAncestors(element: Element): AncestorCheckResult | null {
    let currentElement = element;

    while (currentElement.parentElement) {
        currentElement = currentElement.parentElement;

        const tagName = currentElement.tagName.toLowerCase();
        const role = currentElement.getAttribute("role");

        if (
            tagName === "a" ||
            tagName === "button" ||
            role === "link" ||
            role === "button"
        ) {
            const accessibleName =
                currentElement.getAttribute("aria-label") ||
                currentElement.textContent || "";
            return {
                element: currentElement,
                accessibleName: accessibleName.trim(),
                isHidden: false
            };
        }

        if (role === "none" || role === "presentation") {
            return { element: currentElement, role: role };
        }

        if (currentElement.getAttribute("aria-hidden") === "true") {
            return { element: currentElement, isHidden: true };
        }
    }

    return null;
}

function checkSvgAccessibleNames() {
    const svgElements = document.querySelectorAll("svg");

    const showSvgTextClass = "valid-message-9927845";
    const notNamedDecorativeClass = "invalid-message-9927845";
    const imgRoleWithLabelClass = "warning-message-9927845";

    for (const svgElement of svgElements) {
        // Incorporate the ancestor check
        const ancestorCheck = checkAncestors(svgElement);
        if (ancestorCheck?.isHidden) {
            continue; // Skip SVGs with hidden ancestors
        }

        const role = svgElement.getAttribute("role");
        const hiddenElement = svgElement.getAttribute("aria-hidden");
        const { name, method, isLabelledByIdMissing } = getAccessibleName(svgElement);

        // Existing checks continue here
        if (name) {
            const nameMessage = `The SVG is named using ${method}: "${name}".`;
            createChildMessageDiv(svgElement, showSvgTextClass, nameMessage);
        }

        if (role !== "img" && method !== "none") {
            const roleWarning = "Warning: SVG element is missing 'role=img'.";
            createChildMessageDiv(svgElement, imgRoleWithLabelClass, roleWarning);
        }

        if (hiddenElement === "true") {
            continue; // Skip SVGs that are explicitly hidden
        }

        if (method === "none") {
            const missingNameMessage = "Warning: SVG element is missing an accessible name.";
            createChildMessageDiv(svgElement, notNamedDecorativeClass, missingNameMessage);
        }

        if (role === "img" && method === "none") {
            const roleImgWarning = "Warning: SVG element has 'role=img' but is missing an accessible name.";
            createChildMessageDiv(svgElement, notNamedDecorativeClass, roleImgWarning);
        }

        if (isLabelledByIdMissing) {
            const missingIdMessage = "Warning: SVG element uses 'aria-labelledby', but the ID referenced does not exist.";
            createChildMessageDiv(svgElement, notNamedDecorativeClass, missingIdMessage);
        }
    }
}

checkSvgAccessibleNames();