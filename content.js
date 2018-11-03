// console.log("inside dropshie");

chrome.runtime.onMessage.addListener(messageReceiver);


function messageReceiver(request, sender, sendResponse) {

	let { target } = request;

	if ( target === "dropshie") {

		// url of the source page
		sourceUrl = request.url;
		let { title } = request;
	}




// HAVE TO MOVE TO ANOTHER FILE ***


// format the origin marketplace to set value to combobox
const sourceArr = [ "amazon com", 
					"amazon uk", 
					"ebay com", 
					"ebay co uk", 
					"wallmart",
					"ebay us",
					"ebay ca",
					"ebay au",
					"target",
					"homedepot",
					"overstock",
					"amazon au",
					"costco us"];


function forFilter (sub) {
  
  // to fetch the values of each element of the array
  let partial = sub.split(" ");
  const testPartial = partial.map( keyword => {

		    // create the regex
		    let flags = "i";
		    re = new RegExp(keyword, flags);
		    // matches the provided string for every keyword on each element
		    return re.test(sourceUrl);
    
	  })

  // test if all values of the element are matched
  if (testPartial.every( el => el >= 1 ) ) {
  	return sub;
  }

  
}

// PREPARE THE ORIGIN
const originSrc = sourceArr.filter(forFilter);
const originMarkerplace = originSrc[0];






// INJECT VALUES TO THE DOM

function getElementByXpath(path) {

	// dont need to use that. use the id or something
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}

// product url 
let productUrl = getElementByXpath("//*[@id=\"MainContent_TextBoxFrom\"]");
productUrl.value += sourceUrl;

// Origin MarketPlace
document.getElementById("MainContent_DropDownOriginMarketPlace").value = originMarkerplace;

// Template
document.getElementById("MainContent_DropDownTemplate").value = request.template;



}



