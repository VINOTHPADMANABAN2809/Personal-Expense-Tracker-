import React, { useState, useEffect } from 'react';

// Props for the helper component that displays a single budget period
interface BudgetPeriodDisplayProps {
  title: string;
  budget: number;
  expense: number;
  onSetBudget: (newBudget: number) => void;
}

// A self-contained component to display and manage a single budget period (e.g., weekly or monthly)
const BudgetPeriodDisplay: React.FC<BudgetPeriodDisplayProps> = ({ title, budget, expense, onSetBudget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  // Syncs the local newBudget state if the parent's budget prop changes
  useEffect(() => {
    setNewBudget(budget);
  }, [budget]);

  const percentage = budget > 0 ? (expense / budget) * 100 : 0;
  let progressBarColor = 'bg-secondary';
  if (percentage > 90) {
    progressBarColor = 'bg-danger';
  } else if (percentage > 70) {
    progressBarColor = 'bg-warning';
  }

  const handleSave = () => {
    if (newBudget > 0) {
      onSetBudget(newBudget);
      setIsEditing(false);
    } else {
        alert("Budget must be a positive number.");
    }
  };
  
  const handleCancel = () => {
    setNewBudget(budget); // Reset to original prop value
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(parseFloat(e.target.value) || 0)}
              className="px-2 py-1 bg-zinc-700 border border-zinc-600 rounded-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary w-32"
            />
            <button onClick={handleSave} className="py-1 px-3 bg-primary text-white font-semibold rounded-lg hover:bg-cyan-600 text-sm">Save</button>
            <button onClick={handleCancel} className="py-1 px-3 bg-zinc-600 text-zinc-200 rounded-lg hover:bg-zinc-500 text-sm">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="py-1 px-3 text-sm font-medium text-primary hover:underline">
            Set Budget
          </button>
        )}
      </div>
      <div className="flex justify-between text-on-surface-secondary text-sm mb-1">
        <span>Spent</span>
        <span>Budget</span>
      </div>
      <div className="flex justify-between text-on-surface font-semibold">
        <span>{expense.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
        <span>{budget.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
      </div>
      <div className="w-full bg-zinc-600 rounded-full h-2.5 mt-2">
        <div
          className={`${progressBarColor} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
       {percentage > 100 && (
        <p className="text-danger text-sm mt-2 text-right">
          You've exceeded your budget by {(expense - budget).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}.
        </p>
      )}
    </div>
  );
};

// Props for the main BudgetTracker component
interface BudgetTrackerProps {
  monthlyBudget: number;
  weeklyBudget: number;
  monthlyExpense: number;
  weeklyExpense: number;
  onSetMonthlyBudget: (newBudget: number) => void;
  onSetWeeklyBudget: (newBudget: number) => void;
}

// The main BudgetTracker component, now acting as a container for separate budget period displays
const BudgetTracker: React.FC<BudgetTrackerProps> = ({
  monthlyBudget,
  weeklyBudget,
  monthlyExpense,
  weeklyExpense,
  onSetMonthlyBudget,
  onSetWeeklyBudget,
}) => {
  return (
    <div className="bg-surface rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-on-surface mb-4">Budget Overview</h2>
      <div className="space-y-6">
        <BudgetPeriodDisplay
          title="Weekly Budget"
          budget={weeklyBudget}
          expense={weeklyExpense}
          onSetBudget={onSetWeeklyBudget}
        />
        <div className="border-t border-zinc-700"></div>
        <BudgetPeriodDisplay
          title="Monthly Budget"
          budget={monthlyBudget}
          expense={monthlyExpense}
          onSetBudget={onSetMonthlyBudget}
        />
      </div>
    </div>
  );
};

export default BudgetTracker;