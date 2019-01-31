// console.log("inside source");

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

	// handles the different extensions for walmart, costco & target
	// console.log(`host: ${ url }`);
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

// attribute values to target the elements for each host
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
		// console.log('inside getTitle', domainName);
		// console.log('inside getTitle', supplierAtributes);


		let title = document.querySelector(supplierAtributesObj[domainName]);
		// console.log("new title creator", title);

		const checkForElement = element => {


				return new Promise ( (resolve, reject) => {

				let counter = 0
				// check for the element in the dom
				const checker =  domainName => {

					counter += 1;

					if (title){
						// console.log("element found: ", title);
						return resolve(title)
					}
					else if (counter >= 20) {
						// stop conndition
						return reject("cannot find element")
					}
					else {
						// console.log("___Recurse elemenent fiunder")
						setTimeout(() => checker(domainName), 100);
					}
				}

				// init
				checker(domainName);

			})



		}

		checkForElement(title).then( el => {

		    el.className += el.className ? ' product_title' : 'product_title';
			callback(el);

		}).catch( err => {
			throw new Error(err)
		})


}


function injectButton(title) {

	let btn = document.createElement('span');
		btn.setAttribute('class', 'dropshie_btn');
		title.appendChild(btn);

	// TOOLTIP CREATOR
	let body = document.querySelector('body');
	let bannerContainer = document.createElement('div');
	bannerContainer.className = "banner_container";

	let banner = document.createElement('div'); 
	banner.className = "banner";
	// banner.offsetHeight // css relfow to block the transition
	banner.innerHTML = "Add to <span style=\" color: #449a96; font-weight: 700;\">DROP</span><span>shie</span> inventory"
	bannerContainer.appendChild(banner);
	body.appendChild(bannerContainer);
	
	btn.addEventListener('click', () => {
		chrome.runtime.sendMessage({ message: "add", target: "dropshie", url: currentUrl })
	})

	btn.addEventListener('mouseenter', () => {
		banner.className += " animated";
	})

	btn.addEventListener('mouseleave', () => {
		banner.classList.remove('animated');
	})

}


let raw_domains = new Domains(); // object from sourceUrls.js
let domains = raw_domains.domains;
let injectionSucceded = false;

// parameter: list of companies --
// parameter: current page url
// returns the domainName of the current page
const currentDomain = currentDomainFinder( companyNameExtractor(domains), currentUrl);

// gets the title element in order to inject the button
getTitle(currentDomain,supplierAtributes, title => {
	// console.log("--after the getTitle function--", title)
	// ObserveTitle(title, injectButton);
	injectButton(title);
	if (title) {
		injectionSucceded = true;
	}
});

// failsafe for sites like target.com using async scripts
// runs always at the end of the document
document.onreadystatechange = function () {
	if ( document.readyState === "complete") {
		// checks if the injection succeded
		// console.log("____Completed injection: ", injectionSucceded);
		if (!injectionSucceded) {
			getTitle(currentDomain, supplierAtributes, title => {
				// console.log("__running injection again__");
				injectButton(title);
				injectionSucceded = true
			})
		}
	}
}



if (currentDomain === "target_com") {
	chrome.runtime.sendMessage({ message: "target"});

	// receive the dom update event and inject the button again
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		// console.log("--runtime--", request)
		let { message } = request;
		if ( message === "domUpdated") {

		if ( document.readyState === "complete") {
			// console.log("____Completed")
			if (!injectionSucceded) {
				getTitle(currentDomain, supplierAtributes, title => {
					// console.log("__run  the injection again__");
					injectButton(title);
					injectionSucceded = true
				})
			}
		}	
			setTimeout(() => {
				let btn = document.querySelector('.dropshie_btn');
				if(!btn) {
					getTitle(currentDomain, supplierAtributes, title => {
						injectButton(title);
					})					
				}

			}, 1500) // ON SLOW 3G HAVE TO USE 3000ms
			sendResponse({ message:"content reload..."})
		}
	});
}


