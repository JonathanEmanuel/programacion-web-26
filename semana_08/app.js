import { products} from './data.js'

const d = document;
const titulo = d.querySelector('h1');
const cantidad = d.querySelector('span');
const contenedorProductos = d.querySelector('#contenedorProductos');
cantidad.textContent = products.length;

console.log( products.length);


for (let index = 0; index < products.length; index++) {
    const product = products[index];
    console.log(product);
    contenedorProductos.innerHTML += 
        `<div class="card">
                <img src="${product.img}" alt="${product.name}">
                <h3> ${ product.name }</h3>
                <h4>$ ${ product.price}</h4>
        </div>`;
}

