document.getElementById("carrito__icon").addEventListener("click", mostrar__carrito);

document.getElementById("background__menu").addEventListener("click", ocultar__carrito);

carritoDeCompras = document.getElementById("carrito");
background__menu = document.getElementById("background__menu");

function mostrar__carrito(){
    carritoDeCompras.style.right = "0px";
    background__menu.style.display = "block";
}

function ocultar__carrito(){
    carritoDeCompras.style.right = "-460px";
    background__menu.style.display = "none";
}
