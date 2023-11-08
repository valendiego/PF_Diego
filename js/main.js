// Funciones / Clases(objetos)
class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    mostrarProducto() {
        alert("El producto seleccionado es " + this.nombre + ", el precio es de $" + this.precio + " y hay un stock de " + this.stock + " unidades.");
    }
}

function consultarCarriito() {
    const consultarCarrito = carrito.map((producto) => producto.unidades + " unidades de " + producto.producto + " a $" + producto.precio * producto.unidades);
    return "Su carrito:\n" + consultarCarrito.join("\n");
}

function finalizarCompra() {
    const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
    return "¡Compra finalizada!\n" + consultarCarriito() + "\nEl total de su compra es de: $" + total + "\n¡Hasta la próxima!";
}

function casoParaEmpujarAlCarrito(indice, producto) {
    precio = tortas[indice].precio;
    unidades = parseInt(prompt("Ingrese cuántas unidades desea agregar."));
    totalUnidades += unidades;
    if (unidades > tortas[indice].stock) {
        alert("No contamos con suficiente stock de ese producto.");
    } else if (unidades <= 0) {
        alert("Ingrese un valor mayor a 0.");
    }
    while (unidades > 0 && unidades <= tortas[indice].stock) {
        alert("Agregaste " + unidades + " unidades de " + tortas[indice].nombre + ".");
        totalUnidades += unidades;
        tortas[0].stock -= unidades;
        carrito.push({ producto, unidades, precio });
        break;
    }
}

function restaStock(stock) {
    return stock - totalUnidades;
}

function eliminarDelCarrito(nombreProducto) {
    const indiceProducto = carrito.findIndex(producto => producto.producto.toLowerCase() === nombreProducto.toLowerCase());

    if (indiceProducto !== -1) {
        const unidadesEliminadas = carrito[indiceProducto].unidades;
        carrito.splice(indiceProducto, 1);

        const indiceTorta = tortas.findIndex(torta => torta.nombre.toLowerCase() === nombreProducto.toLowerCase());
        if (indiceTorta !== -1) {
            tortas[indiceTorta].stock += unidadesEliminadas;
        }

        alert("Se eliminaron " + unidadesEliminadas + " unidades de " + nombreProducto + " del carrito.");
    } else {
        alert("El producto " + nombreProducto + " no está en el carrito.");
    }
}

function fcAgregarAlCarrito() {
    let producto = prompt("Ingrese el nombre del producto que desea agregar al carrito. Presione 0 para volver atrás.\nNuestra lista de productos:\n" + mostrarTortas.join(" - ")).toLowerCase();
    while (producto !== "0") {


        switch (producto.toLowerCase()) {
            case "torta block":
                casoParaEmpujarAlCarrito(0, producto);
                break;
            case "torta cadbury":
                casoParaEmpujarAlCarrito(1, producto);
                break;
            case "chocotorta":
                casoParaEmpujarAlCarrito(2, producto);
                break;
            case "cheesecake":
                casoParaEmpujarAlCarrito(3, producto);
                break;
            case "torta alimonada":
                casoParaEmpujarAlCarrito(4, producto);
                break;
            case "torta snickers":
                casoParaEmpujarAlCarrito(5, producto);
                break;
            default:
                alert("Producto incorrecto. Asegúrese de ingresar bien el nombre del producto.")
                break;
        }

        producto = prompt("Ingrese el nombre del producto que desea agregar al carrito. Presione 0 para volver atrás.\nNuestra lista de productos:\n" + mostrarTortas.join(" - ")).toLowerCase();
    }
}

function tienda() {
    let operacion = parseInt(prompt("¡Bienvenido a Candelitte! Ingrese la operación que desea realizar:\n1- AGREGAR UN PRODUCTO AL CARRITO\n2- ELIMINAR UN PRODUCTO DEL CARRITO\n3- CONSULTAR MI CARRITO\n4- FINALIZAR LA COMPRA\n0- SALIR"));
    while (operacion !== 0) {
        switch (operacion) {
            case 1:
                fcAgregarAlCarrito();
                break;
            case 2:
                const productoEliminar = prompt("Ingrese el nombre del producto que desea eliminar del carrito.");
                eliminarDelCarrito(productoEliminar);
                break;
            case 3:
                if (carrito.length > 0) {
                    alert(consultarCarriito());
                } else {
                    alert("Su carrito está vacío.");
                }
                break;
            case 4:
                if (carrito.length > 0) {
                    alert(finalizarCompra());
                } else {
                    alert("Su carrito está vacío. No hay productos que eliminar.");
                }
                break;
            default:
                alert("Ingrese una operación válida.");
                break;
        }
        operacion = parseInt(prompt("¡Bienvenido a Candelitte! Ingrese la operación que desea realizar:\n1- AGREGAR UN PRODUCTO AL CARRITO\n2- ELIMINAR UN PRODUCTO DEL CARRITO\n3- CONSULTAR MI CARRITO\n4- FINALIZAR LA COMPRA\n0- SALIR"));
    }

    alert("Muchas gracias por entrar a nuestra web. ¡Hasta la próxima!")
}

// Variables
const tortas = [
    new Producto("Torta Block", 1450, 5),
    new Producto("Torta Cadbury", 1350, 8),
    new Producto("Chocotorta", 1250, 6),
    new Producto("Cheesecake", 1150, 9),
    new Producto("Torta Alimonada", 1450, 4),
    new Producto("Torta Snickers", 1550, 10),
];

const carrito = [];
const mostrarTortas = tortas.map((producto) => producto.nombre + " $" + producto.precio);
let precio = tortas[0].precio;
let unidades = 0;
let totalUnidades = 0;
let eliminarUnidades = 0;

// Inicio del programa
tienda();