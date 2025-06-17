import React, { useState } from 'react';

const TimeFilterTabs = () => {
  const [active, setActive] = useState('Today');

  const tabs = ['Today', 'Week', 'Month', 'Year'];

  return (
    <div className="flex justify-between bg-white border border-gray-100 rounded-full mx-[24px] mt-4 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
            active === tab
              ? 'bg-orange-100 text-orange-500'
              : 'text-gray-400'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TimeFilterTabs;
