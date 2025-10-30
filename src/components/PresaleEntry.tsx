import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import buycexlogo from '../assets/img/BUYCEX-INFINITY.png';
import Dino from '../../public/dino-2.gif';

const BACKEND_URL =
  import.meta.env.x || 'https://isochronous-packable-sherly.ngrok-free.dev';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
}

const PresaleEntry: React.FC = () => {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [telegramError, setTelegramError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [validationStatus, setValidationStatus] =
    useState<'pending' | 'validated' | 'fallback'>('pending');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🚀 Checking Telegram SDK...');
    let checkCount = 0;
    const maxChecks = 40; // ~20 seconds (40×500ms)

    const checkTelegram = async () => {
      checkCount++;
      const tg = (window as any).Telegram?.WebApp;

      if (tg) {
        console.log('✅ Telegram SDK found');
        console.log('📊 Full Telegram WebApp object:', tg);
        console.log('📊 initData:', tg.initData);
        console.log('📊 initDataUnsafe:', tg.initDataUnsafe);
        
        const user = tg.initDataUnsafe?.user;

        if (user?.id) {
          console.log('✅ Telegram user:', user.first_name, user.id);
          setTelegramUser(user);

          const initDataRaw = tg.initData;
          console.log('📤 Sending initData to backend:', initDataRaw ? 'Available' : 'Missing');
          console.log('📤 initData length:', initDataRaw?.length || 0);
          
          setIsLoading(false);

          // Save user and then redirect
          if (initDataRaw && initDataRaw.trim().length > 0) {
            // start server validation
            console.log('🔐 Attempting validated login...');
            await saveTelegramUserValidated(initDataRaw, user);
          } else {
            console.log('⚠️ No initData, using mobile fallback');
            // fallback mobile save
            await saveTelegramUserMobile(user);
          }

          // Navigate after save completes
          console.log('🚀 Navigating to /boost...');
          try {
            navigate('/boost');
          } catch (err) {
            // ignore navigate errors in non-router contexts
            console.warn('Navigation to /boost failed', err);
          }
        } else {
          setTelegramError('⚠️ No Telegram user data found.');
          setIsLoading(false);
        }
      } else if (checkCount < maxChecks) {
        setTimeout(checkTelegram, 500);
      } else {
        setTelegramError('❌ Telegram SDK not loaded. Please open from @Buycex_presale_bot.');
        setIsLoading(false);
      }
    };

    setTimeout(checkTelegram, 2000);
  }, []);

  const saveTelegramUserValidated = async (initDataRaw: string, user: TelegramUser) => {
    try {
      console.log('🔐 Validating Telegram user...');
      console.log('📤 Sending initData (first 100 chars):', initDataRaw.substring(0, 100));
      const response = await axios.post(
        `${BACKEND_URL}/api/telegram-login`,
        { initData: initDataRaw }, // backend expects "initData" not "initDataRaw"
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
          timeout: 10000,
        }
      );
      console.log('✅ Telegram user validated:', response.data);
      setValidationStatus('validated');
    } catch (error: any) {
      console.error('❌ Validation failed:', error.response?.data || error.message);
      console.error('❌ Error status:', error.response?.status);
      console.error('❌ Full error:', error);
      setValidationStatus('fallback');
      console.log('🔄 Switching to mobile fallback save...');
      saveTelegramUserMobile(user);
    }
  };

  const saveTelegramUserMobile = async (user: TelegramUser) => {
    try {
      console.log('📱 Saving Telegram user (fallback)...');
      const response = await axios.post(
        `${BACKEND_URL}/api/telegram-login-mobile`,
        { telegramUser: user },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
          timeout: 10000,
        }
      );
      console.log('✅ Telegram user saved:', response.data);
    } catch (error: any) {
      console.error('❌ Save failed:', error.response?.data || error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center px-4">
          <img src={Dino} alt="Loading..." className="w-52 h-56 animate-bounce mx-auto" />
          <p className="text-xl mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-black/40 p-6 text-center backdrop-blur-lg shadow-lg">
        <img src={buycexlogo} alt="Buycex Logo" className="mx-auto mb-6 h-14 w-auto" />
        <h1 className="mb-4 text-3xl font-bold text-yellow-400">Enter The Buycex Presale</h1>

        {telegramUser ? (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center justify-center gap-3">
              {telegramUser.photo_url ? (
                <img
                  src={telegramUser.photo_url}
                  alt={telegramUser.first_name}
                  className="w-12 h-12 rounded-full border-2 border-green-400"
                />
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-green-400 bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                  {telegramUser.first_name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left">
                <p className="text-green-300 font-semibold">
                  {telegramUser.first_name} {telegramUser.last_name || ''}
                </p>
                {telegramUser.username && (
                  <p className="text-green-400 text-sm">@{telegramUser.username}</p>
                )}
                {telegramUser.is_premium && (
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                    ⭐ Premium
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <p className="text-green-400 text-xs">✅ Telegram connected</p>
              {validationStatus === 'validated' && (
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">
                  🔐 Verified
                </span>
              )}
             
            </div>
          </div>
        ) : (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-sm whitespace-pre-line">{telegramError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded text-red-300 text-sm active:bg-red-500/40"
            >
              🔄 Retry
            </button>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default PresaleEntry;
