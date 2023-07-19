var userID;

chrome.storage.sync.get(['userID'], function(result) {
      userID = result.userID;
    if (userID) {
      var div = document.createElement('div');
      div.innerText = 'ID Number: ' + userID;
      div.style.position = 'fixed';
      div.style.bottom = '10px';
      div.style.right = '10px';
      div.style.background = '#000000';
      div.style.color = 'rgb(255,255,255)'
      div.style.padding = '5px';
      div.style.border = '1px solid #ddd';
      div.style.borderRadius = '4px';
      document.body.appendChild(div);
    }
  });

// content.js

function sendProductPriceToServer() {
    // Find the product-price div
    const productPriceDiv = document.querySelector('.product-price__i');

    if (productPriceDiv) {
        // Extract the product price
        const productPrice = productPriceDiv.innerText.trim();

        // Construct the URL with the productPrice parameter
        const endpointUrl = 'http://localhost:8080/save?price=' + encodeURIComponent(productPrice) +'&id=' + userID;

        // Make a fetch request
        fetch(endpointUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                // Handle the response data as needed
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle any errors
            });
    }
}

// Create a button element
const button = document.createElement('button');
button.textContent = 'Send Product Price to Server';
button.addEventListener('click', sendProductPriceToServer);

// Apply styles to the button
button.style.display = 'inline-block';
button.style.width = '150px';
button.style.height = '40px';
button.style.backgroundColor = 'red'; // Update background color to red
button.style.color = 'white';
button.style.position = 'fixed'; // Position the button on top of all layers
button.style.top = '50%'; // Position it at 50% from the top
button.style.left = '50%'; // Position it at 50% from the left
button.style.transform = 'translate(-50%, -50%)'; // Center the button horizontally and vertically
button.style.zIndex = '9999'; // Set a high z-index to ensure it's on top
button.style.border = 'none'; // Remove the border
button.style.borderRadius = '5px'; // Add border radius for a modern look



// Find a suitable location to append the button
const container = document.querySelector('.header__nav'); // Replace '.container' with the appropriate selector

// Check if the container element exists before appending the button
if (container) {
    container.appendChild(button);
} else {
    console.error('Container element not found.');
}
