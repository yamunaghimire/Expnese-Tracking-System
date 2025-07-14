// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BudgetVisualizer from "../components/BudgetVisualizer";
// import { FiArrowLeft } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const months = [
//   "January", "February", "March", "April",
//   "May", "June", "July", "August",
//   "September", "October", "November", "December"
// ];

// const BudgetOverviewPage = () => {
//   const [month, setMonth] = useState("");
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

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <div className="relative flex items-center justify-center mb-4">
//   <FiArrowLeft
//     className="absolute left-0 text-2xl text-gray-700 cursor-pointer"
//     onClick={() => navigate("/")}
//   />
//   <h1 className="text-2xl font-bold text-center">Budget Overview</h1>
// </div>


//       <div className="mb-6 mt-4">
//         {/* <label className="block text-gray-600 mb-1">Select Month</label> */}
//         <select
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 w-full font-bold text-xl text-center"
//         >
//           <option value="">Select Month</option>
//           {months.map(m => (
//             <option key={m} value={m}>{m}</option>
//           ))}
//         </select>
//       </div>

//       {month && (
//         <BudgetVisualizer
//           month={month}
//           budgets={budgets}
//           expenses={expenses}
//         />
//       )}
//     </div>
//   );
// };

// export default BudgetOverviewPage;


// BudgetOverviewPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import BudgetVisualizer from "../components/BudgetVisualizer";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BudgetTopTabs from "../components/BudgetTopTabs";
import BottomNavBar from "../components/BottomNavBar";

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
      <BudgetTopTabs />

      <div className="flex-1 p-4 max-w-xl mx-auto">
        {/* <div className="relative flex items-center justify-center mb-4">
          <FiArrowLeft
            className="absolute left-0 text-2xl text-gray-700 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-2xl font-bold text-center">Budget Overview</h1>
        </div> */}

        {/* Month Selector (same as BudgetPage) */}
        <div className="flex items-center justify-between bg-gray-100 rounded-full py-2 px-5 mb-6">
          <button
            onClick={() => {
              const currentIndex = months.indexOf(month);
              if (currentIndex > 0) setMonth(months[currentIndex - 1]);
            }}
            className="text-xl text-gray-700"
          >
            &lt;
          </button>
          <span className="text-lg font-medium text-gray-900">
            {month ? `${month} 2025` : "Select Month"}
          </span>
          <button
            onClick={() => {
              const currentIndex = months.indexOf(month);
              if (currentIndex < months.length - 1) setMonth(months[currentIndex + 1]);
            }}
            className="text-xl text-gray-700"
          >
            &gt;
          </button>
        </div>

        {month && (
          <>
            <BudgetVisualizer
              month={month}
              budgets={budgets}
              expenses={expenses}
            />

          </>
        )}
      </div>

      {/* Bottom NavBar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default BudgetOverviewPage;
