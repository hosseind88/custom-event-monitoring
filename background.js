let source;
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
  source.postMessage(msg);
  sendResponse("Gotcha!");
});

addEventListener('message', event => {
  console.log('aaaaaa', event)
  source = event.source;
});
