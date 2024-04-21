/*
window.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        chrome.runtime.sendMessage({action: "getProductName"}, response => {
          if (response && response.productName) {
            document.getElementById('productContainer').textContent = `Product Name: ${response.productName}`;
          }
        });
      }
    });
  });
});
*/ 
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
  });

