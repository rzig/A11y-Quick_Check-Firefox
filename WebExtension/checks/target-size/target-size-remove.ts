function removeTargetSize(targetSize: number) {
    // Remove the target size messages and their associated classes
    const messageDivs = document.querySelectorAll(`.target-size-${targetSize}-8228965`);
    messageDivs.forEach(div => {
        div.classList.remove(`target-sufficient-8228965`, `target-insufficient-8228965`);
        div.remove(); // Remove the message divs from the DOM
    });

    // Remove all circle shapes related to the target size
    const circleShapes = document.querySelectorAll(`.circle-shape-size-${targetSize}-8228965`);
    circleShapes.forEach(circleShape => {
        circleShape.remove(); // Remove the circle shapes from the DOM
    });

    // Remove the classes added to elements
    const targets = document.querySelectorAll(`.pos-rel-size-${targetSize}-8228965`);
    targets.forEach(elem => {
        elem.classList.remove(`small-target-${targetSize}-8228965`, `pos-rel-size-${targetSize}-8228965`);
        // Check for any other related classes remaining
        const remainingClasses = Array.from(elem.classList).filter(cls => /pos-rel-size-\d+-8228965/.test(cls));
        if (remainingClasses.length === 0) { // If no other related classes found
            elem.classList.remove(`pos-rel-8228965`); // Remove position related class
        }
    });

    // Remove the manual confirmation messages and classes for lists
    const manualConfMessages = document.querySelectorAll('.manual-confirmation-9927845');
    manualConfMessages.forEach(message => {
        message.remove(); // Remove the manual confirmation messages from the DOM
    });

    const listsWithMixedContent = document.querySelectorAll('.manual-9927845');
    listsWithMixedContent.forEach(list => {
        list.classList.remove('manual-9927845'); // Remove the manual confirmation class from lists
    });

    // Remove the show/hide button if it exists
    const toggleButton = document.getElementById('rmb-8228965');
    if (toggleButton) {
        toggleButton.remove(); // Remove the toggle messages button from the DOM
    }
}