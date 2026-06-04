import { products} from './data.js'

const d = document;
const titulo = d.querySelector('h1');
const cantidad = d.querySelector('span');
const contenedorProductos = d.querySelector('#contenedorProductos');
const btnAccion = document.querySelector('#btnAccion');
const secciones = document.querySelectorAll('.contenedor');
const inputBuscar = document.querySelector('#inputBuscar');
const spanNombre = document.querySelector('#spanNombre');


function leerInput(){
    let texto = inputBuscar.value;
    mostrarTexto(texto);
}

function mostrarTexto(texto) {
    spanNombre.textContent = texto;
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

btnAccion.addEventListener('click', cambiarFondo);
inputBuscar.addEventListener('input', leerInput)



cantidad.textContent = products.length;

console.log( products.length);


for (let index = 0; index < products.length; index++) {
    const product = products[index];
    contenedorProductos.innerHTML += 
        ` <div class="card">
                <img src="${product.img}" alt="${product.name}">
                <h3> ${ product.name }</h3>
                <h4>$ ${ product.price}</h4>
            </div>`;
}

