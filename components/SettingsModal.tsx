import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInterval: number;
  onSetInterval: (interval: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentInterval, onSetInterval }) => {
  if (!isOpen) return null;

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSetInterval(Number(e.target.value));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-surface rounded-xl shadow-2xl p-8 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-on-surface">Settings</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-600">
            <CloseIcon />
          </button>
        </div>
        
        <div className="space-y-4">
            <div>
                <label htmlFor="syncInterval" className="block text-sm font-medium text-on-surface-secondary">
                    Auto-sync Interval
                </label>
                <select
                    id="syncInterval"
                    value={currentInterval}
                    onChange={handleIntervalChange}
                    className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary"
                >
                    <option value={5}>Every 5 Minutes</option>
                    <option value={10}>Every 10 Minutes</option>
                    <option value={15}>Every 15 Minutes</option>
                    <option value={0}>Off</option>
                </select>
                <p className="text-xs text-on-surface-secondary mt-1">
                    Automatically backs up your data periodically. Data is always saved when you make a change.
                </p>
            </div>
        </div>

         <div className="flex justify-end gap-4 pt-6 mt-4 border-t border-zinc-700">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors">
                Done
            </button>
          </div>
      </div>
    </div>
  );
};

export default SettingsModal;
