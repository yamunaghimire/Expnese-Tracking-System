import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiShoppingBag } from 'react-icons/fi';

const SpendingCard = () => {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.warn('No token found in localStorage');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/amount', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched amount:', response.data.amount);
        setAmount(response.data.amount);
      } catch (error) {
        console.error('Failed to fetch amount:', error);
      }
    };

    fetchAmount();
  }, []);

  return (
    <div className="mx-[30px] pt-2">
      <div className="flex items-center text-black text-[15px] mb-1">
        <FiShoppingBag className="w-5 h-5 text-gray-500 mr-1" />
        <span>You’ve spent</span>
      </div>
      <div className="text-3xl font-bold text-black">
        {amount !== null ? `Rs. ${amount}` : 'Loading...'}
      </div>
    </div>
  );
};

export default SpendingCard;
