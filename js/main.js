
class Producto {
    constructor(nombre, precio, imagen, descripcionImagen, favorito) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcionImagen = descripcionImagen;
        this.favorito = false;
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

        const botonFavoritos = document.createElement("div");
        botonFavoritos.className = producto.favorito ? "bi-suit-heart-fill" : "bi-suit-heart";


        // Agregar a favoritos
        botonFavoritos.addEventListener("click", () => {
            if (producto.favorito) {
                eliminarProductoFavoritos(producto);
            } else {
                guardarProductoEnLSFavoritos(producto);
            }
            producto.favorito = !producto.favorito; // Alternar estado de favorito
            cambiarClasesCorazon(botonFavoritos, producto.favorito);

            Toastify({
                text: producto.favorito ? "Agregado a favoritos" : "Eliminado de favoritos",
                duration: 2000,
                gravity: "bottom",
                position: "left",
                className: "info",
                style: {
                    background:  "linear-gradient(to right, #bf5959, #cb8f8f)",
                }
            }).showToast();
        });
        // Modificar clases según si está en favoritos o no

        
        // Agregar al carrito
        button.addEventListener("click", () => {

            // Obtenemos la cantidad del input
            const cantidad = inputCantidad.value;

            if(cantidad < 1){
                alert("Ingrese un número válido.");
            }

            // Agregar producto a Local Storage
            guardarProductoEnLS(producto, cantidad);

            // Agregar notificación de Toastify
            Toastify({
                text: "Producto agregado",
                duration: 2000,
                gravity: "bottom",
                position: "left",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
        });

        divBotones.append(button, inputCantidad);
        infoProductos.append(h2, p, divBotones);
        divPadre.append(imgProducto,infoProductos,botonFavoritos);

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
    }

    function carritoLleno(){
        const lleno = document.getElementById("carritoLleno");
        
        if(carrito.length <= 0){
            lleno.classList.add("d-none");


        } else {
            lleno.classList.remove("d-none");
        }
    }

    function favoritosVacio(){
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const vacio = document.getElementById("favoritosVacio");
        vacio.className = "vacio";

        if(favoritos.length > 0){
            vacio.classList.add("d-none"); 

        } else {
            vacio.classList.remove("d-none");
        }
    }

    function favoritosLleno(){
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const lleno = document.getElementById("favoritosLleno");
        lleno.className = "lleno";
        
        if(favoritos.length <= 0){
            lleno.classList.add("d-none");


        } else {
            lleno.classList.remove("d-none");
        }
    }

    

    function calcularSubtotalCarrito(productosCarrito){
        const subtotal = productosCarrito.reduce((acc,producto) =>{
            return acc + producto.precio * producto.cantidad;
        }, 0);
        return subtotal;
    }

    function mostrarSubtotal(productosCarrito){
        const subtotalCompra =  calcularSubtotalCarrito(productosCarrito)
        const subtotal = document.getElementById("subtotal");
        subtotal.innerText = `Subtotal: $${subtotalCompra}`;

        if(carrito.length <= 0){
            subtotal.classList.add("d-none");


        } else {
            subtotal.classList.remove("d-none");
        }
    }

    function calcularIva(productosCarrito){
        const ivaCompra = productosCarrito.reduce((acc,producto) =>{
            return acc + producto.precio * producto.cantidad * 21 / 100;
        }, 0);
        return ivaCompra;
    }

    function mostrarIva(productosCarrito){
        const ivaCompra =  calcularIva(productosCarrito)
        const iva = document.getElementById("iva");
        iva.innerText = `IVA 21%: $${ivaCompra}`;

        if(carrito.length <= 0){
            iva.classList.add("d-none");


        } else {
            iva.classList.remove("d-none");
        }
    }

    function calcularTotal(productosCarrito){
        const totalCompra = productosCarrito.reduce((acc,producto) =>{
            return acc + producto.precio * producto.cantidad * 1.21;
        }, 0);
        return totalCompra;
    }

    function mostrarTotal(productosCarrito){
        const contenedorTotales = document.getElementById("contenedorTotales");
        const totalCompra =  calcularTotal(productosCarrito)
        const total = document.getElementById("total");
        total.innerText = `TOTAL: $${totalCompra}`;

        if(carrito.length <= 0){
            total.classList.add("d-none");
            contenedorTotales.classList.add("d-none");


        } else {
            total.classList.remove("d-none");
            contenedorTotales.classList.remove("d-none");
        }
    }

    function finalizarCompra(productosCarrito){
        const botonFinalizarCompra = document.getElementById("finalizarCompra");
        botonFinalizarCompra.className = "btn btn-danger";

        if(carrito.length <= 0){
            botonFinalizarCompra.classList.add("d-none");


        } else {
            botonFinalizarCompra.classList.remove("d-none");
        }

        botonFinalizarCompra.addEventListener("click", () => {
            carrito = [];

            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Mostrar alerta de Sweet Alert
            Swal.fire({
                title: "¡Muchas gracias por su compra!",
                text: "En breve le estará llegando un mail para seguir su pedido.",
                icon: "success"
              });

            renderizarCarrito(carrito);
        });
    }
    

    function renderizarCarrito(productosCarrito){

        carritoLleno();

        const tbody = document.querySelector("#carrito table tbody");
        tbody.innerHTML = "";

        mostrarSubtotal(productosCarrito);
        mostrarIva(productosCarrito);
        mostrarTotal(productosCarrito);
        finalizarCompra(productosCarrito);

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

        const contadorCarrito = document.getElementById("contadorCarrito");
        contadorCarrito.innerText = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        
        carritoVacio();
    }

    function renderizarFavoritos(productosFavoritos){

        favoritosLleno();

        const tbody = document.querySelector("#favoritos table tbody");
        tbody.innerHTML = "";

        for (const productoFavoritos of productosFavoritos){

            const tr = document.createElement("tr");

            const tdImagen = document.createElement("td");

            const tdImagenProducto = document.createElement("img");
            tdImagenProducto.className = "imagen__carrito";
            tdImagenProducto.setAttribute("src", productoFavoritos.imagen);
            tdImagenProducto.setAttribute("alt", productoFavoritos.descripcionImagen);

            const tdNombre = document.createElement("td");
            tdNombre.innerText = productoFavoritos.nombre;

            const tdPrecio = document.createElement("td");
            tdPrecio.innerText = `$${productoFavoritos.precio}`;

            const tdEliminar = document.createElement("td");

            const botonEliminar = document.createElement("button");
            botonEliminar.className = "fa-solid fa-trash-can";

            botonEliminar.addEventListener("click", () => {
                eliminarProductoFavoritos(productoFavoritos);
            });


            tdImagen.append(tdImagenProducto);
            tdEliminar.append(botonEliminar);
            tr.append(tdImagen, tdNombre, tdPrecio, tdEliminar);

            tbody.append(tr);
        }
        
        favoritosVacio();
    }
    
    function cambiarClasesCorazon(botonFavoritos, enFavoritos) {
        if (botonFavoritos) {
            if (enFavoritos) {
                botonFavoritos.classList.remove("bi-suit-heart");
                botonFavoritos.classList.add("bi-suit-heart-fill");
            } else {
                botonFavoritos.classList.remove("bi-suit-heart-fill");
                botonFavoritos.classList.add("bi-suit-heart");
            }
        }
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

    function eliminarProductoFavoritos(producto) {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        // Busco el producto a eliminar del carrito por el nombre
        const indiceProductoAEliminar = favoritos.findIndex( (el) => {
            return producto.nombre === el.nombre;
        });
    
        // Si el índice del producto a eliminar existe
        if(indiceProductoAEliminar !== -1) {
    
            // Elimino el producto del carrito
            favoritos.splice(indiceProductoAEliminar, 1);
    
            // Actualizo localStorage
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
    
            renderizarFavoritos(favoritos);
        }
    }
    
    function obtenerProductosEnLS() {

        carrito = JSON.parse(localStorage.getItem("carrito"));

        if(carrito) {
            renderizarCarrito(carrito);
        }
    }

    function obtenerProductosEnLSFavoritos(){
        favoritos = JSON.parse(localStorage.getItem("favoritos"));

        if(favoritos) {
            renderizarFavoritos(favoritos);
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

    function guardarProductoEnLSFavoritos(producto) {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        const productoAAgregar = {
            imagen: producto.imagen,
            descripcionImagen: producto.descripcionImagen,
            nombre: producto.nombre,
            precio: producto.precio
        };
    
        // No hay productos en local Storage
        if(favoritos === null) {
    
            favoritos = [productoAAgregar];
    
        } else {
    
            // Busco el índice del producto en el array del localstorage para editarlo si existe
            const indiceExisteProducto = favoritos.findIndex( (el) => {
                return el.nombre === productoAAgregar.nombre;
            });
    
            // Si el producto no existe en el localstorage, lo agrego
            if(indiceExisteProducto === -1) {
                favoritos.push(productoAAgregar);
            }
        }
    
        // Actualizo localStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    
        renderizarFavoritos(favoritos);
    
    }

const tortas = [
        new Producto("Torta Block", 1450, "./resources/block.jpg", "Torta Block", false),
        new Producto("Torta Cadbury", 1350, "./resources/cadbury.jpg", "Torta Cadbury", false),
        new Producto("Chocotorta", 1250, "./resources/chocotorta.jpg", "Chocotorta", false),
        new Producto("Cheesecake", 1150, "./resources/cheesecake.jpg", "Cheesecake", false),
        new Producto("Torta Alimonada", 1450, "./resources/alimonada.jpg", "Torta Alimonada", false),
        new Producto("Torta Snickers", 1550, "./resources/snickers.jpg", "Torta Snickers", false),
    ];
    
    let carrito = [];
    let favoritos = [];

    renderizarProductos(tortas);
    inicializarInput();
    inicializarSelect();
    obtenerProductosEnLS();
    obtenerProductosEnLSFavoritos();
    console.log(carrito);
