window.onload = function () {

    let box = document.querySelector('.box_open');
    let container = document.querySelector('.spin');
    let click = false;

    const Spin = () => {
        container.addEventListener('mouseenter', () => {
            container.className = "active";
            box.className = "box_closed";
        })
        // container.addEventListener('mouseleave', () => {
        //     container.className = "passive";
        //     box.className = "box_open";
        // })
        
     }

    Fly();
    // Spin();

    function Fly() {

    
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
    }

}


// title.parentNode.insertBefore(btn, title.nextSibling);



