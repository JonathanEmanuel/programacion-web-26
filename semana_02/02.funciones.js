function saludar(){
    console.log('Hola 👋');
}


saludar();


const nombre = 'José';
const edad = 35;
const casado = true;
const despedir = function(){
    console.log('Chau 👋');
}

despedir();

console.log( typeof(nombre));
console.log( typeof(edad));
console.log( typeof(casado));
console.log( typeof(despedir));


/* ----------------------------- Funcion Flecha ----------------------------- */
const sumar = (n1, n2) => {
    let r = n1 + n2;
    console.log(r);
}

sumar(2, 3);

const triple = (n) => {
    return n*3;
}

const resultado =  triple(10);
console.log('El resultado es: ' + resultado);