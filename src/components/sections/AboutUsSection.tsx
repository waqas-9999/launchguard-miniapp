"use client"

import { 
  Users, 
  Heart, 
  Target, 
  Eye, 
  Star, 
  Award,
  Globe,
  Shield,
  Zap,
  Coins
} from "lucide-react"

export default function AboutUsSection() {
  return (
    <div id="about-us" className="min-h-screen py-20 flex flex-col justify-center relative overflow-hidden">
      {/* Background effects */}
      
      {/* Removed blurred background effects */}
      
      <section className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Main Content Grid with Central Illustration */}
        <div className="relative mb-6 sm:mb-14">
          {/* Central Illustration - Hidden on mobile for better responsiveness */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
            
                        
            {/* Main Illustration */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-[#efb81c]/20 to-[#efb81c]/10 rounded-full border-2 border-[#efb81c]/50 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#efb81c] to-[#efb81c]/80 rounded-full flex items-center justify-center shadow-2xl">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            
            {/* Removed glow blur effect */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* About Us Section */}
            <div>
              <div className="h-full bg-black/40 rounded-3xl border border-white/10 relative overflow-hidden">
                {/* Removed hover/transition overlay */}
                
                <div className="relative p-6 lg:p-8 h-full flex flex-col">
                  <div className="text-center mb-6 lg:mb-8">
                    <div className="inline-block p-3 lg:p-4 bg-gradient-to-br from-[#efb81c]/20 to-[#efb81c]/10 rounded-2xl mb-4 lg:mb-6 shadow-xl">
                      <Users className="text-[#efb81c] text-2xl lg:text-3xl" />
                    </div>
                    <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 text-white">About Us</h3>
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-white/5 rounded-2xl p-4 lg:p-6 border border-white/10">
                      <p className="text-white/80 leading-relaxed text-center text-sm lg:text-base">
                        Buycex Infinity Chain is the foundation of true ownership, where every token holder holds a genuine and enduring stake in the network's future. It is engineered for real-world utility, massive scalability, and seamless connectivity between blockchains, creating an open environment where value and innovation move without barriers.
                        <br/> <br/>
                        At the heart of this ecosystem is Buycex Exchange, serving as the central hub for trading, liquidity, and growth. Together, they form a unified Web3 infrastructure designed not only to serve today's digital economy but to evolve and expand for decades ahead.
                        <br/> <br/>
                        BCX is built to endure, rewarding contribution, fostering collaboration, and securing the principles of decentralization. It is more than just technology — it is a long-term commitment to creating a network that will leave a lasting mark on the global digital economy for generations to come.
                      </p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Mission & Vision Section */}
            <div>
              <div className="h-full bg-black/40 rounded-3xl border border-white/10 relative overflow-hidden">
                {/* Removed hover/transition overlay */}
                
                <div className="relative p-6 lg:p-8 h-full flex flex-col">
                  <div className="text-center mb-6 lg:mb-8">
                    <div className="inline-block p-3 lg:p-4 bg-gradient-to-br from-[#efb81c]/20 to-[#efb81c]/10 rounded-2xl mb-4 lg:mb-6 shadow-xl">
                      <Target className="text-[#efb81c] text-2xl lg:text-3xl" />
                    </div>
                    <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 text-white">Our Mission & Vision</h3>
                  </div>
                  
                  <div className="flex-1 space-y-4 lg:space-y-6">
                    {/* Mission */}
                    <div className="bg-white/5 rounded-2xl p-4 lg:p-6 border border-white/10">
                      <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-[#efb81c] rounded-full"></div>
                        <h4 className="text-base lg:text-lg font-bold text-[#efb81c]">Mission</h4>
                      </div>
                      <p className="text-white/80 leading-relaxed text-sm lg:text-base">
                        To engage crypto enthusiasts in building a secure, transparent, and user-friendly 
                        financial ecosystem through innovative blockchain solutions and community-driven development.
                      </p>
                    </div>
                    
                    {/* Vision */}
                    <div className="bg-white/5 rounded-2xl p-4 lg:p-6 border border-white/10">
                      <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-[#efb81c] rounded-full"></div>
                        <h4 className="text-base lg:text-lg font-bold text-[#efb81c]">Vision</h4>
                      </div>
                      <p className="text-white/80 leading-relaxed text-sm lg:text-base">
                        To become the leading platform for secure crypto payments, empowering users worldwide 
                        with financial freedom and cutting-edge blockchain technology.
                      </p>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 