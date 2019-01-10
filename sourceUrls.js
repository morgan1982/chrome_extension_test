function Domains () {

	this.domains = [
		'ebay.com', 'ebay.co.uk', 'ebay.ca', 'ebay.de',
		'amazon.com', 'amazon.co.uk', 'amazon.ca', 'amazon.com.au',
		'walmart.com', 'walmart.ca',
		'homedepot.com', 'homedepot.ca',
		'target.com', 'target.com.au',
		'costco.com', 'costco.co.uk', 'costco.ca', 'costco.com.au',
		'overstock.com', 'overstock.ca',
		'vidaxl.com', 'vidaxl.co.uk', 'vidaxl.com.au', 'vidaxl.de',
		'zooplus.com', 'zooplus.co.uk', 'zooplus.de',
		'petplanet.co.uk',
		'aosom.com', 'aosom.co.uk', 'aosom.ca', 'aosom.de',
		'thinkgeek.com'
		];
	this.validUrls = []
	this.format = function () {
		for (let domain of this.domains) {
			this.validUrls.push(`https://www.${ domain }`)
		}
	}
	this.setDomain = function (domain) {
		this.domains.push(domain)
	}

}
