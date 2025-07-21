import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
   source: {
        type: String,
        default: "Salary",
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;