import { default  as WalletIcon } from "../assets/svg/wallet.svg?react";
import { default  as BNBIcon } from "../assets/svg/eth.svg?react";
import { default as DownArrowIcon } from "../assets/svg/down-arrow.svg?react";
import { FaArrowRight } from "react-icons/fa";
import buycexlogo from "../assets/img/BUYCEX-INFINITY.png";
import { default as TwitterIcon } from "../assets/svg/twitter.svg?react";
import {default as TelegramIcon } from "../assets/svg/telegram.svg?react";
import { default as MediumIcon } from "../assets/svg/medium.svg?react";

const footerLinks = [
  {
    title: "General",
    links: [
      {
        name: "Official Links",
        href: "#",
      },
      {
        name: "Whitepaper",
        href: "#",
      },
      { name: "FAQ", href: "#" },
      {
        name: "How to buy?",
        href: "#",
      },
    ],
  },
  {
    title: "Social Links",
    links: [
      { name: "Telegram Channel (EN)", href: "#" },
      { name: "Telegram Group (EN)", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Medium", href: "#" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { name: "For Tipsters", href: "#" },
      { name: "For Buyers", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: <TwitterIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    name: "Telegram",
    href: "#",
    icon: <TelegramIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    name: "Medium",
    href: "#",
    icon: <MediumIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-black/95 backdrop-blur-xl border-t border-white/10">
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">
        <div className="mb-8 sm:mb-12 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="mb-8 sm:mb-12 lg:mb-16 grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-3 lg:gap-16 xl:gap-24">
          {/* Brand Section */}
          <div className="order-last flex flex-col items-center gap-6 sm:gap-8 text-center lg:order-first lg:items-start lg:text-left">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <img
                  src={buycexlogo}
                  alt="BuycexInfinityLogo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-bold">
                BCX Infinity
              </h1>
            </div>
            
            <p className="text-sm sm:text-base text-white/70 lg:text-lg max-w-xs lg:max-w-none leading-relaxed">
              Join Buycex to experience the future of smarter sports betting and crypto payments.
            </p>
            
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* Social Links */}
            <div className="flex items-center gap-6 sm:gap-8 text-white/60">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  className="transition-all duration-300 hover:text-white hover:scale-110 p-2 rounded-lg hover:bg-white/10"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 grid grid-cols-1 gap-8 sm:gap-10 text-center lg:col-span-2 lg:grid-cols-3 lg:text-left">
            {footerLinks.map((link, index) => (
              <div key={index}>
                <h6 className="mb-4 sm:mb-5 text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  {link.title}
                </h6>
                <ul className="flex flex-col gap-3 sm:gap-4">
                  {link.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        target="_blank"
                        className="text-sm sm:text-base text-white/60 transition-all duration-300 hover:text-white hover:opacity-100 py-1 px-2 rounded hover:bg-white/5"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 py-6 sm:py-8 lg:justify-between">
          <span className="text-xs sm:text-sm text-white/50 text-center lg:text-left">
            Copyright ©2023 Buycex. All Rights Reserved.
          </span>
          
          {/* Footer Buttons - Similar to Navbar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            {/* Network button */}
            <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 py-2 px-3 sm:py-2.5 sm:px-4 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:scale-105">
              <BNBIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>BNB Chain</span>
              <DownArrowIcon className="h-3 w-3" />
            </button>

            {/* Join Presale button */}
            <button className="flex items-center gap-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-black transition-all duration-200 hover:scale-105">
              Join Presale <FaArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
