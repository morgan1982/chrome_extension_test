// console.log("inside dropshie");

chrome.runtime.onMessage.addListener(messageReceiver);

function messageReceiver(request, sender, sendResponse) {

	let sourceUrl;
	let { target } = request;

	if ( target === "dropshie") {
			// url of the supplier
			sourceUrl = request.url;

			// console.log(`supplier url ${ sourceUrl }`);


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

			// console.log("--the splitted domain--", domain)
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

		//   console.log('---url inside filter---',url)

		let extensions = el.split(" ")
		const checkIndex = extensions.map( ext => {
			return url.includes(ext) // return a boolean for each word
			})
		return checkIndex.every(el => el > 0) // checks if all extensions for every element of sourceArr are  matched

		}

		// extracts the current domain name from the url
		let arrOfValues = sourceArr.filter(extract(removeExtensions(sourceUrl)))

		let origin;
		// console.log("--array after the filter: --", arrOfValues);
		// handles overstock and target
		// cases in which in the sourceArray there is values for the same domain without suffix (like the pair overstock && overstock ca)
		if (arrOfValues[1] === "overstock ca" || arrOfValues[1] === "target au" ) {
			origin = arrOfValues[1]
		} else {
			origin = arrOfValues.join() // the value for originMarketplace
		}
		const convertedOrigin = convertToUs(origin);



		function formInputHandler(source, origin) {

			return new Promise((resolve, reject) => {

				// debugger;
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
			}).catch( er => {throw er})
			  .catch((er) => console.log("prouct not added"));
			//   .catch((er) => console.log(er.stack))


	}
}




