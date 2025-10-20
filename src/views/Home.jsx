import { Hero } from "../components/boost/hero-section";
import { StatRow } from "../components/boost/stat-row";
import BottomNav from "../components/boost/BottomNav";
import bcx from "../assets/img/home/BUYCEX-INFINITY.png";
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


function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Boost() {
  const { open: openWeb3Modal } = useWeb3Modal();

  const { address, isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [userData, setUserData] = useState(null);
const [errorOpen, setErrorOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Not connected";
// ✅ Prefer username, fallback to first name
const telegramDisplayName = userData?.telegramUsername
  ? `@${userData.telegramUsername}`
  : userData?.telegramFirstName || "";



  // ✅ Fetch or create wallet when connected
  useEffect(() => {
    if (isConnected && address) {
      axios
        .post("http://localhost:5000/api/wallet", { walletAddress: address })
        .then((res) => {
          console.log("✅ Wallet data:", res.data.wallet);
          setUserData(res.data.wallet);
        })
        .catch((err) => console.error("❌ Error saving wallet:", err));
    }
  }, [isConnected, address]);
  // ✅ Auto-link Telegram user when inside Telegram WebApp
useEffect(() => {
  if (!isConnected || !address) return;

  const tg = window.Telegram?.WebApp;
  const telegramUser = tg?.initDataUnsafe?.user;

  if (telegramUser) {
    axios.post("http://localhost:5000/api/link-telegram", {
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


  // refresh user data every 10 seconds
useEffect(() => {
  if (isConnected && address) {
    const interval = setInterval(() => {
      axios.post("http://localhost:5000/api/wallet", { walletAddress: address })
        .then(res => setUserData(res.data.wallet))
        .catch(console.error);
    }, 10000);
    return () => clearInterval(interval);
  }
}, [isConnected, address]);


  // ✅ Handle task completion
const handleCompleteTask = async (taskName) => {
  try {
    const res = await axios.post("http://localhost:5000/api/complete-task", {
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
    { icon: TriangleAlert, title: "What is BUYCEX?", subtitle: "Intro" },
    { icon: ShoppingCart, title: "Get BCX", subtitle: "Swap crypto to BCX", url: "/get-bcx" },
    { icon: FileText, title: "Whitepaper", subtitle: "Literally" },
  ];

  return (
    <main className="mx-auto max-w-sm px-4 pb-28 pt-4">
      <div className="space-y-4">
        <Hero />
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <StatRow
              icon={<img src={bcx} alt="BCX" className="" />}
              label={userData ? `${userData.totalReward.toFixed(2)} BCX` : "0 BCX"}
              value=""
              hint=""
              onClick={() => setOpen(true)}
              trailing={<FaAngleRight />}
            />
          </div>
         <div className="flex-1">
 <StatRow
  trailing={<FaAngleRight />}
  onClick={() => {
    if (isConnected) {
      setWallet(true);
    } else {
      openWeb3Modal();
    }
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

        {/* ✅ Dynamic Task List */}
        <div className="space-y-3">
 {userData?.tasks?.map((task, index) => {
  let requirementMet = true;
  let requirementText = "";

  // 🔍 Frontend condition checks
  switch (task.name) {
    case "Join Telegram":
      requirementMet = userData?.telegramConnected; // you can set this when Telegram login succeeds
      requirementText = "You need to join our Telegram group first.";
      break;
    case "On board 2 friends":
      requirementMet = userData?.friendsReferred >= 2;
      requirementText = "Invite at least 2 friends to unlock this reward.";
      break;
    case "On board 5 friends":
      requirementMet = userData?.friendsReferred >= 5;
      requirementText = "Invite at least 5 friends to unlock this reward.";
      break;
    default:
      requirementMet = true;
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
    <StatRow
      key={index}
      icon={<FaTelegramPlane size={24} fill="#efb81c" />}
      label={task.name}
      value={`${task.reward} BCX`}
      claimed={task.completed}
      onClick={handleClick}
      className={!requirementMet && !task.completed ? "opacity-50 cursor-not-allowed" : ""}
    />
  );
})}



        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-[#0B0C0E] via-[#121316] to-[#0E0F11] border border-gray-800/60 rounded-2xl p-4 shadow-[0_0_10px_rgba(255,255,255,0.03)] backdrop-blur-sm max-w-md mx-auto">
          <h2 className="text-gray-100 text-base font-semibold mb-3 tracking-wide">
            Start here
          </h2>

          <div className="space-y-3">
            {items.map((item, index) => {
              const Icon = item.icon;
              const handleNavigate = () => {
                if (item.title === "What is BUYCEX?") {
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
                      <Icon className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_6px_#facc15aa]" />
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
    <ImageModal
  open={errorOpen}
  onClose={() => setErrorOpen(false)}
  src={bcx}
  title="Task Locked"
  description={<span className="text-red-400">{errorMessage}</span>}
  userHoldings={userData?.totalReward?.toFixed(2) || 0}
  details={<span>Complete the requirement first to earn this reward.</span>}
/>


    </main>
  );
}
