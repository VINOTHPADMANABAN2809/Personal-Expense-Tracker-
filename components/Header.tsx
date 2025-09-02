import React from 'react';
import { CloudIcon } from './icons/CloudIcon';
import { CheckIcon } from './icons/CheckIcon';
import { WarningIcon } from './icons/WarningIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import { SettingsIcon } from './icons/SettingsIcon';

type SyncStatus = 'idle' | 'syncing' | 'synced' | 'failed';

interface SyncStatusIndicatorProps {
  status: SyncStatus;
}

const SyncStatusIndicator: React.FC<SyncStatusIndicatorProps> = ({ status }) => {
  const statusMap = {
    syncing: { text: 'Syncing...', icon: <CloudIcon className="animate-pulse" />, color: 'text-blue-400' },
    synced: { text: 'Synced', icon: <CheckIcon />, color: 'text-secondary' },
    failed: { text: 'Sync Failed', icon: <WarningIcon />, color: 'text-danger' },
    idle: { text: 'Idle', icon: <CloudIcon />, color: 'text-on-surface-secondary' }
  };

  const currentStatus = statusMap[status] || statusMap.idle;

  return (
    <div className={`flex items-center gap-2 text-sm font-medium ${currentStatus.color}`}>
      {currentStatus.icon}
      <span>{currentStatus.text}</span>
    </div>
  );
};

interface HeaderProps {
  onLogout: () => void;
  syncStatus: SyncStatus;
  onManualSync: () => void;
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, syncStatus, onManualSync, onOpenSettings }) => {
  return (
    <header className="bg-surface shadow-sm border-b border-slate-700">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 10a2 2 0 00-2 2v.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V16a2 2 0 00-2-2H4z" clipRule="evenodd" />
          </svg>
          <h1 className="text-2xl font-bold text-on-surface ml-3">SmartSpend</h1>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatusIndicator status={syncStatus} />
          <button
            onClick={onManualSync}
            disabled={syncStatus === 'syncing'}
            className="p-2 text-slate-300 hover:text-white disabled:text-slate-500 disabled:cursor-not-allowed transition-colors rounded-full hover:bg-slate-600"
            title="Sync now"
          >
            <RefreshIcon className={syncStatus === 'syncing' ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-600"
            title="Settings"
          >
            <SettingsIcon />
          </button>
          <button 
            onClick={onLogout}
            className="py-2 px-4 bg-slate-600 text-slate-200 font-semibold rounded-lg hover:bg-slate-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
