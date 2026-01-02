import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import API from '../services/api.js';
import '../assets/global.css';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', photo: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/register', formData);
      localStorage.setItem('token', response.data.token);
      toast.success("Registration Successfull!");
      window.location.href = '/';
    } catch (err) {
      toast.error("Invalid credentials.");
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className='text-xl font-bold text-orange-700'>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className='form-group'>
            <label>Photo</label>
            <input type='photo' name='photo' onChange={handleChange} />
          </div> */}
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p className="redirect-text">
          Already have an account? <Link to="/login" style={{color:"blueviolet"}}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register