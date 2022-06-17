chrome.devtools.panels.create('Custom Event Monitoring', null, './index.html', null);

var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
    alert('something')
});
