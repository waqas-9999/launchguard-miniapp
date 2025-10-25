'use client';

import { useState } from 'react';
import { Menu, X, ExternalLink, Twitter, MessageCircle } from 'lucide-react';
import Dino from "../../public/dino-2.gif" 

export default function LandingMini() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🦕</div>
            <span className="text-2xl font-bold text-white">IMDINO</span>
          </div>
          
          <div className="hidden md:flex gap-8">
            <a href="#about" className="hover:text-green-400 transition">ABOUT</a>
            <a href="#features" className="hover:text-green-400 transition">FEATURES</a>
            <a href="#tokenomics" className="hover:text-green-400 transition">TOKENOMICS</a>
            <a href="#roadmap" className="hover:text-green-400 transition">ROADMAP</a>
          </div>

          <button className="hidden md:block px-6 py-2 border-2 border-green-400 text-green-400 rounded-full hover:bg-green-400 hover:text-black transition font-bold">
            BUY NOW
          </button>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-green-500/20 p-4 space-y-4">
            <a href="#about" className="block hover:text-green-400">ABOUT</a>
            <a href="#features" className="block hover:text-green-400">FEATURES</a>
            <a href="#tokenomics" className="block hover:text-green-400">TOKENOMICS</a>
            <a href="#roadmap" className="block hover:text-green-400">ROADMAP</a>
            <button className="w-full px-6 py-2 border-2 border-green-400 text-green-400 rounded-full hover:bg-green-400 hover:text-black transition font-bold">
              BUY NOW
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black text-white leading-tight">
                $IMDINO
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                The prehistoric meme coin that's about to go extinct... your portfolio, that is. 🦕
              </p>
            </div>

            <p className="text-lg text-gray-400 leading-relaxed">
              IMDINO is the ultimate dinosaur-themed cryptocurrency bringing roaring returns to the meme coin revolution. Join the herd and become part of crypto history.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition transform hover:scale-105 text-lg shadow-lg shadow-green-500/50">
                BUY $IMDINO
              </button>
              <button className="px-8 py-4 border-2 border-green-500 text-green-400 font-bold rounded-full hover:bg-green-500/10 transition text-lg">
                VIEW CHART
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-3 bg-green-500/10 border border-green-500/30 rounded-full hover:bg-green-500/20 transition">
                <Twitter size={20} className="text-green-400" />
              </a>
              <a href="#" className="p-3 bg-green-500/10 border border-green-500/30 rounded-full hover:bg-green-500/20 transition">
                <MessageCircle size={20} className="text-green-400" />
              </a>
              <a href="#" className="p-3 bg-green-500/10 border border-green-500/30 rounded-full hover:bg-green-500/20 transition">
                <ExternalLink size={20} className="text-green-400" />
              </a>
            </div>
          </div>

          {/* Right - Dino Character */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-96 flex items-center justify-center">
            <img src={Dino} alt="Loading..." className="w-52 h-56 animate-bounce" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img src={Dino} alt="Loading..." className="w-52 h-56 animate-bounce" />
          <div className="space-y-6">
            <h2 className="text-5xl font-black text-white">About IMDINO</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              IMDINO isn't just another meme coin—it's a movement. Born from the depths of the Mesozoic era of crypto, IMDINO brings the raw power and untamed spirit of dinosaurs to the blockchain.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              With zero taxes, fair launch, and community-driven development, IMDINO is here to prove that the best investments are the ones that make you smile while your portfolio grows.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <span className="text-gray-300">Zero transaction taxes</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <span className="text-gray-300">Fair launch, no presale</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <span className="text-gray-300">Community governed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-green-500/5 border-y border-green-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-white text-center mb-16">Why IMDINO?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🚀', title: 'Explosive Growth', desc: 'Built for moon missions with community-driven momentum' },
              { icon: '💎', title: 'Diamond Hands', desc: 'Rewards long-term holders with sustainable tokenomics' },
              { icon: '🌍', title: 'Global Community', desc: 'Join thousands of dino enthusiasts worldwide' },
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-black border border-green-500/30 rounded-2xl hover:border-green-400 transition group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-white text-center mb-16">Tokenomics</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Supply</p>
                <p className="text-4xl font-black text-green-400">1,000,000,000</p>
              </div>
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Liquidity Locked</p>
                <p className="text-4xl font-black text-green-400">100%</p>
              </div>
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Tax Rate</p>
                <p className="text-4xl font-black text-green-400">0%</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6">Distribution</h3>
              {[
                { label: 'Liquidity Pool', percent: 40 },
                { label: 'Community Rewards', percent: 30 },
                { label: 'Marketing', percent: 20 },
                { label: 'Development', percent: 10 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">{item.label}</span>
                    <span className="text-green-400 font-bold">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-green-500/10 rounded-full h-3 border border-green-500/30">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full"
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-4 bg-green-500/5 border-y border-green-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-white text-center mb-16">Roadmap</h2>
          <div className="space-y-8">
            {[
              { phase: 'Phase 1', title: 'Launch', items: ['Fair Launch', 'Community Building', 'Exchange Listings'] },
              { phase: 'Phase 2', title: 'Growth', items: ['Marketing Campaign', 'Partnership Deals', 'NFT Collection'] },
              { phase: 'Phase 3', title: 'Expansion', items: ['DAO Governance', 'Staking Platform', 'Metaverse Integration'] },
            ].map((phase, i) => (
              <div key={i} className="flex gap-6 md:gap-12">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-black mb-4">
                    {i + 1}
                  </div>
                  {i < 2 && <div className="w-1 h-24 bg-gradient-to-b from-green-500 to-green-500/20"></div>}
                </div>
                <div className="pb-8">
                  <p className="text-green-400 text-sm uppercase tracking-wider font-bold">{phase.phase}</p>
                  <h3 className="text-3xl font-black text-white mb-4">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li key={j} className="text-gray-300 flex items-center gap-2">
                        <span className="text-green-400">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Ready to Join the Herd?
          </h2>
          <p className="text-xl text-gray-300">
            Don't miss out on the prehistoric revolution. Get your $IMDINO today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition transform hover:scale-105 text-lg shadow-lg shadow-green-500/50">
              BUY NOW
            </button>
            <button className="px-10 py-4 border-2 border-green-500 text-green-400 font-bold rounded-full hover:bg-green-500/10 transition text-lg">
              JOIN DISCORD
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/20 py-12 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🦕</span>
                <span className="font-bold text-white">IMDINO</span>
              </div>
              <p className="text-gray-400 text-sm">The prehistoric meme coin for the modern era.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Discord</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Telegram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Whitepaper</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Contract</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Audit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-500/20 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 IMDINO. All rights reserved. 🦕</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
