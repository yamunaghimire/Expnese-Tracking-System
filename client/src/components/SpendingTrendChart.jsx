import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const dummyData = [
  { month: 'Jan', amount: 400 },
  { month: 'Feb', amount: 5 },
  { month: 'Mar', amount: 63 },
  { month: 'Apr', amount: 75 },
  { month: 'May', amount: 8 },
  { month: 'Jun', amount: 23 },
];

const SpendingTrendChart = () => {
  return (
    <div className="w-full mt-4">
      <h2 className="text-lg font-semibold mb-2 mx-[28px]">Spending Trend</h2>
      <ResponsiveContainer width={340} height={200}>
        <LineChart data={dummyData} isAnimationActive={false}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 80]} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#c084fc"
            strokeWidth={3}
            dot={{ r: 4, fill: '#c084fc' }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrendChart;
