chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.events) {
    msg.events.forEach(eventName => {
      document.addEventListener(
        eventName,
        function (e) {
          if (e.detail && typeof e.detail === 'object') {
            chrome.runtime.sendMessage(
              JSON.stringify({
                eventName,
                data: e.detail
              })
            );
          }
        },
        false
      );
    });
  }
  return true;
});
