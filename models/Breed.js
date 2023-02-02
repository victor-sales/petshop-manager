import mongoose from "mongoose";

const ObjSchema = new mongoose.Schema({ _id: String, name: String });

const Breed = new mongoose.Schema(
    {
        _id:  String,
        breed_name: String,
        specie: ObjSchema,
        description: String
    }, 
    {
        collection: "breeds"
    }
)

export default mongoose.models['Breed'] || mongoose.model('Breed', Breed);
