let source;
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  source.postMessage(msg);
});

addEventListener('message', event => {
  if (event.data.key === 'events') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { events: event.data.data });
    });
  }
  source = event.source;
});
