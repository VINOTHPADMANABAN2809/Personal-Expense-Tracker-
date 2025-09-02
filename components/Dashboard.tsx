import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Transaction, TransactionType, FilterType } from '../types';
import { MOCK_TRANSACTIONS, CATEGORIES } from '../constants';
import Header from './Header';
import Summary from './Summary';
import BudgetTracker from './BudgetTracker';
import ExpenseChart from './ExpenseChart';
import RecurringTransactions from './RecurringTransactions';
import FilterControls from './FilterControls';
import ExpenseList from './ExpenseList';
import ExpenseFormModal from './ExpenseFormModal';
import CategoryManagerModal from './CategoryManagerModal';
import { PlusIcon } from './icons/PlusIcon';
import SmartNudgeAlert from './SmartNudgeAlert';
import SettingsModal from './SettingsModal';

interface DashboardProps {
  onLogout: () => void;
}

type SyncStatus = 'idle' | 'syncing' | 'synced' | 'failed';

// A simple hook to manage app state with localStorage persistence
const usePersistentState = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue;
    }
  });

  return [state, setState];
};

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [transactions, setTransactions] = usePersistentState<Transaction[]>('smartspend_transactions', MOCK_TRANSACTIONS);
  const [categories, setCategories] = usePersistentState<string[]>('smartspend_categories', CATEGORIES);
  const [monthlyBudget, setMonthlyBudget] = usePersistentState<number>('smartspend_monthlyBudget', 50000);
  const [weeklyBudget, setWeeklyBudget] = usePersistentState<number>('smartspend_weeklyBudget', 10000);
  const [syncInterval, setSyncInterval] = usePersistentState<number>('smartspend_syncInterval', 5); // Interval in minutes, 0 for off

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [defaultTransactionType, setDefaultTransactionType] = useState<TransactionType | undefined>(undefined);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [nudgeMessage, setNudgeMessage] = useState<string | null>(null);

  // Use a ref to track the current sync status to avoid dependency loops in useCallback
  const syncStatusRef = useRef(syncStatus);
  useEffect(() => {
    syncStatusRef.current = syncStatus;
  }, [syncStatus]);


  // Centralized function for Cloud Backup Simulation
  const syncData = useCallback(async () => {
    // Read from the ref to get the latest status without causing a re-render loop
    if (syncStatusRef.current === 'syncing') return;
    setSyncStatus('syncing');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    try {
      localStorage.setItem('smartspend_transactions', JSON.stringify(transactions));
      localStorage.setItem('smartspend_categories', JSON.stringify(categories));
      localStorage.setItem('smartspend_monthlyBudget', JSON.stringify(monthlyBudget));
      localStorage.setItem('smartspend_weeklyBudget', JSON.stringify(weeklyBudget));
      localStorage.setItem('smartspend_syncInterval', JSON.stringify(syncInterval));
      setSyncStatus('synced');
    } catch (error) {
      console.error("Failed to sync data to localStorage:", error);
      setSyncStatus('failed');
    }
  }, [transactions, categories, monthlyBudget, weeklyBudget, syncInterval]);

  // Automatic sync on data change
  useEffect(() => {
    const handler = setTimeout(() => {
      syncData();
    }, 500);
    return () => clearTimeout(handler);
  }, [transactions, categories, monthlyBudget, weeklyBudget, syncInterval, syncData]);
  
  // Periodic auto-sync based on user setting
  useEffect(() => {
    if (syncInterval > 0) {
      const intervalId = setInterval(() => {
        syncData();
      }, syncInterval * 60 * 1000); // convert minutes to milliseconds
      return () => clearInterval(intervalId);
    }
  }, [syncInterval, syncData]);


  const handleManualSync = () => {
    syncData();
  };

  // Effect for Smart Nudges
  useEffect(() => {
    if (transactions.length === 0) return;

    const lastTransaction = transactions[transactions.length - 1];
    
    // Nudge for high spending
    if (lastTransaction.type === TransactionType.EXPENSE && lastTransaction.amount > weeklyBudget * 0.5) {
        setNudgeMessage(`Heads up! Your recent transaction for "${lastTransaction.title}" was quite large. Make sure it fits within your budget goals.`);
        return;
    }

    const totalExpenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    // Motivational nudge for saving well
    if (totalIncome > totalExpenses * 1.5) {
        const savings = totalIncome - totalExpenses;
        const suggestion = `You've saved ${savings.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} so far. Consider moving some of it to your savings account!`;
        const existingPositiveNudge = localStorage.getItem('positiveNudge');
        if (suggestion !== existingPositiveNudge) {
            setNudgeMessage(`Great job on your savings this period! ${suggestion}`);
            localStorage.setItem('positiveNudge', suggestion);
        }
    }

  }, [transactions, weeklyBudget]);

  const handleOpenModal = (transactionOrType?: Transaction | TransactionType) => {
    if (typeof transactionOrType === 'string') {
        setDefaultTransactionType(transactionOrType);
        setEditingTransaction(null);
    } else {
        setDefaultTransactionType(undefined);
        setEditingTransaction(transactionOrType || null);
    }
    setIsModalOpen(true);
};

  const handleCloseModal = () => {
    setEditingTransaction(null);
    setDefaultTransactionType(undefined);
    setIsModalOpen(false);
  };

  const handleSaveTransaction = (transaction: Transaction) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t => t.id === transaction.id ? transaction : t));
    } else {
      setTransactions([...transactions, { ...transaction, id: new Date().toISOString() }]);
    }
    handleCloseModal();
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  
  const handleRemoveRecurring = (id: string) => {
    setTransactions(
      transactions.map(t => (t.id === id ? { ...t, isRecurring: false } : t))
    );
  };

  const handleAddCategory = (newCategory: string) => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      setCategories(prev => [...prev, trimmedCategory].sort());
    }
  };
  
  const handleEditCategory = (oldName: string, newName: string) => {
    const trimmedNewName = newName.trim();
    if (!trimmedNewName || trimmedNewName === oldName || categories.includes(trimmedNewName)) return;

    setCategories(prev => prev.map(c => c === oldName ? trimmedNewName : c).sort());
    setTransactions(prev => prev.map(t => t.category === oldName ? { ...t, category: trimmedNewName } : t));
  };

  const handleDeleteCategory = (name: string) => {
    if (name === 'Other') {
        alert("The 'Other' category cannot be deleted.");
        return;
    }
    setCategories(prev => prev.filter(c => c !== name));
    setTransactions(prev => prev.map(t => t.category === name ? { ...t, category: 'Other' } : t));
  };


  const { 
    totalIncome, 
    allTimeTotalExpense, 
    balance, 
    weeklyExpense, 
    monthlyExpense,
    filteredTransactions,
    recurringTransactions
  } = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
    const startOfWeek = new Date(new Date().setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    let totalIncome = 0;
    let allTimeTotalExpense = 0;
    let weeklyExpense = 0;
    let monthlyExpense = 0;

    for (const t of transactions) {
        if (t.type === TransactionType.INCOME) {
            totalIncome += t.amount;
        } else {
            allTimeTotalExpense += t.amount;
            
            const scope = t.budgetScope || 'all'; 
    
            if (scope !== 'none') {
                const transactionDate = new Date(t.date + 'T00:00:00');
                const isThisMonth = transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
                const isThisWeek = transactionDate >= startOfWeek && transactionDate <= endOfWeek;

                if (isThisMonth && (scope === 'all' || scope === 'monthly')) {
                    monthlyExpense += t.amount;
                }

                if (isThisWeek && (scope === 'all' || scope === 'weekly')) {
                    weeklyExpense += t.amount;
                }
            }
        }
    }

    const baseFiltered = transactions
      .filter(t => filter === 'all' || t.type === filter)
      .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return { 
        totalIncome, 
        allTimeTotalExpense, 
        balance: totalIncome - allTimeTotalExpense,
        weeklyExpense,
        monthlyExpense,
        filteredTransactions: baseFiltered
          .filter(t => !t.isRecurring)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        recurringTransactions: transactions.filter(t => t.isRecurring)
    };
  }, [transactions, filter, searchTerm]);

  return (
    <>
      <Header 
        onLogout={onLogout} 
        syncStatus={syncStatus} 
        onManualSync={handleManualSync} 
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {nudgeMessage && <SmartNudgeAlert message={nudgeMessage} onClose={() => setNudgeMessage(null)} />}

        <Summary 
            totalIncome={totalIncome} 
            totalExpense={allTimeTotalExpense} 
            balance={balance} 
            onAddTransaction={handleOpenModal}
        />
        
        <div className="mt-8">
            <BudgetTracker 
                monthlyBudget={monthlyBudget} 
                weeklyBudget={weeklyBudget}
                monthlyExpense={monthlyExpense}
                weeklyExpense={weeklyExpense}
                onSetMonthlyBudget={setMonthlyBudget}
                onSetWeeklyBudget={setWeeklyBudget}
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl shadow-md p-6">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <h2 className="text-xl font-bold text-on-surface">Recent Transactions</h2>
                <div className="flex items-center gap-2">
                   <button onClick={() => setIsCategoryModalOpen(true)} className="bg-zinc-600 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm">
                      Manage Categories
                    </button>
                </div>
              </div>
              <FilterControls 
                filter={filter} 
                setFilter={setFilter} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <ExpenseList 
                transactions={filteredTransactions} 
                onEdit={handleOpenModal} 
                onDelete={handleDeleteTransaction}
                onAddTransaction={() => handleOpenModal()}
              />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
             <ExpenseChart transactions={transactions} />
             <RecurringTransactions transactions={recurringTransactions} onDelete={handleRemoveRecurring} />
          </div>
        </div>
      </main>

       <button 
        onClick={() => handleOpenModal()} 
        className="fixed bottom-8 right-8 flex items-center justify-center w-16 h-16 bg-primary rounded-full text-white shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50"
        aria-label="Add New Transaction"
      >
        <PlusIcon />
      </button>

      {isModalOpen && (
        <ExpenseFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTransaction}
          transaction={editingTransaction}
          categories={categories}
          onAddCategory={handleAddCategory}
          defaultType={defaultTransactionType}
        />
      )}
      {isCategoryModalOpen && (
        <CategoryManagerModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          categories={categories}
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
      {isSettingsModalOpen && (
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          currentInterval={syncInterval}
          onSetInterval={setSyncInterval}
        />
      )}
    </>
  );
};

export default Dashboard;
