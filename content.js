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



// convert to us if there is com extension 
	let origin;
	if (originMarkerplace.includes('com')) {

		origin = convertToUs(originMarkerplace);
		console.log('converted', origin);
	} else {
		origin = originMarkerplace;
	}


	function formInputHandler(source, origin, callback) {

		// product url
		let productUrl = document.querySelector('#MainContent_TextBoxFrom');
		productUrl.value += sourceUrl;

		// Origin MarketPlace
		let originMarket = document.getElementById("MainContent_DropDownOriginMarketPlace")
		originMarket.value = origin;
		if ( productUrl.value === sourceUrl && originMarket.value === origin ) {
			callback();		
		} 
		
	}



	// fill the form and sumbit the form
	formInputHandler(sourceUrl, origin, () => {

		console.log('running the submit handler')
		try {
			// document.forms[0].submit()
			let btn = document.getElementById('MainContent_ButtonSubmit')
			btn.click()
		} catch {
			throw new Error("cannot submit the form")
		}		
	})

}




