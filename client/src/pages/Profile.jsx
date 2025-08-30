import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiLogOut, FiUser } from 'react-icons/fi';
import { FaUpload } from 'react-icons/fa';
import { LuSettings } from "react-icons/lu";
import { GrPlan } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNavbar from '../components/BottomNavbar';

const Profile = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        const response = await axios.get('http://localhost:5000/api/getuser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(response.data.name);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Content wrapper */}
      <div className="flex-1 px-6 pt-6 pb-6">
        {/* Top Bar */}
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/')}>
            <FiArrowLeft size={22} />
          </button>
        </div>

        {/* Profile Icon */}
        <div className="flex flex-col items-center">
          <div className="w-[100px] h-[100px] rounded-2xl bg-gray-100 flex items-center justify-center mb-2">
            <FiUser size={50} className="text-gray-400" />
          </div>
          <p className="text-gray-400 text-sm">username</p>
          <p className="text-xl font-semibold">{username || '...'}</p>
        </div>

        
        <div className="mt-10 space-y-6">
          <OptionCard icon={<LuSettings />} label="Account Settings" />
          <OptionCard
              icon={<GrPlan />}
              label="View Budget Plan"
              onClick={() => navigate('/view-budgets')}
/>

          
          <OptionCard
            icon={<FiLogOut />}
            label="Logout"
            onClick={() => {
              localStorage.removeItem('access_token');
              // Dispatch custom event to notify App component
              window.dispatchEvent(new Event('logout'));
              navigate('/login');
            }}
          />
        </div>
      </div>

      {/* Bottom Nav pinned */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavbar />
      </div>
    </div>
  );
};

const OptionCard = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center bg-[#f5f2ff] px-4 py-3 rounded-xl cursor-pointer"
  >
    <div className="text-green-500 text-xl mr-4">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Profile;
