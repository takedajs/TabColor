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

        var cookieVal = { test : '' };
        cookieVal.test = test;

        browser.cookies.set({
            url: "https://www.google.co.jp/?gfe_rd=cr&ei=4gJcWZ-uHOqQ8QfSmIGQDA&gws_rd=ssl",
            name: "tabColor",
            value: "red"
        })

        // クッキー接続はできたが、取得はできなかった。
        // urlごとにクッキーを紐付ける必要があるっぽい
        var data = browser.cookies.get({
            url : "https://www.google.co.jp/?gfe_rd=cr&ei=4gJcWZ-uHOqQ8QfSmIGQDA&gws_rd=ssl",
            name: "tabColor"
        });

        alert(data.value);

        //alert(data.value);

        //var chosenBeast = e.target.textContent;
        //var chosenBeastURL = beastNameToURL(chosenBeast);

        browser.tabs.executeScript(null, {
            file: "/content_scripts/beastify.js"
        });

        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            alert(tabs[0]);
            browser.tabs.sendMessage(tabs[0].id, {beastURL: test});
        });
    } else if (e.target.classList.contains("clear")) {
        browser.tabs.reload();
        window.close();

        return;
    }
});
