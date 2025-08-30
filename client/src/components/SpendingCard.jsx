import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiShoppingBag } from 'react-icons/fi';

const SpendingCard = () => {
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error("No access token");
        }

        const response = await axios.get('http://localhost:5000/api/expenses/total', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data || typeof response.data.amount !== 'number') {
          throw new Error("Invalid response format");
        }

        setAmount(response.data.amount);
      } catch (err) {
        console.error('Failed to fetch total amount:', err);
        setError("Could not load spending data.");
      }
    };

    fetchAmount();
  }, []);

  return (
    <div className="mx-5 mt-4">
      <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 flex items-center">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <FiShoppingBag className="text-green-600 text-xl" />
        </div>
        <div>
          <p className="text-sm text-gray-600">You've Spent</p>
          <p className="text-2xl font-bold text-gray-800">
            {error ? error :
              amount !== null ? `Rs. ${amount.toFixed(2)}` : 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpendingCard;
