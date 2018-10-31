
// cannot have a popup with an onclick event together
// in order for the method to work have to remove the popup.html from the browseraction
chrome.browserAction.onClicked.addListener(executor);

function executor (tab) {
	
	console.log(tab); // information about the tab in which the icon is clicked
	console.log("the url: ", tab.url); 



	// sends message to content.js
	let msg = {
		txt: "hello",
		url: "ebay uk"
	}
	// send message to the content.js of the tab with the corresponding id
	chrome.tabs.sendMessage(tab.id, msg)
}


chrome.runtime.onInstalled.addListener( function() {
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		console.log("The color is green")
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
	if (req.greeting === "hello there") {
		console.log(req.greeting)
		sendResponse({ message: "hello from background.js" })
	}
})

