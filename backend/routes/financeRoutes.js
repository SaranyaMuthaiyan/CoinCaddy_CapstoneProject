// routes/financeRoutes.js
import express from 'express';
const router = express.Router();

const incomeData = [
  { source: 'Salary', amount: 3000 },
  { source: 'Freelance', amount: 1200 }
];

const expenseData = [
  { category: 'Rent', amount: 1200, source: 'Salary' },
  { category: 'Groceries', amount: 400, source: 'Salary' },
  { category: 'Utilities', amount: 150, source: 'Freelance' },
  { category: 'Entertainment', amount: 200, source: 'Freelance' }
];

router.get('/income', (req, res) => res.json(incomeData));
router.get('/expenses', (req, res) => res.json(expenseData));

export default router;