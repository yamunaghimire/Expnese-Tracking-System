import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const categories = [
  "Groceries",
  "Apparels",
  "Personal Care",
  "Food and Dining",
  "Entertainment",
  "Miscellaneous"
];

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];


const BudgetPage = () => {
  const [month, setMonth] = useState("");
  const [budgets, setBudgets] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const navigate = useNavigate();
  

const location = useLocation();
const defaultMonth = location.state?.month || "";



  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(`http://localhost:5000/api/budget/${month}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = {};
        res.data.forEach(b => {
          data[b.category] = b.amount;
        });
        setBudgets(data);
      } catch (err) {
        console.error("Failed to fetch budgets", err);
        setBudgets({});
      }
    };

    fetchBudgets();
  }, [month]);

  const handleAmountChange = (category, value) => {
    setBudgets(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("");

    const payload = {
      month,
      budgets: categories
        .filter(cat => budgets[cat] !== undefined && budgets[cat] !== "")
        .map(cat => ({
          category: cat,
          amount: parseFloat(budgets[cat]) || 0
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
    <div className="min-h-screen bg-white p-4">
        <div className="flex items-center mb-4">
  <FiArrowLeft
    className="mr-2 text-2xl text-gray-700 cursor-pointer"
    onClick={() => navigate('/')}
  />
 
</div>
        
      <h1 className="text-2xl font-bold mb-4 text-center">Set Monthly Budget</h1>

      <div className="mb-6">
        <label className="block text-gray-600 mb-1">Select Month</label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="">Select Month</option>
          {months.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        {categories.map((cat) => (
          <div key={cat} className="mb-4">
            <label className="block text-gray-600 mb-1">{cat}</label>
            <input
              type="number"
              placeholder={`Budget for ${cat}`}
              value={budgets[cat] || ""}
              onChange={(e) => handleAmountChange(cat, e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              min="0"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-3 rounded mt-4 font-semibold"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Budget"}
        </button>

        {submitStatus === "success" && (
          <p className="text-green-600 mt-3">Budgets saved successfully!</p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-600 mt-3">Failed to save budgets.</p>
        )}
      </form>
    </div>
  );
};

export default BudgetPage;
