// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import CategoryDonutChart from "./CategoryDonutChart";

// // const BudgetBreakdown = () => {
// //   const [budgets, setBudgets] = useState({});
// //   const [expenses, setExpenses] = useState({});
// //   const [month, setMonth] = useState("");

// //   useEffect(() => {
// //     const currentMonth = new Date().toLocaleString("default", { month: "long" });
// //     setMonth(currentMonth);

// //     const fetchData = async () => {
// //       const token = localStorage.getItem("access_token");

// //       const [budgetRes, expenseRes] = await Promise.all([
// //         axios.get(`http://localhost:5000/api/budget/${currentMonth}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }),
// //         axios.get(`http://localhost:5000/api/expenses/${currentMonth}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }),
// //       ]);

// //       const budgetMap = {};
// //       budgetRes.data.forEach(b => budgetMap[b.category] = b.amount);
// //       setBudgets(budgetMap);

// //       const expenseMap = {};
// //       expenseRes.data.forEach(e => expenseMap[e.category] = e.amount);
// //       setExpenses(expenseMap);
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <div className="mt-6">
// //       <h2 className="text-lg font-semibold mb-4 text-center">Budget Breakdown – {month}</h2>
// //       {Object.keys(budgets).length === 0 ? (
// //         <p className="text-center text-gray-500">No budgets available for {month}.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //           {Object.entries(budgets).map(([category, amount]) => (
// //             <CategoryDonutChart
// //               key={category}
// //               category={category}
// //               budget={amount}
// //               spent={expenses[category] || 0}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BudgetBreakdown;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CategoryDonutChart from "./CategoryDonutChart";

// const BudgetBreakdown = ({ selectedMonth }) => {
//   const [budgets, setBudgets] = useState({});
//   const [expenses, setExpenses] = useState({});

//   useEffect(() => {
//     if (!selectedMonth) return;

//     const token = localStorage.getItem("access_token");

//     const fetchBudgets = async () => {
//       const res = await axios.get(`http://localhost:5000/api/budget/${selectedMonth}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const map = {};
//       res.data.forEach((b) => (map[b.category] = b.amount));
//       setBudgets(map);
//     };

//     const fetchExpenses = async () => {
//       const res = await axios.get(`http://localhost:5000/api/expenses/${selectedMonth}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const map = {};
//       res.data.forEach((e) => (map[e.category] = e.amount));
//       setExpenses(map);
//     };

//     fetchBudgets();
//     fetchExpenses();
//   }, [selectedMonth]);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       {/* <h2 className="text-lg font-bold mb-4">Budget Breakdown</h2> */}
//       <div className="space-y-6">
//         {Object.entries(budgets).map(([category, budgetAmt]) => {
//           const spent = expenses[category] || 0;
//           return (
//             <CategoryDonutChart
//               key={category}
//               category={category}
//               spent={spent}
//               budget={budgetAmt}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BudgetBreakdown;



import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryDonutChart from "./CategoryDonutChart";

const BudgetBreakdown = ({ selectedMonth }) => {
  const [budgets, setBudgets] = useState({});
  const [expenses, setExpenses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedMonth) return;

    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      try {
        const [budgetRes, expenseRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/budget/${selectedMonth}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5000/api/expenses/${selectedMonth}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const budgetMap = {};
        budgetRes.data.forEach((b) => (budgetMap[b.category] = b.amount));
        setBudgets(budgetMap);

        const expenseMap = {};
        expenseRes.data.forEach((e) => (expenseMap[e.category] = e.amount));
        setExpenses(expenseMap);
      } catch (err) {
        console.error("Error fetching budget or expense data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const hasBudget = Object.keys(budgets).length > 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : !hasBudget ? (
        <p className="text-center text-gray-500">
          No Data available for {selectedMonth}.
        </p>
      ) : (
        <div className="space-y-6">
          {Object.entries(budgets).map(([category, budgetAmt]) => {
            const spent = expenses[category] || 0;
            return (
              <CategoryDonutChart
                key={category}
                category={category}
                spent={spent}
                budget={budgetAmt}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetBreakdown;
