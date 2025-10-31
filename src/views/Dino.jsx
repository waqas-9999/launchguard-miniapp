import BottomNav from "../components/boost/BottomNav";
import React, { useState, useEffect } from "react";
import CoinBurst from "../components/dino/CoinBurst";
import GameInfoModal from "../components/global/GameInfoModal";
import StatusModal from "../components/global/StatusModal";
import axios from "axios";
import toast from "react-hot-toast";

// Import stat icons
import PlaysLeftIcon from "../assets/img/stats/PlaysLeft.png";
import MilestoneIcon from "../assets/img/stats/Milestone.png";
import NextGoalIcon from "../assets/img/stats/NextGoal.png";
import CoinIcon from "../assets/img/stats/coin.png";

// TODO: Update this URL to match your current ngrok URL
const API_BASE = "https://isochronous-packable-sherly.ngrok-free.dev";
// For local testing without ngrok, use:
// const API_BASE = "http://localhost:5000";
// NOTE: Switch back to ngrok URL when deploying to Telegram

function Dino() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [totalReward, setTotalReward] = useState(0);
  const [playsRemaining, setPlaysRemaining] = useState(7);
  const [highestMilestone, setHighestMilestone] = useState(0);
  const [showCoins, setShowCoins] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusTitle, setStatusTitle] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // Get Telegram user data
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    console.log('🔧 [DINO] Telegram user:', tgUser);
    if (tgUser) {
      setUser(tgUser);
      fetchUserData(tgUser.id.toString());
    }
  }, []);

  const fetchUserData = async (telegramId) => {
    try {
      console.log('🔄 [DINO] Fetching user data for:', telegramId);
      
      // Clear localStorage timer to force it to sync with backend
      localStorage.removeItem('dinoResetTime');
      console.log('🧹 [DINO] Cleared localStorage timer');
      
      const res = await axios.get(`${API_BASE}/api/referral-stats/${telegramId}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      console.log('📦 [DINO] Response data:', res.data);
      if (res.data.success) {
        setTotalReward(res.data.totalReward || 0);
        setHighestMilestone(res.data.highestMilestone || 0);
        setPlaysRemaining(res.data.playsRemaining !== undefined ? res.data.playsRemaining : 7);
        console.log('✅ [DINO] User data loaded:', {
          totalReward: res.data.totalReward,
          playsRemaining: res.data.playsRemaining,
          highestMilestone: res.data.highestMilestone
        });
        
        // Force reload iframe to update with new plays
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.src = iframe.src;
          console.log('🔄 [DINO] Reloading iframe to update plays display');
        }
      }
    } catch (err) {
      console.error("❌ [DINO] Error fetching user data:", err);
      console.error("❌ [DINO] Error details:", err.response?.data);
    }
  };

  const handleGameOver = async (score) => {
    console.log('🎯 [DINO] handleGameOver called with score:', score);
    console.log('🎯 [DINO] User state:', user);
    
    if (!user) {
      console.warn('⚠️ [DINO] No user found');
      toast.error("Please connect your Telegram account");
      return;
    }

    try {
      console.log('📤 [DINO] Sending to backend:', {
        telegramId: user.id.toString(),
        score: score
      });
      
      const response = await axios.post(`${API_BASE}/api/dino-score`, {
        telegramId: user.id.toString(),
        score: score
      }, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json'
        }
      });

      console.log('📥 [DINO] Backend response:', response.data);

      if (response.data.success) {
        const { reward, totalReward: newTotal, message, milestone, playsRemaining: newPlays, highestMilestone: newMilestone } = response.data;
        
        // Update state
        setPlaysRemaining(newPlays);
        setHighestMilestone(newMilestone);
        
        if (reward > 0) {
          console.log('🎉 [DINO] Reward earned:', reward);
          // Show modal instead of toast
          setStatusTitle('Reward earned!');
          setStatusMessage(`${message}\nMilestone: ${milestone}`);
          setStatusOpen(true);
          setTotalReward(newTotal);
          setShowCoins(true);
          setTimeout(() => setShowCoins(false), 1200);
        } else {
          console.log('📊 [DINO] No reward (score < 100)');
          // Show modal instead of toast
          setStatusTitle('Score saved');
          setStatusMessage(`${message}\nPlays left today: ${newPlays}`);
          setStatusOpen(true);
        }
      } else {
        console.error('❌ [DINO] Backend returned error:', response.data.error);
        toast.error(response.data.message || response.data.error || "Failed to save score");
        
        // Update plays remaining even on error (for daily limit)
        if (response.data.playsRemaining !== undefined) {
          setPlaysRemaining(response.data.playsRemaining);
        }
      }
    } catch (error) {
      console.error("❌ [DINO] Error saving score:", error);
      console.error("❌ [DINO] Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      // Handle 403 (daily limit reached)
      if (error.response?.status === 403) {
        setStatusTitle('Daily limit reached');
        setStatusMessage(error.response.data.message || 'Daily play limit reached!');
        setStatusOpen(true);
        setPlaysRemaining(0);
      } else {
        setStatusTitle('Error');
        setStatusMessage('Failed to save score. Please try again.');
        setStatusOpen(true);
      }
    }
  };

  // Expose handleGameOver to the iframe
  useEffect(() => {
    console.log('🔧 [DINO] Exposing handleDinoGameOver to window');
    console.log('🔧 [DINO] Current user:', user);
    window.handleDinoGameOver = handleGameOver;
    console.log('✅ [DINO] window.handleDinoGameOver is now:', typeof window.handleDinoGameOver);
    
    return () => {
      console.log('🧹 [DINO] Cleaning up handleDinoGameOver');
      delete window.handleDinoGameOver;
    };
  }, [user]);

  // Expose playsRemaining to the iframe
  useEffect(() => {
    window.dinoPlaysRemaining = playsRemaining;
    window.toast = toast; // Expose toast for iframe to use
    console.log('🎮 [DINO] Updated playsRemaining:', playsRemaining);
  }, [playsRemaining]);

  // Listen for timer reset message from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'DINO_TIMER_RESET') {
        console.log('⏰ [DINO] Received timer reset message from iframe');
        // Refresh user data to get updated plays
        if (user) {
          toast.loading('Timer ended! Refreshing...', { id: 'auto-refresh' });
          fetchUserData(user.id.toString()).then(() => {
            toast.success('7 plays restored!', { id: 'auto-refresh' });
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [user]);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #82ad4b 0.5px, transparent 0.5px), radial-gradient(circle at 80% 80%, #82ad4b 0.5px, transparent 0.5px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Stats Header */}
      {user && (
        <div className="relative z-10 px-4 py-4 bg-gradient-to-b from-black/95 via-black/80 to-transparent backdrop-blur-sm border-b border-[#82ad4b]/20">
          {/* Player Info & Total Earned */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#82ad4b] to-[#6a8f3d] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#82ad4b]/30">
                {user.first_name?.charAt(0)?.toUpperCase() || 'P'}
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-0.5">Player</div>
                <div className="text-base font-bold text-white tracking-wide">
                  {user.first_name}
                </div>
              </div>
            </div>
            <div className="text-right bg-gradient-to-br from-[#82ad4b]/20 to-[#82ad4b]/5 px-4 py-2 rounded-lg border border-[#82ad4b]/30">
              <div className="text-xs text-gray-400 mb-0.5">Total Earned</div>
              <div className="text-lg font-extrabold text-[#82ad4b] drop-shadow-lg flex items-center justify-end gap-1">
                <img src={CoinIcon} alt="Coin" className="w-7 h-7" />
                {totalReward.toFixed(2)} 
                <span className="text-xs font-normal text-[#82ad4b]/80">IMDINO</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar and Stats */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm rounded-lg px-2 py-1 border border-blue-400/30 shadow-lg hover:scale-105 transition-transform">
              <div className="text-[9px] text-blue-300 mb-0 font-medium">Plays Left</div>
              <div className="font-extrabold text-white text-sm flex items-center justify-center gap-1">
                <img src={PlaysLeftIcon} alt="Plays Left" className="w-3.5 h-3.5" />
                <span className={playsRemaining === 0 ? 'text-red-400' : 'text-white'}>{playsRemaining}</span>
                <span className="text-[10px] text-gray-400">/7</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#82ad4b]/20 to-[#82ad4b]/10 backdrop-blur-sm rounded-lg px-2 py-1 border border-[#82ad4b]/40 shadow-lg hover:scale-105 transition-transform">
              <div className="text-[9px] text-[#a8d966] mb-0 font-medium">Best Milestone</div>
              <div className="font-extrabold text-[#82ad4b] text-sm flex items-center justify-center gap-1">
                <img src={MilestoneIcon} alt="Milestone" className="w-3.5 h-3.5" />
                {highestMilestone}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm rounded-lg px-2 py-1 border border-yellow-400/30 shadow-lg hover:scale-105 transition-transform">
              <div className="text-[9px] text-yellow-300 mb-0 font-medium">Next Goal</div>
              <div className="font-extrabold text-yellow-400 text-sm flex items-center justify-center gap-1">
                <img src={NextGoalIcon} alt="Next Goal" className="w-3.5 h-3.5" />
                {highestMilestone + 100}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCoins && <CoinBurst count={18} />}

      <iframe
        title="Dino Game"
        src="/dino.html"
        className="flex-1 w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
      ></iframe>

      {/* Floating buttons */}
      <div className="fixed left-4 bottom-28 z-[60] flex flex-col gap-3">
        {/* Force Reset Button (Testing - manually reset to 7 plays) */}
        <button
          type="button"
          onClick={async () => {
            if (user) {
              try {
                toast.loading('Force resetting...', { id: 'force-reset' });
                await axios.post(`${API_BASE}/api/reset-dino-plays/${user.id}`, {}, {
                  headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                await fetchUserData(user.id.toString());
                toast.success('Reset to 7/7 plays!', { id: 'force-reset' });
                // Reload iframe
                const iframe = document.querySelector('iframe');
                if (iframe) iframe.src = iframe.src;
              } catch (err) {
                toast.error('Reset failed', { id: 'force-reset' });
              }
            }
          }}
          aria-label="Force reset plays"
          className="h-12 w-12 rounded-full 
            bg-gradient-to-br from-red-500 to-red-700
            text-white font-bold text-sm
            shadow-lg shadow-red-500/50
            hover:shadow-xl hover:shadow-red-500/70
            hover:scale-110
            active:scale-95
            transition-all duration-200
            border-2 border-red-400/30
            flex items-center justify-center"
        >
          🔴
        </button>
        
        {/* Refresh Stats Button (Temporary for debugging) */}
        <button
          type="button"
          onClick={() => {
            if (user) {
              toast.loading('Refreshing stats...', { id: 'refresh' });
              fetchUserData(user.id.toString()).then(() => {
                toast.success('Stats refreshed!', { id: 'refresh' });
              });
            }
          }}
          aria-label="Refresh stats"
          className="h-12 w-12 rounded-full 
            bg-gradient-to-br from-purple-500 to-purple-700
            text-white font-bold text-sm
            shadow-lg shadow-purple-500/50
            hover:shadow-xl hover:shadow-purple-500/70
            hover:scale-110
            active:scale-95
            transition-all duration-200
            border-2 border-purple-400/30
            flex items-center justify-center"
        >
          🔄
        </button>

        {/* Info button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Game info"
          className="h-14 w-14 rounded-full 
            bg-gradient-to-br from-[#82ad4b] to-[#6a8f3d]
            text-white font-extrabold text-xl
            shadow-lg shadow-[#82ad4b]/50
            hover:shadow-xl hover:shadow-[#82ad4b]/70
            hover:scale-110
            active:scale-95
            transition-all duration-200
            border-2 border-[#a8d966]/30
            flex items-center justify-center"
        >
          ?
        </button>
      </div>

      <GameInfoModal open={open} onClose={() => setOpen(false)} />
      <StatusModal
        open={statusOpen}
        onClose={() => setStatusOpen(false)}
        title={statusTitle}
        message={statusMessage}
      />
      <BottomNav />
    </div>
  );
}

export default Dino