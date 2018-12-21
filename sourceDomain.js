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
function getTitle(domainName) {
		let title = null;
		console.log(`the domainName for switch: ${ domainName }`)


		switch (domainName) {

            // have to add the other suppliers
			case "amazon":
				title = document.querySelector('#titleSection');
				break;
			case "ebay":
				title = document.querySelector('#itemTitle');
				break
            case "homedepot":
                title = document.querySelector('.manufacturer-name__with_reviews');
                break
            case "walmart_com":
                title = document.querySelector('.prod-TitleSection');
                break
            case "walmart_ca":
                title = document.querySelector('#product-desc_kotor');
                break
            case "target_com":
                title = document.querySelector('.styles__ProductDetailsTitleRelatedLinks-sc-12eg98-0');
                break
            case "target_au":
                title = document.querySelector('.prod-basic');
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

		let counter = 0;
		let checker; 
		const checkForElement = (element, checkInterval) => {
			counter += 1
			if (element){
				testInterval(checker);
				console.log(`element found: ${ element }`);
				return element
			}
			if (counter >= 20) {
				debugger;
				
				console.log(`before killing: ${ checker }`)
				checkInterval(checker);
				console.log(`after killing: ${ checker }`)
				// clearInterval(checker);
				checker = 0
				throw new Error("cannot find element on the page")
				return
			}
			if (domainName === "target_au") {
				window.addEventListener('load', Run, false)

				function Run () {
					console.log('the element of target_au', element);
					if (element) {

						console.log("target_au found: ", element)
						checkInterval(checker);

					}
				}
			}
			else {
				console.log("---invoke the interval--")
				checker = setInterval( () => checkForElement(element, checkInterval), 500)
			}
			


		}

		// check if interval is triggered and kill it
		const checkInterval = intervalValue => {
			console.log('the value of the interval', intervalValue)
			if (intervalValue) {
				clearInterval(intervalValue)
			}
		}

		checkForElement(title, checkInterval);

		if (title) {
			    title.className += title.className ? ' product_title' : 'product_title';
			}
		console.log("prepared title", title)
		return title;

}


function injectButton(title) {


	let btnText = document.createTextNode("add");

	let btn = document.createElement('div');
		btn.setAttribute('class', 'dropshie_btn');

	btn.appendChild(btnText);
	console.log(`btn ${ btn }`);

    let btnContainer = document.createElement('div')
		btnContainer.setAttribute('class', 'dropshie_btn_container')

    btnContainer.appendChild(btn);
	console.log(`btnContainer ${ btnContainer }`);



    // title.parentNode.insertBefore(btnContainer, title.nextSibling);
	title.appendChild(btnContainer);

	btn.addEventListener('click', () => {


	    chrome.runtime.sendMessage({ message: "add", target: "dropshie", url: currentUrl })
	})

}



// parameter: list of companies --
// parameter: current page url
// returns the domainName of the current page

let raw_domains = new Domains()
let domains = raw_domains.domains

const currentDomain = currentDomainFinder( companyNameExtractor(domains), currentUrl);

// gets the title element in order to inject the button
let title = getTitle(currentDomain);

// add btn next to the title of the page
if (title) {
	injectButton(title);
}


// chrome.runtime.onMessage.addListener(messageReceiver);





