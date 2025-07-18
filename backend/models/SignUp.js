import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    type: {
        type: String,
        enum: ['income', 'expense']
    },
    date: date,
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
export default mongoose.model('Transaction', transactionSchema);