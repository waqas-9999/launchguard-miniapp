"use client";

import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Trophy, LucideInfinity } from "lucide-react";
import { GiDinosaurRex } from "react-icons/gi";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        onEvent?: (event: string, callback: (data?: any) => void) => void;
        offEvent?: (event: string, callback?: (data?: any) => void) => void;
        viewportHeight?: number;
        viewportStableHeight?: number;
        ready?: () => void;
        expand?: () => void;
      };
    };
  }
}

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    // ✅ Telegram Mini App viewport listener
    const handleTelegramViewportChange = (data?: any) => {
      if (!tg) return;
      if (data?.isStateStable && tg.viewportHeight && tg.viewportStableHeight) {
        const keyboardOpen = tg.viewportHeight < tg.viewportStableHeight - 100;
        setIsKeyboardVisible(keyboardOpen);
      } else {
        setIsKeyboardVisible(false);
      }
    };

    tg?.onEvent?.("viewportChanged", handleTelegramViewportChange);

    // ✅ Fallback for normal browsers
    const visualViewport = window.visualViewport;
    const handleResize = () => {
      if (!visualViewport) return;
      const diff = window.innerHeight - visualViewport.height;
      setIsKeyboardVisible(diff > 150);
    };
    visualViewport?.addEventListener("resize", handleResize);

    return () => {
      tg?.offEvent?.("viewportChanged", handleTelegramViewportChange);
      visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [
    { icon: Home, label: "Boost", url: "/boost" },
    { icon: Trophy, label: "Leaderboard", url: "/leaderboard-new" },
    { icon: GiDinosaurRex, label: "Dino", url: "/dino" },
    { icon: Users, label: "Friends", url: "/friends" },
    { icon: LucideInfinity, label: "Get BCX", url: "/get-bcx" },
  ];

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isKeyboardVisible ? 100 : 0,
        opacity: isKeyboardVisible ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-2 z-50 mx-auto w-[94%] max-w-sm overflow-hidden rounded-3xl border border-gray-800/70 bg-gradient-to-br from-[#0B0C0E]/90 via-[#111214]/95 to-[#0E0F11]/90 px-5 py-3 shadow-[0_0_25px_rgba(255,255,255,0.05)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-violet-700/10 pointer-events-none" />

      <ul className="relative z-10 grid grid-cols-5 items-center">
        {items.map(({ icon: Icon, label, url }, idx) => {
          const isActive = location.pathname === url;
          const isDino = label === "Dino" || idx === 2;

          return (
            <motion.li
              key={label}
              whileTap={{ scale: 0.92 }}
              onClick={() => navigate(url)}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div
                className={`flex items-center justify-center rounded-full border transition-all duration-300 ${
                  isDino ? "h-14 w-14 -mt-2" : "h-11 w-11"
                } ${
                  isActive
                    ? " border-yellow-400/40 bg-gradient-to-br from-yellow-400 to-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                    : " border-gray-800 bg-gradient-to-br from-gray-800/80 to-gray-900/90 hover:from-gray-700 hover:to-gray-800"
                }`}
              >
                <Icon
                  className={`transition-colors duration-300 ${
                    isDino ? "h-6 w-6" : "h-5 w-5"
                  } ${isActive ? "text-black" : "text-gray-300"}`}
                />
              </div>
              <span
                className={`text-[11px] font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-yellow-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {label}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
