console.log("inside amazon");


// ebay id = itemTitle

// currentUrl
const currentUrl = window.location.href;
	
// imported from sourceUrls.js
const sourceDomains = domains


// fetch the names of the companies
function companyNameExtractor(domains) {

	const companies = [];
	for (company of domains) {

		let name = company.split('.')[0]
		

		if (!companies.includes(name)) {
			companies.push(name)						  		
		}

	}
	return companies;
}

// extract the company_name from the current url
function currentDomainFinder( sourceDomains, url) {


	// select the correct domain
	for (domain of sourceDomains) {
			let re = new RegExp(domain)

			if (re.test(url)) {
				break;
			}
	}
	return domain
	// console.log(`the matched domain ${ domain }`);

}

// return the title element of the page 
function getTitle(domainName) {
		let title = null;

		switch (domainName) {

			case "amazon":
				title = document.querySelector('#title');
				break;
			case "ebay":
				title = document.querySelector('#itemTitle');
				break	
			
		}

		if (title) {
			    title.className += title.className ? ' product_title' : 'product_title';
			}

		return title;

}

function injectButton(title) {

	let btn = document.createElement('div');
	btn.className = 'dropshie_btn';
	let btnText = document.createTextNode("add");
	btn.appendChild(btnText);

	title.appendChild(btn)

	btn.addEventListener('click', () => {


	    chrome.runtime.sendMessage({ message: "add", target: "dropshie", url: currentUrl })
	})

}

// LOGIC

// parameter: list of companies
// parameter: current page url
// returns the domainName of the current page
const currentDomain = currentDomainFinder( companyNameExtractor(sourceDomains), currentUrl);

// get the title element 
let title = getTitle(currentDomain);

// add btn next to the title of the page 
injectButton(title);




// chrome.runtime.onMessage.addListener(messageReceiver);
