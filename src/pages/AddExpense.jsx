import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "Food",
    paymentMode: "UPI",
  });

  const categories = ["Food", "Transport", "Utilities", "Entertainment", "Healthcare", "Other"];
  const paymentModes = ["UPI", "Cash", "Card"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/expense", formData);
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
          <h1 className="text-3xl font-bold text-white text-center">Add New Expense</h1>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Expense Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Pizza with friends"
                required
                className="w-full  border  border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                style={{padding:"0.35rem"}}
              />
            </div>

            {/* Row: Amount & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  min="1"
                  style={{padding:"0.15rem"}}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  style={{padding:"0.15rem"}}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-600"
                />
              </div>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Mode</label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer"
                style={{padding:"0.15rem"}}
              >
                {paymentModes.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
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
                {loading ? "Saving..." : "Save Expense"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;