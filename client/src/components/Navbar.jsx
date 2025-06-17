import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPlus, FiBell } from "react-icons/fi";

export default function Navbar() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.warn('No token found in localStorage');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(response.data.name);
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const handlePlusClick = () => {
    navigate("/manual-entry"); // change this route to match your router
  };

  return (
    <div className="mx-[30px] mt-4 flex justify-between items-center">
      <div className="text-3xl mt-2 font-semibold">
        {name ? `Hi ${name}!` : "Hi!"}
      </div>
      <div className="flex items-center">
        <button
          onClick={handlePlusClick}
          className="m-1 w-6 h-6 rounded-full border-2 flex items-center justify-center"
        >
          <FiPlus size={18} />
        </button>
        <button className="m-1 text-2xl text-gray-700">
          <FiBell />
        </button>
      </div>
    </div>
  );
}
