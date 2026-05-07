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
        console.log(body);
        const { name, price} = body;
        if( name && price){
            const product = await adm.saveProduct({ name, price})
            res.json({ mensaje: 'Producto Guardado'})
        } else {
            res.json({ mensaje: 'Faltan parametros obligatorios'})
        }
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