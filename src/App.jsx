import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddExpense from './pages/AddExpense.jsx';
import Navbar from './components/Navbar.jsx';
import EditExpense from './pages/EditExpense.jsx';
import Budget from './pages/Budget.jsx';
import Footer from './components/Footer.jsx';
import './App.css';
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      
       {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />

        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/addExpense" element={isAuthenticated ? <AddExpense /> : <Navigate to="/login" />} />
        <Route path="/editExpense/:id" element={isAuthenticated ? <EditExpense /> : <Navigate to="/login" />} />
        <Route path="/setBudget" element={isAuthenticated ? <Budget /> : <Navigate to="/login" />} />
      </Routes>

      {isAuthenticated && <Footer />}
    </>
  )
}

export default App
