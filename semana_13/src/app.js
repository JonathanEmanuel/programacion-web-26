import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js'
import { productModel } from './models/productModel.js'
const PORT = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../public');
const uploadsPath = path.join(publicPath, 'uploads');

const app = express();
app.use( cors());
app.use( express.json());

connectDB();

app.use( express.static(publicPath));


const storage = multer.diskStorage({
    destination( req, file, cb){
        cb(null, uploadsPath);
    },
    filename( req, file, cb){
        cb(null,  Date.now() + "-" + file.originalname  );
    }
})

const upload = multer({ storage: storage});

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
        res.status(500).json({ mensaje: 'Error del Servidor'});
    }
})

app.post('/products',  upload.single('photo'),  async (req, res) => {
    try {
        const body = req.body;
        const { name, price } = body;
        if( name && price && req.file){
            const product = new productModel({
                name, 
                price, 
                photo: `/uploads/${req.file.filename}` 
            });
            const newProducto = await product.save(); 
            res.json({ mensaje: 'Producto Guardado', data: newProducto})
        } else {
            res.status(400).json({ mensaje: 'Faltan parametros obligatorios'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del Servidor'});
    }
})


app.put('/products/:id', async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const { name, price, photo} = body;

        const product = await productModel.findByIdAndUpdate(id, { name, price, photo}, { new: true });

        res.json({data: product})
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del Servidor'});
    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findByIdAndDelete(id);
        res.json({data: product})
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del Servidor'});
    }
})


app.listen(PORT, () => {
    console.log('Servidor Web con Express en el puerto: ' + PORT);
})
