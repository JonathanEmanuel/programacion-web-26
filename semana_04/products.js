class ProductManager {
    // Atributos
    products =[];
    // Constructor
    constructor(products){
        this.products = products;
        console.log('Soy el constructor');
    }
    // Methods
    getProducts = (param) => {
        return new Promise( (resolve, reject) => {
            if( param) {
            setTimeout( () => {
                resolve(this.products);
            }, 4000 )
            } else {
                reject('Error de Parametro');
            }
        })
    }
}


export default ProductManager;
