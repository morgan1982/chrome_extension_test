chrome.pageAction.onClicked.addListener(tabCreator);



// show page action on certain urls
function checkUrl(tabId, changeInfo, tab) {

	// validUrls are injected from sourceUrls.js
	validUrls.map( url => {

		let regex = new RegExp(url + "/*");
		// have to escape the regex

		if (regex.test(tab.url)) {
			chrome.pageAction.show(tabId)
			}
	})

}

chrome.tabs.onUpdated.addListener(checkUrl);




function tabCreator (request, sender, sendResponse) {


	let { url, title } = request;
	console.log(`testing the url ${ url }`);
	console.log(`the title: ${ title }`);
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

	console.log('the req from the page: ', req)
	let { url, target } = req;

	console.log(`the url ${ url } the target: ${ target }`);

	if (req.message === "add") {
		// create the tab
		tabCreator(req, sender, sendResponse);
		sendResponse({ message: "product added" })
	}
})

