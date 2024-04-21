chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === "getProductName") {
    var productNameElement = document.querySelector('#titleSection #productTitle');
    var productName = productNameElement ? productNameElement.innerText.trim() : "Product name not found on the webpage.";
    sendResponse({productName: productName});
  }
});

function setInfoBox(quickSummary) {
  var healthMessage = `This product has a glycemic load of ${quickSummary.glycemicLoad} and a glycemic index of ${quickSummary.glycemicIndex}.`;
  healthMessage += interpretHealthRisks(quickSummary.glycemicIndex);

  var box = document.createElement('div');
  box.style.cssText = 'background-color: rgba(255, 243, 235, 1); border-radius: 10px; padding: 10px; font-family: "Roboto", sans-serif; font-size: 16px; box-shadow: 0 4px 4px -4px black;';
  box.textContent = healthMessage;
  
  var titleSection = document.getElementById('titleSection');
  if (titleSection) {
    titleSection.parentNode.insertBefore(box, titleSection.nextSibling);
  } else {
    console.error("Title section not found on the webpage.");
  }
}

// health risks/reccomendation based on glycemic index (simplified
function interpretHealthRisks(glycemicIndex) {
  if (glycemicIndex >= 70) {
    return " This is high and may contribute to health issues if consumed regularly.";
  } else if (glycemicIndex >= 55 && glycemicIndex < 70) {
    return " This is moderate and should be consumed with caution.";
  } else {
    return " This is low and is safe for consumption.";
  }
}
