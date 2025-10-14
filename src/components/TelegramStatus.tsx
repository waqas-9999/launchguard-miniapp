import React from 'react';
import { telegramWebApp } from '../utils/telegram';

interface TelegramStatusProps {
  show?: boolean;
}

export const TelegramStatus: React.FC<TelegramStatusProps> = ({ show = false }) => {
  if (!show) return null;

  const isAvailable = telegramWebApp.isAvailable();
  const isProperMiniApp = telegramWebApp.isProperMiniApp();
  const user = telegramWebApp.getUser();
  const hasInitData = telegramWebApp.getInitData().length > 0;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 max-w-xs">
      <div className="font-bold mb-2">Telegram Web App Status</div>
      <div className="space-y-1">
        <div className={`flex items-center gap-2`}>
          <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>Available: {isAvailable ? 'Yes' : 'No'}</span>
        </div>
        <div className={`flex items-center gap-2`}>
          <div className={`w-2 h-2 rounded-full ${isProperMiniApp ? 'bg-green-500' : 'bg-yellow-500'}`} />
          <span>Proper Mini App: {isProperMiniApp ? 'Yes' : 'No'}</span>
        </div>
        <div className={`flex items-center gap-2`}>
          <div className={`w-2 h-2 rounded-full ${hasInitData ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>Init Data: {hasInitData ? 'Present' : 'Missing'}</span>
        </div>
        {user && (
          <div className="pt-1 border-t border-gray-600">
            <div>User: {user.first_name} {user.last_name || ''}</div>
            <div>ID: {user.id}</div>
            {user.username && <div>@: {user.username}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TelegramStatus;
