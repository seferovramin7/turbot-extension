// Function to check if the URL contains the "q[make]" query parameter
function hasQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('q[make]');
}

function handleButtonClick() {
    const urlParams = new URLSearchParams(window.location.search);

    if (hasQueryParam()) {
        const makeParamValue = urlParams.get('q[make]');
        // Redirect to the provided URL
        window.location.href = makeParamValue;
    } else {
        alert("No 'q[make]' query parameter found in the URL.");
    }
}

// Create the button element
const myButton = document.createElement('button');
myButton.textContent = 'Click Me!';

// Add event listener to the button
myButton.addEventListener('click', handleButtonClick);
document.querySelector('.telegram-link').appendChild(myButton);
