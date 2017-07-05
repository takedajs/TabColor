/*
 Given the name of a beast, get the URL to the corresponding image.
 */
function beastNameToURL(beastName) {
    switch (beastName) {
        case "Frog":
            return browser.extension.getURL("beasts/frog.jpg");
        case "Snake":
            return browser.extension.getURL("beasts/snake.jpg");
        case "Turtle":
            return browser.extension.getURL("beasts/turtle.jpg");
    }
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("save")) {

        var test = document.getElementById("text").value;

        browser.storage.local.set({'value': "test"}, function() {
            console.log("成功");
        });

        browser.storage.local.get('value', function(items) {
            console.log(items.value);
        });

        browser.tabs.executeScript(null, {
            file: "/content_scripts/beastify.js"
        });

        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {beastURL: test});
        });
    } else if (e.target.classList.contains("clear")) {
        browser.tabs.reload();
        window.close();

        return;
    }
});
