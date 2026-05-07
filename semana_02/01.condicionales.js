let nombre = 'Juan'; // String
let x = 2;  // Number
let logueado = true; // Boolean
let a = null; 
let b = undefined;
const dni = 1234;
x = 'Julieta';
let edad = 11;

console.log( typeof(nombre), nombre);
console.log( typeof(logueado), logueado);
console.log( typeof(x), x);
console.log( typeof(dni), dni);

console.log('Hola ' + nombre);
/* ------------------------------ CONDICIONALES ----------------------------- */
if( edad >= 18){
    console.log('Sos mayor de Edad')
} else {
    console.log('Sos Menor de Edad')
}

let temperatura = 2;
if( temperatura < 10){
    console.log('Hace Frio 🥶');
} else if( temperatura > 10 && temperatura < 20 ){
    console.log('El Clima esta Genial 😎');
} else {
    console.log('Hace calor 🥵');
}

// Operadores y &&  o || 
/* --------------------------------- CICLOS --------------------------------- */
// Mostramos los numeros del uno al diez
for(let i=1; i<=10; i++){
    console.log(i);
}

let j = 0;
while( j <= 20 ){
    console.log(j);
    j++;
}
// archivo saludo.js
module.exports = "Hola";

// archivo app.js
const saludo = require('./saludo');
console.log(saludo);