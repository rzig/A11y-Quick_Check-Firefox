"use strict";

function showDecorativeImages(): void {
    const imgElements = document.querySelectorAll("img");

    const ariaHiddenMessageClass = "neutral-message-9927845";
    const presentationRoleMessageClass = "neutral-message-9927845";
    const redundantRoleMessageClass = "neutral-message-9927845";
    const decorativeMessageClass = "neutral-message-9927845";

    for (const imgElement of imgElements) {
        const altText: string = imgElement.alt;
        const role: string | null = imgElement.getAttribute('role');
        const hasAltAttribute: boolean = imgElement.hasAttribute('alt');

        let ariaHidden: string | null = imgElement.getAttribute('aria-hidden');
        let ariaHiddenOnImg: boolean = ariaHidden === 'true';
        let ancestor: HTMLElement | null = imgElement.parentElement;

        // DOM traversal, checking all ancestors for 'aria-hidden'
        while (ancestor && ancestor.nodeName.toLowerCase() !== 'body') {
            ariaHidden = ancestor.getAttribute('aria-hidden');
            if (ariaHidden === 'true') break;
            ancestor = ancestor.parentElement;
        }

        const containerElement: HTMLElement = imgElement.parentElement!.nodeName.toLowerCase() === 'picture'
            ? imgElement.parentElement!
            : imgElement;

        if (ariaHidden === 'true') {
            const message: string = ariaHiddenOnImg 
            ? 'aria-hidden set to true used for decorative image. alt="" is the preferred method.'
            : 'aria-hidden set to true on an ancestor, this image is decorative.';
            createChildMessageDiv(containerElement, ariaHiddenMessageClass, message);
            continue;
        }

        if (role === 'presentation' || role === 'none') {
            const message: string = 'presentation role used for decorative image. alt="" is the preferred method.';
            createChildMessageDiv(containerElement, presentationRoleMessageClass, message);
        } else if (altText === '' && (role || ariaHiddenOnImg)) {
            const roleMessage: string = role ? `Role ${role}` : 'aria-hidden set to true';
            const message: string = `Decorative image. ${roleMessage} can be removed as it is redundant.`;
            createChildMessageDiv(containerElement, redundantRoleMessageClass, message);
        } else if (hasAltAttribute && altText === '' && !role && !ariaHidden) {
            const message: string = 'This image is decorative';
            createChildMessageDiv(containerElement, decorativeMessageClass, message);
        }
    }
}

function checkDecorativeElementParentOverflowHidden(): void {
    const elements = document.querySelectorAll('[data-a11y-wrapper-2edbc8ab]');

    for (const element of elements) {
        let parent: HTMLElement | null = element.parentElement;

        while (parent) {
            const style: CSSStyleDeclaration = getComputedStyle(parent);

            if (style.overflow === 'hidden') {
                element.classList.add('position-absolute-00898');
                break;
            }

            parent = parent.parentElement;
        }
    }
    if (elements.length === 0) {
        console.log('script run successfully');
    }
}

showDecorativeImages();
setTimeout(checkDecorativeElementParentOverflowHidden, 200);