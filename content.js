console.log("run inside the script");

let paragraphs = document.getElementsByTagName('p');


for (elem of paragraphs) {
	// elem.style['color'] = 'red';
}

chrome.runtime.onMessage.addListener(messageReceiver);

function messageReceiver(req, sender, res) {

	function getElementByXpath(path) {
	  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		}

		let url = getElementByXpath("//*[@id=\"MainContent_TextBoxFrom\"]");
		url.value += "hello there"
		// console.log( getElementByXpath("//*[@id=\"MainContent_TextBoxFrom\"]").value );

		// let origin = comboboxelement 


	console.log(req.txt);
}



