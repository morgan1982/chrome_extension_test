console.log("inside amazon");


// have to config the selectors for the other sources

// for amazon
let title = document.getElementById('title');

if (title) {
    title.className += title.className ? ' product_title' : 'product_title';
}
// title.style.display = 'flex';


// create the button
let btn = document.createElement('div');
btn.className = 'dropshie_btn';
// btn.style.marginLeft = '1.2em';
let btnText = document.createTextNode("add");
btn.appendChild(btnText);
title.appendChild(btn)



function messageReceiver (request, sender, sendResponse) {

	console.log(request.url);
	if (request.message === "hello from background.js") {
		console.log("fine")
	}
}


chrome.runtime.onMessage.addListener(messageReceiver);
