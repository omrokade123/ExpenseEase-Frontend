import React from "react";

// 1. Pass 'onDelete' from parent (Dashboard) instead of defining logic here
const ExpenseCard = ({ expense, onDelete, handleEdit }) => {
  // Helper: Get Icon based on category
  const getCategoryDetails = (category) => {
    switch (category) {
      case "Food":
        return {
          icon: "🍔",
          color: "bg-orange-100 text-orange-600 border-orange-200",
        };
      case "Transport":
        return {
          icon: "🚗",
          color: "bg-blue-100 text-blue-600 border-blue-200",
        };
      case "Entertainment":
        return {
          icon: "🎬",
          color: "bg-purple-100 text-purple-600 border-purple-200",
        };
      case "Healthcare":
        return {
          icon: "🏥",
          color: "bg-green-100 text-green-600 border-green-200",
        };
      case "Utilities":
        return {
          icon: "💡",
          color: "bg-yellow-100 text-yellow-600 border-yellow-200",
        };
      default:
        return {
          icon: "💸",
          color: "bg-gray-100 text-gray-600 border-gray-200",
        };
    }
  };

  const { icon, color } = getCategoryDetails(expense.category);

  return (
    <div
      className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between"
      style={{ padding: "20px" }}
    >
      {/* Top Section: Icon & Date */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${color}`}
        >
          {icon}
        </div>
        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
          {new Date(expense.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Middle Section: Title & Category */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1 truncate">
          {expense.title}
        </h3>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {expense.category}
        </span>
      </div>

      {/* Bottom Section: Amount & Action */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
        <div>
          <span className="text-xs text-gray-400 block">Amount</span>
          <span className="text-xl font-extrabold text-gray-800">
            ₹{expense.amount.toLocaleString()}
          </span>
        </div>
        <button
          className="max-w-max py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-300 shadow-md transition-all active:scale-95 disabled:opacity-70"
          style={{ padding: "0.55rem" }}
          onClick={() => handleEdit(expense._id)}
        >
          Update
        </button>

        <button
          onClick={() => onDelete(expense._id)}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors"
          title="Delete Expense"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
