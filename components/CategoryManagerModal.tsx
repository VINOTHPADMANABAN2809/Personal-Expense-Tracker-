import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onAddCategory: (name: string) => void;
  onEditCategory: (oldName: string, newName: string) => void;
  onDeleteCategory: (name: string) => void;
}

const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({ isOpen, onClose, categories, onAddCategory, onEditCategory, onDeleteCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<{ oldName: string; newName: string } | null>(null);

  const handleAdd = () => {
    const trimmedName = newCategoryName.trim();
    if (trimmedName && !categories.includes(trimmedName)) {
      onAddCategory(trimmedName);
      setNewCategoryName('');
    } else if (categories.includes(trimmedName)) {
        alert("This category already exists.");
    }
  };
  
  const handleSaveEdit = () => {
    if (editingCategory) {
        onEditCategory(editingCategory.oldName, editingCategory.newName);
        setEditingCategory(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-surface rounded-xl shadow-2xl p-8 w-full max-w-md m-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-on-surface">Manage Categories</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-600">
            <CloseIcon />
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
            <label className="block text-sm font-medium text-on-surface-secondary">Add New Category</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g., Groceries"
                    className="flex-grow block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary"
                />
                <button onClick={handleAdd} className="py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-indigo-700">Add</button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 -mr-2">
            <h3 className="text-lg font-semibold text-on-surface mb-2">Existing Categories</h3>
            {categories.map(cat => (
                 <div key={cat} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    {editingCategory?.oldName === cat ? (
                         <input
                            type="text"
                            value={editingCategory.newName}
                            onChange={(e) => setEditingCategory({ ...editingCategory, newName: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                            onBlur={handleSaveEdit}
                            autoFocus
                            className="flex-grow bg-slate-800 text-on-surface rounded px-2 py-1"
                        />
                    ) : (
                        <span className="text-on-surface">{cat}</span>
                    )}
                   
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setEditingCategory({ oldName: cat, newName: cat })}
                            className="p-1.5 text-gray-400 hover:text-primary rounded-full hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!!editingCategory}
                        >
                            <PencilIcon />
                        </button>
                        {cat !== 'Other' && ( // Prevent deleting the 'Other' category
                             <button 
                                onClick={() => onDeleteCategory(cat)}
                                className="p-1.5 text-gray-400 hover:text-danger rounded-full hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!!editingCategory}
                            >
                                <TrashIcon />
                            </button>
                        )}
                    </div>
                 </div>
            ))}
        </div>
         <div className="flex justify-end gap-4 pt-6 mt-auto border-t border-slate-700">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-600 text-slate-200 font-semibold rounded-lg hover:bg-slate-500 transition-colors">Done</button>
          </div>
      </div>
    </div>
  );
};

export default CategoryManagerModal;
