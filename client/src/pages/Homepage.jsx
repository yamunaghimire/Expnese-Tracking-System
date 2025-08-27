// import React, { useRef, useState } from 'react'

// import Login from './Login';
// import Navbar from '../components/navbar';
// // import ScanActionButton from '../components/ScanActionButton';
// // import ImageUploader from '../components/ImageUploader';
// // import SpendingCard from '../components/SpendingCard';
// import SavingsBanner from '../components/SavingsBanner';
// import TimeFilterTabs from '../components/TimeFilterTabs';
// // import ManualEntryForm from '../components/ManualEntryForm';
// // import ScannedEntryForm from '../components/ScannedEntryForm';
// import BottomNavBar from '../components/BottomNavbar';
// import SpendingTrendChart from '../components/SpendingTrendChart';
// import BudgetBreakdown from '../components/BudgetBreakdown';
// import SpendingCard from '../components/SpendingCard';
// // import ReceiptProcessor from '../components/ReceiptProcessor';



// export default function Homepage() {
//   const [selectedMonth, setSelectedMonth] = useState("July"); // Default month
//   return (
//     <div>
//       <Navbar/>
//        <main className="flex-grow pb-24 px-4"></main>
//        <SpendingCard/>
    
//       {/* <SavingsBanner/> */}
     
    
//       <SpendingTrendChart/>

//       <h2 className=" font-medium  text-2xl  mt-8 mx-[20px]">Budget Breakdown</h2>
//        <TimeFilterTabs
//         selectedMonth={selectedMonth}
//         onSelectMonth={setSelectedMonth}
//       />
//       <BudgetBreakdown selectedMonth={selectedMonth} />
//       {/* <ManualEntryForm/>
//       <ScannedEntryForm/> */}
//        {/* <ReceiptProcessor/> */}
       
//       <BottomNavBar/>
      
      
//       <div>
      
//     </div>

      
      
      
//     </div>
//   )
// }


import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SpendingCard from '../components/SpendingCard';
import TimeFilterTabs from '../components/TimeFilterTabs';
import BottomNavBar from '../components/BottomNavbar';
import SpendingTrendChart from '../components/SpendingTrendChart';
import BudgetBreakdown from '../components/BudgetBreakdown';
import BudgetOverviewBanner from '../components/BudgetOverviewBanner';
import PlanInsightsButtons from '../components/PlanInsightsButtons';

export default function Homepage() {
  const [selectedMonth, setSelectedMonth] = useState("July");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top fixed Navbar */}
      <Navbar />

      {/* Main scrollable content */}
     <main className="flex-grow overflow-y-auto pb-24">
        <SpendingCard />
        {/* <PlanInsightsButtons/> */}
        <BudgetOverviewBanner/>
        <SpendingTrendChart />

        <h2 className="font-medium text-3xl mt-[20px] mx-[20px]">Budget Breakdown</h2>
        <TimeFilterTabs
          selectedMonth={selectedMonth}
          onSelectMonth={setSelectedMonth}
        />
        <BudgetBreakdown selectedMonth={selectedMonth} />
      </main>

      {/* Bottom Navbar always at bottom */}
      <BottomNavBar />
    </div>
  );
}
