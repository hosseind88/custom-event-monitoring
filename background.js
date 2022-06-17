chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    alert("message received");
    console.log("background message received");
  });                 