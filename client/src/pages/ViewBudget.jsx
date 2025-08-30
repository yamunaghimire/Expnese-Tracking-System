import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiEdit2, FiPlus } from 'react-icons/fi';
import { MdOutlineEditCalendar } from 'react-icons/md';
import BottomNavbar from '../components/BottomNavbar';
import PageHeader from '../components/PageHeader';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading budgets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pb-24 flex flex-col">
      {/* Page Header */}
      <PageHeader
        title="View Budget"
        subtitle="Track and manage your monthly spending limits"
        actionText="Create Budget"
        actionIcon={FiPlus}
        onAction={() => navigate('/budget', { state: { month: selectedMonth } })}
        actionButtonStyle="outline"
      />

      {/* Month Selector */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={allMonths.indexOf(selectedMonth) === 0}
            >
              &lt;
            </button>
            <div className="flex items-center gap-3">
              <FiCalendar className="w-6 h-6 text-green-600" />
              <span className="text-xl font-semibold text-gray-900">
                {selectedMonth} 2025
              </span>
            </div>
            <button
              onClick={handleNextMonth}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={allMonths.indexOf(selectedMonth) === allMonths.length - 1}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Budget Overview */}
      <div className="flex-1 px-4 mt-6 space-y-6">
        {/* Total Budget Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Total Monthly Budget</h2>
            <button
              onClick={() => navigate('/budget', { state: { month: selectedMonth } })}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="text-3xl font-bold">Rs. {total.toLocaleString()}</div>
          <p className="text-green-100 text-sm mt-1">
            {budgetItems.length} budget categories
          </p>
        </div>

        {/* Budget Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Budget Breakdown</h3>
            <p className="text-sm text-gray-600">Your spending limits by category</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {budgetItems.length > 0 ? (
              budgetItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-700 text-sm font-medium">
                        {item.category.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-900 font-medium">{item.category}</span>
                      <p className="text-xs text-gray-500">Budget Category</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-700">Rs. {item.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Allocated</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <FiCalendar className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-500 font-medium">No budgets set for {selectedMonth}</p>
                <p className="text-sm text-gray-400 mt-1">Set your monthly spending limits to get started</p>
                <button
                  onClick={() => navigate('/budget', { state: { month: selectedMonth } })}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Set Budget
                </button>
              </div>
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
