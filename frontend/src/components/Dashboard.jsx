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
  const addIncome = async () => {
    try {
      const postIncome = await axios.post('http://localhost:3000/api/income', {
        source: newIncomeSource,
        amount: newIncomeAmount
      });
      setNewIncomeSource('');
      setNewIncomeAmount('');

      setRefetch(refetch + 1);
    } catch (err) {
      console.error(err)
    }
  };

  // console.log(newExpenseCategory, newExpenseAmount, newExpenseSource)

  // Delete income (locally)
  const deleteIncome = (index) => setIncome(income.filter((_, i) => i !== index));


  // Summary logic //calculating spent & Remaining
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

  const backgroundColor = [
    "#4dc9f6",
    "#f67019",
    "#f53794",
    "#537bc4",
    "#acc236",
    "#166a8f"
  ]

  const groupExpensesByCategory = expenses.reduce((acc, expense) => {
    if (acc[expense.category])
      acc[expense.category] += expense.amount
    else
      acc[expense.category] = expense.amount

    return acc;
  }, {})

  // Pie chart data
  const pieChartData = {
    labels: Object.keys(groupExpensesByCategory),
    datasets: [
      {
        label: 'Categories',
        data: Object.values(groupExpensesByCategory),
        backgroundColor: backgroundColor,
        hoverOffset: 10
      }
    ]
  };

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netCashFlow = totalIncome - totalExpense;
  const dtiRatio = ((totalExpense / totalIncome) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Personal Finance Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shodow rounded-xl p-4">
          <h2 className="text-sm font-medium text-gray-500">Total Income</h2>
          <p id="totalIncome" className="text-xl font-bold text-green-600">{`$${totalIncome}` ?? $0}</p>
        </div>
        <div className="bg-white shodow rounded-xl p-4">
          <h2 className="text-sm font-medium text-gray-500">Total Expense</h2>
          <p id="totalIncome" className="text-xl font-bold text-red-600">{`$${totalExpense}` ?? $0}</p>
        </div>
        <div className="bg-white shodow rounded-xl p-4">
          <h2 className="text-sm font-medium text-gray-500">Net Cash Flow</h2>
          <p id="totalIncome" className="text-xl font-bold">{`$${netCashFlow}` ?? $0}</p>
        </div>
        <div className="bg-white shodow rounded-xl p-4">
          <h2 className="text-sm font-medium text-gray-500">Debt-to-income Ratio</h2>
          <p id="totalIncome" className="text-xl font-bold">{`${dtiRatio}%` ?? "0%"}</p>
        </div>
      </div>

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
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Spending by category</h2>
          <Pie data={pieChartData} />
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
