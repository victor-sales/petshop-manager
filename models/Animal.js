import mongoose from "mongoose";

const ObjSchema = new mongoose.Schema({ _id: String, name: String });

const Animal = new mongoose.Schema(
    {
        _id:  String,
        animal_name: String,
        tutor: ObjSchema,
        breed: ObjSchema,
        specie: ObjSchema,
        description: String
    }, 
    {
        collection: "animals"
    }
)

export default mongoose.models['Animal'] || mongoose.model('Animal', Animal);
