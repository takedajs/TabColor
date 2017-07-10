
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("save")) {

        var keywords = document.getElementsByClassName("text");

        var array_keywords = [];
        for (var i = 0; i < keywords.length; i++) {
            array_keywords.push(keywords[i].value);
        }

        browser.storage.local.set({'value': array_keywords}, function() {
            //console.log("保存成功");
        });

        var storage_keywords = [];
        browser.storage.local.get('value', function(items) {
            storage_keywords = items.value;
        });

        console.log(storage_keywords);

        browser.tabs.executeScript(null, {
            file: "/content_scripts/beastify.js"
        });

        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            console.log(tabs[0].url);
            console.log(storage_keywords);

            var tab_url = tabs[0].url;

            // 現在見ているページが、登録したキーワードに一致するか確認
            var isMatch = false;
            for (var i = 0; i < storage_keywords.length; i++) {
                var regexp = new RegExp(storage_keywords[i], 'i');
                isMatch = regexp.test(tab_url);
                if (isMatch) {
                    break;
                }
            }

            browser.tabs.sendMessage(tabs[0].id, {test: "aa"});
        });
    } else if (e.target.classList.contains("clear")) {
        browser.tabs.reload();
        window.close();

        return;
    }
});
