// console.log("inside dropshie");

chrome.runtime.onMessage.addListener(messageReceiver);


function messageReceiver(request, sender, sendResponse) {

	let { target } = request;

	if ( target === "dropshie") {

		// url of the source page
		sourceUrl = request.url;
		// console.log(`test the url ${ sourceUrl }`);
	}






// format the origin marketplace to set value to combobox
const sourceArr = [ "amazon com",
					"amazon uk",
					"ebay com",
					"ebay uk",
					"wallmart",
					"ebay com",
					"ebay ca",
					"ebay au",
					"target",
					"homedepot",
					"overstock",
					"amazon au",
					"costco com"];


// have to move a helper file ***
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
console.log(`origin shource ${ originSrc }`);
const originMarkerplace = originSrc[0];


// convert com to us
function convertToUs(src) {
	let ar = src.split(' ');
	console.log("the src", ar);


	if (ar[1] === 'com') {
		ar[1] = 'us'
		console.log('inside converter', ar)
		let new_str = ar.join(' ')
			return new_str
		}else {
			return ar.join(' ')
		}
}



let origin;
if (originMarkerplace.includes('com')) {

	origin = convertToUs(originMarkerplace);
	console.log('converted', origin);
} else {
	origin = originMarkerplace;
}



// INJECT VALUES TO THE DOM
function getElementByXpath(path) {

	// dont need to use that. use the id or something
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}

// product url
let productUrl = getElementByXpath("//*[@id=\"MainContent_TextBoxFrom\"]");
productUrl.value += sourceUrl;

// Origin MarketPlace
document.getElementById("MainContent_DropDownOriginMarketPlace").value = origin;


}

// execute after the form is filled
// click the add btn



