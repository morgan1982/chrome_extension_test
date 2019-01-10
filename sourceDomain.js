console.log("inside source");

// the url of the tab
const currentUrl = window.location.href;

// fetch the names of the companies
function companyNameExtractor(domains) {

	const companies = [];
	let company = null;
	for (company of domains) {

		let name = company.split('.')[0]


		if (!companies.includes(name)) {
			companies.push(name)
		}

	}
	return companies; // returns a array of companies
}

// extract the company_name from the current url
function currentDomainFinder( sourceDomains, url) {

	let domain = null;

	// extract the domain from the url
	url = url.split('/')[2];
	console.log('splited url', url);

	// have to dry the code
	// handle the different extensions for walmart
	console.log(`url is: ${ url }`);
	if ( url.includes("costco") && url.includes("uk") ) {
		domain = "costco_uk";
		return domain
	}
	if ( url.includes("walmart") && url.includes("ca") ) {
		domain = "walmart_ca";
		return domain
	}
	if ( url.includes("walmart") && url.includes("com") ) {
		domain = "walmart_com";
		return domain
	}
	// handle target urls
	if ( url.includes("target") && url.includes("com") && !url.includes("au") ) {
		domain = "target_com";
		return domain
	}
	if ( url.includes("target") && url.includes("au") ) {
		domain = "target_au";
		return domain
	}
	// select the correct domain
	for ( domain of sourceDomains) {
			let re = new RegExp(domain)

			if (re.test(url)) {
				break;
			}
	}


	return domain

}

// return the title element of the page
function getTitle(domainName, callback) {
		let title = null;
		console.log(`the domainName for switch: ${ domainName }`)


		const setTitle = domainName => {


			// dry that with a map or something
			// put donains and selectors to a dictionary
			switch (domainName) {


				case "amazon":
					title = document.querySelector('#title');
					break;
				case "ebay":
					title = document.querySelector('#itemTitle');
					break
	            case "homedepot":
	                title = document.querySelector('.product-title__title');
	                break
	            case "walmart_com":
	                title = document.querySelector('.hf-BOTContainer .ProductTitle .prod-ProductTitle>div');
	                break
	            case "walmart_ca":
					title = document.querySelector('#product-desc>h1[data-analytics-type=\'productPage-productName\']');
	                break
	            case "target_com":
	                title = document.querySelector('.styles__DescriptionContainerDiv-vttgqz-3 h1');
	                break
	            case "target_au":
	                title = document.querySelector('.prod-basic h1');
	                break
	            case "costco_uk":
	                title = document.querySelector('.product-page-container .hidden-xs h1')
	                break
				case "costco":
					title = document.querySelector('#product-details .product-h1-container>h1');
	                break
	            case "zooplus":
	                title = document.querySelector('.product__description');
	                break
	            case "aosom":
	                title = document.querySelector('.product-name');
	                break
	            case "petplanet":
	                title = document.querySelector('.container--product-name');
	                break
	            case "thinkgeek":
	                title = document.querySelector('.header');
	                break
	            case "vidaxl":
	                title = document.querySelector('.container-top>.title');
	                break
	            case "overstock":
	                title = document.querySelector('.product-title>h1');
					break
				default:
					title = "self destruction"
			}

			return title;
		}


		const checkForElement = element => {


				return new Promise ( (resolve, reject) => {

				let counter = 0

				// check for the element in the dom
				const checker =  domainName => {

		            title = setTitle(domainName);
					counter += 1;

					if (title){
						console.log("element found: ", title);
						return resolve(title)
					}
					if (counter >= 20) {
						// stop conndition
						return reject("cannot find element")
					}
					else {
						console.log("---recurse--")
						// debugger;
						setTimeout(() => checker(domainName), 100);
					}
				}
				// init
				checker(domainName);

			})



		}

		checkForElement(title).then( el => {


			console.log("--domain after resolved promise", currentDomain);

		    el.className += el.className ? ' product_title' : 'product_title';


			console.log("prepared title with button", el)
			callback(el);

		}).catch( err => {
			// chrome.runtime.sendMessage({ message: "cannot find element" });
			throw new Error(err)
		})


}


function injectButton(title) {

	console.log("--inside inject button--", title);

	let btn = document.createElement('span');
		btn.setAttribute('class', 'dropshie_btn');



	// title.parentNode.insertBefore(btn, title.nextSibling);
	// title.appendChild(textSpan);
	title.appendChild(btn);


	btn.addEventListener('click', () => {
	    chrome.runtime.sendMessage({ message: "add", target: "dropshie", url: currentUrl })
	})

}



// parameter: list of companies --
// parameter: current page url
// returns the domainName of the current page
let raw_domains = new Domains(); // object from sourceUrls.js
let domains = raw_domains.domains;

const currentDomain = currentDomainFinder( companyNameExtractor(domains), currentUrl);

// gets the title element in order to inject the button
getTitle(currentDomain, title => {
	console.log("--after the getTitle function--", title)
	injectButton(title);
});

// chrome.runtime.onMessage.addListener(messageReceiver);





