import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <div
      className="bg-blue-100 p-40 h-10 flex flex-row justify-between items-center"
      style={{ padding: "2rem" }}
    >
      <div className="ml-4 flex flex-col">
        <h2 className="text-sm sm:text-base md:text-lg  lg:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
          <Link to="/">ExpenseEase</Link>
        </h2>
      </div>
      {isAuthenticated && (
        <div className="flex flex-row justify-between items-center">
          <Link
            to="/addExpense"
            className="text-sm sm:text-base  text-blue-800 font-bold ml-3 hover:text-red-500"
            style={{ marginRight: "20px" }}
          >
            Add Expense
          </Link>
          <Link
            to="/setBudget"
            className="text-sm sm:text-base text-blue-800 font-bold ml-3 hover:text-red-500"
            style={{ marginRight: "20px" }}
          >
            Set Budget
          </Link>
          <button
            onClick={handleLogout}
            className="border-2 border-solid bg-red-500 text-white rounded-xl p-6 hover:bg-red-700"
            style={{ marginRight: "20px", padding: "5px" }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
