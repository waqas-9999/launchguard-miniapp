import React, { useState } from 'react'
import BottomNav from "../components/boost/BottomNav";
import { Crown, Trophy, Star, Medal, Award, Users } from 'lucide-react'
import trophy from "../assets/img/trophy.png"

function Leaderboard() {
    const [activeTab, setActiveTab] = useState('rewards') // 'rewards' or 'holders'

    const rewardsLeaders = [
        { rank: 1, name: "0x1234A9B2F3C4D5E6", level: "Level 1", rewards: "1,245" },
        { rank: 2, name: "0x8B45F1E2C3D9A7B6", level: "Level 1", rewards: "1,230" },
        { rank: 3, name: "0x9F87C2B1A4E5D3F8", level: "Level 1", rewards: "1,228" },
        { rank: 4, name: "0x6D12E3A9C7B4F5D1", level: "Level 2", rewards: "1,225" },
        { rank: 5, name: "0xAF23C4B9E8D5F6A7", level: "Level 2", rewards: "1,220" },
        { rank: 6, name: "0xBE45F6C3D2A7B9E1", level: "Level 3", rewards: "1,215" },
        { rank: 7, name: "0xCD67A8B5F4E3D1C9", level: "Level 3", rewards: "1,210" },
    ];

    const holdersLeaders = [
        { rank: 1, name: "0xA1B2C3D4E5F67890", level: "Level 5", holdings: "45,230" },
        { rank: 2, name: "0xB2C3D4E5F67890A1", level: "Level 5", holdings: "42,150" },
        { rank: 3, name: "0xC3D4E5F67890A1B2", level: "Level 4", holdings: "38,900" },
        { rank: 4, name: "0xD4E5F67890A1B2C3", level: "Level 4", holdings: "35,670" },
        { rank: 5, name: "0xE5F67890A1B2C3D4", level: "Level 3", holdings: "32,450" },
        { rank: 6, name: "0xF67890A1B2C3D4E5", level: "Level 2", holdings: "29,800" },
        { rank: 7, name: "0x7890A1B2C3D4E5F6", level: "Level 2", holdings: "27,120" },
    ];


    const currentLeaders = activeTab === 'rewards' ? rewardsLeaders : holdersLeaders

    const getRankColor = (rank) => {
        switch (rank) {
            case 1: return "from-yellow-400 to-amber-300 border-yellow-400/40"
            case 2: return "from-gray-400 to-gray-300 border-gray-400/40"
            case 3: return "from-amber-600 to-amber-500 border-amber-600/40"
            default: return "from-gray-800 to-gray-700 border-gray-700/40"
        }
    }

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Crown className="h-5 w-5 text-yellow-600" />
            case 2: return <Trophy className="h-5 w-5 text-gray-400" />
            case 3: return <Medal className="h-5 w-5 text-amber-600" />
            default: return <Star className="h-4 w-4 text-gray-500" />
        }
    }

    return (
        <div className="min-h-screen max-w-sm mx-auto bg-gradient-to-br from-[#0B0C0E] via-[#111214] to-[#0E0F11] text-white pb-20">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0" />
                <div className="relative flex flex-col items-center z-10 text-center pt-8 pb-6 px-4">
  <img
    src={trophy}
    alt="trophy"
    className="w-28 md:w-32 drop-shadow-[0_0_15px_rgba(239,184,28,0.6)]"
  />

  <h1
    className="text-3xl font-black tracking-[0.08em] mt-3 
    bg-gradient-to-b from-[#fff6d0] via-[#efb81c] to-[#c89614] bg-clip-text text-transparent 
    drop-shadow-[0_2px_25px_rgba(239,184,28,0.4)] 
    [text-shadow:0_1px_0_#fff,0_2px_10px_rgba(239,184,28,0.5)]"
  >
    Leaderboard
  </h1>
</div>


            </div>

            {/* Toggle Switch */}
            <div className="px-4 mt-4">
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-1 max-w-md mx-auto">
                    <div className="grid grid-cols-2 gap-1">
                        <button
                            onClick={() => setActiveTab('rewards')}
                            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${activeTab === 'rewards'
                                ? 'bg-gradient-to-r from-yellow-400 to-amber-300 text-black shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                }`}
                        >
                            <Award className="h-4 w-4" />
                            <span className="font-semibold">Rewards</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('holders')}
                            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${activeTab === 'holders'
                                ? 'bg-gradient-to-r from-yellow-400 to-amber-300 text-black shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                }`}
                        >
                            <Users className="h-4 w-4" />
                            <span className="font-semibold">Holders</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Leaderboard List */}
            <div className="px-4 mt-6 space-y-3">
                {currentLeaders.map((leader, index) => (
                    <div
                        key={leader.rank}
                        className={`relative overflow-hidden rounded-2xl border bg-gradient-to-r ${getRankColor(leader.rank)} p-0.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${leader.rank <= 3 ? 'shadow-lg' : 'shadow-md'
                            }`}
                    >
                        <div className="bg-gradient-to-br from-[#1A1C20] to-[#0F1115] rounded-[15px] p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {/* Rank Badge */}
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${getRankColor(leader.rank)}`}>
                                        {getRankIcon(leader.rank)}
                                        <span className="absolute text-black font-bold text-sm">
                                            {leader.rank}
                                        </span>
                                    </div>

                                    {/* Player Info */}
                                    <div>
                                        <div className="font-semibold text-white text-lg">
                                            {leader.name.slice(0, 6)}...{leader.name.slice(-4)}
                                        </div>

                                        <div className="inline-flex gap-1 mt-1 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-gray-500/30 to-gray-300/20 text-gray-200 border border-gray-400/40 shadow-[0_0_8px_rgba(200,200,200,0.3)]">
                                            <Star className="h-4 w-4 text-gray-500" /> Level {leader.level}
                                        </div>

                                    </div>
                                </div>

                                {/* Rewards/Holdings */}
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">
                                        {activeTab === 'rewards' ? leader.rewards : leader.holdings}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        {activeTab === 'rewards' ? 'BCX Rewards' : 'BCX Holdings'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Special glow effect for top 3 */}
                        {leader.rank <= 3 && (
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getRankColor(leader.rank)} opacity-20 blur-sm -z-10`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Your Rank Section */}
            <div className="px-4 mt-8">
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6 text-center">
                    <div className="text-gray-400 text-sm mb-2">Your Rank</div>
                    <div className="text-2xl font-bold text-white mb-1">#8</div>
                    <div className="text-gray-400 text-sm">
                        {activeTab === 'rewards' ? '1,180 rewards' : '24,560 holdings'}
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    )
}

export default Leaderboard