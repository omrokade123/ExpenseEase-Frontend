import React, { useEffect, useState } from "react";
import API from "../services/api";
import ExpenseCard from "../components/ExpenseCard.jsx";
import { useNavigate } from "react-router-dom";
import BudgetCard from "../components/BudgetCard.jsx";
import ExpensePieChart from "../components/ExpensePieChart.jsx";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [expense, setExpense] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [budgetStats, setBudgetStats] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [expRes, budRes] = await Promise.all([
        API.get("/expense"),
        API.get("/budget"),
      ]);

      // --- Handle Expenses ---
      let expData = [];
      if (Array.isArray(expRes.data)) expData = expRes.data;
      else if (expRes.data.data) expData = expRes.data.data;

      setExpense(expData);
      calculateTotal(expData);
      let budData = [];
      if (Array.isArray(budRes.data)) budData = budRes.data;
      else if (budRes.data.data) budData = budRes.data.data;

      setBudgets(budData);

      calculateBudgetStats(expData, budData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  // 2. Logic: Group Expenses by Category & Match with Budget
  const calculateBudgetStats = (allExpenses, allBudgets) => {
    const today = new Date();
    const currentMonth = getMonthName(today); // e.g., "December"
    const currentYear = today.getFullYear(); // e.g., 2025

    console.log(`Tracking for: ${currentMonth} ${currentYear}`);

    // 1. Filter Budgets: Only get budgets for THIS specific month/year
    const activeBudgets = allBudgets.filter(
      (b) => b.month === currentMonth && b.year === currentYear
    );

    // 2. Filter Expenses: Only get expenses made in THIS specific month/year
    const monthlyExpenses = allExpenses.filter((exp) => {
      const expDate = new Date(exp.date);
      return (
        getMonthName(expDate) === currentMonth &&
        expDate.getFullYear() === currentYear
      );
    });

    // 3. Calculate total spent per category (ONLY for this month)
    const spendingByCategory = monthlyExpenses.reduce((acc, curr) => {
      const cat = curr.category;
      acc[cat] = (acc[cat] || 0) + Number(curr.amount);
      return acc;
    }, {});

    // 4. Map the Active Budgets to the Monthly Spending
    const stats = activeBudgets.map((b) => ({
      _id: b._id,
      category: b.category,
      limit: b.totalamount,
      spent: spendingByCategory[b.category] || 0, // If no expense this month, it shows 0
    }));

    setBudgetStats(stats);
  };

  // Calculate Total Logic
  const calculateTotal = (data) => {
    const total = data.reduce((sum, item) => sum + Number(item.amount), 0);
    setTotalSpent(total);
  };

  // Delete Logic
  const handleDelete = async (id) => {
    //if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await API.delete(`/expense/${id}`);
      const updatedList = expense.filter((e) => e._id !== id);
      setExpense(updatedList);
      calculateTotal(updatedList);
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Logic
  const handleEdit = (id) => {
    navigate(`/editExpense/${id}`);
  };

  useEffect(() => {
    if (!token) return; 
    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 1. ATTRACTIVE HERO SECTION */}
      <div
        className="relative h-20 md:h-40 lg:h-60 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500"
        style={{padding:"2rem"}}
      >
        <div className=" mx-auto px-4 md:px-8">
          <div
            className="flex flex-col md:flex-row justify-between items-start text-white "
          >
            <div className="mb-4 md:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight">
                Welcome to ExpenseEase
              </h1>
              <p className="mt-2 text-indigo-100 text-lg font-medium opacity-90">
                Track wisely, save daily.
              </p>
              <p className="mt-2 text-indigo-100 text-md font-medium opacity-90">
                An Personalised tracking dashboard to manage your expenses
                effectively.
              </p>
            </div>
            {/* Optional: User Badge */}
            <div className="hidden md:block bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm">
              
                Member Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* 2. FLOATING STATS CARD (Overlapping the Hero) */}
      <div
        className="relative z-20"
        style={{ margin: "0 2rem 0 2rem ", marginTop: "30px"}}
      >
        <div
          className="bg-white rounded-3xl shadow-xl md:p-10 mb-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border border-gray-100"
          style={{ height: "20rem", width: "100%", marginBottom: "20px",padding:"1rem" }}
        >
          {/* Left: Total Balance */}
          <div
            className="text-center md:text-left mb-6 md:mb-0"
            style={{ marginLeft: "20px" }}
          >
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">
              Total Spent So Far
            </p>
            <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-600">
              ₹ {totalSpent.toLocaleString()}
            </h2>
          </div>

          <div className="flex justify-center items-center h-full w-full">
            <ExpensePieChart expenses={expense} />
          </div>

          {/* Right: Big Action Button */}
          <button
            onClick={() => navigate("/addExpense")}
            className="group relative flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 hover:shadow-indigo-500/20 transition-all duration-300"
            style={{ marginRight: "20px", padding: "10px" }}
          >
            <div className="bg-white/20 rounded-full p-1 group-hover:rotate-90 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            Add New Expense
          </button>
        </div>

        {/* --- NEW SECTION: BUDGET TRACKING --- */}
        {budgetStats.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Budget Overview
            </h2>
            {/* Horizontal Scroll or Grid for Budgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {budgetStats.map((stat) => (
                <BudgetCard
                  key={stat._id}
                  category={stat.category}
                  spent={stat.spent}
                  limit={stat.limit}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. ALL EXPENSES GRID */}
        <div className="pb-20">
          {/* Section Header */}
          <div
            className="flex items-center justify-between mb-8"
            style={{ marginBottom: "20px" }}
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 ">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Recent Transactions
            </h2>
            <span className="text-gray-500 font-medium bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm">
              {expense.length} items
            </span>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.isArray(expense) && expense.length > 0 ? (
              expense.map((e) => (
                <div
                  key={e._id}
                  className="transform transition-all duration-300 hover:-translate-y-1"
                >
                  <ExpenseCard
                    expense={e}
                    onDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                </div>
              ))
            ) : (
              /* Beautiful Empty State */
              <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                <div className="bg-indigo-50 p-6 rounded-full mb-4">
                  <svg
                    className="w-12 h-12 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  No transactions yet
                </h3>
                <p className="text-gray-500 mt-2 max-w-sm">
                  Your dashboard is looking a little empty. Add your first
                  expense to start tracking your financial journey!
                </p>
                <button
                  onClick={() => navigate("/addExpense")}
                  className="mt-6 text-indigo-600 font-semibold hover:text-indigo-800 hover:underline"
                >
                  Create your first expense &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
