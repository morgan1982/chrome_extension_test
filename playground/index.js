window.onload = function () {

    let box = document.querySelector('.box_open');
    let container = document.querySelector('.spin');
    let click = false;

    box.addEventListener('click', () => {
        click = true;
        box.className = 'box_closed';
        container.className = 'active';
        setTimeout(() => {
            box.className += ' fly';
            setTimeout(() => {
                box.className = 'box_open';
                container.className = "passive"
            }, 1000)
        }, 100)
        // fly( setTimeout(() => {
        //     box.className = 'box_open';
        // }, 1000));
    })

    box.addEventListener('onmouseenter', () => {
        // spin the closed box 
    })
    box.addEventListener('onMouseLeave', () => {
        // return the box to default state
    })

    

    // const fly = (callback) => {
    //     setTimeout(() => {
    //         box.className += ' fly';
    //     }, 1500)
    //     callback()
    // }
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


