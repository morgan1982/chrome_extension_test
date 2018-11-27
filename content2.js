console.log("inside amazon");

let title = document.getElementById('title');
console.log(title);


function messageReceiver (request, sender, sendResponse) {

	console.log(request.url);
	if (request.message === "hello from background.js") {
		console.log("fine")
	}
}


chrome.runtime.onMessage.addListener(messageReceiver);
