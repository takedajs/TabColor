// タブを赤く見せるテーマ
const themes = {
    images: {
        theme_frame: '../tab_red.jpg',
    },
    colors: {
        accentcolor: '#D5D5D5',
        textcolor: 'black',
    }
};



const reset_themes = {
    images: {
        theme_frame: '',
    },
    colors: {
        accentcolor: '',
        textcolor: 'black',
    }
};

// タブが更新された時
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    url_match(tab);
});

// タブがアクティブになった時
browser.tabs.onActivated.addListener((activeInfo) => {
    // onActivatedはコールバックでtabの情報が取れないため、get()を利用してtab情報取得
    var active_tab = browser.tabs.get(activeInfo.tabId);
    active_tab.then((tab) => {
        url_match(tab);
    })
});

function url_match(tab) {
    var storage_keywords = [];
    browser.storage.local.get('value', function(items) {
        storage_keywords = items.value;
    });

    // コールバック関数より後に実行させる
    window.setTimeout(
        function(){
            // 現在見ているページが、登録したキーワードに一致するか確認
            var isMatch = false;
            for (var i = 0; i < storage_keywords.length; i++) {
                if (storage_keywords[i]) {
                    var regexp = new RegExp(storage_keywords[i], 'i');
                    isMatch = regexp.test(tab.url);
                    if (isMatch) {
                        break;
                    }
                }
            }
            if (isMatch) {
                browser.theme.update(themes);
            } else {
                //browser.theme.reset();はfirefox56から利用可能。
                browser.theme.update(reset_themes);
            }
        },
        300
    );
}