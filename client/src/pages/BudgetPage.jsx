// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FiArrowLeft, FiPlus } from "react-icons/fi";
// import { GiShoppingCart } from "react-icons/gi";
// import { MdRestaurant } from "react-icons/md";
// import { FiTag } from "react-icons/fi"; // default fallback
// import { useNavigate, useLocation } from "react-router-dom";

// const months = [
//   "January", "February", "March", "April",
//   "May", "June", "July", "August",
//   "September", "October", "November", "December"
// ];

// const BudgetPage = () => {
//   const [month, setMonth] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [budgets, setBudgets] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState("");
//   const [showInput, setShowInput] = useState({});

//   const navigate = useNavigate();
//   const location = useLocation();
//   const defaultMonth = location.state?.month || "";

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await axios.get("http://localhost:5000/api/categories", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCategories(res.data);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (!month) return;

//     const fetchBudgets = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await axios.get(`http://localhost:5000/api/budget/${month}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         const budgetMap = {};
//         res.data.forEach(b => {
//           budgetMap[b.category] = b.amount;
//         });
//         setBudgets(budgetMap);
//       } catch (err) {
//         console.error("Failed to fetch budgets", err);
//         setBudgets({});
//       }
//     };

//     fetchBudgets();
//   }, [month]);

//   useEffect(() => {
//     if (defaultMonth) setMonth(defaultMonth);
//   }, [defaultMonth]);

//   const handleAmountChange = (category, value) => {
//     setBudgets(prev => ({
//       ...prev,
//       [category]: value
//     }));
//   };

//   const toggleInput = (category) => {
//     setShowInput(prev => ({
//       ...prev,
//       [category]: !prev[category]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!month) {
//       alert("Please select a month.");
//       return;
//     }

//     setLoading(true);
//     setSubmitStatus("");

//     const payload = {
//       month,
//       budgets: categories
//         .filter(cat => budgets[cat.name] !== undefined && budgets[cat.name] !== "")
//         .map(cat => ({
//           category: cat.name,
//           amount: parseFloat(budgets[cat.name]) || 0
//         }))
//     };

//     try {
//       const token = localStorage.getItem("access_token");
//       await axios.post("http://localhost:5000/api/budget", payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSubmitStatus("success");
//     } catch (err) {
//       console.error("Submit failed", err);
//       setSubmitStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white p-4">
//       <div className="flex items-center mb-4">
//         <FiArrowLeft
//           className="mr-2 text-2xl text-gray-700 cursor-pointer"
//           onClick={() => navigate('/')}
//         />
//       </div>

//       <h1 className="text-2xl font-bold mb-4 text-center">Set Monthly Budget</h1>

//       <div className="mb-6">
//         <label className="block text-gray-600 mb-1">Select Month</label>
//         <select
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 w-full"
//         >
//           <option value="">Select Month</option>
//           {months.map(m => (
//             <option key={m} value={m}>{m}</option>
//           ))}
//         </select>
//       </div>

//       <form onSubmit={handleSubmit}>
//   <div className="divide-y divide-gray-200">
//     {categories.map(cat => {
//       const iconMap = {
//         Groceries: <GiShoppingCart className="text-white w-4 h-4" />,
//         Restaurant: <MdRestaurant className="text-white w-4 h-4" />,
//       };

//       const icon = iconMap[cat.name] || <FiTag className="text-white w-4 h-4" />;

//       return (
//         <div
//           key={cat.id}
//           className="flex items-center justify-between py-3"
//         >
//           <div className="flex items-center gap-3">
//             <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center">
//               {icon}
//             </div>
//             <span className="text-gray-800">{cat.name}</span>
//           </div>

//           {showInput[cat.name] ? (
//             <input
//               type="number"
//               placeholder="NPR"
//               value={budgets[cat.name] || ""}
//               onChange={e => handleAmountChange(cat.name, e.target.value)}
//               className="w-24 border border-gray-300 text-right rounded px-3 py-1"
//               min="0"
//             />
//           ) : (
//             <div
//               onClick={() => toggleInput(cat.name)}
//               className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm cursor-pointer"
//             >
//               NPR {budgets[cat.name] || 0}
//             </div>
//           )}
//         </div>
//       );
//     })}
//   </div>

//   <button
//     type="submit"
//     disabled={loading}
//     className="w-full bg-teal-500 text-white py-3 rounded mt-6 font-semibold"
//   >
//     {loading ? "Saving..." : "Save Budget"}
//   </button>

//   {submitStatus === "success" && (
//     <p className="text-green-600 mt-3">Budgets saved successfully!</p>
//   )}
//   {submitStatus === "error" && (
//     <p className="text-red-600 mt-3">Failed to save budgets.</p>
//   )}
// </form>
//     </div>
//   );
// };

// export default BudgetPage;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FiArrowLeft, FiTag } from "react-icons/fi";
// import { GiShoppingCart } from "react-icons/gi";
// import { MdRestaurant } from "react-icons/md";
// import { useNavigate, useLocation } from "react-router-dom";
// import BottomNavBar from "../components/BottomNavBar";

// const months = [
//   "January", "February", "March", "April",
//   "May", "June", "July", "August",
//   "September", "October", "November", "December"
// ];

// const BudgetPage = () => {
//   const [month, setMonth] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [budgets, setBudgets] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState("");
//   const [showInput, setShowInput] = useState({});
//   const [activeTab, setActiveTab] = useState("plan");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const defaultMonth = location.state?.month || "";

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await axios.get("http://localhost:5000/api/categories", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCategories(res.data);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (!month) return;

//     const fetchBudgets = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await axios.get(`http://localhost:5000/api/budget/${month}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         const budgetMap = {};
//         res.data.forEach(b => {
//           budgetMap[b.category] = b.amount;
//         });
//         setBudgets(budgetMap);
//       } catch (err) {
//         console.error("Failed to fetch budgets", err);
//         setBudgets({});
//       }
//     };

//     fetchBudgets();
//   }, [month]);

//   useEffect(() => {
//     if (defaultMonth) setMonth(defaultMonth);
//   }, [defaultMonth]);

//   const handleAmountChange = (category, value) => {
//     setBudgets(prev => ({
//       ...prev,
//       [category]: value
//     }));
//   };

//   const toggleInput = (category) => {
//     setShowInput(prev => ({
//       ...prev,
//       [category]: !prev[category]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!month) {
//       alert("Please select a month.");
//       return;
//     }

//     setLoading(true);
//     setSubmitStatus("");

//     const payload = {
//       month,
//       budgets: categories
//         .filter(cat => budgets[cat.name] !== undefined && budgets[cat.name] !== "")
//         .map(cat => ({
//           category: cat.name,
//           amount: parseFloat(budgets[cat.name]) || 0
//         }))
//     };

//     try {
//       const token = localStorage.getItem("access_token");
//       await axios.post("http://localhost:5000/api/budget", payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSubmitStatus("success");
//     } catch (err) {
//       console.error("Submit failed", err);
//       setSubmitStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white pb-24">

//       {/* Sticky PLAN / INSIGHTS tab bar */}
//       <div className="w-full bg-teal-500 py-2 px-4  sticky top-0 z-40">
//         <div className="flex justify-center gap-2">
//           <button
//             onClick={() => setActiveTab("plan")}
//             className={`px-6 py-1.5 rounded-full font-semibold ${
//               activeTab === "plan" ? "bg-white/20 text-white" : "text-white opacity-90"
//             }`}
//           >
//             PLAN
//           </button>
//           <button
//             onClick={() => setActiveTab("insights")}
//             className={`px-6 py-1.5 rounded-full font-semibold ${
//               activeTab === "insights" ? "bg-white/20 text-white" : "text-white opacity-90"
//             }`}
//           >
//             INSIGHTS
//           </button>
//         </div>
//       </div>

//       {/* Scrollable content */}
//       <div className="flex-1 p-4 overflow-y-auto">
        
//         {activeTab === "plan" && (
//           <>
//             {/* Month Selector */}
//             <div className="flex items-center justify-between bg-gray-100 rounded-full py-2 px-5 mb-6">
//               <button
//                 onClick={() => {
//                   const currentIndex = months.indexOf(month);
//                   if (currentIndex > 0) setMonth(months[currentIndex - 1]);
//                 }}
//                 className="text-xl text-gray-700"
//               >
//                 &lt;
//               </button>
//               <span className="text-lg font-medium text-gray-900">
//                 {month ? `${month} 2025` : "Select Month"}
//               </span>
//               <button
//                 onClick={() => {
//                   const currentIndex = months.indexOf(month);
//                   if (currentIndex < months.length - 1) setMonth(months[currentIndex + 1]);
//                 }}
//                 className="text-xl text-gray-700"
//               >
//                 &gt;
//               </button>
//             </div>

//             {/* Budget Form */}
//             <form onSubmit={handleSubmit}>
//               <div className="divide-y divide-gray-200">
//                 {categories.map(cat => {
//                   const iconMap = {
//                     Groceries: <GiShoppingCart className="text-white w-4 h-4" />,
//                     Restaurant: <MdRestaurant className="text-white w-4 h-4" />
//                   };
//                   const icon = iconMap[cat.name] || <FiTag className="text-white w-4 h-4" />;

//                   return (
//                     <div
//                       key={cat.id}
//                       className="flex items-center justify-between py-3"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center">
//                           {icon}
//                         </div>
//                         <span className="text-gray-800">{cat.name}</span>
//                       </div>

//                       {showInput[cat.name] ? (
//                         <input
//                           type="number"
//                           placeholder="NPR"
//                           value={budgets[cat.name] || ""}
//                           onChange={e => handleAmountChange(cat.name, e.target.value)}
//                           className="w-24 border border-gray-300 text-right rounded px-3 py-1"
//                           min="0"
//                         />
//                       ) : (
//                         <div
//                           onClick={() => toggleInput(cat.name)}
//                           className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm cursor-pointer"
//                         >
//                           NPR {budgets[cat.name] || 0}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>

//               {submitStatus === "success" && (
//                 <p className="text-green-600 mt-3">Budgets saved successfully!</p>
//               )}
//               {submitStatus === "error" && (
//                 <p className="text-red-600 mt-3">Failed to save budgets.</p>
//               )}
//             </form>
//           </>
//         )}

//         {activeTab === "insights" && (
//           <div className="mt-6 text-gray-800">
//             <h2 className="text-xl font-semibold mb-4">Spending Insights</h2>
//             <p className="text-center">Here you can display charts, remaining budget, and usage analytics.</p>
//           </div>
//         )}
//       </div>

//       {/* Fixed Save Button (only in PLAN tab) */}
//       {activeTab === "plan" && (
//         <div className="fixed bottom-20 left-4 right-4 z-40">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold shadow"
//           >
//             {loading ? "Saving..." : "Save Budget"}
//           </button>
//         </div>
//       )}

//       {/* Fixed Bottom Navigation */}
//       <div className="fixed bottom-0 left-0 right-0 z-50">
//         <BottomNavBar />
//       </div>
//     </div>
//   );
// };

// export default BudgetPage;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiTag } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import { MdRestaurant } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import BudgetTopTabs from "../components/BudgetTopTabs";

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
    <div className="min-h-screen flex flex-col bg-white pb-24">
      <BudgetTopTabs />

      <div className="flex-1 p-4 overflow-y-auto">
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

        <form onSubmit={handleSubmit}>
          <div className="divide-y divide-gray-200">
            {categories.map(cat => {
              const iconMap = {
                Groceries: <GiShoppingCart className="text-white w-4 h-4" />,
                Restaurant: <MdRestaurant className="text-white w-4 h-4" />
              };
              const icon = iconMap[cat.name] || <FiTag className="text-white w-4 h-4" />;

              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center">
                      {icon}
                    </div>
                    <span className="text-gray-800">{cat.name}</span>
                  </div>

                  {showInput[cat.name] ? (
                    <input
                      type="number"
                      placeholder="NPR"
                      value={budgets[cat.name] || ""}
                      onChange={e => handleAmountChange(cat.name, e.target.value)}
                      className="w-24 border border-gray-300 text-right rounded px-3 py-1"
                      min="0"
                    />
                  ) : (
                    <div
                      onClick={() => toggleInput(cat.name)}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      NPR {budgets[cat.name] || 0}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {submitStatus === "success" && (
            <p className="text-green-600 mt-3">Budgets saved successfully!</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-600 mt-3">Failed to save budgets.</p>
          )}
        </form>
      </div>

      {/* Fixed Save Button */}
      <div className="fixed bottom-20 left-4 right-4 z-40">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold shadow"
        >
          {loading ? "Saving..." : "Save Budget"}
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default BudgetPage;