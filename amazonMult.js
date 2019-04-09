console.log("inside amazon mult inside yeah aaah");

const currentUrl = window.location.href;
console.log("__current url", currentUrl);

// let a = document.querySelectorAll('.s-result-list .a-link-normal');
// let links = document.querySelectorAll('.s-result-list a[href^="https://www.amazon.com/gp/slredirect"]')
let links = document.querySelectorAll('span[data-component-type="s-product-image"] a');
console.log("legth", links.length)


const arrayOfProductUrls = []
for (let i of links) {
    // console.log("the i", i.href);
    arrayOfProductUrls.push(i.href)
}

console.log("urls...",arrayOfProductUrls)

let buttonContainer = document.querySelector(".s-desktop-toolbar");

let btn = document.createElement('span');
btn.setAttribute('class', 'dropshie_btn');
btn.className += ' mult';

let multiBanner = document.createElement('span');
multiBanner.innerHTML = "Multi";
multiBanner.setAttribute('class', 'multi-text-node');

// Grap Text
let grap = document.createElement('span');
grap.innerHTML = 'Grap';
grap.className = 'grap-node';
multiBanner.appendChild(grap);

btn.appendChild(multiBanner);


buttonContainer.appendChild(btn);


btn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ 
        message: "multi-add", 
        target: "dropshie", 
        url: currentUrl,
        urls: arrayOfProductUrls })
})

// try {
//     btn.parentNode.insertBefore(multiBanner, btn.nextSibling);
// }
// catch (err){
//     console.log("there is an error...", err);
// }
