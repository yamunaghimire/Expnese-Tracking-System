// // BudgetOverviewPage.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BudgetVisualizer from "../components/BudgetVisualizer";
// import { FiArrowLeft } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import BudgetTopTabs from "../components/BudgetTopTabs";
// import BottomNavBar from "../components/BottomNavbar";

// const months = [
//   "January", "February", "March", "April",
//   "May", "June", "July", "August",
//   "September", "October", "November", "December"
// ];

// const BudgetOverviewPage = () => {
//   const [month, setMonth] = useState("July");
//   const [budgets, setBudgets] = useState({});
//   const [expenses, setExpenses] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!month) return;

//     const fetchBudgets = async () => {
//       const token = localStorage.getItem("access_token");
//       const res = await axios.get(`http://localhost:5000/api/budget/${month}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const map = {};
//       res.data.forEach(b => map[b.category] = b.amount);
//       setBudgets(map);
//     };

//     const fetchExpenses = async () => {
//       const token = localStorage.getItem("access_token");
//       const res = await axios.get(`http://localhost:5000/api/expenses/${month}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const map = {};
//       res.data.forEach(e => map[e.category] = e.amount);
//       setExpenses(map);
//     };

//     fetchBudgets();
//     fetchExpenses();
//   }, [month]);

//   const totalBudget = Object.values(budgets).reduce((sum, val) => sum + val, 0);
//   const totalSpent = Object.values(expenses).reduce((sum, val) => sum + val, 0);
//   const remaining = totalBudget - totalSpent;

//   return (
//     <div className="min-h-screen bg-white flex flex-col pb-24">
    

//       <div className="flex-1 p-4 max-w-xl mx-auto">
//         {/* <div className="relative flex items-center justify-center mb-4">
//           <FiArrowLeft
//             className="absolute left-0 text-2xl text-gray-700 cursor-pointer"
//             onClick={() => navigate("/")}
//           />
//           <h1 className="text-2xl font-bold text-center">Budget Overview</h1>
//         </div> */}

//         {/* Month Selector (same as BudgetPage) */}
//         <div className="flex items-center justify-between bg-gray-100 rounded-full py-2 px-5 mb-6">
//           <button
//             onClick={() => {
//               const currentIndex = months.indexOf(month);
//               if (currentIndex > 0) setMonth(months[currentIndex - 1]);
//             }}
//             className="text-xl text-gray-700"
//           >
//             &lt;
//           </button>
//           <span className="text-lg font-medium text-gray-900">
//             {month ? `${month} 2025` : "Select Month"}
//           </span>
//           <button
//             onClick={() => {
//               const currentIndex = months.indexOf(month);
//               if (currentIndex < months.length - 1) setMonth(months[currentIndex + 1]);
//             }}
//             className="text-xl text-gray-700"
//           >
//             &gt;
//           </button>
//         </div>

//         {month && (
//           <>
//             <BudgetVisualizer
//               month={month}
//               budgets={budgets}
//               expenses={expenses}
//             />

//           </>
//         )}
//       </div>

//       {/* Bottom NavBar */}
//       <div className="fixed bottom-0 left-0 right-0 z-50">
//         <BottomNavBar />
//       </div>
//     </div>
//   );
// };

// export default BudgetOverviewPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import BudgetVisualizer from "../components/BudgetVisualizer";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavbar";
import PageHeader from "../components/PageHeader";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const BudgetOverviewPage = () => {
  const [month, setMonth] = useState("July");
  const [budgets, setBudgets] = useState({});
  const [expenses, setExpenses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!month) return;

    const fetchBudgets = async () => {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(`http://localhost:5000/api/budget/${month}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const map = {};
      res.data.forEach(b => map[b.category] = b.amount);
      setBudgets(map);
    };

    const fetchExpenses = async () => {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(`http://localhost:5000/api/expenses/${month}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const map = {};
      res.data.forEach(e => map[e.category] = e.amount);
      setExpenses(map);
    };

    fetchBudgets();
    fetchExpenses();
  }, [month]);

  const totalBudget = Object.values(budgets).reduce((sum, val) => sum + val, 0);
  const totalSpent = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* Page Header with Back Button */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <PageHeader
              title="Monthly Budget Overview"
              subtitle="Track your budget vs. actual spending"
            />
          </div>
        </div>
      </div>

      {/* Month Selector + Insights */}
      <div className="flex-1 px-4 max-w-xl mx-auto">
        {/* Month Selector */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const currentIndex = months.indexOf(month);
                if (currentIndex > 0) setMonth(months[currentIndex - 1]);
              }}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={months.indexOf(month) === 0}
            >
              &lt;
            </button>
            <div className="flex items-center gap-3">
              <FiCalendar className="w-6 h-6 text-green-600" />
              <span className="text-xl font-semibold text-gray-900">
                {month ? `${month} 2025` : "Select Month"}
              </span>
            </div>
            <button
              onClick={() => {
                const currentIndex = months.indexOf(month);
                if (currentIndex < months.length - 1) setMonth(months[currentIndex + 1]);
              }}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={months.indexOf(month) === months.length - 1}
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Visualizer */}
        {month && (
          <BudgetVisualizer
            month={month}
            budgets={budgets}
            expenses={expenses}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default BudgetOverviewPage;
