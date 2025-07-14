// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const BudgetTopTabs = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isInsights = location.pathname === "/budget-overview";

//   return (
//     <div className="w-full bg-teal-500 py-2 px-4 sticky top-0 z-40">
//       <div className="flex justify-center gap-2">
//         <button
//           onClick={() => navigate("/budget")}
//           className={`px-6 py-1.5 rounded-full font-semibold ${
//             !isInsights ? "bg-white/20 text-white" : "text-white opacity-90"
//           }`}
//         >
//           PLAN
//         </button>
//         <button
//           onClick={() => navigate("/budget-overview")}
//           className={`px-6 py-1.5 rounded-full font-semibold ${
//             isInsights ? "bg-white/20 text-white" : "text-white opacity-90"
//           }`}
//         >
//           INSIGHTS
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BudgetTopTabs;


import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BudgetTopTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isInsights = location.pathname === "/budget-overview";

  return (
    <div className="w-full bg-teal-500 px-4 py-4 sticky top-0 z-40 shadow-sm rounded-b-2xl">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => navigate("/budget")}
          className={`px-6 py-1.5 rounded-full font-semibold transition ${
            !isInsights ? "bg-white/20 text-white" : "text-white/80"
          }`}
        >
          PLAN
        </button>
        <button
          onClick={() => navigate("/budget-overview")}
          className={`px-6 py-1.5 rounded-full font-semibold transition ${
            isInsights ? "bg-white/20 text-white" : "text-white/80"
          }`}
        >
          INSIGHTS
        </button>
      </div>
    </div>
  );
};

export default BudgetTopTabs;
