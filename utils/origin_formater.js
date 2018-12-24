let str = "https://www.amazon.co.uk/Mirra-2-Chair-Herman-Miller/dp/B01M6A9Z3F/ref=sr_1_2?s=kitchen&ie=UTF8&qid=1541194014&sr=1-2&keywords=herman+miller"

let str2 = "https://www.amazon.com.au/gp/product/B07L2KNC3T?pf_rd_m=ANEGB3WVEVKZB&storeType=ebooks&pageType=STOREFRONT&pf_rd_p=10ee4d93-9c05-4b86-8315-fa8ff9b227f1&pf_rd_r=ZZ4XYG0BKE933T8PYJK2&pd_rd_wg=L0vPh&pf_rd_s=merchandised-search-6&pf_rd_t=40901&ref_=dbs_f_r_shv_nr_10ee4d93-9c05-4b86-8315-fa8ff9b227f1_2&pd_rd_w=fkKea&pf_rd_i=2496751051&pd_rd_r=6de70650-df04-4c99-ba0c-5ccaed957491"

// fetch from the dom or is not efficient?

  const sourceArr = [ "amazon com",
            "amazon uk",
            "amazon ca",
            "amazon au",
            "costco com",
            "costco uk",
            "costco ca",
            "ebay com",
            "ebay uk",
            "walmart",
            "ebay com",
            "ebay ca",
            "ebay au",
            "target",
            "homedepot",
            "overstock",
            "vidaxl uk"];




const checker = el => {
  // console.log(el)
  let pieces = el.split(" ")
  // console.log(pieces)
  const checkIndex = pieces.map( ext => {
    return str2.includes(ext) // return a boolean for each word
  } )
  // console.log(checkIndex)
  // return pieces.every(el => el > 1)
  if (checkIndex.every(el => el > 0)) {
    return el
  }

  // for (let elem of pieces) {
  //   console.log(elem)
  //   return str.includes(elem)
  // }
}


const product = sourceArr.filter(checker)
console.log(product);

// function forFilter (sub) {

//   let partial = sub.split(" ");


//   const testPartial = partial.map( keyword => {
//     // console.log(keyword)

//     // create the regex
//     let flags = "i";

//     re = new RegExp(keyword, flags);

//     // matches the provided string for every keyword seperated by space
//     return re.test(str);

// 	  })

//   if (testPartial.every( el => el >= 1 ) ) {
//   	return sub;
//   }


// }

// // origin
// const origin = sourceArr.filter(forFilter);
// console.log("originMarkerplace: ", origin[0]);
