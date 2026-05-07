// Creación de un objeto literal
const usuario = {
    id: 1,
    nombre: 'Josefina',
    edad: 25
};
// Agregamos atributo
usuario.email = 'josefina@mail.com';
// Modificación de un atributo
usuario.edad = 27;
/* console.log(  usuario.edad );
console.log( usuario );
 */

const { id, nombre, edad } = usuario;


console.log(id, nombre, edad);
