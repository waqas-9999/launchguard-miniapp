import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "../components/boost/BottomNav";
import { Gift, Copy } from "lucide-react";
import InviteModal from "../components/global/InviteModal";
import toast from "react-hot-toast";

function Friends() {
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [referralData, setReferralData] = useState({
    totalReward: 0,
    friendsReferred: 0,
  });

  // Referral link
  const referralLink = walletAddress
    ? `http://localhost:5173/referral?code=${walletAddress}`
    : "Connect wallet to get your link";

  // Copy referral link
  const handleCopy = () => {
    if (!walletAddress) return toast.error("Connect your wallet first");
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  // Fetch referral stats from backend
  const fetchReferralData = async (address) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/referral-stats/${address}`
      );
      if (res.data.success) {
        setReferralData(res.data);
      }
    } catch (err) {
      console.error("Error fetching referral data:", err);
    }
  };

  // Simulate wallet connect (replace with actual wallet connect logic)
  useEffect(() => {
    const loadWallet = async () => {
      // Example placeholder wallet for testing
      const connectedWallet = "0x1234abcd5678ef90...";
      setWalletAddress(connectedWallet);
      fetchReferralData(connectedWallet);
    };
    loadWallet();
  }, []);

  // Check referral link join (for invited users)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referrer = params.get("code");
    const joinedWallet = localStorage.getItem("joinedWallet");

    if (referrer && !joinedWallet) {
      // Example placeholder for the new user wallet
      const newWallet = "0x9876efab4321abcd...";
      axios
        .post("http://localhost:5000/api/wallet", {
          walletAddress: newWallet,
          referrer: referrer,
        })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("joinedWallet", newWallet);
            toast.success("Joined successfully!");
          } else {
            toast.error("Already joined or invalid referrer.");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Server error while joining");
        });
    }
  }, []);

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-black flex flex-col justify-between text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-black to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#efb81c]/10 blur-[120px] rounded-full" />

      {/* Main Content */}
      <div className="relative px-6 pt-10 pb-32">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center mb-8 tracking-wide">
          Build your network
        </h1>

        {/* Gold Reward Box */}
        <div className="bg-white/5 backdrop-blur-md border border-[#efb81c]/30 rounded-2xl p-5 flex items-center justify-between mb-10 shadow-[0_0_25px_rgba(239,184,28,0.2)]">
          <div>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#efb81c] to-[#ffde70] font-semibold text-lg">
              Earn BCX for every
            </p>
            <p className="text-gray-300 text-sm">Coin your friend buys</p>
          </div>
          <div className="bg-gradient-to-br from-[#efb81c] to-[#c99a16] p-3 rounded-xl shadow-[0_0_20px_rgba(239,184,28,0.4)]">
            <Gift className="text-black w-7 h-7" />
          </div>
        </div>

        {/* Reward Levels */}
        <div className="relative pl-6">
          <div className="absolute left-3 top-3 bottom-6 w-[2px] bg-gradient-to-b from-[#efb81c]/70 to-transparent" />
          <div className="relative mb-10">
            <div className="absolute -left-5 w-5 h-5 rounded-full bg-gradient-to-br from-[#efb81c] to-[#ffde70] shadow-[0_0_12px_rgba(239,184,28,0.8)]" />
            <h2 className="font-semibold text-lg ml-3">
              Earn{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efb81c] to-[#ffde70]">
                ✕ BCX 0.01
              </span>
            </h2>
            <p className="text-gray-400 text-sm mt-1 ml-3">
              For every friend who joins
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-5 w-5 h-5 rounded-full bg-gradient-to-br from-[#efb81c] to-[#ffde70] shadow-[0_0_12px_rgba(239,184,28,0.8)]" />
            <h2 className="font-semibold text-lg ml-3">
              Get Bonus{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efb81c] to-[#ffde70]">
                ✕
              </span>
            </h2>
            <p className="text-gray-400 text-sm mt-1 ml-3">
              For every friend your friend refers
            </p>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="mt-10 bg-white/5 p-4 rounded-xl flex items-center justify-between border border-[#efb81c]/20">
          <span className="truncate text-gray-300 text-xs">{referralLink}</span>
          <button onClick={handleCopy}>
            <Copy className="w-5 h-5 text-[#efb81c]" />
          </button>
        </div>

        {/* Invite Button */}
        <div className="mt-8">
          <button
            onClick={() => setOpen(true)}
            className="relative w-full bg-gradient-to-r from-[#efb81c] to-[#ffde70] text-black font-semibold py-3 rounded-lg overflow-hidden group shadow-[0_0_20px_rgba(239,184,28,0.4)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="relative z-10">+ Invite a friend</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
          </button>
        </div>

        {/* Referral Earnings */}
        <div className="mt-14 space-y-8">
          <div className="bg-white/5 backdrop-blur-md border border-[#efb81c]/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(239,184,28,0.15)]">
            <h2 className="text-lg font-semibold mb-4 text-[#efb81c]">
              Referral Earnings
            </h2>
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-300">Total Earned</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#efb81c] to-[#ffde70] font-bold">
                {referralData.totalReward.toFixed(2)} BCX
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Friends Referred</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#efb81c] to-[#ffde70] font-bold">
                {referralData.friendsReferred}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav + Invite Modal */}
      <BottomNav />
      <InviteModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Friends;
