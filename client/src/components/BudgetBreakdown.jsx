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
