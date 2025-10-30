import { Hero } from "../components/boost/hero-section";
import { StatRow } from "../components/boost/stat-row";
import BottomNav from "../components/boost/BottomNav";
import bcx from "../assets/img/coin-dino.png";
import ImageModal from "../components/global/ImageModal";
import { useState, useEffect } from "react";
import { FaAngleRight, FaTelegramPlane } from "react-icons/fa";
import { TriangleAlert, ShoppingCart, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import SelectWallet from "../components/global/SelectWallet";
import StoryProgress from "../components/boost/StoryProgress";
import { useAccount } from "wagmi";
import axios from "axios";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Dino from "../../public/dino-2.gif" 

// ✅ Your backend base URL
const BACKEND_URL = "https://isochronous-packable-sherly.ngrok-free.dev";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Boost() {
  const { open: openWeb3Modal } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Not connected";

  const telegramDisplayName = userData?.telegramUsername
    ? `@${userData.telegramUsername}`
    : userData?.telegramFirstName || "";

  // ✅ Fetch or create wallet when connected
  useEffect(() => {
    if (isConnected && address) {
      axios
        .post(`${BACKEND_URL}/api/wallet`, { walletAddress: address })
        .then((res) => {
          console.log("✅ Wallet data:", res.data.wallet);
          setUserData(res.data.wallet);
        })
        .catch((err) => console.error("❌ Error saving wallet:", err));
    }
  }, [isConnected, address]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Auto-link Telegram user when inside Telegram WebApp
  useEffect(() => {
    if (!isConnected || !address) return;

    const tg = window.Telegram?.WebApp;
    const telegramUser = tg?.initDataUnsafe?.user;

    if (telegramUser) {
      axios
        .post(`${BACKEND_URL}/api/link-telegram`, {
          walletAddress: address,
          telegramData: telegramUser,
        })
        .then((res) => {
          console.log("✅ Telegram linked to wallet:", res.data.wallet);
          setUserData(res.data.wallet);
        })
        .catch((err) => {
          console.error("❌ Telegram link error:", err);
        });
    }
  }, [isConnected, address]);

  // ✅ Refresh user data every 10 seconds
  useEffect(() => {
    if (isConnected && address) {
      const interval = setInterval(() => {
        axios
          .post(`${BACKEND_URL}/api/wallet`, { walletAddress: address })
          .then((res) => setUserData(res.data.wallet))
          .catch(console.error);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isConnected, address]);

  // ✅ Handle task completion
  const handleCompleteTask = async (taskName) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/complete-task`, {
        walletAddress: address,
        taskName,
      });

      setUserData({
        ...res.data.wallet,
        latestEarnedReward: res.data.earnedReward,
      });

      setOpen(true); // open modal dynamically after earning
      console.log("✅ Task completed:", res.data.wallet);
    } catch (err) {
      console.error("❌ Error completing task:", err);
    }
  };

  const items = [
    { icon: TriangleAlert, title: "What is IMDINO?", subtitle: "Intro" },
    { icon: FileText, title: "Whitepaper", subtitle: "Literally" },
  ];

    // 🦖 Add this block before the main return()
if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <img src={Dino} alt="Loading..." className="w-52 h-56 animate-bounce" />
    </div>
  );
}
  return (
    <main className="mx-auto max-w-sm px-4 pb-28 pt-4">
      <div className="space-y-4">
        <Hero />

        {/* 🪙 Wallet & Balance */}
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <StatRow
              icon={<img src={bcx} alt="BCX" />}
              label={userData ? `${userData.totalReward.toFixed(2)} IMDINO` : "0 IMDINO"}
              onClick={() => setOpen(true)}
              trailing={<FaAngleRight />}
            />
          </div>

          <div className="flex-1">
            <StatRow
              trailing={<FaAngleRight />}
              onClick={() => {
                if (isConnected) setWallet(true);
                else openWeb3Modal();
              }}
              hideIcon
              preserveIconSpace={false}
              label={
                <div className="flex flex-col leading-tight">
                  <span className="text-[#81858c] font-normal">{displayAddress}</span>
                  {telegramDisplayName && (
                    <span className="text-xs text-gray-500">{telegramDisplayName}</span>
                  )}
                </div>
              }
            />
          </div>
        </div>

        {/* ✅ Dynamic Task List with Beautiful Style */}
        <div className="space-y-2">
          {userData?.tasks?.slice(0, 5).map((task, index) => {
            let requirementMet = true;
            let requirementText = "";
            let taskIcon = "📱";

            switch (task.name) {
              case "Join Telegram":
                requirementMet = userData?.telegramConnected;
                requirementText = "You need to join our Telegram group first.";
                taskIcon = "📱";
                break;
              case "On board 2 friends":
                requirementMet = userData?.friendsReferred >= 2;
                requirementText = "Invite at least 2 friends to unlock this reward.";
                taskIcon = "📱";
                break;
              case "On board 5 friends":
                requirementMet = userData?.friendsReferred >= 5;
                requirementText = "Invite at least 5 friends to unlock this reward.";
                taskIcon = "📱";
                break;
              case "Score 100 in Dino Game":
                taskIcon = "📱";
                break;
              case "Score 400 in Dino Game":
                taskIcon = "📱";
                break;
              case "Score 1000 in Dino Game":
                taskIcon = "📱";
                break;
              default:
                requirementMet = true;
                taskIcon = "📱";
                break;
            }

            const handleClick = () => {
              if (!isConnected) {
                openWeb3Modal();
                return;
              }

              if (!requirementMet && !task.completed) {
                setErrorMessage(requirementText);
                setErrorOpen(true);
                return;
              }

              if (!task.completed) handleCompleteTask(task.name);
            };

            return (
              <div
                key={index}
                onClick={handleClick}
                className={`
                  relative bg-gradient-to-br from-[#1a1d21] to-[#13151a] 
                  border border-white/10 rounded-2xl p-4
                  transition-all duration-200 cursor-pointer
                  hover:border-white/20 hover:shadow-[0_0_20px_rgba(130,173,75,0.15)]
                  ${!requirementMet && !task.completed ? 'opacity-50 cursor-not-allowed' : ''}
                  ${task.completed ? 'bg-gradient-to-br from-[#1a2618] to-[#13151a] border-[#82ad4b]/30' : ''}
                `}
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#82ad4b]/5 rounded-2xl pointer-events-none" />
                
                <div className="relative flex items-center justify-between">
                  {/* Left side - Icon and Text */}
                  <div className="flex items-center gap-3 flex-1">
                    {/* Icon Container */}
                    <div className="w-11 h-11 bg-gradient-to-br from-[#0a0b0d] to-[#1a1d21] border border-white/10 rounded-xl flex items-center justify-center shadow-inner">
                      <FaTelegramPlane size={20} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                    </div>

                    {/* Task Info */}
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm tracking-wide">{task.name}</p>
                      {task.completed && (
                        <p className="text-[#82ad4b] text-xs mt-0.5 font-medium">✓ Completed</p>
                      )}
                    </div>
                  </div>

                  {/* Right side - Reward Badge */}
                  <div className={`
                    px-4 py-2 rounded-xl font-bold text-xs tracking-wide
                    ${task.completed 
                      ? 'bg-gradient-to-r from-[#82ad4b]/20 to-[#6a8f3d]/20 text-[#82ad4b] border border-[#82ad4b]/30' 
                      : 'bg-white/5 text-white border border-white/10'
                    }
                  `}>
                    {task.reward} IMDINO
                  </div>
                </div>

                {/* Completion checkmark overlay */}
                {task.completed && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-[#82ad4b] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-[#0B0C0E] via-[#121316] to-[#0E0F11] border border-gray-800/60 rounded-2xl p-4 shadow-[0_0_10px_rgba(255,255,255,0.03)] backdrop-blur-sm max-w-md mx-auto">
          <h2 className="text-gray-100 text-base font-semibold mb-3 tracking-wide">Start here</h2>

          <div className="space-y-3">
            {items.map((item, index) => {
              const Icon = item.icon;
              const handleNavigate = () => {
                if (item.title === "What is IMDINO?") {
                  setShowStory(true);
                  return;
                }
                if (item.url) window.location.href = item.url;
              };
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  onClick={handleNavigate}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNavigate();
                  }}
                  role={item.url ? "link" : "button"}
                  tabIndex={0}
                  className={cn(
                    "relative flex items-center justify-between overflow-hidden rounded-2xl border border-gray-800/60 px-4 py-3 shadow-[0_0_10px_rgba(255,255,255,0.03)]",
                    "bg-gradient-to-br from-[#0B0C0E] via-[#121316] to-[#0E0F11] cursor-pointer"
                  )}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 via-transparent to-violet-600/10 pointer-events-none" />
                  <div className="relative flex items-center gap-3 z-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 ring-1 ring-gray-700 shadow-inner">
                      <Icon className="w-6 h-6 text-white drop-shadow-[0_0_6px_#facc15aa]" />
                    </div>
                    <div>
                      <div className="text-gray-100 text-sm font-medium tracking-wide">
                        {item.title}
                      </div>
                      <div className="text-gray-500 text-xs">{item.subtitle}</div>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-500 z-10" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
      <SelectWallet open={wallet} onClose={() => setWallet(false)} />
      {showStory && <StoryProgress onClose={() => setShowStory(false)} />}

      {/* Success Modal for Task Completion */}
      <ImageModal
        open={open && userData?.latestEarnedReward}
        onClose={() => setOpen(false)}
        src={bcx}
        title="🎉 Congratulations!"
        description={
          <span className="text-[#82ad4b] font-semibold text-lg">
            Task completed successfully!
          </span>
        }
        userHoldings={userData?.totalReward?.toFixed(2) || 0}
        details={
          <div className="space-y-2">
            <div className="text-white text-center">
              <span className="text-2xl font-bold text-[#82ad4b]">
                +{userData?.latestEarnedReward?.toFixed(2) || 0} IMDINO
              </span>
            </div>
            <p className="text-gray-400 text-sm text-center">
              Keep completing tasks to earn more rewards!
            </p>
          </div>
        }
      />

      {/* Error Modal for Locked Tasks */}
      <ImageModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        src={bcx}
        title="🔒 Task Locked"
        description={<span className="text-red-400">{errorMessage}</span>}
        userHoldings={userData?.totalReward?.toFixed(2) || 0}
        details={<span className="text-gray-400">Complete the requirement first to earn this reward.</span>}
      />
    </main>
  );
}
