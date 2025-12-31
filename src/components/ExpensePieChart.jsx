import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expenses }) => {
  
  // 1. Group Data: Sum amounts per category
  // Result: { "Food": 500, "Travel": 1200, ... }
  const categoryTotals = expenses.reduce((acc, curr) => {
    const { category, amount } = curr;
    acc[category] = (acc[category] || 0) + Number(amount);
    return acc;
  }, {});

  // 2. Prepare Data for Chart
  const categoryNames = Object.keys(categoryTotals);
  const categoryAmounts = Object.values(categoryTotals);

  // Define nice colors for standard categories
  const categoryColors = {
    Food: '#FF6384',      // Red/Pink
    Transport: '#36A2EB', // Blue
    Utilities: '#FFCE56', // Yellow
    Entertainment: '#9966FF', // Purple
    Healthcare: '#4BC0C0', // Teal
    Other: '#C9CBCF',     // Grey
  };

  const backgroundColors = categoryNames.map(cat => categoryColors[cat] || '#333333');

  const data = {
    labels: categoryNames,
    datasets: [
      {
        data: categoryAmounts,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // Put labels on the side
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12 }
        }
      }
    },
    cutout: '70%', // Makes it a Doughnut (thin ring)
  };

  // If no data, show a placeholder
  if (expenses.length === 0) {
     return <div className="text-gray-400 text-sm text-center mt-10">No data to display</div>;
  }

  return (
    <div className="h-50 w-full flex justify-center">
       <Doughnut data={data} options={options} />
    </div>
  );
};

export default ExpensePieChart;