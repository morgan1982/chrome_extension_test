const raw_domains = new Domains() // from the sourceUrls
raw_domains.format()
const validUrls = raw_domains.validUrls;


function tabCreator (request, sender, sendResponse) {


	let { url, title } = request;

	chrome.tabs.create({
		// switch between dev and production mode
		url: config.production,
		active: false // sets the tab to be active
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


	// REMOVE FOR NOW
	if (req.message === "add") {
		// create the tab
		tabCreator(req, sender, sendResponse);
		sendResponse({ message: "product added" })
	}
})


// fires when the injections needs to rerun 
function sendUpdatedMessage(tabs) {

	chrome.tabs.sendMessage(tabs[0].id, { message: "domUpdated"}, res => {
		if (res) {
			// console.log(`from updated dom ${res.message}`)
			// console.log("check the array", porductUrls);
		}
	})
}


// FOR PAGES WITH ASYNC SCRIPTS .....SERIOUSLY???
// the logic makes sure that the content script will run again in such cases
let updateCounter = 0;
let porductUrls = []; // newUrl1

chrome.webNavigation.onHistoryStateUpdated.addListener((obj) => {
	console.log("__history event fired")
		porductUrls.push(obj.url);
		updateCounter++;
		console.log("the dom is updated: ", updateCounter, obj.url);
		chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
			// console.log("inside the update event", obj.url)
			// only update if there is a new product
			if (porductUrls.length > 1) {
				if (porductUrls[porductUrls.length -2] !== [porductUrls.length -1]) {
					sendUpdatedMessage(tabs)
				}
				// cleans the array from the garbage keeps 3 elements max
				if (porductUrls.length > 3) {
					porductUrls.splice(0, porductUrls.length -2)
				}
			}else if (porductUrls.length <= 1){
				sendUpdatedMessage(tabs);
			}


		})
// apply filters here
}, {url: [ {hostContains : 'target'} ]})
// 5 element 

// chrome.webNavigation.onCommitted.addListener(function() {console.log("complete event")});
