window.onload = function () {

    const title = document.querySelector('.title');
    if (title) {
        title.className += title.className ? " product_title" : "product_title";
    }

    const btn = document.createElement('div');
    btn.className = "dropshie_btn";
    const btnText = document.createTextNode('add to dropshie');
    btn.appendChild(btnText);

    title.appendChild(btn)
}


