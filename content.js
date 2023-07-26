var userId;
chrome.storage.sync.get("userID", function (result) {
    userId = result.userID;
});


function sendProductPriceToServer() {
    const productPriceDiv = document.querySelector('.product-price__i');

    if (productPriceDiv) {
        const productPrice = productPriceDiv.innerText.trim();
        const endpointUrl = 'http://localhost:8080/save?price=' + encodeURIComponent(productPrice) + '&id=' + userId;
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

const container = document.querySelector('.tz-container');
const backDiv = document.createElement('div');
backDiv.className = 'white-back';
backDiv.style.display = 'inline-block';
backDiv.style.width = '20%';
backDiv.style.height = '13%';
backDiv.style.backgroundColor = 'white'; // Update background color to red
backDiv.style.color = 'white';
backDiv.style.position = 'fixed'; // Position the button on top of all layers
backDiv.style.zIndex = '9998'; // Set a high z-index to ensure it's on top
backDiv.style.border = 'none'; // Remove the border
backDiv.style.borderRadius = '5px'; // Add border radius for a modern look
backDiv.style.cursor = 'pointer';
backDiv.style.fontFamily = 'Arial, sans-serif';
backDiv.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
backDiv.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
backDiv.style.top = '10px'; // Align the button 10px from the top
backDiv.style.right = '10px';
backDiv.style.transition = 'background-color 0.3s ease';
container.appendChild(backDiv);

const whiteContainer = document.querySelector('.white-back');


const button = document.createElement('button');
button.textContent = 'Avtomobili izləməyə al';
button.addEventListener('click', sendProductPriceToServer);

button.style.display = 'inline-block';
button.style.margin = '10px';
button.style.padding = '10px';

button.style.width = '300px';
button.style.height = '40px';
button.style.backgroundColor = 'red'; // Update background color to red
button.style.color = 'white';
button.style.position = 'center'; // Position the button on top of all layers
button.style.zIndex = '9999'; // Set a high z-index to ensure it's on top
button.style.border = 'none'; // Remove the border
button.style.borderRadius = '5px'; // Add border radius for a modern look
button.style.cursor = 'pointer';
button.style.fontFamily = 'Arial, sans-serif';
button.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
button.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
button.style.transition = 'background-color 0.3s ease';
button.addEventListener('mouseover', function () {
    button.style.backgroundColor = 'darkred';
});
button.addEventListener('mouseout', function () {
    button.style.backgroundColor = 'red';
});
if (whiteContainer) {
    whiteContainer.appendChild(button);
} else {
    console.error('Container element not found.');
}


const buttonSearch = document.createElement('button');
buttonSearch.textContent = 'Avtomobili izləmədən çıxar';
buttonSearch.addEventListener('click', sendProductPriceToServer);

buttonSearch.style.display = 'inline-block';
buttonSearch.style.margin = '10px';
buttonSearch.style.padding = '10px';
buttonSearch.style.width = '300px';
buttonSearch.style.height = '40px';
buttonSearch.style.backgroundColor = 'red'; // Update background color to red
buttonSearch.style.color = 'white';
buttonSearch.style.position = 'center'; // Position the button on top of all layers
buttonSearch.style.zIndex = '9999'; // Set a high z-index to ensure it's on top
buttonSearch.style.border = 'none'; // Remove the border
buttonSearch.style.borderRadius = '5px'; // Add border radius for a modern look
buttonSearch.style.cursor = 'pointer';
buttonSearch.style.fontFamily = 'Arial, sans-serif';
buttonSearch.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
buttonSearch.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
buttonSearch.style.transition = 'background-color 0.3s ease';
buttonSearch.addEventListener('mouseover', function () {
    buttonSearch.style.backgroundColor = 'darkred';
});
buttonSearch.addEventListener('mouseout', function () {
    buttonSearch.style.backgroundColor = 'red';
});
if (whiteContainer) {
    whiteContainer.appendChild(buttonSearch);
} else {
    console.error('Container element not found.');
}
