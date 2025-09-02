import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction, TransactionType } from '../types';

interface ExpenseChartProps {
  transactions: Transaction[];
}

const COLORS = ['#06b6d4', '#4ade80', '#f59e0b', '#f97316', '#a78bfa', '#f472b6', '#3b82f6', '#ec4899']; // cyan, green, amber, orange, violet, pink, blue, pink

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
  const { chartData, totalExpense } = useMemo(() => {
    let total = 0;
    const expenseByCategory = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, transaction) => {
        const { category, amount } = transaction;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amount;
        total += amount;
        return acc;
      }, {} as Record<string, number>);

    const data = Object.entries(expenseByCategory)
      .map(([name, value]) => ({ name, value }))
      .sort((a,b) => b.value - a.value);

    return { chartData: data, totalExpense: total };
  }, [transactions]);

  return (
    <div className="bg-surface rounded-xl shadow-md p-6 h-full">
      <h2 className="text-xl font-bold text-on-surface mb-4">Expense Analysis</h2>
      {chartData.length > 0 ? (
         <div className="relative w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                paddingAngle={5}
                cornerRadius={8}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
              <Legend iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-on-surface-secondary text-sm">Total Spent</span>
                <span className="text-on-surface font-bold text-2xl">
                    {totalExpense.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </span>
            </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-on-surface-secondary">No expense data to display.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;