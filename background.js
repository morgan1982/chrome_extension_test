

chrome.browserAction.onClicked.addListener(executor);


function executor (request, sender, sendResponse) {


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

}




chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
	console.log(req);
	if (req.greeting === "hello there") {
		console.log(req.greeting)
		sendResponse({ message: "hello from background.js" })
	}
})

