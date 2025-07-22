import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Income() {

    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [refetch, setRefetch] = useState(0);

    const [newIncomeSource, setNewIncomeSource] = useState('');
    const [newIncomeAmount, setNewIncomeAmount] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const incomeRes = await axios.get('http://localhost:3000/api/income');
                setIncome(incomeRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, [refetch])

    const addIncome = async () => {
        try {
            const postIncome = await axios.post('http://localhost:3000/api/income', {
                source: newIncomeSource,
                amount: newIncomeAmount,

            })
            setNewIncomeSource('');
            setNewIncomeAmount('');

            setRefetch(refetch + 1);
        } catch (err) {
            console.error(err)
        }
    };

    // const deleteIncome = (index) => setIncome(income.filter((_, i) => i !== index));

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

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/income/${id}`)
            setRefetch(refetch + 1);
        } catch (err) {
            console.error("Error while deleting the Income", id)
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Manage Incomes</h1>
            <div className="mt-10 bg-white p-6 rounded-lg shadow">
                <div className="flex gap-4 mb-4">
                    <form name="newIncome" action={addIncome}>
                        <div className='flex gap-4 mb-4'>
                            <input type="text" placeholder="Source" value={newIncomeSource} onChange={(e) => setNewIncomeSource(e.target.value)} className="px-3 py-2 border rounded w-1/2" />
                            <input type="number" placeholder="Amount" value={newIncomeAmount} onChange={(e) => setNewIncomeAmount(e.target.value)} className="px-3 py-2 border rounded w-1/2" />
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-10 bg-white p-6 rounded-lg shadow">
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
                            // {income.map((i, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{i.source}</td>
                                <td className="px-4 py-2">${i.amount}</td>
                                <td className="px-4 py-2">${i.spent}</td>
                                <td className={`px-4 py-2 font-bold ${i.remaining > 1000 ? 'text-green-600' : i.remaining > 0 ? 'text-yellow-500' : 'text-red-600'}`}>${i.remaining}</td>
                                <td className="px-4 py-2 text-center">
                                    <button onClick={() => deleteIncome(i._id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Income;