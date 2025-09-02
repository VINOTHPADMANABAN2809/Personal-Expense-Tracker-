import React from 'react';
import { Transaction, TransactionType } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface RecurringTransactionsProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const RecurringTransactions: React.FC<RecurringTransactionsProps> = ({ transactions, onDelete }) => {
  return (
    <div className="bg-surface rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-on-surface mb-4">Recurring Transactions</h2>
      {transactions.length > 0 ? (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {transactions.map(t => (
            <div key={t.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-on-surface">{t.title}</p>
                <p className="text-xs text-on-surface-secondary capitalize">{t.recurrence}</p>
              </div>
              <div className="flex items-center gap-2">
                 <p className={`font-bold ${t.type === TransactionType.INCOME ? 'text-secondary' : 'text-danger'}`}>
                    {t.type === TransactionType.INCOME ? '+' : '-'}
                    {t.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </p>
                <button 
                    onClick={() => onDelete(t.id)} 
                    title="Remove from recurring"
                    className="p-1.5 text-gray-400 hover:text-danger rounded-full hover:bg-slate-600 transition-colors"
                >
                    <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-24">
          <p className="text-on-surface-secondary">No recurring transactions set.</p>
        </div>
      )}
    </div>
  );
};

export default RecurringTransactions;
