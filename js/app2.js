document.getElementById("fav__icon").addEventListener("click", mostrar__favoritos);

document.getElementById("cerrar__favoritos").addEventListener("click", ocultar__favoritos);

favoritos = document.getElementById("favoritos");
cerrarFavoritos = document.getElementById("cerrar__favoritos");

function mostrar__favoritos(){
    favoritos.style.right = "0px";
}

function ocultar__favoritos(){
    favoritos.style.right = "-460px";
}
