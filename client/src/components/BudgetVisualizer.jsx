// import React from "react";
// import {
//   FiTrendingUp,
//   FiCheckCircle,
//   FiDollarSign
// } from "react-icons/fi";

// const BudgetVisualizer = ({ month, budgets, expenses }) => {
//   const totalBudget = Object.values(budgets).reduce((sum, amt) => sum + (amt || 0), 0);
//   const totalSpent = Object.entries(budgets).reduce(
//     (sum, [category]) => sum + (expenses[category] || 0),
//     0
//   );
//   const remaining = totalBudget - totalSpent;
//   const isExceeded = remaining < 0;

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-md mt-6">
//       <h2 className="text-xl font-bold mb-6 text-center">{month} Budget Overview</h2>

//       {/* 🔷 Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         {/* Total Spent */}
//         <div className="rounded-xl p-4 shadow-md text-white bg-blue-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm uppercase tracking-wide font-semibold">Total Spent</p>
//               <p className="text-2xl font-bold mt-1">${totalSpent.toFixed(2)}</p>
//             </div>
//             <FiDollarSign className="text-4xl" />
//           </div>
//         </div>

//         {/* Budget Remaining */}
//         <div className={`rounded-xl p-4 shadow-md text-white ${isExceeded ? "bg-red-500" : "bg-green-500"}`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm uppercase tracking-wide font-semibold">Budget Remaining</p>
//               <p className="text-2xl font-bold mt-1">
//                 ${Math.abs(remaining).toFixed(2)} {isExceeded ? "(Over)" : ""}
//               </p>
//             </div>
//             {isExceeded ? (
//               <FiTrendingUp className="text-4xl" />
//             ) : (
//               <FiCheckCircle className="text-4xl" />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 🟢 Donut Placeholder */}
//       <div className="flex justify-center mb-6">
//         <div className="w-40 h-40 rounded-full border-8 border-blue-400 flex items-center justify-center text-center">
//           <div>
//             <p className="text-sm">Total Budget</p>
//             <p className="text-xl font-bold">${totalBudget.toFixed(2)}</p>
//           </div>
//         </div>
//       </div>

//       {/* 🔶 Category Breakdown */}
//       <div className="space-y-4">
//         {Object.entries(budgets).map(([category, budgetAmt]) => {
//           const actualAmt = expenses[category] || 0;
//           const percentage = Math.min((actualAmt / budgetAmt) * 100, 100);
//           const overBudget = actualAmt > budgetAmt;

//           return (
//             <div key={category} className="bg-gray-50 rounded-lg p-4 shadow-sm">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="font-semibold">{category}</span>
//                 <span
//                   className={`font-semibold ${
//                     overBudget ? "text-red-600" : "text-green-700"
//                   }`}
//                 >
//                   ${actualAmt} / ${budgetAmt}
//                 </span>
//               </div>
//               <div className="w-full h-3 bg-gray-200 rounded-full">
//                 <div
//                   className={`h-full rounded-full ${
//                     overBudget ? "bg-red-500" : "bg-green-500"
//                   }`}
//                   style={{ width: `${percentage}%` }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BudgetVisualizer;


import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetVisualizer = ({ month, budgets, expenses }) => {
  const totalBudget = Object.values(budgets).reduce((sum, amt) => sum + (amt || 0), 0);
  const totalSpent = Object.entries(budgets).reduce(
    (sum, [category]) => sum + (expenses[category] || 0),
    0
  );
  const remaining = totalBudget - totalSpent;
  const isExceeded = remaining < 0;

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

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mt-6">

      {/* Donut Chart */}
      <div className="flex justify-center mb-6">
        <div className="w-52 h-52">
          <Doughnut data={donutData} />
        </div>
      </div>

      {/* Totals Below Donut Chart */}
      <div className="flex justify-between text-center mt-4 mb-6 px-4">
        <div>
          <p className="text-sm text-gray-500">Total Budget</p>
          <p className="text-lg font-semibold text-gray-800">Rs {totalBudget.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Spent</p>
          <p className="text-lg font-semibold text-gray-800">Rs {totalSpent.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Remaining</p>
          <p className="text-lg font-semibold text-gray-800">
            {isExceeded ? `-Rs ${Math.abs(remaining).toFixed(2)}` : `Rs ${remaining.toFixed(2)}`}
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
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
