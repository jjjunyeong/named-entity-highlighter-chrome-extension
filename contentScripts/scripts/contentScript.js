if (!("browser" in window)) {
    window.browser = chrome;
}

var IsHighlight = false;

//EventHandler when page loaded.
function initOnLoadCompleted(e) {
    url = window.location.href.toString()

    //add handler to event that receive message from popup page.
    browser.runtime.onMessage.addListener((message) => {
        console.log(message)
        switch (message.command) {

            case 'on':
                console.log('on')

                //send url to python server
                browser.runtime.sendMessage(
                    {url: url},
                    function(response) {
                        result = response.farewell;
                        
                        //alert success
                        alert(result.alert);

                        //highlight named entities in the page
                        Highlight(result.named_entity);
                    });

                IsHighlight = true;
                break;

            case 'off':
                console.log('off')

                //remove all highlights
                Highlight("");

                IsHighlight = false;
                break;

        }
    });


}
window.addEventListener("load", initOnLoadCompleted, false);
