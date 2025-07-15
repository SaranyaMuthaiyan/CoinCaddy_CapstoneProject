import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        unique: true
    },
    password: String,
    required: true

})
export default mongoose.model('User', userSchema);