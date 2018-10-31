console.log("run inside the script");

let paragraphs = document.getElementsByTagName('p');


for (elem of paragraphs) {
	// elem.style['color'] = 'red';
}

chrome.runtime.onMessage.addListener(messageReceiver);

function messageReceiver(request, sender, sendResponse) {


	function getElementByXpath(path) {

	  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		}

		// product url 
		let url = getElementByXpath("//*[@id=\"MainContent_TextBoxFrom\"]");
		url.value += "hello there"

		// Origin MarketPlace
		document.getElementById("MainContent_DropDownOriginMarketPlace").value = `${ request.url }`


}



