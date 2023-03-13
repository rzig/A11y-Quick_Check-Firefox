// Function to remove all added divs, classes, and text
function removeAll() {
  const decorativeImages = document.querySelectorAll(".decorative-image-8228965");
  decorativeImages.forEach(image => image.remove());

  const noAccessibleNameImgs = document.querySelectorAll(".no-accessible-name-img-role-8228965");
  noAccessibleNameImgs.forEach(img => img.remove());

  const noAccessibleNameNonImgs = document.querySelectorAll(".no-accessible-name-non-img-role-8228965");
  noAccessibleNameNonImgs.forEach(img => img.remove());

  const accessibleNameImgs = document.querySelectorAll(".accessible-name-img-role-8228965");
  accessibleNameImgs.forEach(img => img.remove());

  const accessibleNameNonImgs = document.querySelectorAll(".accessible-name-non-img-role-8228965");
  accessibleNameNonImgs.forEach(img => img.remove());

  const meaningfulImages = document.querySelectorAll(".meaningful-image-889453");
  meaningfulImages.forEach(img => img.remove());
}

// Call the function to remove all added divs, classes, and text
removeAll();
