function beastify(request, sender, sendResponse) {
    console.log("aaaa")
    browser.runtime.onMessage.removeListener(beastify);
}

/*
 Assign beastify() as a listener for messages from the extension.
 */
browser.runtime.onMessage.addListener(beastify);
