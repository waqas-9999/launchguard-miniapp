"use client"

import { RiTwitterXLine } from "react-icons/ri";
import { 
  Twitter, 
  Youtube, 
  Instagram, 
  Linkedin, 
  Github, 
  Globe,
  Users,
  MessageCircle,
  Heart,
  TrendingUp
} from "lucide-react"
import { FaTelegramPlane, FaLinkedin, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

interface SocialLink {
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  followers?: string
  description: string
}

export default function CommunitySection() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  const socialLinks: SocialLink[] = [
    {
      name: "X",
      url: "https://x.com/buycex_official",
      icon: RiTwitterXLine ,
      color: "#1DA1F2",
      followers: "25K+",
      description: "Follow us for latest updates and announcements"
    },
    {
      name: "Telegram",
      url: "https://t.me/BUYCEXEXCHANGE",
      icon: FaTelegramPlane,
      color: "#0088CC",
      followers: "15K+",
      description: "Join our community chat and discussions"
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@buycex",
      icon: FaYoutube,
      color: "#FF0000",
      followers: "5K+",
      description: "Watch tutorials and project updates"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/buycex_official",
      icon: FaInstagram,
      color: "#E4405F",
      followers: "8K+",
      description: "Visual updates and behind-the-scenes"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/buycex/",
      icon: FaLinkedin,
      color: "#0A66C2",
      followers: "2K+",
      description: "Professional network and partnerships"
    },
    {
      name: "GitHub",
      url: "https://github.com/cosvmlabs/buycex-chain",
      icon: FaGithub,
      color: "#181717",
      followers: "500+",
      description: "Open source contributions and code"
    },
  ]

  return (
    <div id="community" className="min-h-screen py-20 flex flex-col justify-center relative overflow-hidden">
      {/* Background effects removed */}
      
      <section className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="text-gray-800 dark:text-white">Connect With</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#efb81c] to-[#efb81c]/80">Our Community</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Join thousands of crypto enthusiasts, developers, and investors in the BUYCEX ecosystem. 
            Stay updated, share ideas, and grow together.
          </p>
          
        </div>

        
        {/* Social Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon
            return (
              <div key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full bg-black/70 rounded-2xl border border-gray-700/50 relative overflow-hidden"
                >
                  {/* Gradient border effect removed */}
                  
                  <div className="relative p-4 h-full flex flex-col">
                    <div className="flex items-start gap-4">
                      <div 
                        className="inline-block p-1 rounded-2xl mb-2"
                      >
                        <IconComponent 
                          className="text-2xl" 
                        />
                      </div>
                      <div className="flex items-start flex-col">
                      <h3 className="text-lg font-bold text-white">{social.name}</h3>
                      <div>
                      
                    </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 text-start leading-relaxed">
                        {social.description}
                      </p>
                    {/* Hover indicator removed */}
                  </div>
                </a>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
         
          
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            Start Your Journey Today
          </h3>
          
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                if (isConnected) {
                  navigate('/dashboard');
                } else {
                  open();
                }
              }}
              className="inline-flex items-center gap-2 px-12 text-black py-3 bg-gradient-to-r from-[#efb81c] to-[#efb81c]/80 font-semibold rounded-full"
            >
              {isConnected ? (
                <>
                  <span>Buy BCX</span>
                </>
              ) : (
                <>
                  <span>Buy BCX</span>
                </>
              )}
            </button>
            
           
          </div>
        </div>
      </section>
    </div>
  )
} 