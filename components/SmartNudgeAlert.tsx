import React from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { WarningIcon } from './icons/WarningIcon';

interface SmartNudgeAlertProps {
  message: string;
  onClose: () => void;
}

const SmartNudgeAlert: React.FC<SmartNudgeAlertProps> = ({ message, onClose }) => {
  return (
    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 text-yellow-300 p-4 rounded-md mb-6 flex items-start gap-4" role="alert">
      <div>
        <WarningIcon className="h-6 w-6 text-yellow-400" />
      </div>
      <div className="flex-1">
        <p className="font-bold">Smart Nudge</p>
        <p className="text-sm">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-yellow-500/20" aria-label="Dismiss alert">
        <CloseIcon />
      </button>
    </div>
  );
};

export default SmartNudgeAlert;
