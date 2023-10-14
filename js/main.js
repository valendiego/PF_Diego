//FUNCIONES
function bienvenida(inicio) {
    while (inicio !== 0 && inicio !== 1) {
        alert("Ingrese una opción válida");
        inicio = parseInt(prompt("¡Bienvenido a Candelitte! ¿Desea comprar nuestros productos? Escriba 1 para comprar, 0 para salir."));
    }
    if (inicio === 1) {
        agregarAlCarrito();
    } else if (inicio === 0){
        alert("Muchas gracias por pasar");
    }
}

function calcularTotal() {
    total = (precioTorta * totalUnidadesTorta) + (precioBrownie * totalUnidadesBrownie) + (precioGalletitas * totalUnidadesGalletitas);
    return total;
}

function agregarAlCarrito() {
    let productos = parseInt(prompt("Ingrese el numero del producto que desea comprar: 1- Torta $1500. 2- Brownie $1000. 3- Galletitas $500. Pulse 0 para terminar la compra."));

    while (productos !== 0) {
        switch (productos) {
            case 1:
                unidadesTorta = parseInt(prompt("El producto seleccionado es Torta. Cuántas unidades quiere llevar?"));
                while (unidadesTorta <= 0){
                    alert("Ingrese una cantidad válida.")
                    unidadesTorta = parseInt(prompt("El producto seleccionado es Torta. Cuántas unidades quiere llevar?"));
                }
                alert("Agregaste " + unidadesTorta + " unidades de Torta");
                totalUnidadesTorta += unidadesTorta;

                break;
            case 2:
                unidadesBrownie = parseInt(prompt("El producto seleccionado es Brownie. Cuántas unidades quiere llevar?"));
                while (unidadesBrownie <= 0){
                    alert("Ingrese una cantidad válida.")
                    unidadesBrownie = parseInt(prompt("El producto seleccionado es Brownie. Cuántas unidades quiere llevar?"));
                }
                alert("Agregaste " + unidadesBrownie + " unidades de Brownie");
                totalUnidadesBrownie += unidadesBrownie;

                break;
            case 3:
                unidadesGalletitas = parseInt(prompt("El producto seleccionado es Galletitas. Cuántas unidades quiere llevar?"));
                while (unidadesGalletitas <= 0){
                    alert("Ingrese una cantidad válida.")
                    unidadesGalletitas = parseInt(prompt("El producto seleccionado es Galletitas. Cuántas unidades quiere llevar?"));
                }
                alert("Agregaste " + unidadesGalletitas + " unidades de Galletitas");
                totalUnidadesGalletitas += unidadesGalletitas;

                break;
            default:
                alert("Ingrese un valor válido");
                break;
        }
        productos = parseInt(prompt("Ingrese el numero del producto que desea comprar: 1- Torta $1500. 2- Brownie $1000. 3- Galletita $500. Pulse 0 para terminar la compra."));
    }
    alert("Su carrito:\n" + totalUnidadesTorta + " unidades de Torta a $" + (precioTorta * totalUnidadesTorta) + ". \n"+ totalUnidadesBrownie + " unidades de Brownie a $" + (precioBrownie * totalUnidadesBrownie) + ". \n"+ totalUnidadesGalletitas + " unidades de Galletitas a $" + (precioGalletitas * totalUnidadesGalletitas) + ".\nEl total a abonar es de $" + calcularTotal() + ". ¡Muchas gracias por su compra!");
}


//VARIABLES
let precioTorta = 1500;
let precioBrownie = 1000;
let precioGalletitas = 500;
let unidadesTorta = 0;
let unidadesBrownie = 0;
let unidadesGalletitas = 0;
let totalUnidadesTorta = 0;
let totalUnidadesBrownie = 0;
let totalUnidadesGalletitas = 0;


//INICIO DEL CÓDIGO
let inicio = parseInt(prompt("¡Bienvenido a Candelitte! ¿Desea comprar nuestros productos? Escriba 1 para comprar, 0 para salir."));
bienvenida(inicio);
