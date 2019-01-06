// chrome.pageAction.onClicked.addListener(tabCreator);

const raw_domains = new Domains() // from the sourceUrls
raw_domains.format()
const validUrls = raw_domains.validUrls;


// show page action on certain urls
function checkUrl(tabId, changeInfo, tab) {

	// 	"page_action": {
	// 	"default_title": "some options",
	// 	"default_icon": {
	// 		"16": "/assets/icon16.png",
	// 		"48": "/assets/icon48.png",
	// 		"128": "/assets/icon128.png"
	// 	}
	// }


	validUrls.map( url => {

		let regex = new RegExp(url + "/*");

		if (regex.test(tab.url)) {
			chrome.pageAction.show(tabId)
			}
	})

}

// chrome.tabs.onUpdated.addListener(checkUrl);




function tabCreator (request, sender, sendResponse) {


	let { url, title } = request;

	chrome.tabs.create({

		url: 'https://livetest.dropshie.com/App/AddInventory.aspx',
		active: true // sets the tab to be active
	}, (tab) => {

		// execute the script after the tab is loaded
		chrome.tabs.executeScript(tab.id, { file: "targetDropshie.js" }, () => {

			chrome.tabs.sendMessage(tab.id, {
				target: "dropshie",
				url,
				title
			})
		})



	})

}




chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {

	let { url, target } = req;

	// console.log(`the url ${ url } the target: ${ target }`);

	if (req.message === "add") {
		// create the tab
		tabCreator(req, sender, sendResponse);
		sendResponse({ message: "product added" })
	}
})

