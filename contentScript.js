chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.events) {
    msg.events.forEach(event => {
      document.addEventListener(
        event,
        function (e) {
          if (e.detail && typeof e.detail === 'object') {
            chrome.runtime.sendMessage(
              JSON.stringify({
                key: event,
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
