var productNameElement = document.querySelector('#titleSection #productTitle');
var productName = productNameElement ? productNameElement.innerText.trim() : "Product information not found on the webpage.";


if (chrome.runtime) {
    chrome.runtime.sendMessage({ productName: productName });
}

console.log(productName);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.productName) {
    var productContainer = document.getElementById('productContainer');
    if (productContainer) {
      productContainer.textContent = `Product Name: ${request.productName}`;
    }
  }
});
