let el = "down1";
let counter;
let checker;

function getElement(element) {
    
    counter += 1
    console.log(counter)
  
  
  if (el === "down") {
    console.log("found the element")
    console.log("the val of checker before: ", checker)
    clearInterval(checker)
    console.log("the val of checker after: ", checker)
    return
  }
  if (counter > 5) {
    
    console.log("the value of checker before: ", checker)
    clearInterval(checker)
    console.log("the value after: ", checker)
  }
  checker = setInterval(() => getElement(element), 500)
  
  
  
}

getElement(el);