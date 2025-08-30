import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryDonutChart = ({ category, spent, budget }) => {
  const percentage = ((spent / budget) * 100).toFixed(2);
  const isOverBudget = spent > budget;

  const data = {
    datasets: [
      {
        data: isOverBudget ? [spent, 0] : [spent, budget - spent],
        backgroundColor: isOverBudget ? ["#EF4444", "#e5e7eb"] : ["#22c55e", "#e5e7eb"], 
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="flex items-center justify-between px-2 relative">
      {/* Donut Chart with percentage in center */}
      <div className="relative w-20 h-20">
        <Doughnut data={data} options={options} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-sm ${
          isOverBudget ? "text-red-600 text-xs" : "text-green-600 text-sm"
        }`}>
          {percentage}%
        </div>
      </div>

      {/* Category + Amounts */}
      <div className="flex-3 ml-4">
        <p className="font-semibold text-sm">{category}</p>
        <p className="text-sm font-medium mt-1 text-gray-800">
          Rs {spent} / Rs {budget}
        </p>
      </div>
    </div>
  );
};

export default CategoryDonutChart;
