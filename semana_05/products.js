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
    getProductById = ( id) => {
        return new Promise( (resolve, reject) => {
            if( id) {
            setTimeout( () => {
                const product =  this.products.find( p => p.id == id);
                resolve(product);
            }, 4000 )
            } else {
                reject('Error de Parametro');
            }
        })
    }
    saveProduct = ( product) => {
        return new Promise( (resolve, reject) => {
            if( product) {
            setTimeout( () => {
                const id = this.products.length + 1;
                product.id = id;
                this.products.push( product)
                resolve(product);
            }, 4000 )
            } else {
                reject('Error de Parametro');
            }
        })
    }
    deleteProductById = ( id) => {
        return new Promise( (resolve, reject) => {
            if( id) {
            setTimeout( () => {
                const index =  this.products.findIndex( p => p.id == id);
                this.products.splice( index, 1);
                resolve(  index == -1 ? 'Producto No encontrado' :  'Producto eliminado' );
            }, 4000 )
            } else {
                reject('Error de Parametro');
            }
        })
    }
    updateProductById = ( id, product) => {
        return new Promise( (resolve, reject) => {
            if( id) {
            setTimeout( () => {
                const index =  this.products.findIndex( p => p.id == id);
                if( index != -1) {
                    this.products[index].name = product.name;
                    this.products[index].price = product.price;
                    resolve( 'Producto Actualizado' );
                } else {
                    resolve( 'Producto Eliminado' );
                }
            }, 4000 )
            } else {
                reject('Error de Parametro');
            }
        })
    }
}


export default ProductManager;
