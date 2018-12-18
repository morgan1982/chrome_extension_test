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

// maybe inefficient
// domains.forEach( url => {
// 	validUrls.push(`https://www.${url}`)
// })
for ( let domain of domains) {
	validUrls.push(`https://www.${domain}`)
}




// let Domains = function() {
// 		let _domains = [
// 				'ebay.com', 'ebay.co.uk', 'ebay.ca', 'ebay.de',
// 				'amazon.com', 'amazon.co.uk', 'amazon.ca', 'amazon.com.au',
// 				'walmart.com', 'walmart.ca',
// 				'homedepot.com', 'homedepot.ca',
// 				'target.com', 'target.com.au',
// 				'costco.com', 'costco.co.uk', 'costco.ca', 'costco.com.au',
// 				'hoverstock.com', 'hoverstock.ca',
// 				'vidaxl.com', 'vidaxl.co.uk', 'vidaxl.com.au', 'vidaxl.de',
// 				'zooplus.com', 'zooplus.co.uk', 'zooplus.de',
// 				'petplanet.co.uk',
// 				'aosom.com', 'aosom.co.uk', 'aosom.ca', 'aosom.de',
// 				'thinkgeek.com'
// 			];
// 		let _validUrls = []

// 		return {
// 			domains: _domains,
// 			validUrls: _validUrls,
// 			format: function() {
// 				_domains.forEach( url => {
// 					_validUrls.push(`https://www.${ url }`)
// 				} )
// 			}
// 		}
// }

