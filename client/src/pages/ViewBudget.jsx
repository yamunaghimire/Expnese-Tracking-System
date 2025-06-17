import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


const ViewBudgetsPage = () => {
  const [months, setMonths] = useState([]);
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
        setMonths(userMonths);

        const budgetPromises = userMonths.map((month) =>
          axios.get(`http://localhost:5000/api/budget/${month}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        );

        const budgetResponses = await Promise.all(budgetPromises);

        const monthBudgetMap = {};
        userMonths.forEach((month, idx) => {
          monthBudgetMap[month] = budgetResponses[idx].data;
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

  if (loading) return <p className="p-4">Loading budgets...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate('/')} className="mb-4 text-teal-600 flex items-center">
  <FiArrowLeft className="mr-2 text-2xl text-gray-700 cursor-pointer" />
 
</button>

      <h1 className="text-2xl font-bold text-center mb-6">Your Set Budgets</h1>

      {months.map((month) => {
        const budgetItems = budgetsByMonth[month] || [];
        const total = budgetItems.reduce((sum, item) => sum + item.amount, 0);

        return (
          <div key={month} className="bg-white shadow rounded p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-teal-600">{month}</h2>
              <button
                onClick={() => navigate('/budget', { state: { month } })}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </div>

            {/* Total */}
            <p className="font-semibold text-gray-800 mb-2">
              Total Monthly Budget: <span className="text-black">Rs. {total}</span>
            </p>

            {/* Progress Bar (placeholder) */}
            <div className="w-full bg-gray-200 h-3 rounded mb-4">
              <div className="bg-green-500 h-3 rounded" style={{ width: "0%" }}></div>
            </div>

            {/* List of categories */}
            {budgetItems.length > 0 ? (
              <ul className="space-y-1">
                {budgetItems.map((item, idx) => (
                  <li key={idx} className="flex justify-between border-b pb-1">
                    <span>{item.category}</span>
                    <span>Rs. {item.amount}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No budgets set for this month.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ViewBudgetsPage;
