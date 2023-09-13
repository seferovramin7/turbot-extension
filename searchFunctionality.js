let isSearchSaved;

chrome.storage.sync.get(['userID'], function (result) {
    userID = result.userID;


    fetch(turboBackUrl + '/list/search?chatId=' + userID)
        .then(searchResponse => {
            if (!searchResponse.ok) {
                throw new Error('Network response was not ok');
            } else {
            }
            return searchResponse.json();
        })
        .then(searchList => {
            const searchExists = searchList.some(url => url === window.location.href);
            if (searchExists) {
                saveButton.style.backgroundColor = 'grey';
                deleteButton.style.backgroundColor = 'red';
                isSearchSaved = true;
            } else {
                saveButton.style.backgroundColor = 'red';
                deleteButton.style.backgroundColor = 'grey';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

function saveSearchToServer() {
    isSearchSaved = true;
    const endpointUrl = turboBackUrl + '/save/search?chatId='
        + userId + '&url='
        + encodeURIComponent(window.location.href);
    fetch(endpointUrl)
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
        });
}


function deleteSearchFromServer() {
    isSearchSaved = false;
    const endpointUrl = turboBackUrl + '/delete/search?&chatId=' + userId + '&url=' + encodeURIComponent(window.location.href);
    fetch(endpointUrl, {
        method: 'DELETE'
    })
}


const mainTurboContainer = document.querySelector('.tz-container');
const mainWhiteBackDiv = document.createElement('div');
mainWhiteBackDiv.className = 'white-back';
mainWhiteBackDiv.style.display = 'inline-block';
mainWhiteBackDiv.style.width = '20%';
mainWhiteBackDiv.style.height = '13%';
mainWhiteBackDiv.style.backgroundColor = 'white'; // Update background color to red
mainWhiteBackDiv.style.color = 'white';
mainWhiteBackDiv.style.position = 'fixed'; // Position the buttonSearch on top of all layers
mainWhiteBackDiv.style.zIndex = '999999999'; // Set a high z-index to ensure it's on top
mainWhiteBackDiv.style.border = 'none'; // Remove the border
mainWhiteBackDiv.style.borderRadius = '5px'; // Add border radius for a modern look
mainWhiteBackDiv.style.cursor = 'pointer';
mainWhiteBackDiv.style.fontFamily = 'Arial, sans-serif';
mainWhiteBackDiv.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
mainWhiteBackDiv.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
mainWhiteBackDiv.style.top = '10px'; // Align the buttonSearch 10px from the top
mainWhiteBackDiv.style.right = '10px';
mainWhiteBackDiv.style.transition = 'background-color 0.3s ease';

if (window.location.href.includes('?q')) {
    mainTurboContainer.appendChild(mainWhiteBackDiv);
}


const saveButton = document.createElement('button');
var isSaveButtonClicked = false;

saveButton.textContent = 'Axtarışı başlat';
saveButton.addEventListener('click', saveSearchToServer);

saveButton.style.display = 'inline-block';
saveButton.style.margin = '10px';
saveButton.style.padding = '10px';

saveButton.style.width = '300px';
saveButton.style.height = '40px';
saveButton.style.backgroundColor = 'red'; // Update background color to red
saveButton.style.color = 'white';
saveButton.style.position = 'center'; // Position the buttonSearch on top of all layers
saveButton.style.zIndex = '999999999'; // Set a high z-index to ensure it's on top
saveButton.style.border = 'none'; // Remove the border
saveButton.style.borderRadius = '5px'; // Add border radius for a modern look
saveButton.style.cursor = 'pointer';
saveButton.style.fontFamily = 'Arial, sans-serif';
saveButton.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
saveButton.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
saveButton.style.transition = 'background-color 0.3s ease';

saveButton.addEventListener('click', function () {
    isSaveButtonClicked = true;
    saveButton.style.backgroundColor = 'grey';
    deleteButton.style.backgroundColor = 'red';
});

saveButton.addEventListener('mouseenter', function () {
    console.log(isSearchSaved)

    if (!isSaveButtonClicked) {
        if (!isSearchSaved) {
            saveButton.style.backgroundColor = 'darkred'; // Darker red on hover
        }
    }
});

saveButton.addEventListener('mouseleave', function () {
    console.log(isSearchSaved)

    if (!isSaveButtonClicked) {
        if (!isSearchSaved) {
            saveButton.style.backgroundColor = 'red';
        }
    }
});


if (mainWhiteBackDiv) {
    mainWhiteBackDiv.appendChild(saveButton);
}

const deleteButton = document.createElement('button');
var isDeleteButtonClicked = false;

deleteButton.textContent = 'Axtarışdan çıxar';
deleteButton.addEventListener('click', deleteSearchFromServer);
deleteButton.style.display = 'inline-block';
deleteButton.style.margin = '10px';
deleteButton.style.padding = '10px';
deleteButton.style.width = '300px';
deleteButton.style.height = '40px';
deleteButton.style.backgroundColor = 'red'; // Update background color to red
deleteButton.style.color = 'white';
deleteButton.style.position = 'center'; // Position the buttonSearch on top of all layers
deleteButton.style.zIndex = '999999999'; // Set a high z-index to ensure it's on top
deleteButton.style.border = 'none'; // Remove the border
deleteButton.style.borderRadius = '5px'; // Add border radius for a modern look
deleteButton.style.cursor = 'pointer';
deleteButton.style.fontFamily = 'Arial, sans-serif';
deleteButton.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
deleteButton.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
deleteButton.style.transition = 'background-color 0.3s ease';
deleteButton.addEventListener('click', function () {
    isDeleteButtonClicked = true;
    deleteButton.style.backgroundColor = 'grey';
    saveButton.style.backgroundColor = 'red';
});

deleteButton.addEventListener('mouseenter', function () {
    console.log(isSearchSaved)

    if (!isDeleteButtonClicked) {
        if (isSearchSaved) {
            deleteButton.style.backgroundColor = 'darkred';
        }
    }
});

deleteButton.addEventListener('mouseleave', function () {
    console.log(isSearchSaved)
    if (!isDeleteButtonClicked) {
        if (isSearchSaved) {
            deleteButton.style.backgroundColor = 'red';
        }
    }
});
if (mainWhiteBackDiv) {
    mainWhiteBackDiv.appendChild(deleteButton);
}
