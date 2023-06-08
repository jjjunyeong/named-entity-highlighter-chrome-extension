if (!("browser" in window)) {
    window.browser = chrome;
}

function sendSearchMessage(tabs) {
    let targetString = localStorage.getItem('target');
    browser.tabs.sendMessage(tabs[0].id, { command: "toggle", target: targetString });
}
browser.commands.onCommand.addListener(function (command) {
    if (command === "command_toggleHighlightNow") {
        browser.tabs.query({ active: true, currentWindow: true }, sendSearchMessage);
    }
});


var serverhost = 'http://127.0.0.1:8000';
browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
               
        var url = serverhost + '/ner/get_named_entities/?url='+ encodeURIComponent(request.url) ;
            
        console.log(url);
            
        //var url = "http://127.0.0.1:8000/ner/get_named_entities/?url=https://en.wikipedia.org/wiki/Apple"	
        fetch(url)
        .then(response => response.json())
        .then(response => sendResponse({farewell: response}))
        .catch(error => console.log(error))
                
        return true;  // Will respond asynchronously.
          
});