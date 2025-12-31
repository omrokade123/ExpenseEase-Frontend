import React from 'react'

const BudgetCard = ({category,spent,limit}) => {
  const percentage = Math.min((spent / limit) * 100, 100);
  
  // Dynamic Color: Green if safe, Red if over budget
  const getColor = () => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 min-w-62.5" style={{padding:"1rem",marginBottom:"1rem"}}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-700">{category}</h3>
        {percentage >= 100 && (
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">Over Budget!</span>
        )}
      </div>
      
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>₹{spent} spent</span>
        <span>₹{limit} limit</span>
      </div>

      {/* Progress Bar Background */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        {/* Actual Progress */}
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${getColor()}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );

}

export default BudgetCard