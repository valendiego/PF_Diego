// // Funciones / Clases(objetos)
// class Producto {
//     constructor(nombre, precio, stock) {
//         this.nombre = nombre;
//         this.precio = precio;
//         this.stock = stock;
//     }

//     mostrarProducto() {
//         alert("El producto seleccionado es " + this.nombre + ", el precio es de $" + this.precio + " y hay un stock de " + this.stock + " unidades.");
//     }
// }

// function consultarCarriito() {
//     const consultarCarrito = carrito.map((producto) => producto.unidades + " unidades de " + producto.producto + " a $" + producto.precio * producto.unidades);
//     return "Su carrito:\n" + consultarCarrito.join("\n");
// }

// function finalizarCompra() {
//     const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
//     return "¡Compra finalizada!\n" + consultarCarriito() + "\nEl total de su compra es de: $" + total + "\n¡Hasta la próxima!";
// }

// function casoParaEmpujarAlCarrito(indice, producto) {
//     precio = tortas[indice].precio;
//     unidades = parseInt(prompt("Ingrese cuántas unidades desea agregar."));
//     totalUnidades += unidades;
//     if (unidades > tortas[indice].stock) {
//         alert("No contamos con suficiente stock de ese producto.");
//     } else if (unidades <= 0) {
//         alert("Ingrese un valor mayor a 0.");
//     }
//     while (unidades > 0 && unidades <= tortas[indice].stock) {
//         alert("Agregaste " + unidades + " unidades de " + tortas[indice].nombre + ".");
//         totalUnidades += unidades;
//         tortas[0].stock -= unidades;
//         carrito.push({ producto, unidades, precio });
//         break;
//     }
// }

// function restaStock(stock) {
//     return stock - totalUnidades;
// }

// function eliminarDelCarrito(nombreProducto) {
//     const indiceProducto = carrito.findIndex(producto => producto.producto.toLowerCase() === nombreProducto.toLowerCase());

//     if (indiceProducto !== -1) {
//         const unidadesEliminadas = carrito[indiceProducto].unidades;
//         carrito.splice(indiceProducto, 1);

//         const indiceTorta = tortas.findIndex(torta => torta.nombre.toLowerCase() === nombreProducto.toLowerCase());
//         if (indiceTorta !== -1) {
//             tortas[indiceTorta].stock += unidadesEliminadas;
//         }

//         alert("Se eliminaron " + unidadesEliminadas + " unidades de " + nombreProducto + " del carrito.");
//     } else {
//         alert("El producto " + nombreProducto + " no está en el carrito.");
//     }
// }

// function fcAgregarAlCarrito() {
//     let producto = prompt("Ingrese el nombre del producto que desea agregar al carrito. Presione 0 para volver atrás.\nNuestra lista de productos:\n" + mostrarTortas.join(" - ")).toLowerCase();
//     while (producto !== "0") {


//         switch (producto.toLowerCase()) {
//             case "torta block":
//                 casoParaEmpujarAlCarrito(0, producto);
//                 break;
//             case "torta cadbury":
//                 casoParaEmpujarAlCarrito(1, producto);
//                 break;
//             case "chocotorta":
//                 casoParaEmpujarAlCarrito(2, producto);
//                 break;
//             case "cheesecake":
//                 casoParaEmpujarAlCarrito(3, producto);
//                 break;
//             case "torta alimonada":
//                 casoParaEmpujarAlCarrito(4, producto);
//                 break;
//             case "torta snickers":
//                 casoParaEmpujarAlCarrito(5, producto);
//                 break;
//             default:
//                 alert("Producto incorrecto. Asegúrese de ingresar bien el nombre del producto.")
//                 break;
//         }

//         producto = prompt("Ingrese el nombre del producto que desea agregar al carrito. Presione 0 para volver atrás.\nNuestra lista de productos:\n" + mostrarTortas.join(" - ")).toLowerCase();
//     }
// }

// function tienda() {
//     let operacion = parseInt(prompt("¡Bienvenido a Candelitte! Ingrese la operación que desea realizar:\n1- AGREGAR UN PRODUCTO AL CARRITO\n2- ELIMINAR UN PRODUCTO DEL CARRITO\n3- CONSULTAR MI CARRITO\n4- FINALIZAR LA COMPRA\n0- SALIR"));
//     while (operacion !== 0) {
//         switch (operacion) {
//             case 1:
//                 fcAgregarAlCarrito();
//                 break;
//             case 2:
//                 const productoEliminar = prompt("Ingrese el nombre del producto que desea eliminar del carrito.");
//                 eliminarDelCarrito(productoEliminar);
//                 break;
//             case 3:
//                 if (carrito.length > 0) {
//                     alert(consultarCarriito());
//                 } else {
//                     alert("Su carrito está vacío.");
//                 }
//                 break;
//             case 4:
//                 if (carrito.length > 0) {
//                     alert(finalizarCompra());
//                 } else {
//                     alert("Su carrito está vacío. No hay productos que eliminar.");
//                 }
//                 break;
//             default:
//                 alert("Ingrese una operación válida.");
//                 break;
//         }
//         operacion = parseInt(prompt("¡Bienvenido a Candelitte! Ingrese la operación que desea realizar:\n1- AGREGAR UN PRODUCTO AL CARRITO\n2- ELIMINAR UN PRODUCTO DEL CARRITO\n3- CONSULTAR MI CARRITO\n4- FINALIZAR LA COMPRA\n0- SALIR"));
//     }

//     alert("Muchas gracias por entrar a nuestra web. ¡Hasta la próxima!")
// }

// // Variables
// const tortas = [
//     new Producto("Torta Block", 1450, 5),
//     new Producto("Torta Cadbury", 1350, 8),
//     new Producto("Chocotorta", 1250, 6),
//     new Producto("Cheesecake", 1150, 9),
//     new Producto("Torta Alimonada", 1450, 4),
//     new Producto("Torta Snickers", 1550, 10),
// ];

// const carrito = [];
// const mostrarTortas = tortas.map((producto) => producto.nombre + " $" + producto.precio);
// let precio = tortas[0].precio;
// let unidades = 0;
// let totalUnidades = 0;
// let eliminarUnidades = 0;

// // Inicio del programa
// tienda();

class Producto {
    constructor(nombre, precio, stock, imagen, descripcionImagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.descripcionImagen = descripcionImagen;
    }

    mostrarProducto() {
        alert("El producto seleccionado es " + this.nombre + ", el precio es de $" + this.precio + " y hay un stock de " + this.stock + " unidades.");
    }
}

function renderizarProductos(arreglo){
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    for(const producto of arreglo){

        const divPadre = document.createElement("div");
        divPadre.className = "products";

        const imgProducto = document.createElement("img");
        imgProducto.className = "img__products";
        imgProducto.setAttribute("src", producto.imagen);
        imgProducto.setAttribute("alt", producto.descripcionImagen);

        const infoProductos = document.createElement("div");
        infoProductos.className = "info__products";

        const h2 = document.createElement("h2");
        h2.className = "name__product";
        h2.innerText = producto.nombre;

        const p = document.createElement("p");
        p.className = "price";
        p.innerHTML = `<strong>$${producto.precio}</strong>`;

        const divBotones = document.createElement("div");
        divBotones.className = "div__botones";

        const button = document.createElement("button");
        button.className = "btn__product";
        button.innerText = "AÑADIR AL CARRITO"

        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.className = "form-control";
        inputCantidad.value = 1;
        inputCantidad.min = 1;

        // Agregar al carrito
        button.addEventListener("click", () => {

            // Obtenemos la cantidad del input
            const cantidad = inputCantidad.value;

            if(cantidad < 1){
                alert("Ingrese un número válido.");
            }

            if(cantidad > producto.stock) {

                alert("NO HAY SUFICIENTE STOCK");

            } else {

                // Agregar producto a Local Storage
                guardarProductoEnLS(producto, cantidad);
            }


        });

        divBotones.append(button, inputCantidad);
        infoProductos.append(h2, p, divBotones);
        divPadre.append(imgProducto,infoProductos);

        contenedor.append(divPadre);


    }
}

    function inicializarInput(){
        const input = document.getElementById("buscarProductos");
        
        input.addEventListener("keyup", () => {
            const value = input.value;

            const productosFiltrados = tortas.filter((producto) => {
                return producto
                    .nombre
                    .toLowerCase()
                    .includes(value.toLowerCase());
            });
            renderizarProductos(productosFiltrados);
        });
    }

    function ordenarPorPrecioMenor(){
        const productosMayorPrecio = tortas.sort((productoA, productoB) => {
            if(productoA.precio > productoB.precio){
                return 1;
            } else if (productoA.precio < productoB.precio){
                return -1;
            }

            return 0;
        });
        renderizarProductos(productosMayorPrecio);
    }

    function ordenarPorPrecioMayor(){
        const productosMenorPrecio = tortas.sort((productoA, productoB) => {
            if(productoA.precio < productoB.precio){
                return 1;
            } else if (productoA.precio > productoB.precio){
                return -1;
            }

            return 0;
        });
        renderizarProductos(productosMenorPrecio);
    }

    function inicializarSelect(){
        const select = document.getElementById("selectOrden");

        select.addEventListener("change", () => {
            const value = select.value;
            switch(value){

                case "precioMayor":
                    ordenarPorPrecioMayor();
                    break;

                case "precioMenor":
                    ordenarPorPrecioMenor();
                    break;
            }
        });
    }

    function carritoVacio(){
        const vacio = document.getElementById("carritoVacio");
        vacio.className = "carrito__vacio";
        if(carrito.length > 0){
            vacio.classList.add("d-none"); 

        } else {
            vacio.classList.remove("d-none");

        }
        renderizarCarrito(carrito);
    }

    function renderizarCarrito(productosCarrito){
        const tbody = document.querySelector("#carrito table tbody");
        tbody.innerHTML = "";


        for (const productoCarrito of productosCarrito){

            const tr = document.createElement("tr");

            const tdImagen = document.createElement("td");

            const tdImagenProducto = document.createElement("img");
            tdImagenProducto.className = "imagen__carrito";
            tdImagenProducto.setAttribute("src", productoCarrito.imagen);
            tdImagenProducto.setAttribute("alt", productoCarrito.descripcionImagen);

            const tdNombre = document.createElement("td");
            tdNombre.innerText = productoCarrito.nombre;

            const tdPrecio = document.createElement("td");
            tdPrecio.innerText = `$${productoCarrito.precio}`;

            const tdCantidad = document.createElement("td");
            tdCantidad.innerText = productoCarrito.cantidad;

            const tdEliminar = document.createElement("td");

            const botonEliminar = document.createElement("button");
            botonEliminar.className = "btn btn-sm btn-danger ";
            botonEliminar.innerText = "ELIMINAR";

            botonEliminar.addEventListener("click", () => {
                eliminarProducto(productoCarrito);
            });


            tdImagen.append(tdImagenProducto);
            tdEliminar.append(botonEliminar);
            tr.append(tdImagen, tdNombre, tdPrecio, tdCantidad, tdEliminar);

            tbody.append(tr);
        }
        carritoVacio();
    }
    
    function eliminarProducto(producto) {

        // Busco el producto a eliminar del carrito por el nombre
        const indiceProductoAEliminar = carrito.findIndex( (el) => {
            return producto.nombre === el.nombre;
        });
    
        // Si el índice del producto a eliminar existe
        if(indiceProductoAEliminar !== -1) {
    
            // Elimino el producto del carrito
            carrito.splice(indiceProductoAEliminar, 1);
    
            // Actualizo localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));
    
            renderizarCarrito(carrito);
        }
    }
    
    function obtenerProductosEnLS() {

        carrito = JSON.parse(localStorage.getItem("carrito"));

        if(carrito) {
            renderizarCarrito(carrito);
        }
    }

    function guardarProductoEnLS(producto, cantidad) {

        const productoAAgregar = {
            imagen: producto.imagen,
            descripcionImagen: producto.descripcionImagen,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: parseInt(cantidad),
        };
    
        // No hay productos en local Storage
        if(carrito === null) {
    
            carrito = [productoAAgregar];
    
        } else {
    
            // Busco el índice del producto en el array del localstorage para editarlo si existe
            const indiceExisteProducto = carrito.findIndex( (el) => {
                return el.nombre === productoAAgregar.nombre;
            });
    
            // Si el producto no existe en el localstorage, lo agrego
            if(indiceExisteProducto === -1) {
                carrito.push(productoAAgregar);
            } else {
                // Si existe, a la cantidad del producto que está en localstorage, le sumo la nueva cantidad
                carrito[indiceExisteProducto].cantidad += parseInt(cantidad);
            }
        }
    
        // Actualizo localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
    
        renderizarCarrito(carrito);
    
    }

const tortas = [
        new Producto("Torta Block", 1450, 5, "../resources/block.jpg", "Torta Block"),
        new Producto("Torta Cadbury", 1350, 8, "../resources/cadbury.jpg", "Torta Cadbury"),
        new Producto("Chocotorta", 1250, 6, "../resources/chocotorta.jpg", "Chocotorta"),
        new Producto("Cheesecake", 1150, 9, "../resources/cheesecake.jpg", "Cheesecake"),
        new Producto("Torta Alimonada", 1450, 4, "../resources/alimonada.jpg", "Torta Alimonada"),
        new Producto("Torta Snickers", 1550, 10, "../resources/snickers.jpg", "Torta Snickers"),
    ];
    
    let carrito = [];
    const mostrarTortas = tortas.map((producto) => producto.nombre + " $" + producto.precio);
    let precio = tortas[0].precio;
    let unidades = 0;
    let totalUnidades = 0;
    let eliminarUnidades = 0;

    renderizarProductos(tortas);
    inicializarInput();
    inicializarSelect();
    obtenerProductosEnLS();
    console.log(carrito);