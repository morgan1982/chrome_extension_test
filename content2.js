console.log("inside source");
// alert("inside source");


// ebay id = itemTitle

// currentUrl
const currentUrl = window.location.href;

// imported from sourceUrls.js
// consider using generator function

// const sourceDomains = domains
// alert(domains)

// fetch the names of the companies
function companyNameExtractor(domains) {

	const companies = [];
	let company = null;
	for (company of domains) {

		let name = company.split('.')[0]


		if (!companies.includes(name)) {
			companies.push(name)
		}
		// alert(companies);
	}
	return companies; // returns a array of companies
}

// extract the company_name from the current url
function currentDomainFinder( sourceDomains, url) {

	let domain = null;
	// select the correct domain
	for ( domain of sourceDomains) {
			let re = new RegExp(domain)

			if (re.test(url)) {
				break;
			}
	}
    

	return domain
	console.log(`the matched domain ${ domain }`);

}

// return the title element of the page
function getTitle(domainName) {
		let title = null;


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
            case "walmart":
                title = document.querySelector('.prod-TitleSection');
                break
            case "target":
                title = document.querySelector('.styles__ProductDetailsTitleRelatedLinks-sc-12eg98-0');
                break
            case "costco":
                title = document.querySelector('.bazaar-voice');
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
                title = document.querySelector('.header');
                break
		}

		if (title) {
			    title.className += title.className ? ' product_title' : 'product_title';
			}

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

// LOGIC

// parameter: list of companies -- domains declared in sourceUrls.js
// parameter: current page url
// returns the domainName of the current page
const currentDomain = currentDomainFinder( companyNameExtractor(domains), currentUrl);

// get the title element
let title = getTitle(currentDomain);

// add btn next to the title of the page
if (title) {
	injectButton(title);
}


// chrome.runtime.onMessage.addListener(messageReceiver);
