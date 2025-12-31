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



function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      {isAuthenticated && <Navbar />} {/* Only show Navbar if logged in */}
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/addExpense" element={isAuthenticated ? <AddExpense /> : <Navigate to="/login" />} />
        <Route path='/editExpense/:id' element={isAuthenticated ? <EditExpense/> : <Navigate to='/login'/> }/>
        <Route path='/setBudget' element={isAuthenticated ? <Budget/> : <Navigate to='/login'/> }/>
      </Routes>
     {isAuthenticated && <Footer />}
    </>
  )
}

export default App
