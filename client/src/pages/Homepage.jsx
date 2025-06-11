import React from 'react'

import Login from './Login';
import Navbar from '../components/navbar';

export default function Homepage() {
  return (
    <div>
      <Navbar/>
      <div className='mx-[20px] mt-1 text-xl '>
        <span className='text-xl'>You've spent</span> <br /> 
        <span className='text-3xl font-medium'>Rs 50,000</span>
      </div>
      <div>
        
      </div>
      
    </div>
  )
}
