"use client";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LandingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // ✅ Smooth scroll function
  const handleScrollToSection = (id) => {
    closeSidebar();
    const section = document.getElementById(id);
    if (section) {
      const offset = 80; // adjust to avoid navbar overlap
      const topPosition = section.offsetTop - offset;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Boost", id: "boost" },
    { name: "Leaderboard", id: "leaderboard" },
    { name: "Dino", id: "dino" },
    { name: "Friends", id: "friends" },
    { name: "Wallet", id: "wallet" },
    { name: "About Us", id: "about" },
  ];

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-[#0B0C0E]/95 via-[#111214]/95 to-[#0E0F11]/90 backdrop-blur-xl border-b border-gray-800/70 shadow-lg flex justify-between items-center px-6 py-3">
        <h1 className="text-lg font-bold text-green-400 tracking-wide">
          Buycex
        </h1>

        {/* ✅ Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-300">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleScrollToSection(item.id)}
              className="cursor-pointer hover:text-green-400 transition-colors duration-200"
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* ✅ Mobile Toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-300 hover:text-green-400 transition-colors duration-200"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </nav>

      {/* ✅ Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
          onClick={closeSidebar}
        ></div>
      )}

      {/* ✅ Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="fixed top-0 left-0 h-full w-64 z-50 border-r border-gray-800/60 bg-gradient-to-br from-[#0B0C0E]/95 via-[#111214]/95 to-[#0E0F11]/90 shadow-xl backdrop-blur-xl"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-green-400">Menu</h2>
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-green-400"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <ul className="flex flex-col mt-6 space-y-3 px-4">
          {menuItems.map((item) => (
            <motion.li
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollToSection(item.id)}
              className="block py-2.5 px-3 rounded-lg text-gray-300 font-medium 
                hover:bg-[#82ad4b]/20 hover:text-green-400 cursor-pointer 
                transition-all duration-200"
            >
              {item.name}
            </motion.li>
          ))}
        </ul>

        <div className="absolute bottom-5 left-0 w-full text-center text-gray-500 text-sm">
          <span className="text-green-400/70">© 2025 Buycex</span>
        </div>
      </motion.aside>
    </>
  );
}
