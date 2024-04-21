//BROKEN FIXME 
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
  });
try {
	const messageListener = chrome.runtime.onMessage.addListener (
		(msg, sender, sendReply) => {
			sender.tab ? 
				name = msg.productName :
				throw "Not Implemented Yet";
			return true;
		}
	);
}
