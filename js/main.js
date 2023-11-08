
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

    renderizarProductos(tortas);
    inicializarInput();
    inicializarSelect();
    obtenerProductosEnLS();
    console.log(carrito);