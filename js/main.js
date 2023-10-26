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

function restaStock(stock){
    return stock - totalUnidades;
}

function fcAgregarAlCarrito() {
    let producto = prompt("Ingrese el nombre del producto que desea agregar al carrito. Presione 0 para volver atrás.");
    while(producto !== "0"){
        if (producto.toLowerCase() == "torta block" || producto.toLowerCase() == "torta cadbury" || producto.toLowerCase() == "chocotorta" || producto.toLowerCase() == "cheesecake" || producto.toLowerCase() == "torta alimonada" || producto.toLowerCase() == "torta snickers"){
            switch(producto){
                case "torta block":
                    precio = tortas[0].precio;
                    unidades = parseInt(prompt("Ingrese cuántas unidades desea agregar."));
                        if (unidades > tortas[0].stock){
                            alert("No contamos con suficiente stock de ese producto.");
                        } else if (unidades <= 0){
                            alert("Ingrese un valor mayor a 0.");
                        }
                    while(unidades > 0 && unidades <= tortas[0].stock){
                        alert("Agregaste " + unidades + " unidades de " + tortas[0].nombre + ".");
                        totalUnidades += unidades;
                        restaStock(tortas[0].stock);
                        carrito.push({producto,unidades,precio});
                        break;
                    }
                    break;
                case "torta cadbury":
                    precio = tortas[1].precio;
                    unidades = parseInt(prompt("Ingrese cuántas unidades desea agregar."));
                        if (unidades > tortas[1].stock){
                            alert("No contamos con suficiente stock de ese producto.");
                        } else if (unidades <= 0){
                            alert("Ingrese un valor mayor a 0.");
                        }
                    while(unidades > 0 && unidades <= tortas[1].stock){
                        alert("Agregaste " + unidades + " unidades de " + tortas[1].nombre + ".");
                        totalUnidades += unidades;
                        restaStock(tortas[1].stock);
                        carrito.push({producto,unidades,precio});
                        break;
                    }
                    break;
                case "chocotorta":
                    precio = tortas[2].precio;
                    unidades = parseInt(prompt("Ingrese cuántas unidades desea agregar."));
                        if (unidades > tortas[2].stock){
                            alert("No contamos con suficiente stock de ese producto.");
                        } else if (unidades <= 0){
                            alert("Ingrese un valor mayor a 0.");
                        }
                    while(unidades > 0 && unidades <= tortas[2].stock){
                        alert("Agregaste " + unidades + " unidades de " + tortas[2].nombre + ".");
                        totalUnidades += unidades;
                        restaStock(tortas[2].stock);
                        carrito.push({producto,unidades,precio});
                        break;
                    }
                    break;
                case "cheesecake":
                    precio = tortas[3].precio;
                    unidades = parseInt(prompt("Ingrese cuántas unidades desea agregar."));
                        if (unidades > tortas[3].stock){
                            alert("No contamos con suficiente stock de ese producto.");
                        } else if (unidades <= 0){
                            alert("Ingrese un valor mayor a 0.");
                        }
                    while(unidades > 0 && unidades <= tortas[3].stock){
                        alert("Agregaste " + unidades + " unidades de " + tortas[3].nombre + ".");
                        totalUnidades += unidades;
                        restaStock(tortas[3].stock);
                        carrito.push({producto,unidades,precio});
                        break;
                    }
                    break;
                case "torta alimonada":
                    precio = tortas[4].precio;
                    unidades = parseInt(prompt("Ingrese cuántas unidades desea agregar."));
                        if (unidades > tortas[4].stock){
                            alert("No contamos con suficiente stock de ese producto.");
                        } else if (unidades <= 0){
                            alert("Ingrese un valor mayor a 0.");
                        }
                    while(unidades > 0 && unidades <= tortas[4].stock){
                        alert("Agregaste " + unidades + " unidades de " + tortas[4].nombre + ".");
                        totalUnidades += unidades;
                        restaStock(tortas[4].stock);
                        carrito.push({producto,unidades,precio});
                        break;
                    }
                    break;
                case "torta snickers":
                    precio = tortas[5].precio;
                    unidades = parseInt(prompt("Ingrese cuántas unidades desea agregar."));
                        if (unidades > tortas[5].stock){
                            alert("No contamos con suficiente stock de ese producto.");
                        } else if (unidades <= 0){
                            alert("Ingrese un valor mayor a 0.");
                        }
                    while(unidades > 0 && unidades <= tortas[5].stock){
                        alert("Agregaste " + unidades + " unidades de " + tortas[5].nombre + ".");
                        totalUnidades += unidades;
                        restaStock(tortas[5].stock);
                        carrito.push({producto,unidades,precio});
                        break;
                    }
                    break;
                default:
                    break;
            }
        } else {
            alert("Producto incorrecto. Asegúrese de ingresar bien el nombre del producto.")
        }
        producto = prompt("Ingrese el nombre del producto que desea agregar al carrito. Presione 0 para volver atrás.");
    }
}

function comprar() {
    const mostrarTortas = tortas.map((producto) => producto.nombre + " $" + producto.precio);
    alert("Nuestra lista de productos:\nSECCIÓN TORTAS:\n" + mostrarTortas.join(" - "));
    let operacionComprar = parseInt(prompt("Ingrese la operación que desea realizar:\n1- AGREGAR UN PRODUCTO AL CARRITO\n2- CONSULTAR MI CARRITO\n3- FINALIZAR LA COMPRA\n4- VOLVER A VER LOS PRODUCTOS\n0- VOLVER AL INICIO"));
    while(operacionComprar !== 0){
        switch(operacionComprar){
            case 1:
                fcAgregarAlCarrito();
                break;
            case 2:
                if(carrito.length > 0){
                    const consultarCarrito = carrito.map((producto) => producto.unidades + " unidades de " + producto.producto + " a $" + producto.precio * producto.unidades);
                    alert("Su carrito:\n" + consultarCarrito.join("\n"));
                } else {
                    alert("Su carrito está vacío. Agregue productos para poder comprar.");
                }
                break;
            case 3:
                if(carrito.length > 0){
                    alert("¡Compra finalizada! Podrá visualizar el resumen de su compra en la consola al salir del programa. ¡Hasta la próxima!");
                    carrito.forEach((carritoFinal) => {
                        console.log(carritoFinal.unidades + " unidades de " + carritoFinal.producto + " a $" + carritoFinal.precio * carritoFinal.unidades);
                    });
                    const total = carrito.reduce((acc,el) => acc + el.precio * el.unidades,0);
                    console.log("El total de su compra es de $" + total + ".");
                } else {
                    alert("Su carrito está vacío. Agregue productos para poder comprar.");
                }
                break;
            case 4:
                alert("Nuestra lista de productos:\nSECCIÓN TORTAS:\n" + mostrarTortas.join(" - "));
                break;
            default:
                alert("Ingrese una operación válida.");
                break;
        }
        operacionComprar = parseInt(prompt("Ingrese la operación que desea realizar:\n1- AGREGAR UN PRODUCTO AL CARRITO\n2- CONSULTAR MI CARRITO\n3- FINALIZAR LA COMPRA\n4- VOLVER A VER LOS PRODUCTOS\n0- VOLVER AL INICIO"));
    }
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
let precio = tortas[0].precio;
let unidades = 0;
let totalUnidades = 0;

// Inicio del programa
let operacion = parseInt(prompt("¡Bienvenido a Candelitte! Ingrese la operación que desea realizar:\n1- COMPRAR\n2- VER LOS PRODUCTOS\n0- SALIR"));

while(operacion !== 0){
    switch(operacion){
        case 1:
            comprar();
            break;

        case 2:
            const mostrarTortas = tortas.map((producto) => producto.nombre + " $" + producto.precio);
            alert("Nuestra lista de productos:\nSECCIÓN TORTAS:\n" + mostrarTortas.join(" - "));
            break;
            
        default:
            alert("Ingrese una operación válida.");
            break;
    }
    operacion = parseInt(prompt("¡Bienvenido a Candelitte! Ingrese la operación que desea realizar:\n1- COMPRAR\n2- VER LOS PRODUCTOS\n0- SALIR"));
}
if(operacion === 0){
    alert("Muchas gracias por entrar a nuestra web, ¡hasta la próxima!");
}

console.log(carrito);