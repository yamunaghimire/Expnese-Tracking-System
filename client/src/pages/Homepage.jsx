import React, { useRef } from 'react'

import Login from './Login';
import Navbar from '../components/navbar';
// import ScanActionButton from '../components/ScanActionButton';
// import ImageUploader from '../components/ImageUploader';
import SpendingCard from '../components/SpendingCard';
import SavingsBanner from '../components/SavingsBanner';
import TimeFilterTabs from '../components/TimeFilterTabs';
// import ManualEntryForm from '../components/ManualEntryForm';
// import ScannedEntryForm from '../components/ScannedEntryForm';
import BottomNavBar from '../components/BottomNavbar';
import SpendingTrendChart from '../components/SpendingTrendChart';
import BudgetBreakdown from '../components/BudgetBreakdown';
// import ReceiptProcessor from '../components/ReceiptProcessor';



export default function Homepage() {
  
  return (
    <div>
      <Navbar/>
      <SpendingCard/>
      <SavingsBanner/>
      <TimeFilterTabs/>
      <SpendingTrendChart/>
      <BudgetBreakdown/>
      {/* <ManualEntryForm/>
      <ScannedEntryForm/> */}
       {/* <ReceiptProcessor/> */}
      <BottomNavBar/>
      
      
      <div>
      
    </div>

      
      
      
    </div>
  )
}
