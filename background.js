

chrome.browserAction.onClicked.addListener(executor);

function executor (request, sender, sendResponse) {

	console.log(chrome.tabs);

	let { url, title } = request;

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


	// send the message to the content to dropshie

	// sendResponse({
	// 	url,
	// 	title 
	// })
}

// function executor (tab) {
	
// 	// console.log(tab); // information about the tab in which the icon is clicked
// 	// console.log("the url: ", tab.url); // the url of the page



// 	// sends message to content.js
// 	let msg = {
// 		product: "​​https://www.amazon.co.uk/gp/product/B074C9TGFT",
// 		url: "ebay uk",
// 		template: "7c2f802d-05c0-4a29-8cc4-2f0492106dae"
// 	}
// 	// send message to the content.js of the tab with the corresponding id
// 	chrome.tabs.sendMessage(tab.id, msg)
// }


chrome.runtime.onInstalled.addListener( function() {
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		// console.log("The color is green")
	});





// the declarativeContent api allows to show the page action depending on the url or the page
// 	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
// 		chrome.declarativeContent.onPageChanged.addRules([
// 				{
// 					conditions: [ new chrome.declarativeContent.PageStateMatcher({
// 							pageUrl: { hostEquals: 'developer.chrome.com' },
// 						}) 
// 					],
// 					// enables the icon to the user
// 					actions: [ new chrome.declarativeContent.ShowPageAction() ]
// 				}
// 			])
// 	})
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
	console.log(req);
	if (req.greeting === "hello there") {
		console.log(req.greeting)
		sendResponse({ message: "hello from background.js" })
	}
})

