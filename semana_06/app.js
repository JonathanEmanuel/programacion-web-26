import express  from 'express';
import connectDB from './config/db.js'
import { productModel } from './models/productModel.js'
const PORT = 3000;

const app = express();
app.use( express.json());

connectDB();


app.get('/', (request, response) => {
    console.log('Se conecto un cliente');
    response.send('Bienvenido!');
})

app.get('/products', async (request, response) => {
    try {
        const products = await productModel.find();
        response.json({ data: products});
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensaje: 'Error del Servidor'});
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        //const id = req.params.id;
        const { id } = req.params;
        const product = await productModel.findById(id);
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
        if( name && price){
            const product = new productModel({name, price});
            const newProducto = await product.save(); 
            res.json({ mensaje: 'Producto Guardado', data: newProducto})
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


        //const product = await adm.updateProductById(id, {name, price});
        const product = await productModel.findByIdAndUpdate(id, { name, price});

        res.json({data: product})
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensaje: 'Error del Servidor'});
    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findByIdAndDelete(id);
        res.json({data: product})
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensaje: 'Error del Servidor'});
    }
})


app.listen(PORT, () => {
    console.log('Servidor Web con Express en el puerto: ' + PORT);
})
