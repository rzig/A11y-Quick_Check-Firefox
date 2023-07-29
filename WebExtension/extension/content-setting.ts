"use strict";

interface Document { 
    options_38ff418: Map<string, boolean>;
}

if (document.options_38ff418 == null) {
    document.options_38ff418 = new Map<string, boolean>();
}

chrome.runtime.onMessage.addListener((rawRequest: any, _sender: chrome.runtime.MessageSender, sendResponse: any) => {
    class InternalRequestContent {
        type: string="";
        setting?: string;
        value?: boolean;
        values?: Map<string, boolean>;
    }
    
    class InternalResponseContent {
        setting?: string;
        value?: boolean;
        values?: Array<any>;
    }
        
    // create a typed request object
    const request=new InternalRequestContent();
    if (Object.hasOwn(rawRequest, "type")) {
        request.type=rawRequest.type;
    }
    if (Object.hasOwn(rawRequest, "setting")) {
        request.setting=rawRequest.setting;
    }
    if (Object.hasOwn(rawRequest, "values")) {
        request.values=rawRequest.values.reduce((newMap: Map<string, boolean>, valuePair:Array<any>) =>   newMap.set(valuePair[0],valuePair[1]), new Map<string,boolean>);
    }
    if (Object.hasOwn(rawRequest, "value")) {
        request.value=rawRequest.value;
    }

    // The service worker wants to get a setting
    if (request.type==="getSetting") {
        const response = new InternalResponseContent();
        response.setting=request.setting!;
        if (!document.options_38ff418.has(request.setting!)) {
            response.value=false;
        }
        else {
            response.value=document.options_38ff418.get(request.setting!)!;
        }
        sendResponse(response);
        return;
    }
    if (request.type=== "getSettings") {
        const response = new InternalResponseContent();
        response.values=Array.from(document.options_38ff418.entries());
        sendResponse(response);
        return;
    }
    if (request.type=== "putSetting") {
        // Todo: Better checks for missing value
        document.options_38ff418.set(request.setting??"", request.value!);
        return;
    }
    if (request.type=== "putSettings") {
        // Todo: Better checks for missing value
        document.options_38ff418 = request.values!;
        return;
    }
});