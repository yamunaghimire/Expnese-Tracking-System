import React from 'react';
import { FiHome, FiFileText, FiPieChart, FiUser } from 'react-icons/fi';
import ScanActionButton from './ScanActionButton';
import { useNavigate } from 'react-router-dom';

const BottomNavBar = () => {
  const navigate = useNavigate();

const handleProfileClick = () => {
    navigate("/profile"); // change this route to match your router
  };
  const handleBudgetClick = () => {
    navigate("/budget"); // change this route to match your router
  };
  const handleHomeClick = () => {
    navigate("/"); // change this route to match your router
  };
  return (
    <div className="relative bg-white border-t shadow-md w-full fixed bottom-0 flex justify-around items-center py-3 z-50">
      <div className="flex flex-col items-center text-purple-500">
        <FiHome className="text-xl" onClick={handleHomeClick}/>
        <span className="text-xs mt-1">Home</span>
      </div>

      <div className="flex flex-col items-center text-gray-400">
        <FiFileText className="text-xl" />
        <span className="text-xs mt-1">Documents</span>
      </div>

      {/* Central Scan Button */}
      <ScanActionButton />

      <div className="flex flex-col items-center text-gray-400">
        <FiPieChart className="text-xl" onClick={handleBudgetClick} />
        <span className="text-xs mt-1">Budget</span>
      </div>

      <div className="flex flex-col items-center text-gray-400" >
        <FiUser className="text-xl" onClick={handleProfileClick}/>
        <span className="text-xs mt-1">Profile</span>
      </div>
    </div>
  );
};

export default BottomNavBar;
