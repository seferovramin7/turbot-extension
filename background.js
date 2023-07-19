chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(['userID'], function(result) {
        var userID = result.userID;
        if (userID) {
          var div = document.createElement('div');
          div.innerText = 'ID Number: ' + userID;
          div.style.position = 'fixed';
          div.style.bottom = '10px';
          div.style.right = '10px';
          div.style.background = '#f5f5f5';
          div.style.padding = '5px';
          div.style.border = '1px solid #ddd';
          div.style.borderRadius = '4px';
          document.body.appendChild(div);
        }
      });
      
  });
  