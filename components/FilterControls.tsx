import React from 'react';
import { FilterType } from '../types';

interface FilterControlsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filter, setFilter, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as FilterType)}
        className="w-full md:w-1/2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="all">All Transactions</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
};

export default FilterControls;