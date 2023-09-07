document.addEventListener('DOMContentLoaded', function () {
    var idInput = document.getElementById('idInput');
    var saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', function () {
        var id = idInput.value;
        location.reload()
        chrome.storage.sync.set({'userID': id}, function () {
        });
    });
});


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


document.addEventListener("DOMContentLoaded", function () {
    var selectElement = document.querySelector('select[name="carLinksDropdown"]');
    selectElement.addEventListener("change", function (event) {
        var selectedCity = event.target.value;
        if (selectedCity !== "") {
            chrome.tabs.create({url: selectedCity});
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var selectElement = document.querySelector('select[name="searchLinksDropdown"]');
    selectElement.addEventListener("change", function (event) {
        var selectedCity = event.target.value;
        if (selectedCity !== "") {
            chrome.tabs.create({url: selectedCity});
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch(turboBackUrl + '/list/car?chatId=' + userId)
        .then(response => response.json())
        .then(data => {
            var selectElement = document.querySelector('select[name="carLinksDropdown"]');


            data.forEach(link => {
                const option = document.createElement('option');
                option.text = trimTextToMax15Characters(link);
                option.value = link;

                selectElement.appendChild(option);
            });
            selectElement.addEventListener('change', function () {
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                const url = selectedOption.value;
                if (url) {
                    window.open(url, '_blank');
                }
            });
        })
        .catch(error => {
            console.error('Error fetching car links:', error);
        });
});



document.addEventListener('DOMContentLoaded', function () {
    fetch(turboBackUrl + '/list/search?chatId=' + userId)
        .then(response => response.json())
        .then(data => {
            const selectElement = document.querySelector('select[name="searchLinksDropdown"]');


            data.forEach(link => {
                const option = document.createElement('option');
                option.text = trimTextToMax15Characters(link);
                option.value = link;

                selectElement.appendChild(option);
            });
            selectElement.addEventListener('change', function () {
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                const url = selectedOption.value;
                if (url) {
                    window.open(url, '_blank');
                }
            });
        })
        .catch(error => {
            console.error('Error fetching car links:', error);
        });
});

function trimTextToMax15Characters(text) {
    if (text.length > 30) {
        return text.slice(0, 30);
    } else {
        return text;
    }
}