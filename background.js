
const raw_domains = new Domains() // from the sourceUrls
raw_domains.format()
const validUrls = raw_domains.validUrls;


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
	if (req.message === "cannot find element") {
		console.log("testing the notification system");

		let notif = {
			type: "basic",
			iconUrl: chrome.extension.getURL('./assets/target.png'),
			title: "dropshie paste",
			message: "Couldn't add button",
			isClickable: true
		}
		chrome.notifications.create(notif)
	}
})

let updateCounter = 0;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let { message } = request;
	console.log("message: ", message);
	if ( message === "target") {
		chrome.webNavigation.onHistoryStateUpdated.addListener((obj) => {
			updateCounter++;
			console.log("the dom is updated: ", updateCounter, obj);
			chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
				chrome.tabs.sendMessage(tabs[0].id, { message: "domUpdated"}, res => {
					if (res) {
						console.log(`from updated dom ${res.message}`)
					}
				})
			})
		})
	}
})


