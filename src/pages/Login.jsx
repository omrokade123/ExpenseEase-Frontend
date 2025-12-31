import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import API from "../services/api.js";
import '../assets/global.css';

const Login = ({setIsAuthenticated}) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
       const response = await API.post('/login',formData);
       localStorage.setItem('token',response.data.token);
       setIsAuthenticated(true);
        navigate("/",{replace:true});
    }catch(err){
      setError(err.response?.data?.error || "Login failed");
    }
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-xl font-bold text-orange-700">Welcome Back!</h2>
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
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="redirect-text">
          Don't have an account? <Link to="/register" style={{color:"blueviolet"}}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
