document.addEventListener('custom-event-devtools', function(e) {
  if (e.detail && typeof e.detail === 'object') {
    chrome.runtime.sendMessage(JSON.stringify(e.detail));
  }
}, false);