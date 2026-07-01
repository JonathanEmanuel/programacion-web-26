const d = document;
const titulo = d.querySelector('h1');
const cantidad = d.querySelector('span');
const contenedorProductos = d.querySelector('#contenedorProductos');
const btnMenor = document.querySelector('#btnMenor');
const btnMayor = document.querySelector('#btnMayor');
const btnModo = document.querySelector('#btnModo');
const form = document.querySelector('#formProducto')
const secciones = document.querySelectorAll('.contenedor');
const inputBuscar = document.querySelector('#inputBuscar');
const inputNombre = document.querySelector('#inputNombre');
const inputPrecio = document.querySelector('#inputPrecio');
const inputFoto = document.querySelector('#inputFoto');


const spanNombre = document.querySelector('#spanNombre');

let idEditar = null;
let productos = [];

function leerInput(){
    let texto = inputBuscar.value.trim().toLowerCase();
    filtrarProductos(texto);
}

function filtrarProductos(texto) {
    let listAux = [];
    for(let i=0; i< products.length; i++){
        const product = products[i];
        if( product.name.toLowerCase().includes( texto )){
            listAux.push( product);
        }
    }
    mostrarProductos(listAux);
}

function cambiarFondo(){
    const body = document.querySelector('body');
    body.classList.toggle('dark');  
}

async function eliminarProducto( btn ){
    const id = btn.target.dataset.id
    const respuesta = confirm("¿Confirma eliminar el Producto?");
    if( !respuesta){
        return;
    }

    const endPoint = `http://127.0.0.1:4000/products/${id}`;

    try {
        const resp = await fetch(endPoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await resp.json();
        const  { data } = json;
        console.log( data);
        obtenerProductos();

     } catch (error) {
        console.log('Error', error);
    }

}

function editarProducto ( btn){
    const id = btn.target.dataset.id
    console.log('Editando: ', id)
    const producto = productos.find( p => p._id == id);
    console.log(producto);
    idEditar = producto._id;
    inputNombre.value = producto.name;
    inputPrecio.value = producto.price;
    inputFoto.value = producto.photo;

}

function mostrarProductos(products){
    cantidad.textContent = products.length;
    contenedorProductos.innerHTML = "";

    if( products.length == 0 ){
        contenedorProductos.innerHTML = '<h4> No se encontraron Resultados</h4>';
        return;
    }
    for (let index = 0; index < products.length; index++) {
        const product = products[index];
        contenedorProductos.innerHTML += 
            ` <div class="card">
                    <img src="${product.photo}" alt="${product.name}">
                    <h3> ${ product.name }</h3>
                    <h4>$ ${ product.price}</h4>
                    <div class="acciones">
                        <button class="btn btnEditar"  data-id="${ product._id }"> Editar </button>
                        <button class="btn btnEliminar"  data-id="${ product._id }"> Eliminar </button>

                    </div>
                </div>`;
    }

    const btnsElminar = document.querySelectorAll('.btnEliminar');
    for(let i=0; i< btnsElminar.length; i++){
        const btnElminar = btnsElminar[i];
        btnElminar.addEventListener('click', eliminarProducto)
    }

    const btnsEditar = document.querySelectorAll('.btnEditar');
    for(let i=0; i< btnsEditar.length; i++){
        const btnEditar = btnsEditar[i];
        btnEditar.addEventListener('click', editarProducto)
    }

}

function ordernarMenor(){
    // console.log('Ordenar Menor');
    products.sort( (a, b) => { return a.price - b.price } );
    // console.table(products);
    mostrarProductos(products);
}

function ordernarMayor(){
    // console.log('Ordenar Mayor');
    products.sort( (a, b) => { return  b.price - a.price} );
    // console.table(products);
    mostrarProductos(products);
}

async function obtenerProductos(){
    const endPoint = 'http://127.0.0.1:4000/products';

    try {
        const resp = await fetch(endPoint);
        const json = await resp.json();
        const  { data } = json;
        productos = data;
        mostrarProductos(data);

     } catch (error) {
        console.log('Error', error);
    }
}


async function guardarProducto(event) {
    event.preventDefault();
    const producto = {
        name: inputNombre.value,
        price: inputPrecio.value,
        photo: inputFoto.value
    }

    if( idEditar==null){
        const endPoint = 'http://127.0.0.1:4000/products';

        try {
            const resp = await fetch(endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
            const json = await resp.json();
            //console.log(json)

        } catch (error) {
            console.log('Error', error);
        }
    } else {
        const endPoint = `http://127.0.0.1:4000/products/${idEditar}`;

        try {
            const resp = await fetch(endPoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)

            });
            const json = await resp.json();
            const  { data } = json;
            console.log( data);

        } catch (error) {
            console.log('Error', error);
        }
    }

    idEditar = null;
    inputNombre.value = "";
    inputPrecio.value = "";
    inputFoto.value = "";
    obtenerProductos();
   

}

form.addEventListener('submit', guardarProducto )

obtenerProductos();



btnModo.addEventListener('click', cambiarFondo);
btnMenor.addEventListener('click', ordernarMenor);
btnMayor.addEventListener('click', ordernarMayor);

inputBuscar.addEventListener('input', leerInput)

