import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  transaction: Transaction | null;
  categories: string[];
  onAddCategory: (category: string) => void;
  defaultType?: TransactionType;
}

const ADD_NEW_CATEGORY_OPTION = 'Add New Category...';

const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({ isOpen, onClose, onSave, transaction, categories, onAddCategory, defaultType }) => {
  const getInitialFormData = (): Omit<Transaction, 'id'> => ({
    title: '',
    amount: 0,
    category: categories[0] || 'Other',
    type: defaultType || TransactionType.EXPENSE,
    date: new Date().toISOString().split('T')[0],
    description: '',
    isRecurring: false,
    recurrence: 'monthly',
    budgetScope: 'all',
  });
  
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>(getInitialFormData());
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title,
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type,
        date: transaction.date,
        description: transaction.description || '',
        isRecurring: transaction.isRecurring || false,
        recurrence: transaction.recurrence || 'monthly',
        budgetScope: transaction.budgetScope || 'all',
      });
    } else {
      setFormData(getInitialFormData());
    }
    // Reset custom category fields on open/close
    setShowNewCategoryInput(false);
    setNewCategory('');
  }, [transaction, isOpen, categories, defaultType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) : value }));
    }
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === ADD_NEW_CATEGORY_OPTION) {
        setShowNewCategoryInput(true);
    } else {
        setShowNewCategoryInput(false);
        setFormData(prev => ({...prev, category: value}));
    }
  }

  const handleSaveNewCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
        onAddCategory(trimmedCategory);
        setFormData(prev => ({ ...prev, category: trimmedCategory }));
        setShowNewCategoryInput(false);
        setNewCategory('');
    } else if (categories.includes(trimmedCategory)) {
        alert("This category already exists.");
        setFormData(prev => ({ ...prev, category: trimmedCategory }));
        setShowNewCategoryInput(false);
        setNewCategory('');
    } else {
        alert("Please enter a valid category name.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0) {
        alert("Amount must be greater than zero.");
        return;
    }

    let finalCategory = formData.category;
    // Fallback: If user types a category and hits "Save Transaction" without saving the category first
    if (showNewCategoryInput && newCategory.trim()) {
        const trimmedCategory = newCategory.trim();
        if (!categories.includes(trimmedCategory)) {
            onAddCategory(trimmedCategory);
        }
        finalCategory = trimmedCategory;
    }
    
    onSave({
      ...formData,
      id: transaction?.id || '',
      category: finalCategory,
    });
  };

  if (!isOpen) return null;

  const formInputStyle = "mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-surface rounded-xl shadow-2xl p-8 w-full max-w-md m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-on-surface">{transaction ? 'Edit' : 'Add'} Transaction</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-600">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-on-surface-secondary">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={formInputStyle} />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-on-surface-secondary">Amount</label>
            <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required min="0.01" step="0.01" className={formInputStyle} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="type" className="block text-sm font-medium text-on-surface-secondary">Type</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange} className={formInputStyle}>
                <option value={TransactionType.EXPENSE}>Expense</option>
                <option value={TransactionType.INCOME}>Income</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-on-surface-secondary">Category</label>
              <select name="category" id="category" value={showNewCategoryInput ? ADD_NEW_CATEGORY_OPTION : formData.category} onChange={handleCategoryChange} className={formInputStyle}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                <option value={ADD_NEW_CATEGORY_OPTION}>{ADD_NEW_CATEGORY_OPTION}</option>
              </select>
            </div>
          </div>
          {showNewCategoryInput && (
            <div>
              <label htmlFor="newCategory" className="block text-sm font-medium text-on-surface-secondary">New Category Name</label>
              <div className="mt-1 flex items-center gap-2">
                <input 
                    type="text" 
                    name="newCategory" 
                    id="newCategory" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g., Subscriptions"
                    required 
                    className="flex-grow block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary" 
                />
                <button 
                    type="button" 
                    onClick={handleSaveNewCategory} 
                    className="py-2 px-3 bg-secondary text-white font-semibold rounded-lg hover:bg-green-500 transition-colors"
                >
                    Save
                </button>
              </div>
               <p className="text-xs text-on-surface-secondary mt-1">Click "Save" to add this to your category list.</p>
            </div>
           )}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-on-surface-secondary">Date</label>
            <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className={formInputStyle} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-on-surface-secondary">Description (Optional)</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className={formInputStyle}></textarea>
          </div>

          <div className="pt-2 space-y-4">
            <div>
              <label htmlFor="budgetScope" className="block text-sm font-medium text-on-surface-secondary">Budget Allocation</label>
              <select 
                  name="budgetScope" 
                  id="budgetScope" 
                  value={formData.budgetScope} 
                  onChange={handleChange} 
                  className={formInputStyle}
              >
                  <option value="all">Weekly & Monthly</option>
                  <option value="weekly">Weekly Only</option>
                  <option value="monthly">Monthly Only</option>
                  <option value="none">Exclude from Budget</option>
              </select>
              <p className="text-xs text-on-surface-secondary mt-1">Control how this transaction affects your budgets.</p>
            </div>
            <label className="flex items-center space-x-3">
                <input type="checkbox" name="isRecurring" checked={formData.isRecurring} onChange={handleChange} className="h-4 w-4 rounded border-zinc-500 bg-zinc-700 text-primary focus:ring-primary" />
                <span className="text-sm font-medium text-on-surface-secondary">Mark as recurring monthly</span>
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-zinc-600 text-zinc-200 font-semibold rounded-lg hover:bg-zinc-500 transition-colors">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-cyan-600 transition-transform duration-200 hover:scale-105">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormModal;