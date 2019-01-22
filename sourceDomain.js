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
	// console.log('splited url', url);

	// have to dry the code
	// handles the different extensions for walmart
	console.log(`url is: ${ url }`);
	if ( url.includes("costco") && url.includes("uk") ) {
		domain = "costco_uk";
		return domain
	}
	else if ( url.includes("walmart") && url.includes("ca") ) {
		domain = "walmart_ca";
		return domain
	}
	else if ( url.includes("walmart") && url.includes("com") ) {
		domain = "walmart_com";
		return domain
	}
	// handle target urls
	else if ( url.includes("target") && url.includes("com") && !url.includes("au") ) {
		domain = "target_com";
		return domain
	}
	else if ( url.includes("target") && url.includes("au") ) {
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

// provide new supplier here
const supplierAtributes = {
	amazon: '#title',
	ebay: '#itemTitle',
	homedepot: '.product-title__title',
	walmart_com: '.hf-BOTContainer .ProductTitle .prod-ProductTitle>div',
	walmart_ca: '#product-desc',
	target_com: '.styles__DescriptionContainerDiv-vttgqz-3 h1',
	target_au:  '.prod-basic h1',
	costco_uk: '.product-page-container .hidden-xs h1',
	costco: '#product-details .product-h1-container>h1',
	zooplus: '.product__description',
	aosom: '.product-name',
	petplanet: '.container--product-name',
	thinkgeek: '.header',
	vidaxl: '.container-top>.title',
	overstock: '.product-title>h1'

}
// returns the title element of the page
function getTitle(domainName, supplierAtributesObj, callback) {
		console.log('inside getTitle', domainName);
		console.log('inside getTitle', supplierAtributes);


		let title = document.querySelector(supplierAtributesObj[domainName]);
		console.log("new title creator", title);

		const checkForElement = element => {


				return new Promise ( (resolve, reject) => {

				let counter = 0
				// check for the element in the dom
				const checker =  domainName => {

					counter += 1;

					if (title){
						console.log("element found: ", title);
						return resolve(title)
					}
					else if (counter >= 20) {
						// stop conndition
						return reject("cannot find element")
					}
					else {
						console.log("---recurse--")
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


			// console.log("prepared title with button", el)
			callback(el);

		}).catch( err => {
			// chrome.runtime.sendMessage({ message: "cannot find element" });
			throw new Error(err)
		})


}


function injectButton(title) {
	// Mutation Observer
	
	// console.log("--inside inject button--", title);


	let btn = document.createElement('span');
		btn.setAttribute('class', 'dropshie_btn');



	// title.parentNode.insertBefore(btn, title.nextSibling);
	title.appendChild(btn);


	btn.addEventListener('click', () => {
	    chrome.runtime.sendMessage({ message: "add", target: "dropshie", url: currentUrl })
	})

}
// MUTATION OBSERVER GOOD LUCK 
function ObserveTitle(title, injector) {
	injector(title);
	let target = document.querySelector()
	let config = {
		attributes: false,
		childList: true,
		subtree: true
	}
	let callback = (mutationList, observer) => {
		for (let mutation of mutationList) {
			if (mutation.type == "childList") {
				console.log("A child has added or removed")
				injector(title);
			}
		}
	}

	const observer = new MutationObserver(callback);
	observer.observe(title, config);

	// console.log("observe", title);
}



// parameter: list of companies --
// parameter: current page url
// returns the domainName of the current page
let raw_domains = new Domains(); // object from sourceUrls.js
let domains = raw_domains.domains;

const currentDomain = currentDomainFinder( companyNameExtractor(domains), currentUrl);

// gets the title element in order to inject the button
getTitle(currentDomain,supplierAtributes, title => {
	console.log("--after the getTitle function--", title)
	// ObserveTitle(title, injectButton);
	injectButton(title);


});

// After dom update
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("--runtime--", request)
	let { message } = request;
	if ( message === "domUpdated") {
		console.log(`from the dom update ${ message }`);
		setTimeout(() => {
			getTitle(currentDomain, supplierAtributes, title => {
				injectButton(title);
			})
		}, 1500) // ON SLOW 3G HAVE TO USE 3000ms
		sendResponse({ message:"content reload..."})
	}
});
