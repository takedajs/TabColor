function beastify(request, sender, sendResponse) {
    alert("aaa");
    console.log(request.isMatch);
    if (request.isMatch) {
        console.log("成功");
    }
    browser.runtime.onMessage.removeListener(beastify);
}

/*
 Assign beastify() as a listener for messages from the extension.
 */
browser.runtime.onMessage.addListener(beastify);
