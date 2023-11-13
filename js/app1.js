document.getElementById("carrito__icon").addEventListener("click", mostrar__carrito);

document.getElementById("cerrar__carrito").addEventListener("click", ocultar__carrito);

carritoDeCompras = document.getElementById("carrito");
cerrarCarrito = document.getElementById("cerrar__carrito");

function mostrar__carrito(){
    carritoDeCompras.style.right = "0px";
}

function ocultar__carrito(){
    carritoDeCompras.style.right = "-460px";
}
