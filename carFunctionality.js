let isCarSaved;


var metaTag = document.createElement('meta');


// Set the http-equiv attribute
metaTag.setAttribute('http-equiv', 'Content-Security-Policy');

// Set the content attribute
metaTag.setAttribute('content', 'upgrade-insecure-requests');

// Append the <meta> tag to the <head> element of the document
document.head.appendChild(metaTag);


var userId;
chrome.storage.sync.get("userID", function (result) {
    userId = result.userID;
});


const turboBackUrl = 'https://codengineers.dev';

var userID;

chrome.storage.sync.get(['userID'], function (result) {
    userID = result.userID;

    fetch(turboBackUrl + '/list/car?chatId=' + userID)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(urlList => {
            const urlExists = urlList.some(url => url === window.location.href);

            if (urlExists) {
                removeCarFromSearch.style.backgroundColor = 'red';
                addCarToSearch.style.backgroundColor = 'grey';
            } else {
                removeCarFromSearch.style.backgroundColor = 'grey';
                addCarToSearch.style.backgroundColor = 'red';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});


function saveCarToServer() {
    isCarSaved = true;
    const productPriceDiv = document.querySelector('.product-price__i');
    if (productPriceDiv) {
        const productPrice = productPriceDiv.innerText.trim();
        const endpointUrl = turboBackUrl + '/save/car?price='
            + encodeURIComponent(productPrice)
            + '&chatId='
            + userId + '&url='
            + window.location.href;
        fetch(endpointUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}


function deleteCarFromServer() {
    isCarSaved = false;
    const endpointUrl = turboBackUrl + '/delete/car?&chatId=' + userId + '&url=' + window.location.href;
    fetch(endpointUrl, {
        method: 'DELETE'
    })
}


const container = document.querySelector('.tz-container');
const backDiv = document.createElement('div');
backDiv.className = 'white-back';
backDiv.style.display = 'inline-block';
backDiv.style.width = '20%';
backDiv.style.height = '13%';
backDiv.style.backgroundColor = 'white'; // Update background color to red
backDiv.style.color = 'white';
backDiv.style.position = 'fixed';
backDiv.style.zIndex = '89999';
backDiv.style.border = 'none'; // Remove the border
backDiv.style.borderRadius = '5px'; // Add border radius for a modern look
backDiv.style.cursor = 'pointer';
backDiv.style.fontFamily = 'Arial, sans-serif';
backDiv.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
backDiv.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
backDiv.style.top = '10px'; // Align the button 10px from the top
backDiv.style.right = '10px';
backDiv.style.transition = 'background-color 0.3s ease';


console.log(document.querySelector('.product-description__content'))
if (document.querySelector('.product-description__content') != null) {
    container.appendChild(backDiv);
}

const whiteContainer = document.querySelector('.white-back');


const addCarToSearch = document.createElement('button');
let isAddCarToSearchClicked = false;

addCarToSearch.textContent = 'Avtomobili izləməyə al';
addCarToSearch.addEventListener('click', saveCarToServer);

addCarToSearch.style.display = 'inline-block';
addCarToSearch.style.margin = '10px';
addCarToSearch.style.padding = '10px';

addCarToSearch.style.width = '300px';
addCarToSearch.style.height = '40px';
addCarToSearch.style.backgroundColor = 'red'; // Update background color to red
addCarToSearch.style.color = 'white';
addCarToSearch.style.position = 'center'; // Position the button on top of all layers
addCarToSearch.style.zIndex = '89999'; // Set a high z-index to ensure it's on top
addCarToSearch.style.border = 'none'; // Remove the border
addCarToSearch.style.borderRadius = '5px'; // Add border radius for a modern look
addCarToSearch.style.cursor = 'pointer';
addCarToSearch.style.fontFamily = 'Arial, sans-serif';
addCarToSearch.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
addCarToSearch.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
addCarToSearch.style.transition = 'background-color 0.3s ease';
addCarToSearch.addEventListener('click', function () {
    isAddCarToSearchClicked = true;
    addCarToSearch.style.backgroundColor = 'grey';
    removeCarFromSearch.style.backgroundColor = 'red';
});

addCarToSearch.addEventListener('mouseenter', function () {
    if (!isAddCarToSearchClicked) {
        if (!isCarSaved) {
            addCarToSearch.style.backgroundColor = 'darkred'; // Darker red on hover
        }
    }
});

addCarToSearch.addEventListener('mouseleave', function () {
    if (!isAddCarToSearchClicked) {
        if (!isCarSaved) {
            addCarToSearch.style.backgroundColor = 'red';
        }
    }
});
if (whiteContainer) {
    whiteContainer.appendChild(addCarToSearch);
}


const removeCarFromSearch = document.createElement('button');
let isRemoveCarFromSearchClicked = false;

removeCarFromSearch.textContent = 'Avtomobili izləmədən çıxar';
removeCarFromSearch.addEventListener('click', deleteCarFromServer);

removeCarFromSearch.style.display = 'inline-block';
removeCarFromSearch.style.margin = '10px';
removeCarFromSearch.style.padding = '10px';
removeCarFromSearch.style.width = '300px';
removeCarFromSearch.style.height = '40px';
removeCarFromSearch.style.backgroundColor = 'red'; // Update background color to red
removeCarFromSearch.style.color = 'white';
removeCarFromSearch.style.position = 'center'; // Position the button on top of all layers
removeCarFromSearch.style.zIndex = '89999'; // Set a high z-index to ensure it's on top
removeCarFromSearch.style.border = 'none'; // Remove the border
removeCarFromSearch.style.borderRadius = '5px'; // Add border radius for a modern look
removeCarFromSearch.style.cursor = 'pointer';
removeCarFromSearch.style.fontFamily = 'Arial, sans-serif';
removeCarFromSearch.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
removeCarFromSearch.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
removeCarFromSearch.style.transition = 'background-color 0.3s ease';
removeCarFromSearch.addEventListener('click', function () {
    isRemoveCarFromSearchClicked = true;
    removeCarFromSearch.style.backgroundColor = 'grey';
    addCarToSearch.style.backgroundColor = 'red';

});

removeCarFromSearch.addEventListener('mouseenter', function () {
    if (!isRemoveCarFromSearchClicked) {
        if (isCarSaved) {
            removeCarFromSearch.style.backgroundColor = 'darkred'; // Darker red on hover
        }
    }
});

removeCarFromSearch.addEventListener('mouseleave', function () {
    if (!isRemoveCarFromSearchClicked) {
        if (isCarSaved) {
            removeCarFromSearch.style.backgroundColor = 'red';
        }
    }
});
if (whiteContainer) {
    whiteContainer.appendChild(removeCarFromSearch);
}
