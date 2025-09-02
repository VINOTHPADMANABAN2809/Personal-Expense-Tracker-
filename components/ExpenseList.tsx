

import React from 'react';
import { Transaction } from '../types';
import ExpenseItem from './ExpenseItem';
import { PlusIcon } from './icons/PlusIcon';

interface ExpenseListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onAddTransaction: () => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ transactions, onEdit, onDelete, onAddTransaction }) => {
  if (transactions.length === 0) {
    return (
        <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-on-surface">No transactions yet!</h3>
            <p className="text-on-surface-secondary mt-1 mb-4">Get started by adding your first income or expense.</p>
            <button
                onClick={onAddTransaction}
                className="inline-flex items-center gap-2 py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors"
            >
                <PlusIcon />
                Add Your First Transaction
            </button>
        </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map(transaction => (
        <ExpenseItem 
          key={transaction.id} 
          transaction={transaction} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default ExpenseList;