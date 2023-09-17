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


if (window.location.href.includes('&q')) {
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
    let averagePriceInAZN = (totalPriceInAZN / productPrices.length).toFixed(0);

    let minimumPriceInAZN = Math.min(...productPrices);
    let maximumPriceInAZN = Math.max(...productPrices);

    let minimumPriceInEUR = (minimumPriceInAZN / 1.82).toFixed(0);
    let minimumPriceInUSD = (minimumPriceInAZN / 1.70).toFixed(0);

    let averagePriceInEUR = (averagePriceInAZN / 1.82).toFixed(0);
    let averagePriceInUSD = (averagePriceInAZN / 1.70).toFixed(0);

    let maximumPriceInEUR = (maximumPriceInAZN / 1.82).toFixed(0);
    let maximumPriceInUSD = (maximumPriceInAZN / 1.70).toFixed(0);

    headerText = `Cari səhifədəki maşınların qiyməti : `;


    minimumPriceInAZN = convertToFormattedNumber(minimumPriceInAZN);
    minimumPriceInEUR = convertToFormattedNumber(minimumPriceInEUR);
    minimumPriceInUSD = convertToFormattedNumber(minimumPriceInUSD);

    averagePriceInAZN = convertToFormattedNumber(averagePriceInAZN);
    averagePriceInEUR = convertToFormattedNumber(averagePriceInEUR);
    averagePriceInUSD = convertToFormattedNumber(averagePriceInUSD);

    maximumPriceInAZN = convertToFormattedNumber(maximumPriceInAZN);
    maximumPriceInEUR = convertToFormattedNumber(maximumPriceInEUR);
    maximumPriceInUSD = convertToFormattedNumber(maximumPriceInUSD);

    minimumPriceText = `Minimum <br>
    <br> ${minimumPriceInAZN} ₼     
    <br> ${minimumPriceInEUR} € 
    <br> ${minimumPriceInUSD} $`;

    averagePriceText = `Ortalama <br>
    <br> ${averagePriceInAZN} ₼     
    <br> ${averagePriceInEUR} € 
    <br> ${averagePriceInUSD} $`;

    maximumPriceText = `Maksimum <br>
    <br> ${maximumPriceInAZN} ₼     
    <br> ${maximumPriceInEUR} € 
    <br> ${maximumPriceInUSD} $`;
}

const headerTextDiv = document.createElement('div');
headerTextDiv.className = 'header-text-div';
headerTextDiv.innerHTML = headerText;

const minimumPriceDiv = document.createElement('div');
minimumPriceDiv.className = 'average-price-div';
minimumPriceDiv.style.backgroundColor = '#FF3333';
minimumPriceDiv.innerHTML = minimumPriceText;

const averagePriceDiv = document.createElement('div');
averagePriceDiv.className = 'average-price-div';
averagePriceDiv.style.backgroundColor = '#FF0000';
averagePriceDiv.innerHTML = averagePriceText;

const maximumPriceDiv = document.createElement('div');
maximumPriceDiv.className = 'average-price-div';
maximumPriceDiv.style.backgroundColor = '#CC0000';
maximumPriceDiv.innerHTML = maximumPriceText;


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
deleteButton.className = 'delete-button';
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
    secondaryWhiteBackDiv.appendChild(headerTextDiv);
    secondaryWhiteBackDiv.appendChild(minimumPriceDiv);
    secondaryWhiteBackDiv.appendChild(averagePriceDiv);
    secondaryWhiteBackDiv.appendChild(maximumPriceDiv);

}

function convertToFormattedNumber(number) {
    if (number < 1000) {
        return number.toFixed(3);
    }
    const numberString = number.toString();
    const firstPart = numberString.slice(0, -3);
    const secondPart = numberString.slice(-3);
    return `${firstPart}.${(secondPart / 1000).toFixed(3).slice(2)}`;
}