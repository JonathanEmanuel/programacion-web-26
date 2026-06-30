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
                </div>`;
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
        console.log(json)

        obtenerProductos();

        inputNombre.value = "";
        inputPrecio.value = "";
        inputFoto.value = "";

     } catch (error) {
        console.log('Error', error);
    }


}

form.addEventListener('submit', guardarProducto )

obtenerProductos();



btnModo.addEventListener('click', cambiarFondo);
btnMenor.addEventListener('click', ordernarMenor);
btnMayor.addEventListener('click', ordernarMayor);

inputBuscar.addEventListener('input', leerInput)

