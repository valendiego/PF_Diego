document.getElementById("menu__icon").addEventListener("click", mostrar__menu);

document.getElementById("background__menu").addEventListener("click", ocultar__menu);

navmenu = document.getElementById("navmenu");
background__menu = document.getElementById("background__menu");

function mostrar__menu(){
    navmenu.style.left = "0px";
    background__menu.style.display = "block";
}

function ocultar__menu(){
    navmenu.style.left = "-250px";
    background__menu.style.display = "none";
}
