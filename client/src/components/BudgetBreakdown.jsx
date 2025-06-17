import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  {
    category: 'Restaurants',
    spent: 1700,
    total: 4000,
  },
  {
    category: 'Utilities',
    spent: 1800,
    total: 5000,
  },
  {
    category: 'Groceries',
    spent: 1500,
    total: 6000,
  },
  {
    category: 'Clothing',
    spent: 2500,
    total: 3000,
  },
];

const COLORS = ['#a855f7', '#14b8a6']; // purple (spent), teal (remaining)

const BudgetBreakdown = () => {
  return (
    <div className="ml-[28px] mt-4">
      <h2 className="text-lg font-semibold mb-4">Budget Breakdown</h2>

      {data.map((item, index) => {
        const spentRatio = item.spent / item.total;
        const chartData = [
          { name: 'Spent', value: spentRatio },
          { name: 'Remaining', value: 1 - spentRatio },
        ];

        return (
          <div key={index} className="flex items-center mb-6">
            {/* Donut Chart */}
            <PieChart width={80} height={80}>
              <Pie
                data={chartData}
                innerRadius={25}
                outerRadius={35}
                dataKey="value"
                stroke="none"
                isAnimationActive={false}
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
              </Pie>
            </PieChart>

            {/* Label & Amount */}
            <div className="ml-6">
              <div className="text-sm font-medium mb-1">{item.category}</div>
              <div className="text-sm">
                <span className="text-red-500">Rs. {item.spent}</span>
                <span className="text-green-500">/Rs. {item.total}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetBreakdown;
