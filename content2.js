console.log("inside amazon");


function messageReceiver (request, sender, sendResponse) {

	console.log("ok");
	console.log(request.url);
	if (request.message === "hello from background.js") {
		console.log("ok")
	}
} 


chrome.runtime.onMessage.addListener(messageReceiver);
