// Find the product name
var productNameElement = document.querySelector('#titleSection #productTitle');
var productName = productNameElement ? productNameElement.innerText.trim() : "Product name not found on the webpage.";

// Send the product name to the popup if chrome.runtime exists
if (chrome.runtime) {
    chrome.runtime.sendMessage({ productName: productName });
}

console.log(productName)

// Create and insert a box with text after the title section if titleSection exists
var boxText = "Test";
var box = document.createElement('div');
box.style.cssText = 'background-color: rgba(255, 243, 235, 1); border-radius: 10px; padding: 10px; font-family: \'Roboto\', sans-serif; font-size: 16px; box-shadow: 0 4px 4px -4px black;';
box.textContent = boxText;

var titleSection = document.getElementById('titleSection');
if (titleSection) {
    titleSection.parentNode.insertBefore(box, titleSection.nextSibling);
} else {
    console.error("Title section not found on the webpage.");
}
