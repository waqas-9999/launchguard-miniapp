import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaExchangeAlt,
  FaTrophy,
  FaInfoCircle,
  FaGift,
  FaSignOutAlt,
} from "react-icons/fa";
import DownArrowIcon from "../assets/svg/down-arrow.svg?react";

import type { IconType } from "react-icons";
import { useAccount, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import React from "react";
import buycexlogo from "../assets/img/BUYCEX-INFINITY.png";

// NEW: add config + icon (same as Navbar)
import config from "../config";
import BNBIcon from "../assets/svg/eth.svg?react";

interface MenuItem {
  name: string;
  icon: IconType;
  path: string;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  variant?: "mobile" | "desktop";
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: FaHome, path: "/dashboard" },
  { name: "Buy Now", icon: FaWallet, path: "/buy" },
  { name: "Transactions", icon: FaExchangeAlt, path: "/transactions" },
  { name: "Leaderboard", icon: FaTrophy, path: "/leaderboard" },
  { name: "Project Updates", icon: FaInfoCircle, path: "/updates" },
  { name: "Claim", icon: FaInfoCircle, path: "/claim" },
];

const Sidebar = ({ isOpen = false, onClose, variant = "desktop" }: SidebarProps) => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();

  // NEW: chain state/hooks
  const activeChainId = useChainId();
  const { switchChain } = useSwitchChain();

  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-5)}`
    : "Not connected";
const [netOpen, setNetOpen] = React.useState(false);
const currentChain = config.chains.find((c) => c.id === activeChainId) ?? config.chains[0];

// close dropdown when clicking outside (optional but nice)
React.useEffect(() => {
  function onDown(e: MouseEvent) {
    const el = document.getElementById("sidebar-network-dd");
    if (el && !el.contains(e.target as Node)) setNetOpen(false);
  }
  if (netOpen) document.addEventListener("mousedown", onDown);
  return () => document.removeEventListener("mousedown", onDown);
}, [netOpen]);

  function clearWalletCaches() {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem("hasEntered");
      localStorage.removeItem("referrer");
      const keys = Object.keys(localStorage);
      for (const k of keys) {
        if (
          k.startsWith("wagmi.") ||
          k.startsWith("wc@") ||
          k.includes("walletconnect") ||
          k.startsWith("WALLETCONNECT_") ||
          k.startsWith("web3modal")
        ) {
          localStorage.removeItem(k);
        }
      }
    } catch (e) {
      console.error("clearWalletCaches()", e);
    }
  }

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      clearWalletCaches();
      await disconnectAsync();
      window.location.href = "http://buycex.org/";
    } catch (err) {
      console.error("Logout error:", err);
      window.location.href = "http://buycex.org/";
    } finally {
      setIsLoggingOut(false);
    }
  };

  // NEW: same switch handler as Navbar
  const handleSwitchChain = async (chainId: number) => {
    try {
      await switchChain({ chainId });
      onClose?.();
    } catch (error) {
      console.error("Chain switch failed:", error);
    }
  };

  const baseClasses =
    "w-64 h-screen text-white flex flex-col justify-between py-6 border-r border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden";
  const mobileClasses = `${baseClasses} fixed inset-y-0 left-0 z-50 transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300`;
  const desktopClasses = `${baseClasses} sticky top-0 flex-shrink-0`;

  return (
    <aside
      className={variant === "mobile" ? mobileClasses : desktopClasses}
      role="navigation"
      aria-label="Sidebar"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-28 -left-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Top Logo/Title */}
      <div className="relative">
        {variant === "mobile" && (
          <div className="absolute top-0 right-4">
            <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="rounded-lg px-2 py-1 text-white/70 hover:bg-white/10"
            >
              ✕
            </button>
          </div>
        )}

        <a
          href="http://buycex.org/"
          className="flex items-center space-x-2 sm:space-x-3 mb-6 px-4"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white/5 border border-white/10">
            <img
              src={buycexlogo}
              alt="BuycexInfinityLogo"
              className="w-9 h-9 object-contain"
            />
          </div>
          <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
            BCX Infinity
          </h1>
        </a>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon: IconType = item.icon;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 border ${
                        isActive
                          ? "bg-gradient-to-r from-yellow-400/20 to-transparent text-white border-yellow-400/30"
                          : "text-white/80 hover:text-white hover:bg-white/5 border-white/10"
                      }`
                    }
                    onClick={onClose}
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-1 rounded-r ${
                        location.pathname === item.path
                          ? "bg-yellow-400"
                          : "bg-transparent group-hover:bg-white/20"
                      }`}
                    />
                    <span
                      className={`grid place-items-center h-9 w-9 rounded-lg border ${
                        location.pathname === item.path
                          ? "bg-yellow-400 text-black border-yellow-300"
                          : "bg-white/5 text-white/90 border-white/10"
                      }`}
                    >
                      <Icon className="text-base" />
                    </span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Wallet Address + Network + Logout */}
      <div className="relative px-4 space-y-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 border border-white/10 flex items-center justify-center">
            <span className="text-white text-lg">👤</span>
          </div>
          <div className="text-sm">
            <p className="text-white/60">Logged in as</p>
            <p className="text-white font-semibold">{displayAddress}</p>
          </div>
        </div>

        <NavLink
          to="/home"
          className="flex items-center gap-3 px-4 py-3 text-white rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          onClick={onClose}
        >
          <FaHome className="text-lg" />
          <span>Home</span>
        </NavLink>

        {/* Network switcher (copied style from Navbar) */}
        <div className="space-y-2">
          <p className="px-1 text-xs uppercase tracking-wide text-white/60">
            Network
          </p>

          {config.chains.map((chain) => {
            const active = chain.id === activeChainId;
            return (
              <button
                key={chain.id}
                onClick={() => handleSwitchChain(chain.id)}
                className={`w-full flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 py-3 px-4 font-semibold transition-all duration-200 ${
                  active ? "text-primary font-bold" : "text-white"
                }`}
              >
                <BNBIcon className="h-5 w-5" />
                <span>{chain.name}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl bg-[#efb81c] text-black font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-95"
        >
          <FaSignOutAlt className="text-lg" />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
