import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;