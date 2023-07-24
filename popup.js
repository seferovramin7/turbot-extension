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





// Function to update the input field's placeholder
function updatePlaceholder(userID) {
    const inputElement = document.getElementById("idInput");
    if (userID) {
        inputElement.placeholder = `${userID}`;
    } else {
        inputElement.placeholder = "İstifadəçi nömrəsi";
    }
}

chrome.storage.sync.get("userID", function (data) {
    const userID = data.userID;
    updatePlaceholder(userID);
});

