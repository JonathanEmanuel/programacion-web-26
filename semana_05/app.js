import express, { json } from 'express';
import ProductManager from "./products.js";
import validateProduct from './utils/validateProduct.js';

const PORT = 3000;

const app = express();
app.use( express.json());

const user = 'juan';
const products = [
    {id: 1, name: 'Teclado', price: 300 },
    {id: 2, name: 'Mouse',   price: 200 },
    {id: 3, name: 'Monitor', price: 500 }
];

const adm = new ProductManager( products );

app.get('/', (request, response) => {
    console.log('Se conecto un cliente');
    response.send('Bienvenido!');
})

app.get('/products', async (request, response) => {
    console.log('Inicio del Script'); // 1
    try {
        const products = await adm.getProducts(true);
        console.table( products );// 2
        response.json({ data: products});
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensaje: 'Error del Servidor'});
    }

    console.log('Fin del Script'); // 3
})

app.get('/products/:id', async (req, res) => {
    try {
        //const id = req.params.id;
        const { id } = req.params;
        const product = await adm.getProductById(id);

        console.log(id);

        res.json({data: product})
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensaje: 'Error del Servidor'});
    }
})

app.post('/products', async (req, res) => {
    try {
        const body = req.body;
        const { name, price} = body;

        const error = validateProduct(name, price);

        if( error ){
           return res.status(400).json({ mensaje: error})
        };
        /*
        // Campos obligatorios
        if( !name || !price){
           return res.status(400).json({ mensaje: 'Faltan parametros obligatorios'})
        }

        // Tipos de datos
        if( typeof(name) != 'string' ){
           return res.status(400).json({ mensaje: 'El nombre debe ser Texto'})
        }
        if( typeof(price) != 'number' ){
           return res.status(400).json({ mensaje: 'El Precio debe ser Numérico'})
        }

        // Logitud mínima
        if( name.length < 4  ){
           return res.status(400).json({ mensaje: 'El Nombre debe tener al menos tres caracteres'})
        }
        // Precio positivo
        if( price <= 0  ){
           return res.status(400).json({ mensaje: 'El Precio debe ser ser mayor a cero'})
        }
        */
        const product = await adm.saveProduct({ name, price})
        res.json({ mensaje: 'Producto Guardado'})
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensaje: 'Error del Servidor'});
    }
})


app.put('/products/:id', async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const { name, price} = body;
        const error = validateProduct(name, price);

        if( error ){
           return res.status(400).json({ mensaje: error})
        };
        const product = await adm.updateProductById(id, {name, price});

        res.json({data: product})
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensaje: 'Error del Servidor'});
    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await adm.deleteProductById(id);

        res.json({data: product})
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensaje: 'Error del Servidor'});
    }
})


app.listen(PORT, () => {
    console.log('Servidor Web con Express en el puerto: ' + PORT);
})


// ctrl + c

// Promises =>  Async Await