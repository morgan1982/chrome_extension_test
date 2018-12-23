
let counter = 0
function addNumber(num) {
  counter += 1

  if (counter > 10) {
    return
  }

  console.log(num + num)
  setTimeout(() => addNumber(5), 500);
}


addNumber(5);
