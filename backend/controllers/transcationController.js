import transaction from '../models/transaction.js';

export const addTransaction = async (requestAnimationFrame, res) => {
    try {
        const tx = await transaction.create({ ...requestAnimationFrame.body, useref: requestAnimationFrame.userId })
    res.status(201).json(tx);
    }catch(e){
        res.status(500).json({ msg: e.message })
    }
    }
export const getTransactions = async (req, res) => {
    try {
        const txs = await getTransactions.find({ userRef: req.userId });
        res.json(txs);
    }catch(e){
        res.status(500).json({msg: e.message })
    }
}

