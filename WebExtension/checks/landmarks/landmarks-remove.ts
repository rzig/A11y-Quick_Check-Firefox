"use strict";

(function removeLandmarkMessagesAndClasses() {
    // Define all message and added classes used by addLandmarkMessages function
    const messageClasses = [
        "invalid-message-9927845",
        "generic-message-9927845",
        "valid-message-9927845",
        "warning-message-9927845",
        "common-a11y-message-2edbc8ab" // Add here any other message container classes if used
    ];

    const addedElementClasses = [
        "invalid-9927845",
        "generic-9927845",
        "valid-9927845",
        "warning-9927845",
        // Include other classes as necessary based on script's behavior
    ];

    // Remove div elements or the elements themselves containing specific message classes
    messageClasses.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(element => {
            if (element.parentElement && element.parentElement.tagName === 'DIV') {
                element.parentElement.remove(); // Remove the parent div of the message
            } else {
                element.remove(); // Remove the message element itself if it's not in a div
            }
        });
    });

    // Remove specified classes from all elements that have these classes
    addedElementClasses.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(element => {
            element.classList.remove(className); // Remove the class from the element
        });
    });
})();