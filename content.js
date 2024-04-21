// some initialisation work - message listener
// (TODO)  the information is then passed back here where it inserts its div into the message box. 
chrome.runtime.onMessage.addListener(getProductname);

async function getProductname(_, sender, sendResponse) {
    var productNameElement = document.querySelector('#titleSection #productTitle');
    var productName = productNameElement ? productNameElement.innerText.trim() : "Product name not found on the webpage.";
    console.log(productName);
    sendResponse({ productName });
    return true; // Return true to indicate that sendResponse will be used asynchronously
}

// Call setInfoBox with dummy data for testing
setInfoBox({ glycaemicLoad: 37, glycaemicIndex: 0, sodiumPercent: 0, energyPercent: 0, recVals: { sodium: 0, energy: 0 } });

	// Create and insert a box with text after the title section if titleSection exists
	// quickSummary is to be calculated in fetch.js after it receives nutritional values from the database. 
	// The ternary relies on calculating the ratio of sodium:calories and determining if this ratio is high or not. 
	// This method penalises foods that have a high percentage by mass of sodium, but also products that are calorically poor in the sodium calculation.
	// This function is not currently called. It needs to be called.
	function setInfoBox(quickSummary) {
		var boxText = `This product has a <strong>glycaemic load</strong> of ${quickSummary.glycaemicLoad}. This may result in a <strong>high blood sugar spike</strong>. You have to run for <strong>24 minutes</strong> to burn off these calories.<br><br><em>Disclaimer:</em> We are not medical professionals. Please consult a doctor before making any dietary changes.`;
	
		var box = document.createElement('div');
		box.classList.add('info-box'); // Add the class to the box
	
		box.style.cssText = 'background-color: rgba(0,0,0,0); border-radius: 10px; padding: 10px; font-family: \'Roboto\', sans-serif; font-size: 16px; box-shadow: 0 4px 4px -4px black; border: 2px solid rgba(237, 237, 158, 0.8);';
	
		var image = document.createElement('img');
		image.src = 'https://github.com/vedoge/avocadobro/assets/95768353/bb228f66-8804-4c5d-b535-f2b2cbef08ab'; 
		image.style.cssText = 'width: 50px; height: 50px; margin-right: 10px; float: left;';
		box.appendChild(image);
	
		var paragraph = document.createElement('p');
		paragraph.innerHTML = boxText; // Use innerHTML to render HTML markup
		box.appendChild(paragraph);
		
		var titleSection = document.getElementById('titleSection');
		if (titleSection) {
			titleSection.appendChild(box);
		} else {
			console.error("Product container not found on the webpage.");
		}
	}
	// health risks/reccomendation based on glycemic index (simplified)
function interpretHealthRisks(glycemicIndex) {
  if (glycemicIndex >= 70) {
    return " This is high and may contribute to health issues if consumed regularly.";
  } else if (glycemicIndex >= 55 && glycemicIndex < 70) {
    return " This is moderate and should be consumed with caution.";
  } else {
    return " This is low and is safe for consumption.";
  }
}