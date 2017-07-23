url_match();

function url_match() {
    var tab_url = location.href;

    var storage_keywords = [];
    browser.storage.local.get('value', function(items) {
        storage_keywords = items.value;
        console.log(storage_keywords);
    });

    // コールバック関数より後に実行させる
    window.setTimeout(
        function(){
            // 現在見ているページが、登録したキーワードに一致するか確認
            var isMatch = false;
            for (var i = 0; i < storage_keywords.length; i++) {
                if (storage_keywords[i]) {
                    var regexp = new RegExp(storage_keywords[i], 'i');
                    isMatch = regexp.test(tab_url);
                    if (isMatch) {
                        break;
                    }
                }
            }
            if (isMatch) {
                document.body.style.borderLeft = "solid 15px red";
            }
        },
        100
    );
}

