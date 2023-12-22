function removeTargetSize(targetSize: number) {
    // Remove the target size messages and their associated classes
    const messageDivs = document.querySelectorAll(`.target-size-${targetSize}-8228965`);
    for (const div of messageDivs) {
        div.classList.remove(`target-sufficient-8228965`, `target-insufficient-8228965`);
        div.remove();
    }

    // Remove all circle shapes related to the target size
    const circleShapes = document.querySelectorAll(`.circle-shape-size-${targetSize}-8228965`);
    for (const circleShape of circleShapes) {
        circleShape.remove();
    }

    // Remove the small target classes from elements
    const targets = document.querySelectorAll(`.small-target-${targetSize}-8228965`);
    for (const elem of targets) {
        elem.classList.remove(`small-target-${targetSize}-8228965`, `pos-rel-size-${targetSize}-8228965`);

        // Check if there are any other related classes remaining
        let additionalRelsFound = false;
        for (const cssClass of elem.classList) {
            additionalRelsFound = additionalRelsFound || /pos-rel-size-[0-9]+-8228965/.test(cssClass);
        }

        // Remove the pos-rel class if no more related classes are found
        if (!additionalRelsFound) {
            elem.classList.remove(`pos-rel-8228965`);
        }
    }

    // Remove the show/hide button
    const toggleButton = document.getElementById('rmb-8228965');
    if (toggleButton) {
        toggleButton.remove();
    }
}
