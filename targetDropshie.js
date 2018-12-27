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
						"homedepot",
						"overstock",
						"vidaxl uk"];

	function removeExtensions (str) {

		const slicedUrl = str.split('/');
		let domain = slicedUrl[2]

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


	// extracts the array of the values for the originMarketPlace
	const extract = url => el => {

	  // console.log('---url inside filter---',url)
	  // console.log(el)
	  let extensions = el.split(" ")
	  // console.log('the split: ', extensions)
	  const checkIndex = extensions.map( ext => {
	      return url.includes(ext) // return a boolean for each word
	    })
	  // console.log(checkIndex)
	  return checkIndex.every(el => el > 0) // checks if every element of the array is matched

	}


	const arrOfValues = sourceArr.filter(extract(removeExtensions(sourceUrl)))
	let  origin = arrOfValues.join() // the value for originMarketplace
	const convertedOrigin = convertToUs(origin);
	console.log("the value for the combobox: ", convertedOrigin);


// -- current combobox values --
// walmart
// amazon ca (ok), amazon uk (ok), amazon us (ok), amazon au (err), costco ca (ok), costco uk,  costco us (ok)
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
	// fill the originMarket
	formInputHandler(sourceUrl, convertedOrigin)
		.then(() => {
			let btn = document.getElementById('MainContent_ButtonSubmit')
			btn.click()
		}).catch( er => console.log("Error", er))



}




