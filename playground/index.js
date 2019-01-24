window.onload = function () {

    let box = document.querySelector('.box_open');

    box.addEventListener('click', () => {
        box.className = 'box_closed';
        setTimeout(() => {
            box.className += ' fly'
        }, 1000)
    })

    // const title = document.querySelector('.title');
    // if (title) {
    //     title.className += title.className ? " product_title" : "product_title";
    // }

    // const btn = document.createElement('span');
    // btn.className = "capt";

    // title.appendChild(btn);


    // function Animate() {
    //     btn.className += " animate";
    // }
}


