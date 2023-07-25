var userId;


chrome.storage.sync.get("userID", function (result) {
    // The result is an object with the key-value pairs from the storage.
    // In this case, result.userId will give you the value of the "userId" key.
    userId = result.userID;

    // Now you can use the userId string as needed.
    console.log("User ID: " + userId);

    // Any code that requires the userId should be placed here or called from here.
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


// document.addEventListener('DOMContentLoaded', function () {
//     fetch('http://localhost:8080/list/search?chatId=' + userId)
//         .then(response => response.json())
//         .then(data => {
//             const carLinksDropdown = document.getElementById('searchLinksDropdown');
//             data.forEach(link => {
//                 const option = document.createElement('option');
//                 option.text = link;
//                 carLinksDropdown.appendChild(option);
//             });
//             carLinksDropdown.addEventListener('change', function () {
//                 const selectedOption = carLinksDropdown.options[carLinksDropdown.selectedIndex];
//                 const url = selectedOption.value;
//                 if (url) {
//                     // Open the URL in a new tab/window
//                     window.open(url, '_blank');
//                 }
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching car links:', error);
//         });
// });

