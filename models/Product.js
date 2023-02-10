import mongoose from "mongoose";

const Product = new mongoose.Schema(
    {
        _id:  String,
        product_name: String,
        type: String,
        brand: String,
        price: String,
        amount: Number
    }, 
    {
        collection: "products"
    }
)

export default mongoose.models['Product'] || mongoose.model('Product', Product);
