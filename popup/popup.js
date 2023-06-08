(function () {

    if (!("browser" in window)) {
        window.browser = chrome;
    }

    //send message to contentScript for create highlight.
    function turnHightlightOn(tabs) {
        browser.tabs.sendMessage(tabs[0].id, { command: "on" });
    }
    //Set Eventhandler to 'Show' button.
    let onButton = document.querySelector("#buttonHighlightOn");
    onButton.addEventListener('click', (e) => {
        console.log('highlight on')
        browser.tabs.query({ active: true, currentWindow: true }, turnHightlightOn);
    });
    
    //send message to contentScript for remove highlight
    function turnHightlightOff(tabs) {
        browser.tabs.sendMessage(tabs[0].id, { command: "off" });
    }
    //Set Eventhandler to 'Clear' button.
    let clearButton = document.querySelector("#buttonHighlightOff");
    clearButton.addEventListener('click', (e) => {
        console.log('highlight off')
        browser.tabs.query({ active: true, currentWindow: true }, turnHightlightOff);
    });

})();




