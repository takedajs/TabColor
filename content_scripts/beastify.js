/*
beastify():
* removes every node in the document.body,
* then inserts the chosen beast
* then removes itself as a listener
*/
function beastify(request, sender, sendResponse) {
  removeEverything();
  insertText(request.beastURL);
  browser.runtime.onMessage.removeListener(beastify);
}

/*
Remove every node under document.body
*/
function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

function insertText(text) {
    var beastImage = document.createElement("p");
    var text = document.createTextNode(text);
    beastImage.appendChild(text);
    document.body.appendChild(beastImage);
}

browser.runtime.onMessage.addListener(beastify);
