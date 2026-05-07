const productos = ['Teclado', 'Monitor', 'Mouse', ['a', 'b', 'c'], 'Camara', 'Pendrive'];

// console.log(productos[3][1]);
/* 
console.log(productos[0]);
console.log(productos[1]);
console.log(productos[2]);
 */
console.log('Elementos ', productos.length);

/* 
for(let i=0; i< productos.length ; i++){
    console.log(productos[i]);
}
*/

/*
let j=0;
while (j<productos.length) {
    console.log(productos[j]);
    j++;
}
*/


productos.forEach(producto => {
    console.log(producto);
});