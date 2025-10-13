"use client"

import { User, Gift, Building, Users, LineChart, Shield, Rocket } from "lucide-react"
import bcxzone from "../../assets/img/BCX-private-invest.svg"

interface DistributionItem {
  id: string
  title: string
  amount: string
  percentage: number
  description: string
  icon: React.ComponentType<{ className?: string }>
  isLarge?: boolean
}

export default function BCXDistribution() {
  const distributionData: DistributionItem[] = [
    {
      id: "community",
      title: "Community Incentives",
      amount: "200M BCX",
      percentage: 9.33,
      description: "Rewards for user engagement and growth",
      icon: Gift,
      isLarge: true,
    },
    {
      id: "public",
      title: "Public Sale",
      amount: "300M BCX",
      percentage: 27.31,
      description: "Reserved for open public token sale",
      icon: User,
    },
    {
      id: "ecosystem",
      title: "Ecosystem & Marketing",
      amount: "300M BCX",
      percentage: 7.21,
      description: "Boosting adoption and ecosystem expansion",
      icon: Rocket,
    },
    {
      id: "foundation",
      title: "Foundation Reserve",
      amount: "300M BCX",
      percentage: 15.17,
      description: "Held for future developments and stability",
      icon: Building,
    },
    {
      id: "team",
      title: "Team & Advisors",
      amount: "400M BCX",
      percentage: 15.17,
      description: "Reserved for backing long-term team and advisory roles",
      icon: Users,
    },
    {
      id: "private",
      title: "Private Investors",
      amount: "500M BCX",
      percentage: 18.21,
      description: "Strategic investors and early supporters of the BUYCEX ecosystem",
      icon: LineChart,
    },
    {
      id: "market",
      title: "Market Making",
      amount: "200M BCX",
      percentage: 7.59,
      description: "Ensuring liquidity across trading platforms",
      icon: Shield,
    },
  ]

  const formatAmount = (percentage: number) => {
    const total = 300_000_000
    const amount = (percentage / 100) * total
    return `${(amount / 1_000_000).toFixed(2)}M BCX`
  }

  const smallCards = distributionData.slice(1)

  const renderCard = (item: DistributionItem, index: number) => {
    const IconComponent = item.icon
    return (
      <div key={item.id}>
        <div className="h-full rounded-2xl border border-gray-700/50 relative overflow-hidden">
          {/* Removed gradient/hover/blur overlays */}
          
          {/* Background pattern removed hover transitions */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlZmI4MWMiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]" ></div>
          </div>

          <div className="relative p-4 min-h-[190px] h-full flex flex-col">
            <div className="text-center mb-3">
              <div className="inline-block p-1.5 bg-gradient-to-br from-[#efb81c]/20 to-[#efb81c]/10 rounded-2xl mb-2.5 shadow-lg">
                <IconComponent className="text-[#efb81c] text-base" />
              </div>
              <h3 className="text-sm font-bold mb-1 leading-tight text-white">{item.title}</h3>
              <p className="text-[11px] text-gray-300 font-medium">{formatAmount(item.percentage)}</p>
            </div>
            
            <div className="text-center mb-3">
              <div className="relative">
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#efb81c] to-[#efb81c]/80 mb-1.5">
                  {item.percentage.toFixed(2)}%
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#efb81c] via-[#efb81c]/90 to-[#efb81c]/80 rounded-full"
                    style={{ width: `${Math.min(item.percentage * 3, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 flex flex-col justify-start sm:justify-center relative overflow-hidden">
      {/* Background effects removed */}
      
      <section className="max-w-7xl mx-auto px-5 w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          
          <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
            <span className="text-white">BCX Token</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#efb81c] to-[#efb81c]/80">Distribution</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl mx-auto leading-relaxed mb-5">
            Strategic allocation designed for sustainable growth and community empowerment
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <div className="h-0.5 w-14 bg-gradient-to-r from-transparent via-[#efb81c] to-transparent rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-[#efb81c] to-[#efb81c]/80 rounded-full"></div>
            <div className="h-0.5 w-14 bg-gradient-to-r from-transparent via-[#efb81c] to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Distribution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          {/* Column 1: Featured Large Card */}
          <div className="md:col-span-1 md:row-span-2">
            <div className="h-full bg-black/90 rounded-3xl border border-gray-700/50 relative overflow-hidden">
              {/* Removed hover/blur overlays */}
              
              {/* Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlZmI4MWMiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')]" ></div>
              </div>

              <div className="relative p-4 h-full flex flex-col">
                <div className="text-center">
                  <div className="inline-block p-2.5 bg-gradient-to-br from-[#efb81c]/20 to-[#efb81c]/10 rounded-2xl mb-1 shadow-xl">
                    <LineChart className="text-[#efb81c] text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Community Incentives</h3>
                  <p className="text-gray-300 text-sm mb-1 font-medium">27.99M BCX</p>
                </div>
                
                <div className="text-center mt-1">
                  <div className="relative inline-block">
                    {/* Removed glow blur */}
                    <div className="relative bg-gradient-to-br from-[#efb81c] via-[#efb81c]/90 to-[#efb81c]/80 rounded-full px-6 border-2 border-white/20">
                      <span className="text-lg sm:text-2xl font-extrabold text-white">
                        {distributionData[0].percentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-center -4">
                  <div className="relative">
                    {/* Removed background glow blur */}
                    <img
                      src={bcxzone}
                      alt="Investment Chart"
                      className="relative sm:w-48 w-32 h-32 sm:h-48 object-contain"
                    />
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Right side: 3-per-row small cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {smallCards.map((item, index) => renderCard(item, index))}
          </div>
        </div>
      </section>
    </div>
  )
} 