

chrome.pageAction.onClicked.addListener(executor);


let urlExtensions = [
	'.com', '.co.uk', '.ca'
]

// have to map the url patern to the urls
// let urlPatern = 'https://www.'

let validUrls = [
	'https://www.ebay.com',
	'https://www.ebay.co.uk',
	'https://www.ebay.ca',
	'https://www.ebay.de'
]
// show page action on certain urls
function checkUrl(tabId, changeInfo, tab) {

	validUrls.map( url => {

		let regex = new RegExp(url + "/*");
		// have to escape the regex

		if (regex.test(tab.url)) {
			chrome.pageAction.show(tabId)
			}
	})

}

chrome.tabs.onUpdated.addListener(checkUrl);



function executor (request, sender, sendResponse) {


	let { url, title } = request;
	console.log(`testing the url ${ url }`);
	chrome.tabs.create({

		url: 'https://livetest.dropshie.com/App/AddInventory.aspx',
		active: true
	}, (tab) => {

		// execute the script after the tab is loaded
		chrome.tabs.executeScript(tab.id, { file: "content.js" }, () => {

			chrome.tabs.sendMessage(tab.id, {
				target: "dropshie",
				url,
				title
			})			
		})



	})

}




chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
	console.log(req);
	if (req.greeting === "hello there") {
		console.log(req.greeting)
		sendResponse({ message: "hello from background.js" })
	}
})

