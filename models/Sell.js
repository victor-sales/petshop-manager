import mongoose from "mongoose";

const ObjSchema = new mongoose.Schema({ _id: String, name: String });

const ProductSchema = new mongoose.Schema({ _id: String, name: String, value: String });

const Sell = new mongoose.Schema(
    {
        _id:  String,
        date: Date,
        cashier: ObjSchema,
        buyer: ObjSchema,
        product: ProductSchema,
        amount: Number,
        sell_value: String,
        observations: String
    }, 
    {
        collection: "sells"
    }
)

export default mongoose.models['Sell'] || mongoose.model('Sell', Sell);
