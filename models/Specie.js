import mongoose from "mongoose";

const ObjSchema = new mongoose.Schema({ _id: String, name: String });

const Specie = new mongoose.Schema(
    {
        _id:  String,
        specie_name: String,
        description: String
    }, 
    {
        collection: "species"
    }
)

export default mongoose.models['Specie'] || mongoose.model('Specie', Specie);
