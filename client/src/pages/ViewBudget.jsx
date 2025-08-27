// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FiArrowLeft } from 'react-icons/fi';


// const ViewBudgetsPage = () => {
//   const [months, setMonths] = useState([]);
//   const [budgetsByMonth, setBudgetsByMonth] = useState({});
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllBudgets = async () => {
//       try {
//         const token = localStorage.getItem("access_token");

//         const monthRes = await axios.get("http://localhost:5000/api/budget/months", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const userMonths = monthRes.data;
//         setMonths(userMonths);

//         const budgetPromises = userMonths.map((month) =>
//           axios.get(`http://localhost:5000/api/budget/${month}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//         );

//         const budgetResponses = await Promise.all(budgetPromises);

//         const monthBudgetMap = {};
//         userMonths.forEach((month, idx) => {
//           monthBudgetMap[month] = budgetResponses[idx].data;
//         });

//         setBudgetsByMonth(monthBudgetMap);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching budgets:", err);
//         setLoading(false);
//       }
//     };

//     fetchAllBudgets();
//   }, []);

//   if (loading) return <p className="p-4">Loading budgets...</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <button onClick={() => navigate('/')} className="mb-4 text-teal-600 flex items-center">
//   <FiArrowLeft className="mr-2 text-2xl text-gray-700 cursor-pointer" />
 
// </button>

//       <h1 className="text-2xl font-bold text-center mb-6">Your Set Budgets</h1>

//       {months.map((month) => {
//         const budgetItems = budgetsByMonth[month] || [];
//         const total = budgetItems.reduce((sum, item) => sum + item.amount, 0);

//         return (
//           <div key={month} className="bg-white shadow rounded p-4 mb-6">
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-xl font-semibold text-teal-600">{month}</h2>
//               <button
//                 onClick={() => navigate('/budget', { state: { month } })}
//                 className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//             </div>

//             {/* Total */}
//             <p className="font-semibold text-gray-800 mb-2">
//               Total Monthly Budget: <span className="text-black">Rs. {total}</span>
//             </p>

//             {/* Progress Bar (placeholder) */}
//             <div className="w-full bg-gray-200 h-3 rounded mb-4">
//               <div className="bg-green-500 h-3 rounded" style={{ width: "0%" }}></div>
//             </div>

//             {/* List of categories */}
//             {budgetItems.length > 0 ? (
//               <ul className="space-y-1">
//                 {budgetItems.map((item, idx) => (
//                   <li key={idx} className="flex justify-between border-b pb-1">
//                     <span>{item.category}</span>
//                     <span>Rs. {item.amount}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No budgets set for this month.</p>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ViewBudgetsPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { MdOutlineEditCalendar } from 'react-icons/md';
import BottomNavbar from '../components/BottomNavbar';
import BudgetTopTabs from '../components/BudgetTopTabs';

const allMonths = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const ViewBudgetsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [budgetsByMonth, setBudgetsByMonth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBudgets = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const monthRes = await axios.get("http://localhost:5000/api/budget/months", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userMonths = monthRes.data;

        const budgetPromises = allMonths.map((month) =>
          axios.get(`http://localhost:5000/api/budget/${month}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => ({ month, data: res.data }))
            .catch(() => ({ month, data: [] }))
        );

        const responses = await Promise.all(budgetPromises);

        const monthBudgetMap = {};
        responses.forEach(({ month, data }) => {
          monthBudgetMap[month] = data;
        });

        setBudgetsByMonth(monthBudgetMap);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching budgets:", err);
        setLoading(false);
      }
    };

    fetchAllBudgets();
  }, []);

  const handlePrevMonth = () => {
    const currentIndex = allMonths.indexOf(selectedMonth);
    if (currentIndex > 0) setSelectedMonth(allMonths[currentIndex - 1]);
  };

  const handleNextMonth = () => {
    const currentIndex = allMonths.indexOf(selectedMonth);
    if (currentIndex < allMonths.length - 1) setSelectedMonth(allMonths[currentIndex + 1]);
  };

  const budgetItems = budgetsByMonth[selectedMonth] || [];
  const total = budgetItems.reduce((sum, item) => sum + item.amount, 0);

  if (loading) return <p className="text-center py-10 text-gray-600">Loading budgets...</p>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      <BudgetTopTabs />

    

      {/* Month Selector */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between bg-gray-100 rounded-full py-2 px-5 mb-6">
          <button
            onClick={handlePrevMonth}
            className="text-xl text-gray-700"
            disabled={allMonths.indexOf(selectedMonth) === 0}
          >
            &lt;
          </button>
          <span className="text-lg font-medium text-gray-900">
            {selectedMonth} 2025
          </span>
          <button
            onClick={handleNextMonth}
            className="text-xl text-gray-700"
            disabled={allMonths.indexOf(selectedMonth) === allMonths.length - 1}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Monthly Budget Card */}
      <div className="flex-1 px-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-teal-700">{selectedMonth}</h2>
            <button
              onClick={() => navigate('/budget', { state: { month: selectedMonth } })}
              className="text-xs bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-full shadow-sm"
            >
              Edit
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            Total Monthly Budget: <span className="font-medium text-gray-900">Rs. {total}</span>
          </p>

          <div className="space-y-2">
            {budgetItems.length > 0 ? (
              budgetItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm border-b border-gray-100 pb-1"
                >
                  <span className="text-gray-700">{item.category}</span>
                  <span className="font-medium text-gray-800">Rs. {item.amount}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No budgets set for this month.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default ViewBudgetsPage;
