import React,{useState} from 'react'
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Budget = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("");

  const [formData,setFormData] = useState({
    totalamount: 3000,
    category: "Food",
    month: "January",
    year:2026,
  });
  const categories = ["Food", "Transport", "Utilities", "Entertainment", "Healthcare", "Other"];
  const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const year = [2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/budget/", formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      {/* Card Container */}
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden " style={{boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"}}>
        
        {/* Header: Increased side padding to px-12 */}
        <div className="bg-indigo-600 px-12 py-8" style={{padding:"0.75rem"}}>
          <h1 className="text-3xl font-bold text-white text-center">Add Budget</h1>
          <p className="text-indigo-200 text-center text-sm mt-2">Track your spending smartly</p>
        </div>

        {/* Form Body: Increased side padding to px-12 */}
        <div className="px-12 py-10" style={{padding:"2rem" ,maxWidth:"100%"}}>

          
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total amount</label>
              <input
                type="number"
                name="totalamount"
                value={formData.totalamount}
                onChange={handleChange}
                placeholder="3000"
                required
                className="w-full  border  border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                style={{padding:"0.35rem"}}
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{padding:"0.15rem"}}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            

            {/* Payment Mode Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Month</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer"
                style={{padding:"0.15rem"}}
              >
                {month.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={{padding:"0.15rem"}}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer"
              >
                {year.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6" style={{paddingTop:"0.75rem"}}>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-1/2 py-3.5 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                style={{padding:"0.25rem"}}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-md transition-all active:scale-95 disabled:opacity-70"
                style={{padding:"0.25rem"}}
              >
                {loading ? "Saving..." : "Save Budget"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Budget