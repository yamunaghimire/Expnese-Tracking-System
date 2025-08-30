import React from 'react';
import { FiHome, FiFileText, FiPieChart, FiUser } from 'react-icons/fi';
import ScanActionButton from './ScanActionButton';
import { useNavigate } from 'react-router-dom';

const BottomNavbar = () => {
  const navigate = useNavigate();

const handleProfileClick = () => {
    navigate("/profile"); 
  };
  const handleBudgetClick = () => {
    navigate("/budget"); 
  };
  const handleHomeClick = () => {
    navigate("/"); 
  };
  const handleReceiptsClick = () => {
    navigate("/receipts");
  };
  return (
   <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-3 flex justify-around items-center">
      <div className="flex flex-col items-center text-purple-500">
        <FiHome className="text-xl" onClick={handleHomeClick}/>
        <span className="text-xs mt-1">Home</span>
      </div>

      <div className="flex flex-col items-center text-gray-400 ">
        <FiFileText className="text-xl"  onClick={handleReceiptsClick}/>
        <span className="text-xs mt-1">Receipts</span>
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

export default BottomNavbar;
