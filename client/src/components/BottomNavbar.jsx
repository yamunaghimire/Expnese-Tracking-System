import React from 'react';
import { FiHome, FiFileText, FiPieChart, FiUser } from 'react-icons/fi';
import ScanActionButton from './ScanActionButton';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    navigate("/profile"); 
  };
  const handleBudgetClick = () => {
    navigate("/view-budgets"); 
  };
  const handleHomeClick = () => {
    navigate("/"); 
  };
  const handleReceiptsClick = () => {
    navigate("/receipts");
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path === "/budget" && (location.pathname.startsWith("/budget") || location.pathname.startsWith("/view-budgets"))) return true;
    if (path !== "/" && path !== "/budget" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    
   <div className="max-w-md mx-auto fixed bottom-4 left-4 right-4 z-50 bg-white shadow-lg rounded-full py-5 px-6 flex justify-around items-center border border-gray-100">
      <div className={`flex flex-col items-center cursor-pointer hover:scale-110 transition-transform ${isActive("/") ? "text-green-500" : "text-gray-400"}`}>
        <FiHome className="text-3xl" onClick={handleHomeClick}/>
      </div>

      <div className={`flex flex-col items-center cursor-pointer hover:scale-110 transition-transform ${isActive("/receipts") ? "text-green-500" : "text-gray-400"}`}>
        <FiFileText className="text-3xl"  onClick={handleReceiptsClick}/>
      </div>

      {/* Central Scan Button */}
      <ScanActionButton />

      <div className={`flex flex-col items-center cursor-pointer hover:scale-110 transition-transform ${isActive("/budget") ? "text-green-500" : "text-gray-400"}`}>
        <FiPieChart className="text-3xl" onClick={handleBudgetClick} />
      </div>

      <div className={`flex flex-col items-center cursor-pointer hover:scale-110 transition-transform ${isActive("/profile") ? "text-green-500" : "text-gray-400"}`}>
        <FiUser className="text-3xl" onClick={handleProfileClick}/>
      </div>
    </div>
  );
};

export default BottomNavbar;
