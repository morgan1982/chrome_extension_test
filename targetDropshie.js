console.log("inside dropshie");

chrome.runtime.onMessage.addListener(messageReceiver);
// let sourceUrl;

function messageReceiver(request, sender, sendResponse) {

	let { target } = request;

	if ( target === "dropshie") {

		// url of the source page
		sourceUrl = request.url;
		console.log(`test the url ${ sourceUrl }`);
	}






	// format the origin marketplace to set value to combobox
	// fill new domains here in order to select the correct domain
	const sourceArr = [ "amazon com",
						"amazon uk",
						"amazon ca",
						"amazon au",
						"costco com",
						"costco uk",
						"costco ca",
						"ebay com",
						"ebay uk",
						"walmart",
						"ebay com",
						"ebay ca",
						"ebay au",
						"target",
						"homedepot",
						"overstock",
						"amazon au",
						"vidaxl uk"];


	// have to move to a helper file ***
	function forFilter (sub) {
		// console.log('sub: ', sub)
	  // to fetch the values of each element of the array
	  
	  // debugger;
	  let partial = sub.split(" ");

	  const testPartial = partial.map( keyword => {

			    // create the regex
			    let flags = "i";
			    let re = new RegExp(keyword, flags);
			    // matches the provided string for every keyword on each element
			    return re.test(sourceUrl);

		  })

	  // test if all values of the element are matched
	  if (testPartial.every( el => el >= 1 ) ) {
	  	return sub;
	  }


	}

	// PREPARE THE ORIGIN
	console.log("pre origin source", sourceArr);
	let originSrc;
	try {
		originSrc = sourceArr.filter(forFilter);		
	} catch (err) {
		throw new Error({error: err, message: "fill the array"})
	}
	console.log(`origin shource: ${ originSrc }`);
	const originMarkerplace = originSrc[0];



	function convertToUs(src) {
		let ar = src.split(' ');

		if (ar[1] === 'com') {
			ar[1] = 'us'
			console.log('inside converter', ar)
			let new_str = ar.join(' ')
				return new_str
			}else {
				return ar.join(' ')
			}
	}
// -- current combobox values --
// walmart
// amazon ca (ok), amazon uk (ok), amazon us (ok), amazon au (err), costco ca, costco uk,  costco us (ok)
// ebay ca, ebay uk (ok), ebay us (ok), ebay au, homedepot (ok), overstock ca, overstock (ok), target, target au
// vidaxl uk, vidaxl us, vidaxl au

// requested domains
/*
		'ebay.com' (y), 'ebay.co.uk' (y), 'ebay.ca' (y), 'ebay.de' (none),
		'amazon.com (y)', 'amazon.co.uk' (y), 'amazon.ca' (y), 'amazon.com.au' (y),
		'walmart.com' , 'walmart.ca',
		'homedepot.com', 'homedepot.ca',
		'target.com', 'target.com.au',
		'costco.com', 'costco.co.uk', 'costco.ca', 'costco.com.au',
		'overstock.com', 'overstock.ca',
		'vidaxl.com', 'vidaxl.co.uk', 'vidaxl.com.au', 'vidaxl.de',
		'zooplus.com', 'zooplus.co.uk', 'zooplus.de',
		'petplanet.co.uk',
		'aosom.com', 'aosom.co.uk', 'aosom.ca', 'aosom.de',
		'thinkgeek.com'

*/



// convert to us if there is com extension *combobox needs the value 'us'
	let origin;
	if (originMarkerplace.includes('com')) {
		origin = convertToUs(originMarkerplace);
	} else {
		origin = originMarkerplace;
	}

	function formInputHandler(source, origin) {

		return new Promise((resolve, reject) => {

			let productUrl = document.querySelector('#MainContent_TextBoxFrom');
			productUrl.value += source;
			let originMarket = document.getElementById("MainContent_DropDownOriginMarketPlace")
			originMarket.value = origin;

			if ( productUrl.value === source && originMarket.value === origin ) {

				resolve();

				}
		})

	}

	formInputHandler(sourceUrl, origin)
		.then(() => {
			let btn = document.getElementById('MainContent_ButtonSubmit')
			btn.click()
		}).catch( er => console.log("the error", er))



}




