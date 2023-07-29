"use strict";

// Array to store original CSS, if it's not already declared
interface Document { 
    originalCSS_38ff418: Array<{
        type: string, 
        href?: string,
        content?: string,
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

// Function to remove all CSS
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

// Function to set max width on all images and SVGs
function setMaxWidthOnImagesAndSVG() {
    // Select all img and svg elements
    const imgAndSvgElements = document.querySelectorAll('img, svg');

    // Loop through the NodeList and set max-width on each element
    for (const imgAndSvgElement of imgAndSvgElements) {
        const imgAndSvgTag=<HTMLElement>imgAndSvgElement;
        imgAndSvgTag.style.maxWidth = '150px';
    }
}

// Save original CSS, remove it, then resize images and SVGs
saveCSS();
removeCustomCSS();
setMaxWidthOnImagesAndSVG();