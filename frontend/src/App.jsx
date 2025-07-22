import { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import Expense from './components/Expense';
import About from './components/About';

import './App.css'
import ProtectedRoute from './ProtectedRoute.jsx';
import { useAuth } from './context/AuthContext.jsx';

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <>
      <nav className="bg-blue-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href='#' className="text-white text-lg font-semibold">💰CoinCaddy💰</a>
          {isAuthenticated && <><div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleLoginLogout}>Logout</button>

          </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium bg-blue-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-blue-800 dark:bg-blue-800 md:dark:bg-blue-900 dark:border-blue-700">
                <li>
                  <Link to="/dashboard" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white-800 md:p-0 md:dark:text-blue-500" aria-current="page">Dashboard</Link>
                </li>
                <li>
                  <Link to="/expenses" class="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Expenses</Link>
                </li>
                <li>
                  <Link to="/income" class="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Incomes</Link>
                </li>
                <li>
                  <Link to="/About" class="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                </li>
              </ul>
            </div>
          </>
          }
        </div>

      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expense />} />
          <Route path="/income" element={<Income />} />
          <Route path="/About" element={<About/>}/>
        </Route>

      </Routes>
    </>
  )
}

export default App;
