
let products = [];

const d = document;
const titulo = d.querySelector('h1');
const cantidad = d.querySelector('span');
const contenedorProductos = d.querySelector('#contenedorProductos');
const btnMenor = document.querySelector('#btnMenor');
const btnMayor = document.querySelector('#btnMayor');
const btnModo = document.querySelector('#btnModo');

const secciones = document.querySelectorAll('.contenedor');
const inputBuscar = document.querySelector('#inputBuscar');
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
    console.log('Se hizo click');
    const body = document.querySelector('body');

    body.style.backgroundColor = '#000';
    body.style.padding = '2px';

    for (let i = 0; i < secciones.length; i++) {
        const seccion = secciones[i];
        seccion.style.backgroundColor = '#1e1e1e';
    }
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

function obtenerProductos(){
    const endPoint = 'http://127.0.0.1:4000/products'
    fetch(endPoint)
        .then( resp => resp.json() )
        .then( json => {
            const { data } = json;
            console.log(data);
            mostrarProductos(data);

        }).catch( (error) => {
            console.error(error);
        })
}


obtenerProductos();

//mostrarProductos(products);

btnModo.addEventListener('click', cambiarFondo);
inputBuscar.addEventListener('input', leerInput)

