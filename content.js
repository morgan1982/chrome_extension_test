// console.log("run inside the script");

// let sourceUrl = null; ?? gives error for double declaration

chrome.runtime.onMessage.addListener(messageReceiver);

function messageReceiver(request, sender, sendResponse) {


	let { target } = request;

	if ( target === "dropshie") {

		// url of the source page
		sourceUrl = request.url;
	}


// prepare the originMarketPlaceValue

// HAVE TO CHANGE THAT TO USE THE VALUES OF THE COMBOBOX

// let sources = [ "amazon.com", "amazon.co.uk", "ebay.com", "ebay.co.uk" ];

// function checker(sub) {
// 	let multChars = sub.split('.')
// 	multChars.map( partial => {
// 		if(sourceUrl.indexOf(partial) !== -1) {
// 			return multChars >= 1;
// 		}
// 	})
// }

// let origin = sources.filter( source => {
// 	return sourceUrl.indexOf(source) >= 1;
// } )

// console.log("the origin: ", origin);
// have to change the output string to the correct format


// HAVE TO MOVE TO ANOTHER FILE ***
const sourceArr = ["amazon com", "amazon uk", "ebay com", "ebay co uk"];


function forFilter (sub) {
  
  // to fetch the values of each element of the array
  let partial = sub.split(" ");

  const testPartial = partial.map( keyword => {


    // create the regex
    let flags = "i";

    re = new RegExp(keyword, flags);
    // matches the provided string for every keyword seperated by space
    return re.test(sourceUrl);
    
	  })

  // test if all values of the element are matched
  if (testPartial.every( el => el >= 1 ) ) {
  	return sub;
  }

  
}

// PREPARE THE ORIGIN
const originSrc = sourceArr.filter(forFilter);
console.log("originMarkerplace: ", originSrc[0]);

const originMarkerplace = originSrc[0];






// INJECT VALUES TO THE FORM

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



