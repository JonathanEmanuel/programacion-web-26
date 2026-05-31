export default function validateProduct(name, price){
        // Campos obligatorios
        if( !name || !price){
           return 'Faltan parametros obligatorios';
        }

        // Tipos de datos
        if( typeof(name) != 'string' ){
           return 'El nombre debe ser Texto';
        }
        if( typeof(price) != 'number' ){
           return 'El Precio debe ser Numérico';
        }

        // Logitud mínima
        if( name.length < 4  ){
           return 'El Nombre debe tener al menos tres caracteres';
        }
        // Precio positivo
        if( price <= 0  ){
           return 'El Precio debe ser ser mayor a cero';
        }
    return null;
}