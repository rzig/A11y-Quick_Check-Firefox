// Function to check for a decorative SVG image
function checkDecorative(svg) {
  const ariaHidden = svg.getAttribute("aria-hidden");
  if (ariaHidden === "true") {
    svg.insertAdjacentHTML(
      "afterend",
      '<div class="decorative-image-8228965">This SVG is decorative</div>'
    );
  }
}

// Function to check for an accessible name and role on SVG elements
function checkAccessibleNameAndRole(svg) {
  const ariaHidden = svg.getAttribute("aria-hidden");
  const ariaLabel = svg.getAttribute("aria-label");
  const ariaLabelledby = svg.getAttribute("aria-labelledby");
  const title = svg.getAttribute("title");
  const role = svg.getAttribute("role");
  const titleElement = svg.querySelector("title");

  // Check for a decorative image
  if (ariaHidden === "true") {
    return;
  }

  // Check for an accessible name
  if (!ariaLabel && !ariaLabelledby && !title && !titleElement) {
    if (!role || role === "presentation" || role === "none") {
      svg.insertAdjacentHTML(
        "afterend",
        '<div class="no-accessible-name-img-role-8228965">Add role="img" and an accessible name using aria-label for a meaningful image, OR aria-hidden="true" to make the image decoration.</div>'
      );
    } else if (role !== "img") {
      svg.insertAdjacentHTML(
        "afterend",
        `<div class="no-accessible-name-non-img-role-8228965">Replace existing Role ${role} with role="img" and an accessible name using aria-label.</div>`
      );
    }
  } else if (ariaLabel || ariaLabelledby || title || titleElement) {
    // Check for role=img
    if (!role || role === "presentation" || role === "none") {
      svg.insertAdjacentHTML(
        "afterend",
        '<div class="accessible-name-img-role-8228965">This SVG has an accessible name, but is missing the required role "img"</div>'
      );
    } else if (role !== "img") {
      svg.insertAdjacentHTML(
        `<div class="accessible-name-non-img-role-8228965">This SVG has an accessible name, but the Role is set to ${role}. Change to use Role img.</div>`
      );
    } else {
      // If the SVG element has an accessible name and a valid role "img", add a div with a message "Meaningful image with name X"
      const name = ariaLabel || ariaLabelledby || title || titleElement.textContent;
      svg.insertAdjacentHTML(
        "afterend",
        `<div class="meaningful-image-889453">The accName for this SVG is <strong>${name}</strong></div>`
      );
    }
  }
}

// Select all SVG elements
document.querySelectorAll("svg")

// Loop through each SVG element and check for accessibility issues
  .forEach(svgElement => {
  checkDecorative(svgElement);
  checkAccessibleNameAndRole(svgElement);
});
