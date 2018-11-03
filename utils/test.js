let str = "https://www.amazon.co.uk/Mirra-2-Chair-Herman-Miller/dp/B01M6A9Z3F/ref=sr_1_2?s=kitchen&ie=UTF8&qid=1541194014&sr=1-2&keywords=herman+miller"


// fetch from the dom or is not efficient?
const sourceArr = ["amazon com", "amazon uk", "ebay com", "ebay co uk"];


function forFilter (sub) {
  
  let partial = sub.split(" ");


  const testPartial = partial.map( keyword => {
    // console.log(keyword)

    // create the regex
    let flags = "i";

    re = new RegExp(keyword, flags);

    // matches the provided string for every keyword seperated by space
    return re.test(str);
    
	  })

  if (testPartial.every( el => el >= 1 ) ) {
  	return sub;
  }

  
}

// origin
const origin = sourceArr.filter(forFilter);
console.log("originMarkerplace: ", origin[0]);