console.log("inside source");


// window.addEventListener ("load", Run, false);





// the url of the tab
const currentUrl = window.location.href;

// consider using generator function
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
	if ( url.includes("amazon") && url.includes("au") ) {
		domain = "amazon_au";
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

				case "amazon_au":
					title = document.querySelector('#booksTitle');
					break;
				case "amazon":
					title = document.querySelector('#titleSection');
					break;
				case "ebay":
					title = document.querySelector('#itemTitle');
					break
	            case "homedepot":
	                title = document.querySelector('.badge-list');
	                break
	            case "walmart_com":
	                title = document.querySelector('.prod-TitleSection');
	                break
	            case "walmart_ca":
	                title = document.querySelector('#product-desc');
	                break
	            case "target_com":
	                title = document.querySelector('.styles__ProductDetailsTitleRelatedLinks-sc-12eg98-0');
	                break
	            case "target_au":
	                title = document.querySelector('.prod-basic');
	                break
	            case "costco_uk":
	                // title = document.querySelector('.product-title-container div[data-bv-show=\'rating_summary\']')
	                // title = document.querySelector('.bv_main_container')
	                title = document.querySelector('.product-page-container .hidden-xs')
	                break
	            case "costco":
	                title = document.querySelector('#details-bazaar-voice');
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
	                title = document.querySelector('.container-top');
	                break
	            case "overstock":
	                title = document.querySelector('.product-title');
	                break
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
						setTimeout(() => checker(domainName), 500);
					}
				}
				// init
				checker(domainName);

			})



		}

		checkForElement(title).then( el => {
			console.log("after resolving the promise: ", el)

		    el.className += el.className ? ' product_title' : 'product_title';

			console.log("prepared title", el)
			callback(el);

		}).catch( err => {
			throw new Error(err)
		})


}


function injectButton(title) {


	// let btnText = document.createTextNode("add");

	let btn = document.createElement('span');
		btn.setAttribute('class', 'capt');

	// btn.appendChild(btnText);
	// console.log(`btn ${ btn }`);

    // let btnContainer = document.createElement('div')
		// btnContainer.setAttribute('class', 'dropshie_btn_container')

    // btnContainer.appendChild(btn);
	// console.log(`btnContainer ${ btnContainer }`);



    // title.parentNode.insertBefore(btnContainer, title.nextSibling);
	title.appendChild(btn);

	btn.addEventListener('click', () => {
	    chrome.runtime.sendMessage({ message: "add", target: "dropshie", url: currentUrl })
	})

}



// parameter: list of companies --
// parameter: current page url
// returns the domainName of the current page
let raw_domains = new Domains() // object from sourceUrls.js
let domains = raw_domains.domains

const currentDomain = currentDomainFinder( companyNameExtractor(domains), currentUrl);

// gets the title element in order to inject the button
getTitle(currentDomain, title => {
	console.log("--after the getTitle function--", title)
	injectButton(title);
});

// chrome.runtime.onMessage.addListener(messageReceiver);





