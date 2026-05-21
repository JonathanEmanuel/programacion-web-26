import mongoose from "mongoose";
const collections = 'products';

const schema = new mongoose.Schema({
    name: String,
    price: Number
});

export const productModel = mongoose.model(collections, schema);