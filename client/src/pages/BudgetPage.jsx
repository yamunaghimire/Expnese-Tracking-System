import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiTag, FiCalendar, FiArrowLeft } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import { MdRestaurant } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import PageHeader from "../components/PageHeader";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const BudgetPage = () => {
  const [month, setMonth] = useState("July");
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [showInput, setShowInput] = useState({});
  const location = useLocation();
  const defaultMonth = location.state?.month || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://localhost:5000/api/categories", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!month) return;

    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(`http://localhost:5000/api/budget/${month}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const budgetMap = {};
        res.data.forEach(b => {
          budgetMap[b.category] = b.amount;
        });
        setBudgets(budgetMap);
      } catch (err) {
        console.error("Failed to fetch budgets", err);
        setBudgets({});
      }
    };

    fetchBudgets();
  }, [month]);

  useEffect(() => {
    if (defaultMonth) setMonth(defaultMonth);
  }, [defaultMonth]);

  const handleAmountChange = (category, value) => {
    setBudgets(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const toggleInput = (category) => {
    setShowInput(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!month) {
      alert("Please select a month.");
      return;
    }

    setLoading(true);
    setSubmitStatus("");

    const payload = {
      month,
      budgets: categories
        .filter(cat => budgets[cat.name] !== undefined && budgets[cat.name] !== "")
        .map(cat => ({
          category: cat.name,
          amount: parseFloat(budgets[cat.name]) || 0
        }))
    };

    try {
      const token = localStorage.getItem("access_token");
      await axios.post("http://localhost:5000/api/budget", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmitStatus("success");
    } catch (err) {
      console.error("Submit failed", err);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
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
              title="Create Budget"
              subtitle="Set your monthly spending limits by category"
              actionButtonStyle="outline"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto max-w-4xl mx-auto w-full">
        {/* Month Selector */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const currentIndex = months.indexOf(month);
                if (currentIndex > 0) setMonth(months[currentIndex - 1]);
              }}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              &lt;
            </button>
            <div className="flex items-center gap-2">
              <FiCalendar className="w-5 h-5 text-green-600" />
              <span className="text-lg font-semibold text-gray-900">
                {month ? `${month} 2025` : "Select Month"}
              </span>
            </div>
            <button
              onClick={() => {
                const currentIndex = months.indexOf(month);
                if (currentIndex < months.length - 1) setMonth(months[currentIndex + 1]);
              }}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Budget Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Budget Categories</h2>
            <p className="text-sm text-gray-600">Set your monthly spending limits</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {categories.map(cat => {
              const iconMap = {
                Groceries: <GiShoppingCart className="text-white w-5 h-5" />,
                Restaurant: <MdRestaurant className="text-white w-5 h-5" />
              };
              const icon = iconMap[cat.name] || <FiTag className="text-white w-5 h-5" />;

              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center shadow-sm">
                      {icon}
                    </div>
                    <div>
                      <span className="text-gray-900 font-medium">{cat.name}</span>
                      <p className="text-xs text-gray-500">Category</p>
                    </div>
                  </div>

                  {showInput[cat.name] ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Rs</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={budgets[cat.name] || ""}
                        onChange={e => handleAmountChange(cat.name, e.target.value)}
                        className="w-24 border border-gray-300 text-right rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        min="0"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => toggleInput(cat.name)}
                      className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-green-200 transition-colors border border-green-300"
                    >
                      Rs {budgets[cat.name] || 0}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-800 text-center font-medium">✓ Budgets saved successfully!</p>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-center font-medium">✗ Failed to save budgets. Please try again.</p>
          </div>
        )}
      </div>

      {/* Fixed Save Button */}
      <div className="w-full  z-40 max-w-xs mx-auto">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Budget"}
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default BudgetPage;