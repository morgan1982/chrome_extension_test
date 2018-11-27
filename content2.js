console.log("inside amazon");


// have to config the selectors for the other sources
// have to import domains from sourceUrls.js
// change the title element in response the url
// have to add a tooltip to the pageaction to isntruct the user

// amazon.com --- id = productTitle

// for amazon.co.uk
let title = document.getElementById('title');

if (title) {
    title.className += title.className ? ' product_title' : 'product_title';
}

// btn
let btn = document.createElement('div');
btn.className = 'dropshie_btn';
let btnText = document.createTextNode("add");
btn.appendChild(btnText);

title.appendChild(btn)

btn.addEventListener('click', () => {
    let url = window.location.href;
    console.log("add the product")
    console.log('the url', url);
    chrome.runtime.sendMessage({ message: "add", target: "dropshie", url })
})



function messageReceiver (request, sender, sendResponse) {

	console.log(request.url);
	if (request.message === "hello from background.js") {
		console.log("fine")
	}
}


chrome.runtime.onMessage.addListener(messageReceiver);
