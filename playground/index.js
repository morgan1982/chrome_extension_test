window.onload = function () {

    let box = document.querySelector('.box_open');
    let container = document.querySelector('.spin');
    let tool = document.querySelector('.box_open>span');
    let click = false;


    const addToolTip = () => {
        box.addEventListener("mouseenter", () => {
            console.log("enter");
            // box.className -= 'reverse';
            box.setAttribute("tooltip", "Add to DROPshie inventory");
        })
        box.addEventListener("mouseleave", () => {
            console.log("leave");
            box.removeAttribute("tooltip");
            
        })
    }

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

    const testAnimations = option => {
        
        switch(option) {

            case 1:
                addToolTip();
                break;
            case 2:
                Fly();
                break;
            case 3:
                Spin();
                break;
            default:
                return 0;
        }
    }
    //  1 -tooltip 2. fly 3. spin 
    testAnimations(1);
 
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



