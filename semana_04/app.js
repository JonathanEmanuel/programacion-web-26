import express, { json } from 'express';
import ProductManager from "./products.js";
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

app.listen(PORT, () => {
    console.log('Servidor Web con Express en el puerto: ' + PORT);
})

// ctrl + c

// Promises =>  Async Await