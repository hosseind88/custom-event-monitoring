document.addEventListener('aaa', function(e) {
  console.log("whoa", e)
  chrome.runtime.sendMessage({text: "hey"}, function(response) {
      console.log("Response: ", response);
  });

}, false);
  
  