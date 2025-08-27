import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import BottomNavBar from "./BottomNavbar";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetVisualizer = ({ month, budgets, expenses }) => {
  // Totals
  const totalBudget = Object.values(budgets).reduce((sum, amt) => sum + (amt || 0), 0);
  const totalSpent = Object.entries(budgets).reduce(
    (sum, [category]) => sum + (expenses[category] || 0),
    0
  );
  const remaining = totalBudget - totalSpent;
  const isExceeded = remaining < 0;

  // Donut chart (total vs remaining)
  const donutData = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [totalSpent, Math.max(remaining, 0)],
        backgroundColor: ["#3B82F6", "#10B981"],
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  // Category Pie Chart (percentage of each category)
  const categoryLabels = Object.keys(expenses);
  const categoryValues = Object.values(expenses);
  const totalExpenses = categoryValues.reduce((a, b) => a + b, 0);
  const categoryPercents = categoryValues.map(v =>
    ((v / totalExpenses) * 100).toFixed(2)
  );
  const categoryColors = [
    "#93c5fd", "#a78bfa", "#6ee7b7", "#fde68a",
    "#fca5a5", "#c4b5fd", "#fcd34d"
  ];
  const pieData = {
    labels: categoryLabels.map((label, i) => `${label} ${categoryPercents[i]}%`),
    datasets: [
      {
        data: categoryValues,
        backgroundColor: categoryColors,
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mt-6">

      {/* Donut Chart Section */}
      <div className="flex justify-center mb-6">
        <div className="w-52 h-52">
          <Doughnut data={donutData} />
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-between text-center mt-4 mb-6 px-4">
        <div>
          <p className="text-sm text-gray-500">Total Budget</p>
          <p className="text-lg font-semibold text-gray-800">
            Rs {totalBudget.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Spent</p>
          <p className="text-lg font-semibold text-gray-800">
            Rs {totalSpent.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Remaining</p>
          <p className="text-lg font-semibold text-gray-800">
            {isExceeded ? `-Rs ${Math.abs(remaining).toFixed(2)}` : `Rs ${remaining.toFixed(2)}`}
          </p>
        </div>
      </div>

      {/* Pie Chart Section */}
      {totalExpenses > 0 && (
        <div className="mb-6">
          <h3 className="text-center text-lg font-medium text-gray-700 mb-3">
            Expense Distribution
          </h3>
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      )}

      {/* Category Breakdown Bars */}
      <div className="space-y-4">
        {Object.entries(budgets).map(([category, budgetAmt]) => {
          const actualAmt = expenses[category] || 0;
          const percentage = Math.min((actualAmt / budgetAmt) * 100, 100);
          const overBudget = actualAmt > budgetAmt;

          return (
            <div key={category} className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{category}</span>
                <span
                  className={`font-semibold ${
                    overBudget ? "text-red-600" : "text-green-700"
                  }`}
                >
                  Rs {actualAmt} / Rs {budgetAmt}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    overBudget ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetVisualizer;
