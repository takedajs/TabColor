create_input();

/**
 * キーワードを登録するためのフォームを作成。
 */
function create_input(){
    var storage_keywords = [];
    browser.storage.local.get('value', function(items) {
        storage_keywords = items.value;

    });
    // コールバック関数より後に実行させる
    window.setTimeout(
        function(){
            // キーワード登録フォーム作成
            for (var i=0; i < 10; i++) {
                var input = document.createElement("input");
                input.setAttribute("type","text");
                input.setAttribute("class","text");
                // 登録されている要素がある場合
                if (storage_keywords != undefined) {
                    input.setAttribute("value", storage_keywords[i]);
                }
                document.getElementById("keywords").appendChild(input);
            }
        },
        300
    );
}

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("save")) {

        // ストレージ内のデータを削除
        browser.storage.local.remove("value");

        var keywords = document.getElementsByClassName("text");

        var array_keywords = [];
        for (var i = 0; i < keywords.length; i++) {
            array_keywords.push(keywords[i].value);
        }

        browser.storage.local.set({'value': array_keywords}, function() {});

        browser.tabs.reload();
        alert("Completion of registration");
    }
});