document.addEventListener('DOMContentLoaded', function() {
    var idInput = document.getElementById('idInput');
    var saveButton = document.getElementById('saveButton');
  
    saveButton.addEventListener('click', function() {
      var id = idInput.value;
        location.reload()
        chrome.storage.sync.set({ 'userID': id }, function() {
      });
    });
  });
  