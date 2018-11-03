console.log("inside amazon");


function messageReceiver (request, sender, sendResponse) {

	console.log(request.url);
	if (request.message === "hello from background.js") {
		console.log("fine")
	}
} 


chrome.runtime.onMessage.addListener(messageReceiver);
