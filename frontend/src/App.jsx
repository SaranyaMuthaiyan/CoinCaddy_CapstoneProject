// import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css'

function App() {
  return (
    <>
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href='#' className="text-white text-lg font-semibold">
Nuevo Tracker </a>
         </div>
    </nav>
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/dashboard" element={<Dashboard />} />
   </Routes>
    </>
  )
  }

export default App
   