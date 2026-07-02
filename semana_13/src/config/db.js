import mongoose from "mongoose";

const URI_DB = 'mongodb://127.0.0.1:27017/ecommerce';

const connectDB = async () => {
    try {
        await mongoose.connect(URI_DB)
        console.log('Conexión correcta con MongoDB');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;