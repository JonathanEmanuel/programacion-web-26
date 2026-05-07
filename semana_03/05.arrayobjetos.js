// Antes:
// const productos = ['Teclado', 'Monitor', 'Mouse', 'Camara', 'Pendrive'];
// Ahora
const productos = [
    {id: 1, nombre: 'Teclado', precio: 250, envio: true },
    {id: 2, nombre: 'Monitor', precio: 750, envio: false },
    {id: 3, nombre: 'Mouse',   precio: 100, envio: true },
    {id: 4, nombre: 'Camara',  precio: 350, envio: true },
    {id: 5, nombre: 'Pendrive',  precio: 100, envio: false }
];

console.log(  productos[1].precio );

console.table(productos)

let total = 0;
productos.forEach( producto => {
    const { precio, nombre }  = producto;
    console.log(`Nombre: ${nombre} | Precio:  ${precio}`);
    total = total + precio;
});

console.log(`El total es de $ ${total}`);



// Filrado por valor
const valoresAltos = productos.filter( producto =>  producto.precio >= 250 && producto.envio === true);
console.log('Productos Filtrados');
console.table(valoresAltos);