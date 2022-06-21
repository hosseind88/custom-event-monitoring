const events = localStorage.getItem('custom-events');
if (events) {
  events.split(',').forEach(eventName => {
    document.addEventListener(
      eventName,
      function (e) {
        if (e.detail && typeof e.detail === 'object') {
          chrome.runtime.sendMessage(JSON.stringify({
            eventName,
            data: e.detail
          }));
        }
      },
      false
    );
  });
}
