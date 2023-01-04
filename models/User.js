import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        _id:  String,
        user_name: String,
        email: String,
        phone_number: String,
        profile: String,
        role: String
    }, 
    {
        collection: "users"
    }
)

export default mongoose.models['User'] || mongoose.model('User', User);
