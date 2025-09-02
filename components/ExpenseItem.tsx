import React from 'react';
import { Transaction, TransactionType } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ExpenseItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ transaction, onEdit, onDelete }) => {
  const { id, title, amount, category, date, type } = transaction;
  const isIncome = type === TransactionType.INCOME;
  const amountColor = isIncome ? 'text-secondary' : 'text-on-surface';
  const amountSign = isIncome ? '+' : '-';
  const borderColor = isIncome ? 'border-secondary' : 'border-danger';

  return (
    <div className={`flex items-center p-4 bg-zinc-700/50 rounded-lg hover:shadow-lg transition-all duration-300 border-l-4 ${borderColor} hover:bg-zinc-700`}>
      <div className="flex-1">
        <div className="flex items-center justify-between">
            <p className="font-bold text-on-surface">{title}</p>
            <p className={`font-bold text-lg ${amountColor}`}>{amountSign}₹{amount.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-on-surface-secondary mt-1">
            <p className="px-2 py-1 bg-zinc-600 text-zinc-200 rounded-md text-xs font-medium">{category}</p>
            <p>{new Date(date + 'T00:00:00').toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center ml-4 space-x-2">
        <button onClick={() => onEdit(transaction)} className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-zinc-600 transition-colors">
          <EditIcon />
        </button>
        <button onClick={() => onDelete(id)} className="p-2 text-gray-400 hover:text-danger rounded-full hover:bg-zinc-600 transition-colors">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;