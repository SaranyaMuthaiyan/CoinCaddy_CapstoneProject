import express from 'express';
import Income from '../models/Income.js';
const router = express.Router();


const incomeData = [
  { source: 'Salary', amount: 3000 },
  { source: 'Freelance', amount: 1200 }
];

// router.get('/income', (req, res) => res.json(incomeData));

router.get('/income', async (req, res) => {
    const inc = await Income.find();
    res.status(200).json(inc);
})

router.post('/income', async (req, res) => {
    try {
        const { source, amount } = req.body;
        const newIncome = new Income({ source, amount, createdAt: Date.now() });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/income/:id', async (req, res) => {
    try {
        const { source, amount, } = req.body;
        const newIncome = new Expense({ source, amount, createdAt: Date.now() });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/income/:id', async (req, res) => {
    try {
        const exps = await Income.findByIdAndDelete(req.params.id);
        res.status(200).json(exps);
    } catch (err) {
        res.status(401).json({ err })
    }
})


export default router;