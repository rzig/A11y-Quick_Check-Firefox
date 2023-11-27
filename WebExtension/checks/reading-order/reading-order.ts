"use strict";
interface Document { 
    originalCSS_38ff418: Array<{
        type: string, 
        href?: string,
        content?: string,
        parent: HTMLElement
    }>;
    originalElements_38ff418: Array<{
        element: HTMLElement,
        parent: HTMLElement
    }>;
}

if (document.originalCSS_38ff418 == null) {
    document.originalCSS_38ff418 = new Array<{
        type: string, 
        href?: string,
        content?: string,
        parent: HTMLElement
    }>();
}

if (document.originalElements_38ff418 == null) {
    document.originalElements_38ff418 = new Array<{
        element: HTMLElement,
        parent: HTMLElement
    }>();
}

// Function to save all CSS
function saveCSS() {
    // Save external CSS
    const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
    for (const linkTagElement of linkTags) {
        const linkTag=<HTMLLinkElement> linkTagElement;
        document.originalCSS_38ff418.push({
            type: 'link',
            href: linkTag.href,
            parent: linkTag.parentElement!
        });
    }

    // Save internal CSS
    const styleTags = document.getElementsByTagName('style');
    for (const styleTagElement of styleTags) {
        const styleTag=<HTMLStyleElement> styleTagElement;
        document.originalCSS_38ff418.push({
            type: 'style',
            content: styleTag.innerHTML,
            parent: styleTag.parentElement!
        });
    }
}

function removeCustomCSS() {
    // Remove all external stylesheets
    const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
    for (const linkTag of linkTags) {
        linkTag.parentElement!.removeChild(linkTag);
    }

    // Remove all internal styles
    const styleTags = document.getElementsByTagName('style');
    for (const styletag of styleTags) {
        styletag.parentElement!.removeChild(styletag);
    }
}

function saveElements() {
    const imgElements = document.querySelectorAll('img[alt=""][aria-hidden="true"], img[aria-hidden="true"] *, svg[aria-hidden="true"], svg[aria-hidden="true"] *, svg[role="presentation"], svg[role="none"]');
    for (const imgElement of imgElements) {
        const imgTag=<HTMLElement> imgElement;
        document.originalElements_38ff418.push({
            element: imgTag,
            parent: imgTag.parentElement!
        });
    }
}

function removeCustomElements() {
    for (const { element } of document.originalElements_38ff418) {
        if(element.parentElement) {
            element.parentElement.removeChild(element);
        } else {
            console.warn("Element with no parent was skipped.", element);
        }
    }
}

// Function to set max width on all images and SVGs
function setMaxWidthOnImagesAndSVG() {
    // Select all img and svg elements
    const imgAndSvgElements = document.querySelectorAll('img, svg');

    // Loop through the NodeList and set max-width on each element
    for (const imgAndSvgElement of imgAndSvgElements) {
        const imgAndSvgTag=<HTMLElement>imgAndSvgElement;
        imgAndSvgTag.style.maxWidth = '100px';
    }
}

function addHiddenClasses() {
    const bodyElements = document.body.querySelectorAll('*:not(meta):not(title):not(script):not(template)');
    for (const element of bodyElements) {
        const computedStyle = getComputedStyle(element);
        if (computedStyle.display === 'none') {
            element.classList.add('display-none-45865');
        }
        if (computedStyle.visibility === 'hidden') {
            element.classList.add('visibility-hidden-45865');
        }
        if (computedStyle.opacity === '0') {
            element.classList.add('opacity-zero-45865');
        }
    }
}

saveCSS();
saveElements();
removeCustomCSS();
removeCustomElements();
setMaxWidthOnImagesAndSVG();
addHiddenClasses();