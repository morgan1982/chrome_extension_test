window.onload = function () {

    const title = document.querySelector('.title');
    if (title) {
        title.className += title.className ? " product_title" : "product_title";
    }

    const btn_container = document.createElement('div');
    btn_container.className = 'btn_container'
    const btn = document.createElement('span');
    btn.className = "dropshie_btn";
    const btnText = document.createTextNode('add to dropshie');
    btn.appendChild(btnText);
    btn_container.appendChild(btn);

    title.appendChild(btn_container)
}


