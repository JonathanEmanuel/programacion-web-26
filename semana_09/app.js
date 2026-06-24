import { products} from './data.js'

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
                    <img src="${product.img}" alt="${product.name}">
                    <h3> ${ product.name }</h3>
                    <h4>$ ${ product.price}</h4>
                </div>`;
    }

}

function ordernarMenor(){
    console.log('Ordenar Menor');
    products.sort( (a, b) => { return a.price - b.price } );
    console.table(products);
    mostrarProductos(products);
}

function ordernarMayor(){
    console.log('Ordenar Mayor');
    products.sort( (a, b) => { return  b.price - a.price} );
    console.table(products);
    mostrarProductos(products);
}

mostrarProductos(products);

btnModo.addEventListener('click', cambiarFondo);
btnMenor.addEventListener('click', ordernarMenor);
btnMayor.addEventListener('click', ordernarMayor);

inputBuscar.addEventListener('input', leerInput)

