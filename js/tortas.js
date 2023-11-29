//FUNCIONES
//Clase constructora de los productos
class Producto {
    constructor(nombre, precio, imagen, descripcionImagen, favorito, descripcion) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcionImagen = descripcionImagen;
        this.favorito = favorito;
        this.descripcion = descripcion;
    }
}

//Obtener productos de JSON
function obtenerProductosDeJSON() {
return new Promise((resolve, reject) => {
    fetch('../tortas.json').then((response) => {
        return response.json();
    }).then((responseJson) => {
        for (const producto of responseJson) {
            productos.push(new Producto(...producto));
        }
        resolve();
    });
});
}

//Filtros y búsquedas
function ordenarPorPrecioMenor(){
    const productosMayorPrecio = productos.sort((productoA, productoB) => {
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
    const productosMenorPrecio = productos.sort((productoA, productoB) => {
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

function inicializarInput(){
    const form = document.getElementById("buscador");
    const input = document.getElementById("inputBuscador");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = input.value;

        const productosFiltrados = productos.filter((producto) => {
            return producto
                .nombre
                .toLowerCase()
                .includes(value.toLowerCase());
        });
        renderizarProductos(productosFiltrados);
    });
}

//Renderizado de todos los productos
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
        button.innerText = "VER PRODUCTO"       

        const botonFavoritos = document.createElement("div");
        botonFavoritos.className = "fa-solid fa-heart-circle-plus";

        // Agregar a favoritos
        botonFavoritos.addEventListener("click", () => {
            const esFavorito = estaEnFavoritos(producto);
            if (esFavorito) {
                Toastify({
                    text: "Este producto ya está en favoritos",
                    duration: 2000,
                    gravity: "bottom",
                    position: "left",
                    className: "info",
                    style: {
                        background:  "linear-gradient(to right, #bf5959, #cb8f8f)",
                    }
                }).showToast();
            } else {
                guardarProductoEnLSFavoritos(producto);
                Toastify({
                    text: "Agregado a favoritos",
                    duration: 2000,
                    gravity: "bottom",
                    position: "left",
                    className: "info",
                    style: {
                        background:  "linear-gradient(to right, #bf5959, #cb8f8f)",
                    }
                }).showToast();
            }
        });

        button.addEventListener("click", () =>{
            renderProductoIndividual(producto);
            mostrarProductoIndividual();
        });
        

        divBotones.append(button,botonFavoritos);
        infoProductos.append(h2, p, divBotones);
        divPadre.append(imgProducto,infoProductos);

        contenedor.append(divPadre);


    }
}

function estaEnFavoritos(producto) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    return favoritos.some((favorito) => favorito.nombre === producto.nombre);
}

//Renderizado del producto individual
function renderProductoIndividual(productoIndividual){
    const contenedor = document.getElementById("containerIndividual");
    contenedor.innerHTML = "";
     // Crear overlay
    
        const divPadre = document.createElement("div");
        divPadre.className = "vista";

        const contenedorImg = document.createElement("div");
        contenedorImg.className = "container__img";

        const imgIndividual = document.createElement("img");
        imgIndividual.className = "img__vista";
        imgIndividual.setAttribute("src", productoIndividual.imagen);
        imgIndividual.setAttribute("alt", productoIndividual.descripcionImagen);

        const contenedorInfo = document.createElement("div");
        contenedorInfo.className = "container__info";

        const botonCerrar = document.createElement("div");
        botonCerrar.className = "bi bi-x-circle-fill";

        const h1 = document.createElement("h1");
        h1.className = "name__product";
        h1.innerText = productoIndividual.nombre;

        const p = document.createElement("p");
        p.className = "descripcion";
        p.innerText = productoIndividual.descripcion;

        const precio = document.createElement("p");
        precio.className = "price__product";
        precio.innerHTML=`<strong>$${productoIndividual.precio}</strong>`;

        const contenedorInput = document.createElement("div");
        contenedorInput.className = "container__input";

        const agregarCantidad = document.createElement("div");
        agregarCantidad.className = "bi bi-plus-circle-fill";

        const inputCant = document.createElement("input");
        inputCant.type = "number";
        inputCant.className = "input__cantidad";
        inputCant.value = 1;
        inputCant.min = 1;

        const quitarCantidad = document.createElement("div");
        quitarCantidad.className = "bi bi-dash-circle-fill";

        const containerBoton = document.createElement("div");
        containerBoton.className = "container__button";

        const button = document.createElement("button");
        button.className = "btn__compra";
        button.innerText = "AGREGAR AL CARRITO";

        // Agregar al carrito
        button.addEventListener("click", () => {

        // Obtenemos la cantidad del input
        const cantidad = inputCant.value;

        if(cantidad >= 1){
            // Agregar producto a Local Storage
            guardarProductoEnLS(productoIndividual, cantidad);
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
        } else{
            Swal.fire({
                icon: "error",
                title: "Cantidad incorrecta",
                text: "Ingrese un número válido."
              });
        }            
    });

        // Cerrar producto
        botonCerrar.addEventListener("click", () => {
            limpiarProductoIndividual();
        });

        // Sumar o restar en el input
        agregarCantidad.addEventListener("click", () =>{
            inputCant.value ++;
        });

        quitarCantidad.addEventListener("click", () =>{
            if(inputCant.value <= 1){
                inputCant = 1;
            } else{
                inputCant.value --;
            }
        });

        containerBoton.append(button);
        contenedorInput.append(quitarCantidad,inputCant,agregarCantidad);
        contenedorImg.append(imgIndividual);
        contenedorInfo.append(botonCerrar,h1,p,precio,contenedorInput,containerBoton);
        divPadre.append(contenedorImg,contenedorInfo)
        contenedor.append(divPadre);


    console.log("Se renderizo producto individual");
}

function limpiarProductoIndividual() {
    const contenedor = document.getElementById("containerIndividual");
    contenedor.style.display = "none";
}

function mostrarProductoIndividual() {
    const contenedor = document.getElementById("containerIndividual");
    contenedor.style.display = "flex";
}

//Renderizado del carrito
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
        tdCantidad.innerText = `x${productoCarrito.cantidad}`;

        const tdEliminar = document.createElement("td");

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "fa-solid fa-trash-can";

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

function finalizarCompra(){
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

//Renderizado de favoritos
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

        const tdVerProducto = document.createElement("td");

        const botonVerProducto = document.createElement("button");
        botonVerProducto.className = "bi bi-bag-plus-fill";

        botonVerProducto.addEventListener("click", () => {
            renderProductoIndividual(productoFavoritos);
            mostrarProductoIndividual();
        });

        botonEliminar.addEventListener("click", () =>{
            eliminarProductoFavoritos(productoFavoritos);
            Toastify({
                text: "Eliminado de favoritos",
                duration: 2000,
                gravity: "bottom",
                position: "left",
                className: "info",
                style: {
                    background:  "linear-gradient(to right, #bf5959, #cb8f8f)",
                }
            }).showToast();
        });

        tdImagen.append(tdImagenProducto);
        tdVerProducto.append(botonVerProducto);
        tdEliminar.append(botonEliminar);
        tr.append(tdImagen, tdNombre, tdPrecio, tdVerProducto, tdEliminar);

        tbody.append(tr);
    }

    favoritosVacio();
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

//Obtener y guardar productos en LS para el carrito
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

//Obtener y guardar productos en LS para favoritos
function obtenerProductosEnLSFavoritos(){
    favoritos = JSON.parse(localStorage.getItem("favoritos"));

    if(favoritos) {
        renderizarFavoritos(favoritos);
    }
}

function guardarProductoEnLSFavoritos(producto) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const productoAAgregar = {
        imagen: producto.imagen,
        descripcionImagen: producto.descripcionImagen,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        favorito: producto.favorito
    };

    // No hay productos en local Storage
    if(favoritos === null) {

        favoritos = [productoAAgregar];

    } else {

        // Busco el índice del aproducto en el array del localstorage para editarlo si existe
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

//VARIABLES
const productos = [];

let carrito = [];
let favoritos = [];

//INICIO DEL PROGRAMA
inicializarInput();
inicializarSelect();
obtenerProductosEnLS();
obtenerProductosEnLSFavoritos();
obtenerProductosDeJSON().then(() => {
    renderizarProductos(productos);
 });
