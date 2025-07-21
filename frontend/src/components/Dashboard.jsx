import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);


  // Inputs
  const [newIncomeSource, setNewIncomeSource] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseSource, setNewExpenseSource] = useState('');
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await axios.get('http://localhost:3000/api/income');
        const expenseRes = await axios.get('http://localhost:3000/api/finance/expenses');
        setIncome(incomeRes.data);
        setExpenses(expenseRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [refetch]);

  // Add entries
  const addIncome = () => {
    if (!newIncomeSource || !newIncomeAmount) return;
    setIncome([...income, { source: newIncomeSource, amount: parseFloat(newIncomeAmount) }]);
    setNewIncomeSource('');
    setNewIncomeAmount('');
  };

  const addExpense = async () => {
    try {
      const postExpense = await axios.post('http://localhost:3000/api/finance/expenses', {
        category: newExpenseCategory,
        amount: newExpenseAmount,
        source: newExpenseSource
      })

      console.log(postExpense.data);
      setRefetch(refetch + 1);
    } catch (err) {
      console.error(err)
    }
  };
  console.log(newExpenseCategory, newExpenseAmount, newExpenseSource)
  // Delete
  const deleteIncome = (index) => setIncome(income.filter((_, i) => i !== index));
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/finance/${id}`)
      setRefetch(refetch + 1);
    } catch (err) {
      console.error("Error while deleting the expense", id)
    }
  };

  // Summary logic
  const incomeWithBalance = income.map((i) => {
    const spent = expenses
      .filter((e) => e.source === i.source)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      ...i,
      spent,
      remaining: i.amount - spent
    };
  });
  // Color logic for Pie chart
  const getColor = (remaining) => {
    if (remaining > 1000) return 'rgba(34,197,94,0.6)'; // Green
    if (remaining > 0) return 'rgba(251,191,36,0.6)';  // Yellow
    return 'rgba(239,68,68,0.6)'; // Red
  };

  // Pie chart data
  const pieChartData = {
    labels: incomeWithBalance.map(i => i.source),
    datasets: [
      {
        label: 'Remaining Balance',
        data: incomeWithBalance.map(i => i.remaining),
        backgroundColor: incomeWithBalance.map(i => getColor(i.remaining))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Personal Finance Dashboard</h1>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Income Overview</h2>
          <Bar data={{
            labels: income.map(i => i.source),
            datasets: [{
              label: 'Income',
              data: income.map(i => i.amount),
              backgroundColor: 'rgba(34,197,94,0.6)'
            }]
          }} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Remaining Balances (Pie)</h2>
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* Income Table */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Manage Income</h2>
        <div className="flex gap-4 mb-4">
          <input type="text" placeholder="Source" value={newIncomeSource} onChange={(e) => setNewIncomeSource(e.target.value)} className="px-3 py-2 border rounded w-1/2" />
          <input type="number" placeholder="Amount" value={newIncomeAmount} onChange={(e) => setNewIncomeAmount(e.target.value)} className="px-3 py-2 border rounded w-1/2" />
          <button onClick={addIncome} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
        </div>
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-green-100">
            <tr>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Spent</th>
              <th className="px-4 py-2 text-left">Remaining</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomeWithBalance.map((i, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{i.source}</td>
                <td className="px-4 py-2">${i.amount}</td>
                <td className="px-4 py-2">${i.spent}</td>
                <td className={`px-4 py-2 font-bold ${i.remaining > 1000 ? 'text-green-600' : i.remaining > 0 ? 'text-yellow-500' : 'text-red-600'}`}>${i.remaining}</td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => deleteIncome(index)} className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expense Table */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Expenses</h2>

        {/* Add Expense Inputs */}
        <form name="newExpense" action={addExpense}>
          <div className='flex gap-4 mb-4'>
            <input
              type="text"
              placeholder="Category"
              value={newExpenseCategory}
              onChange={(e) => setNewExpenseCategory(e.target.value)}
              className="px-3 py-2 border rounded w-1/2"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
              className="px-3 py-2 border rounded w-1/2"
            />
            <input
              type="text"
              placeholder="Source"
              value={newExpenseSource}
              onChange={(e) => setNewExpenseSource(e.target.value)}
              className="px-3 py-2 border rounded w-1/2wzv"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 ml-4"
            >  Add
            </button>
          </div>
        </form>

        {/* Expense Table */}
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Amount</th>
              <th className="text-left px-4 py-2">Source</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{exp.category}</td>
                <td className="px-4 py-2">${exp.amount}</td>
                <td className="px-4 py-2">{exp.source}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => deleteExpense(exp._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;