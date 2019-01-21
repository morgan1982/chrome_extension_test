window.onload = function () {

    const title = document.querySelector('.title');
    if (title) {
        title.className += title.className ? " product_title" : "product_title";
    }

    const btn = document.createElement('span');
    btn.className = "capt";

    title.appendChild(btn);


    function Animate() {
        btn.className += " animate";
    }
}


