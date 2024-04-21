// some initialisation work - message listener
// Refactoring- this is now a Chrome content script, which is tied to one tab. 
// The advantages of this are that the extension can operate on any n open tabs simultaneously without problems. 
// The disadvantages are the use of message-passing which is complex. 
// content scraper now listens for message from popup script
// It then bounces information back to the popup script, which fetches and processes the data from the API
// (TODO)  the information is then passed back here where it inserts its div into the message box. 
messageListener = chrome.runtime.onMessage.addListener (getProductName(msg,sender,sendResponse));
function getProductname(msg, sender, sendResponse) {
	//msg contains tab.id
	var productNameElement = document.querySelector('#titleSection #productTitle');
	var productName = productNameElement ? productNameElement.innerText.trim() : "Product name not found on the webpage.";
	// Reply to message if chrome.runtime exists
	next_reply = await sendResponse(productName: productName);
	setInfoBox(next_reply);
	return false;
}
	// Create and insert a box with text after the title section if titleSection exists
	// quickSummary is to be calculated in fetch.js after it receives nutritional values from the database. 
	// The ternary relies on calculating the ratio of sodium:calories and determining if this ratio is high or not. 
	// This method penalises foods that have a high percentage by mass of sodium, but also products that are calorically poor in the sodium calculation.
	// This function is not currently called. It needs to be called.
function setInfoBox(quickSummary) {
	var boxText = `This product has a glycaemic load of ${quickSummary.glycaemicLoad} and a glycaemic index of ${quickSummary.glycaemicIndex}. It is ${(quickSummary.sodiumPercent/quickSummary.energyPercent)/(quickSummary.recVals.sodium/quickSummary.recVals.energy)? "higher" : "lower"} in sodium content based on the sodium RDA.`;

	var box = document.createElement('div');
	box.style.cssText = 'background-color: rgba(255, 243, 235, 1); border-radius: 10px; padding: 10px; font-family: \'Roboto\', sans-serif; font-size: 16px; box-shadow: 0 4px 4px -4px black;';
	box.textContent = boxText;
	
	var titleSection = document.getElementById('titleSection');
	if (titleSection) {
	    titleSection.parentNode.insertBefore(box, titleSection.nextSibling);
	} else {
	    console.error("Title section not found on the webpage.");
	}
}

