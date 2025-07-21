// routes/financeRoutes.js
import express from 'express';
import Expense from '../models/Expense.js';
const router = express.Router();



// const expenseData = [
//   { category: 'Rent', amount: 1200, source: 'Salary' },
//   { category: 'Groceries', amount: 400, source: 'Salary' },
//   { category: 'Utilities', amount: 150, source: 'Freelance' },
//   { category: 'Entertainment', amount: 200, source: 'Freelance' }
// ];

// router.get('/income', (req, res) => res.json(incomeData));
router.get('/expenses', async (req, res) => {
  const exp = await Expense.find();
  res.status(200).json(exp);
})

router.post('/expenses', async (req, res) => {
  try {
    const { category, amount, source } = req.body;
    const newExpense = new Expense({ category, amount, source, createdAt: Date.now() });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/expenses/:id', async (req, res) => {
  try {
    const { category, amount, source } = req.body;
    const newExpense = new Expense({ category, amount, source, createdAt: Date.now() });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/expenses/:id', async (req, res) => {
  try {
    const exps = await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json(exps);
  } catch (err) {
    res.status(401).json({ err })
  }
})


export default router;