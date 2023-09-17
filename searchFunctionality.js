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

let averagePriceText = '';


const secondaryWhiteBackDiv = document.createElement('div');
secondaryWhiteBackDiv.className = 'secondary-white-back';


if (window.location.href.includes('?q')) {
    mainTurboContainer.appendChild(mainWhiteBackDiv);
    mainTurboContainer.appendChild(secondaryWhiteBackDiv);

    function convertToAZN(price, currency) {
        switch (currency) {
            case "€":
                return price * 1.82;
            case "$":
                return price * 1.70;
            default:
                return price;
        }
    }

// Extract product prices and currencies
    const productPrices = [];
    const productPriceElements = document.querySelectorAll('.products .product-price');

    productPriceElements.forEach((element) => {
        const price = parseFloat(element.textContent.trim().replace(/\s+/g, '').replace(',', '.'));
        const currency = element.querySelector('span').textContent.trim();
        const priceInAZN = convertToAZN(price, currency);
        productPrices.push(priceInAZN);
    });

// Calculate the average price in AZN
    const totalPriceInAZN = productPrices.reduce((acc, curr) => acc + curr, 0);
    const averagePriceInAZN = totalPriceInAZN / productPrices.length;

// Convert average price to EUR and USD
    const averagePriceInEUR = averagePriceInAZN / 1.82;
    const averagePriceInUSD = averagePriceInAZN / 1.70;

    averagePriceText = `Ortalama qiymət : 
    <br> ${averagePriceInAZN.toFixed(0)} ₼     
    <br> ${averagePriceInEUR.toFixed(0)} € 
    <br> ${averagePriceInUSD.toFixed(0)} $`;
}

const averagePriceDiv = document.createElement('div');
averagePriceDiv.className = 'average-price-div';
averagePriceDiv.innerHTML = averagePriceText;


var isSaveButtonClicked = false;

const saveButton = document.createElement('button');
saveButton.className = 'save-button';
saveButton.textContent = 'Axtarışı başlat';
saveButton.addEventListener('click', saveSearchToServer);


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
    mainWhiteBackDiv.appendChild(saveButton);
    mainWhiteBackDiv.appendChild(deleteButton);
}
if (secondaryWhiteBackDiv) {
    secondaryWhiteBackDiv.appendChild(averagePriceDiv);
}
