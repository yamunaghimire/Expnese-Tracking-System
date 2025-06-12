import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Navbar() {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.warn('No token found in localStorage');
          return;
        } // JWT stored on login
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Username:', response.data.name);
        setName(response.data.name);
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className='mx-[20px] mt-4 flex justify-between'> 
      <div className='text-3xl mt-2 font-semibold'>
        {name ? `Hi ${name}!` : 'Hi!'}
      </div>
      <div className='flex'>
        <button className='m-1 w-8 h-8 rounded-full border-2'>S</button>
        <button className='m-1 w-8 h-8 rounded-full border-2'>P</button>
      </div>
    </div>
    
  );
}
