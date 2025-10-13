import WalletIcon from "../assets/svg/wallet.svg?react";
import BNBIcon from "../assets/svg/eth.svg?react";
import DownArrowIcon from "../assets/svg/down-arrow.svg?react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import buycexlogo from "../assets/img/BUYCEX-INFINITY.png";
import config from "../config";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { useNavigate } from "react-router-dom";

const navigationLinks = [
  { name: "About Us", href: "#about-us" },
  { name: "How to buy", href: "#how-to-buy" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Tokenomics", href: "#tokenomics" },
  { name: "Community", href: "#community" },
];

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const activeChainId = useChainId();
  const { switchChain } = useSwitchChain();
  const currentChain = config.chains.find((c) => c.id === activeChainId);

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const elementPosition = element.offsetTop - 80;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen && !(event.target as Element).closest('.sidebar')) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const handleSwitchChain = async (chainId: number) => {
    try {
      await switchChain({ chainId });
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Chain switch failed:', error);
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-black/80 backdrop-blur-lg'
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 xl:px-4">
          <div className="flex items-center justify-between py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <img src={buycexlogo} alt="BuycexInfinityLogo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-bold">BCX Infinity</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <ul className="flex gap-6 items-center">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <button onClick={() => scrollToSection(link.href)} className="whitespace-nowrap text-sm font-medium text-white/90 hover:text-white transition-all duration-200 hover:scale-105">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 py-3 px-4 font-semibold text-white transition-all duration-200">
                  <BNBIcon className="h-5 w-5" />
                  <span>{currentChain?.name || config.chains[0].name}</span>
                  <DownArrowIcon className="h-3 w-3" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-44 bg-black border border-white/10 rounded-md shadow-xl hidden group-hover:block z-50">
                  {config.chains.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => handleSwitchChain(chain.id)}
                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-white/10 ${
                        chain.id === activeChainId ? 'text-primary font-bold' : 'text-white'
                      }`}
                    >
                      {chain.name}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => open()}
                className="flex items-center gap-2 rounded-full bg-primary py-3 px-4 text-sm font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-yellow-300"
              >
                {isConnected ? (
                  <span>{address?.slice(0, 6)}...{address?.slice(-6)}</span>
                ) : (
                  <><WalletIcon className="h-5 w-5" /><span>Connect Wallet</span></>
                )}
              </button>
              {isConnected ? (
            <button onClick={() => { navigate("/dashboard"); setIsSidebarOpen(false); }} className="flex items-center justify-center gap-2 rounded-full bg-primary py-3 px-4 text-sm font-semibold text-black transition-all duration-200 hover:bg-primary/90">
            <span>Dashboard </span><FaArrowRight />
          </button>
            ) : (
              <button onClick={() => { open(); setIsSidebarOpen(false); }} className="flex items-center justify-center gap-2 rounded-full bg-yellow-400 hover:bg-yellow-300 py-2 px-4 font-semibold text-black transition-all duration-200">
              Join Presale <FaArrowRight />
            </button>
            )}
            </div>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-200">
              {isSidebarOpen ? <FaTimes className="h-5 w-5 text-white" /> : <FaBars className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </nav>

      {/* Mobile Sidebar */}
      <div className={`sidebar fixed top-0 left-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10">
                <img src={buycexlogo} alt="BuycexInfinityLogo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-white text-xl font-bold">BCX Infinity</h2>
            </div>
          </div>
          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <button onClick={() => scrollToSection(link.href)} className="w-full text-left text-lg font-medium text-white/90 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200">
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <a href="https://t.me/Buycexio" target="_blank" rel="noopener noreferrer" className="block text-lg font-medium text-primary hover:text-primary/80 py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200">
                  Airdrop
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-6 border-t border-white/10 space-y-4">
            {config.chains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => handleSwitchChain(chain.id)}
                className={`w-full flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 py-3 px-4 font-semibold transition-all duration-200 ${
                  chain.id === activeChainId ? 'text-primary font-bold' : 'text-white'
                }`}
              >
                <BNBIcon className="h-5 w-5" />
                <span>{chain.name}</span>
              </button>
            ))}
            <button onClick={() => { open(); setIsSidebarOpen(false); }} className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3 px-4 text-sm font-semibold text-black transition-all duration-200 hover:bg-primary/90">
              {isConnected ? (
                <span>{address?.slice(0, 6)}...{address?.slice(-6)}</span>
              ) : (
                <><WalletIcon className="h-5 w-5" /><span>Connect Wallet</span></>
              )}
            </button>
            {isConnected ? (
            <button onClick={() => { navigate("/dashboard"); setIsSidebarOpen(false); }} className="w-full flex items-center justify-center gap-2 rounded-full bg-yellow-400 hover:bg-yellow-300 py-3 px-4 font-semibold text-black transition-all duration-200">
              Join Presale <FaArrowRight />
            </button>
            ) : (
              <button onClick={() => { open(); setIsSidebarOpen(false); }} className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3 px-4 text-sm font-semibold text-black transition-all duration-200 hover:bg-primary/90">
                <WalletIcon className="h-5 w-5" /><span>Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <div className="h-20 sm:h-24" />
    </>
  );
};

export default Navbar;
