import mongoose from "mongoose";

const ObjSchema = new mongoose.Schema({ _id: String, name: String });

const Service = new mongoose.Schema(
    {
        _id:  String,
        service_name: String,
        date: Date,
        tutor: ObjSchema,
        vet: ObjSchema,
        breed: ObjSchema,
        specie: ObjSchema,
        description: String,
        simptoms: String,
        is_confirmed: Boolean
    }, 
    {
        collection: "services"
    }
)

export default mongoose.models['Service'] || mongoose.model('Service', Service);
