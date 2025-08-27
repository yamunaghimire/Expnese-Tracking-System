import React from "react";
import { useNavigate } from "react-router-dom";
import { FiClipboard, FiFileText } from "react-icons/fi"; // Icons optional

const PlanInsightsButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-5 mt-4 flex gap-4">
      <button
        onClick={() => navigate("/budget-overview")}
        className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 font-medium text-sm py-3 rounded-xl border border-green-100 shadow-sm hover:bg-green-100 hover:shadow-md transition-all duration-200"
      >
        <FiClipboard className="text-base" />
        Monthly Insights
      </button>

      <button
        onClick={() => navigate("/receipts")}
        className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 font-medium text-sm py-3 rounded-xl border border-emerald-100 shadow-sm hover:bg-emerald-100 hover:shadow-md transition-all duration-200"
      >
        <FiFileText className="text-base" />
        Your Receipts
      </button>
    </div>
  );
};

export default PlanInsightsButtons;
