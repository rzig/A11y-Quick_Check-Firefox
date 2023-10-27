import { getTabId } from './helper.utils.js';

// Inserts cssFileName css file into the active tab
export async function insertCSS(cssFileName: string | Array<string>) {
    let argumentArray: Array<string>;
  
    if (cssFileName instanceof Array) {
      argumentArray = cssFileName;
    } else {
      argumentArray = [cssFileName];
    }
    try {
      await chrome.scripting.insertCSS({
        target: {
          tabId: await getTabId(),
          allFrames: true,
        },
        files: argumentArray,
      });
    } catch (err) {
      console.error(`failed to insert ${cssFileName} CSS: ${err}`);
    }
  }

// Removes cssFileName css file from the active tab
export async function removeCSS(cssFileName: string | Array<string>) {
    let argumentArray: Array<string>;
  
    if (cssFileName instanceof Array) {
      argumentArray = cssFileName;
    } else {
      argumentArray = [cssFileName];
    }
  
    try {
      await chrome.scripting.removeCSS({
        target: {
          tabId: await getTabId(),
          allFrames: true,
        },
        files: argumentArray,
      });
    } catch (err) {
      console.error(`failed to remove ${cssFileName} CSS: ${err}`);
    }
  }

  // Execute script in active tab. You can pass a string for one file, or an array for multiple
export async function executeScript(scriptFileName: string | Array<string>) {
  try {
    let argumentArray;
    if (scriptFileName instanceof Array) {
      argumentArray = scriptFileName;
    } else {
      argumentArray = [scriptFileName];
    }
    await chrome.scripting.executeScript({
      target: {
        tabId: await getTabId(),
        allFrames: true,
      },
      files: argumentArray,
    });
  } catch (err) {
    console.error(`failed to execute ${scriptFileName} script: ${err}`);
  }
}