console.log("inside dropshie");

chrome.runtime.onMessage.addListener(messageReceiver);
// let sourceUrl;

function messageReceiver(request, sender, sendResponse) {

	let { target } = request;

	if ( target === "dropshie") {

		// url of the source page
		sourceUrl = request.url;
		console.log(`test the url ${ sourceUrl }`);
		// debugger;
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
						"ebay uk",
						"walmart",
						"ebay com",
						"ebay ca",
						"ebay au",
						"target",
						"target au",
						"homedepot",
						"overstock",
						"overstock ca",
						"vidaxl com",
						"vidaxl au",
						"vidaxl uk"];

	function removeExtensions (str) {


		const slicedUrl = str.split('/');
		let domain = slicedUrl[2]

		console.log("--the splitted domain--", domain)

		if(domain.includes('uk')) {
			return domain.replace(/au/g, '')
		}
	    if (domain.includes('au')) {
	      return domain.replace(/com|ca/g, '')
	    } else {
	      return domain
	    }

	}

	const convertToUs = (str) => {
		if (str.includes('com')) {
			return str.replace('com', 'us')
		} else {
			return str
		}
	}

	// extracts an array of the values for the originMarketPlace
	const extract = url => el => {

	  console.log('---url inside filter---',url)
	  // console.log(el)
	  let extensions = el.split(" ")
	  // console.log('the split: ', extensions)
	  const checkIndex = extensions.map( ext => {
	      return url.includes(ext) // return a boolean for each word
	    })
	  // console.log(checkIndex)
	  return checkIndex.every(el => el > 0) // checks if all extensions for every element of sourceArr are  matched

	}

	// extracts the current domain name from the url
	let arrOfValues = sourceArr.filter(extract(removeExtensions(sourceUrl)))

	let origin;
	console.log("--array after the filter: --", arrOfValues);
	// handle the overstock and target issue
	if (arrOfValues[1] === "overstock ca" || arrOfValues[1] === "target au" ) {
		origin = arrOfValues[1]
		// debugger;
	} else {
		origin = arrOfValues.join() // the value for originMarketplace
	}
	console.log("origin after the filter: ", origin)
	const convertedOrigin = convertToUs(origin);
	// console.log("the value for the combobox: ", convertedOrigin);


// requested domains check if the button is injected
/*
		'ebay.com' (y), 'ebay.co.uk' (y), 'ebay.ca' (y), 'ebay.de' (none),
		'amazon.com (y)', 'amazon.co.uk' (y), 'amazon.ca' (y), 'amazon.com.au' (y),
		'walmart.com (y)' , 'walmart.ca (y)',
		'homedepot.com (y)', 'homedepot.ca (y)',
		'target.com (y)', 'target.com.au (y)',
		'costco.com (y)', 'costco.co.uk (y)', 'costco.ca (y)', 'costco.com.au (not an e shop)',
		'overstock.com (y)', 'overstock.ca (y)',
		'vidaxl.com', 'vidaxl.co.uk (y)', 'vidaxl.com.au (y)', 'vidaxl.de',
		'zooplus.com', 'zooplus.co.uk', 'zooplus.de',
		'petplanet.co.uk',
		'aosom.com', 'aosom.co.uk (y)', 'aosom.ca', 'aosom.de',
		'thinkgeek.com'

*/


	function formInputHandler(source, origin) {

		return new Promise((resolve, reject) => {

			let productUrl = document.querySelector('#MainContent_TextBoxFrom');
			productUrl.value += source;
			let originMarket = document.getElementById("MainContent_DropDownOriginMarketPlace")
			originMarket.value = origin;
			if (!originMarket.value) {
				reject("cannot fill the originMarketPlace with: ", origin)
			}
			if ( productUrl.value === source && originMarket.value === origin ) {

				resolve();

				}
		})

	}
	// fills the originMarket
	formInputHandler(sourceUrl, convertedOrigin)
		.then(() => {
			let btn = document.getElementById('MainContent_ButtonSubmit')
			btn.click()
		}).catch( er => console.log("Error", er))


}




