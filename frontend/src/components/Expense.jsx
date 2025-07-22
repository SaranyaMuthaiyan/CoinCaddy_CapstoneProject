import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [refetch, setRefetch] = useState(0);
    const [newExpenseCategory, setNewExpenseCategory] = useState('');
    const [newExpenseAmount, setNewExpenseAmount] = useState('');
    const [newExpenseSource, setNewExpenseSource] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expenseRes = await axios.get('http://localhost:3000/api/finance/expenses');
                setExpenses(expenseRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, [refetch])

    const addExpense = async () => {
        try {
            const postExpense = await axios.post('http://localhost:3000/api/finance/expenses', {
                category: newExpenseCategory,
                amount: newExpenseAmount,
                source: newExpenseSource
            })
            setNewExpenseCategory('');
            setNewExpenseAmount('');
            setNewExpenseSource('');
            // console.log(postExpense.data);
            setRefetch(refetch + 1);
        } catch (err) {
            console.error(err)
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/finance/expenses/${id}`)
            setRefetch(refetch + 1);
        } catch (err) {
            console.error("Error while deleting the expense", id)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Manage Expenses</h1>
            <div className="mt-10 bg-white p-6 rounded-lg shadow">
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
            </div>
            <div className="mt-10 bg-white p-6 rounded-lg shadow">
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
    )
}
export default Expense;
