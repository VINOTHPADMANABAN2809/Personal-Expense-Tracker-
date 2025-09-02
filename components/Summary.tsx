import React from 'react';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { WalletIcon } from './icons/WalletIcon';
import { TransactionType } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface SummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  onAddTransaction: (type: TransactionType) => void;
}

const SummaryCard: React.FC<{ 
    title: string; 
    amount: number; 
    colorClass: string; 
    icon: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
        type: TransactionType;
    }
}> = ({ title, amount, colorClass, icon, action }) => {
  const buttonColor = action?.type === TransactionType.INCOME 
    ? 'bg-secondary/10 hover:bg-secondary/20 text-secondary'
    : 'bg-danger/10 hover:bg-danger/20 text-danger';
  
  return (
    <div className="bg-surface rounded-xl shadow-md p-6 flex flex-col justify-between">
       <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${colorClass.replace('text-', 'bg-')}/10`}>
              {icon}
            </div>
            <div>
               <h3 className="text-md font-semibold text-on-surface-secondary mb-1">{title}</h3>
                <p className={`text-2xl font-bold ${colorClass}`}>
                    {amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
        </div>
      </div>
      {action && (
        <div className="mt-4">
             <button onClick={action.onClick} className={`w-full flex items-center justify-center gap-2 text-sm font-bold py-2 px-4 rounded-lg transition-colors ${buttonColor}`}>
                <PlusIcon />
                <span>{action.label}</span>
            </button>
        </div>
      )}
    </div>
  );
}

const Summary: React.FC<SummaryProps> = ({ totalIncome, totalExpense, balance, onAddTransaction }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard 
        title="Total Income" 
        amount={totalIncome} 
        colorClass="text-secondary" 
        icon={<ArrowUpIcon className="text-secondary" />} 
        action={{ label: 'Add Income', onClick: () => onAddTransaction(TransactionType.INCOME), type: TransactionType.INCOME }}
      />
      <SummaryCard 
        title="Total Expense" 
        amount={totalExpense} 
        colorClass="text-danger" 
        icon={<ArrowDownIcon className="text-danger" />} 
        action={{ label: 'Add Expense', onClick: () => onAddTransaction(TransactionType.EXPENSE), type: TransactionType.EXPENSE }}
      />
      <SummaryCard 
        title="Balance" 
        amount={balance} 
        colorClass={balance >= 0 ? 'text-on-surface' : 'text-danger'} 
        icon={<WalletIcon className={balance >= 0 ? 'text-on-surface' : 'text-danger'}/>} 
      />
    </div>
  );
};

export default Summary;