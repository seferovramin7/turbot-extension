let userID;

function sendProductPriceToServer() {
    const productPriceDiv = document.querySelector('.product-price__i');

    if (productPriceDiv) {
        const productPrice = productPriceDiv.innerText.trim();
        const endpointUrl = 'http://localhost:8080/save?price=' + encodeURIComponent(productPrice) + '&id=' + userID;
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

// Create a button element
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

// Find a suitable location to append the button
const container = document.querySelector('.product-phones__btn');

// Check if the container element exists before appending the button
if (container) {
    container.appendChild(button);
} else {
    console.error('Container element not found.');
}






// Function to update the dropdown options with the retrieved car list
function updateDropdown(carList) {
    const dropdown = document.getElementById("carDropdown");

    // Clear existing options
    dropdown.innerHTML = "";

    // Add new options based on the retrieved car list
    carList.forEach(car => {
        const option = document.createElement("option");
        option.text = car;
        dropdown.add(option);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend service
    fetch('http://localhost:8080/list/car?chatId=508914176')
        .then(response => response.json())
        .then(data => {
            const carLinksDropdown = document.getElementById('carLinksDropdown');
            const carLabel = document.getElementById('carLabel');

            // Populate the dropdown with car links
            data.forEach(link => {
                const option = document.createElement('option');
                option.text = link;
                carLinksDropdown.appendChild(option);
            });
            if (data.length === 0) {
                // If empty, hide the label and select element
                carLabel.style.display = 'none';
                carLinksDropdown.style.display = 'none';
            } else {
                // If not empty, show the label and select element
                carLabel.style.display = 'block';
                carLinksDropdown.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching car links:', error);
        });
});