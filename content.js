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

const button = document.createElement('button');
button.textContent = 'Avtomobili izləməyə al';
button.addEventListener('click', sendProductPriceToServer);

button.style.display = 'inline-block';
button.style.width = '300px';
button.style.height = '40px';
button.style.backgroundColor = 'red'; // Update background color to red
button.style.color = 'white';
button.style.position = 'fixed'; // Position the button on top of all layers
button.style.zIndex = '9999'; // Set a high z-index to ensure it's on top
button.style.border = 'none'; // Remove the border
button.style.borderRadius = '5px'; // Add border radius for a modern look
button.style.cursor = 'pointer';
button.style.fontFamily = 'Arial, sans-serif';
button.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.2)';
button.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
button.style.top = '10px'; // Align the button 10px from the top
button.style.right = '10px';
button.style.transition = 'background-color 0.3s ease';
button.addEventListener('mouseover', function () {
    button.style.backgroundColor = 'darkred';
});
button.addEventListener('mouseout', function () {
    button.style.backgroundColor = 'red';
});
const container = document.querySelector('.product-phones__btn');
if (container) {
    container.appendChild(button);
} else {
    console.error('Container element not found.');
}

function updateDropdown(carList) {
    const dropdown = document.getElementById("carDropdown");
    dropdown.innerHTML = "";
    carList.forEach(car => {
        const option = document.createElement("option");
        option.text = car;
        dropdown.add(option);
    });
}
