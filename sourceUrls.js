const domains = [
	'ebay.com', 'ebay.co.uk', 'ebay.ca', 'ebay.de',
	'amazon.com', 'amazon.co.uk', 'amazon.ca', 'amazon.com.au',
	'walmart.com', 'walmart.ca',
	'homedepot.com', 'homedepot.ca',
	'target.com', 'target.com.au',
	'costco.com', 'costco.co.uk', 'costco.ca', 'costco.com.au',
	'hoverstock.com', 'hoverstock.ca',
	'vidaxl.com', 'vidaxl.co.uk', 'vidaxl.com.au', 'vidaxl.de',
	'zooplus.com', 'zooplus.co.uk', 'zooplus.de',
	'petplanet.co.uk',
	'aosom.com', 'aosom.co.uk', 'aosom.ca', 'aosom.de',
	'thinkgeek.com'
]

// couldn't find overstock australia
const validUrls = []

domains.forEach( url => {
	validUrls.push(`https://www.${url}`)
}) 



