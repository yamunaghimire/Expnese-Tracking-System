import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SpendingCard from '../components/SpendingCard';
import TimeFilterTabs from '../components/TimeFilterTabs';
import BottomNavBar from '../components/BottomNavbar';
import SpendingTrendChart from '../components/SpendingTrendChart';
import BudgetBreakdown from '../components/BudgetBreakdown';
import BudgetOverviewBanner from '../components/BudgetOverviewBanner';
import PageHeader from '../components/PageHeader';

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

        <PageHeader
          title="Budget Breakdown"
          subtitle="View your spending patterns and budget allocation"
        />
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
