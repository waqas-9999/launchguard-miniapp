"use client"

import { useState } from "react"
import { Menu, X, ExternalLink, Twitter, MessageCircle, Zap, Trophy, Star, Target, Lock } from "lucide-react"
import Dino from "../../public/dino-2.gif" 
import Dino2 from "../../public/dino-3.gif" 

export default function LandingMini() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userPoints, setUserPoints] = useState(0)
  const [userLevel, setUserLevel] = useState(1)
  const [completedQuests, setCompletedQuests] = useState<string[]>([])
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])

  const quests = [
    { id: "follow", title: "Follow on Twitter", points: 100, icon: "🐦" },
    { id: "join-discord", title: "Join Discord", points: 150, icon: "💬" },
    { id: "share", title: "Share with Friends", points: 200, icon: "🔗" },
    { id: "hold", title: "Hold 1M $IMDINO", points: 500, icon: "💎" },
  ]

  const achievements = [
    {
      id: "first-step",
      title: "First Step",
      desc: "Complete your first quest",
      icon: "👣",
      locked: !unlockedAchievements.includes("first-step"),
    },
    {
      id: "quest-master",
      title: "Quest Master",
      desc: "Complete 3 quests",
      icon: "🎯",
      locked: !unlockedAchievements.includes("quest-master"),
    },
    {
      id: "dino-collector",
      title: "Dino Collector",
      desc: "Earn 1000 points",
      icon: "🦕",
      locked: !unlockedAchievements.includes("dino-collector"),
    },
    {
      id: "legend",
      title: "Legend",
      desc: "Reach Level 5",
      icon: "👑",
      locked: !unlockedAchievements.includes("legend"),
    },
  ]

  const leaderboard = [
    { rank: 1, name: "DinoKing", points: 5420, level: 8 },
    { rank: 2, name: "ReptileRuler", points: 4890, level: 7 },
    { rank: 3, name: "MesozoicMaster", points: 4320, level: 7 },
    { rank: 4, name: "You", points: userPoints, level: userLevel, isUser: true },
    { rank: 5, name: "CryptoSaurus", points: 2150, level: 4 },
  ]

  const handleCompleteQuest = (questId: string, points: number) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests([...completedQuests, questId])
      const newPoints = userPoints + points
      setUserPoints(newPoints)
      const newLevel = Math.floor(newPoints / 1000) + 1
      setUserLevel(newLevel)

      if (completedQuests.length === 0) {
        setUnlockedAchievements([...unlockedAchievements, "first-step"])
      }
      if (completedQuests.length === 2) {
        setUnlockedAchievements([...unlockedAchievements, "quest-master"])
      }
      if (newPoints >= 1000 && !unlockedAchievements.includes("dino-collector")) {
        setUnlockedAchievements([...unlockedAchievements, "dino-collector"])
      }
      if (newLevel >= 5 && !unlockedAchievements.includes("legend")) {
        setUnlockedAchievements([...unlockedAchievements, "legend"])
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b-4 border-green-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🦖</div>
            <h2 className="text-2xl font-dino font-black text-white" style={{ textShadow: "0 0 10px rgba(34, 197, 94, 0.5)" }}>
              I AM DINO
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border-2 border-green-400 rounded-lg">
              <Zap size={18} className="text-green-300" />
              <span className="text-sm font-bold text-green-300">{userPoints} PTS</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border-2 border-green-400 rounded-lg">
              <Trophy size={18} className="text-green-300" />
              <span className="text-sm font-bold text-green-300">LVL {userLevel}</span>
            </div>
          </div>

          <div className="hidden md:flex gap-8">
            <a href="#quests" className="hover:text-green-300 transition font-bold">
              QUESTS
            </a>
            <a href="#achievements" className="hover:text-green-300 transition font-bold">
              ACHIEVEMENTS
            </a>
            <a href="#leaderboard" className="hover:text-green-300 transition font-bold">
              LEADERBOARD
            </a>
            <a href="#about" className="hover:text-green-300 transition font-bold">
              ABOUT
            </a>
          </div>

          <button className="hidden md:block px-6 py-2 border-2 border-green-400 text-white bg-green-500 rounded-lg hover:bg-green-400 hover:text-black transition font-bold shadow-lg shadow-green-500/50">
            BUY NOW
          </button>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t-4 border-green-400 p-4 space-y-4">
            <a href="#quests" className="block hover:text-green-300 font-bold">
              QUESTS
            </a>
            <a href="#achievements" className="block hover:text-green-300 font-bold">
              ACHIEVEMENTS
            </a>
            <a href="#leaderboard" className="block hover:text-green-300 font-bold">
              LEADERBOARD
            </a>
            <a href="#about" className="block hover:text-green-300 font-bold">
              ABOUT
            </a>
            <button className="w-full px-6 py-2 border-2 border-green-400 text-white bg-green-500 rounded-lg hover:bg-green-400 hover:text-black transition font-bold">
              BUY NOW
            </button>
          </div>
        )}
      </nav>

      <section
        className="pt-32 pb-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Jungle background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Sky */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-900/20 to-transparent"></div>

          {/* Mountains */}
          <svg
            className="absolute bottom-0 left-0 w-full h-64 opacity-30"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,200 150,80 300,150 450,60 600,140 750,70 900,160 1050,90 1200,180 1200,300 0,300"
              fill="#22c55e"
              opacity="0.3"
            />
            <polygon
              points="0,220 180,100 360,170 540,80 720,160 900,90 1080,200 1200,220 1200,300 0,300"
              fill="#16a34a"
              opacity="0.2"
            />
          </svg>

          {/* Clouds */}
          <div className="absolute top-20 left-10 w-32 h-16 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-40 h-20 bg-white/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                className="text-6xl md:text-7xl font-black text-white leading-tight"
                style={{ textShadow: "0 0 10px rgba(34,197,94,0.5)", fontFamily: "var(--font-heading)" }}
              >
                I AM DINO
              </h1>
              <p className="text-xl md:text-2xl text-green-300 font-bold">Welcome to the Digital Jungle</p>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              Where chaos meets creativity and memes rule the ecosystem. Born for trade and fun. Built for the Telegram
              Mini App generation, Dino isn't just a coin—he's a living, roaring symbol of the new-age Web3 culture.
            </p>

            <p className="text-base text-gray-400 leading-relaxed">
              In this jungle, logic takes a backseat — fun earns you coins, memes build empires, and every roar echoes
              across the blockchain. Complete quests, earn points, level up, and unlock exclusive achievements!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-green-500 text-black font-black rounded-lg hover:bg-green-400 transition transform hover:scale-105 text-lg shadow-lg shadow-green-500/60 border-2 border-green-400">
                BUY $IMDINO
              </button>
              <button className="px-8 py-4 border-4 border-green-400 text-green-300 font-black rounded-lg hover:bg-green-500/20 transition text-lg">
                START PLAYING
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="p-3 bg-green-500/30 border-2 border-green-400 rounded-lg hover:bg-green-500/50 transition"
              >
                <Twitter size={20} className="text-green-300" />
              </a>
              <a
                href="#"
                className="p-3 bg-green-500/30 border-2 border-green-400 rounded-lg hover:bg-green-500/50 transition"
              >
                <MessageCircle size={20} className="text-green-300" />
              </a>
              <a
                href="#"
                className="p-3 bg-green-500/30 border-2 border-green-400 rounded-lg hover:bg-green-500/50 transition"
              >
                <ExternalLink size={20} className="text-green-300" />
              </a>
            </div>
          </div>

          {/* Right - Pixel Art Dino Character */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-96 flex items-center justify-center">
            <img src={Dino} alt="Loading..." className="w-52 h-72 animate-bounce" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Quests Section */}
      <section id="quests" className="py-20 px-4 bg-green-500/10 border-y-4 border-green-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Target size={32} className="text-green-300" />
            <h2 className="text-5xl font-black text-white" style={{ textShadow: "0 0 10px rgba(34,197,94,0.5)", fontFamily: "var(--font-heading)" }}>
              DAILY QUESTS
            </h2>
          </div>
          <p className="text-gray-300 mb-12 font-bold">Complete quests to earn points and level up!</p>

          <div className="grid md:grid-cols-2 gap-6">
            {quests.map((quest) => {
              const isCompleted = completedQuests.includes(quest.id)
              return (
                <div
                  key={quest.id}
                  className={`p-6 border-4 rounded-lg transition ${
                    isCompleted
                      ? "bg-green-500/30 border-green-400"
                      : "bg-black border-green-400 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{quest.icon}</div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/40 border-2 border-green-400 rounded-lg">
                      <Zap size={16} className="text-green-300" />
                      <span className="text-sm font-black text-green-300">+{quest.points}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white mb-4">{quest.title}</h3>
                  <button
                    onClick={() => handleCompleteQuest(quest.id, quest.points)}
                    disabled={isCompleted}
                    className={`w-full py-2 rounded-lg font-black transition border-2 ${
                      isCompleted
                        ? "bg-green-500/30 text-green-300 border-green-400 cursor-default"
                        : "bg-green-500 text-black hover:bg-green-400 border-green-400"
                    }`}
                  >
                    {isCompleted ? "✓ COMPLETED" : "COMPLETE QUEST"}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Star size={32} className="text-green-300" />
            <h2 className="text-5xl font-black text-white" style={{ textShadow: "0 0 10px rgba(34,197,94,0.5)", fontFamily: "var(--font-heading)" }}>
              ACHIEVEMENTS
            </h2>
          </div>
          <p className="text-gray-300 mb-12 font-bold">Unlock special badges by completing challenges!</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-6 rounded-lg border-4 text-center transition ${
                  achievement.locked ? "bg-black/50 border-gray-600 opacity-60" : "bg-green-500/20 border-green-400"
                }`}
              >
                <div className="text-5xl mb-3 flex justify-center">
                  {achievement.locked ? <Lock size={40} className="text-gray-500" /> : <span>{achievement.icon}</span>}
                </div>
                <h3 className="text-lg font-black text-white mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-20 px-4 bg-green-500/10 border-y-4 border-green-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Trophy size={32} className="text-green-300" />
            <h2 className="text-5xl font-black text-white" style={{ textShadow: "0 0 10px rgba(34,197,94,0.5)", fontFamily: "var(--font-heading)" }}>
              LEADERBOARD
            </h2>
          </div>
          <p className="text-gray-300 mb-12 font-bold">Compete with the community and climb the ranks!</p>

          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div
                key={player.rank}
                className={`p-4 rounded-lg border-4 flex items-center justify-between transition ${
                  player.isUser
                    ? "bg-green-500/30 border-green-400"
                    : "bg-black border-green-400 hover:border-green-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-black text-green-300 w-8">#{player.rank}</div>
                  <div>
                    <p className="font-black text-white">{player.name}</p>
                    <p className="text-sm text-gray-400 font-bold">Level {player.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-green-300" />
                  <span className="text-xl font-black text-green-300">{player.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exchange Links */}
      <section className="py-16 px-4 bg-green-500/10 border-y-4 border-green-400">
        <div className="max-w-6xl mx-auto">
          <p style={{ textShadow: "0 0 10px rgba(34,197,94,0.5)", fontFamily: "var(--font-heading)" }} className="text-center text-gray-300 mb-8 text-sm uppercase tracking-wider font-bold">Available on</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Uniswap", "Raydium", "Jupiter", "Pancakeswap", "Coinbase", "Kraken"].map((exchange) => (
              <button
                key={exchange}
                className="px-6 py-3 border-2 border-green-400 text-green-300 rounded-lg hover:border-green-300 hover:bg-green-500/20 transition font-black text-sm"
              >
                {exchange}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img src={Dino2} alt="Loading..." className="w-72 h-60" />
          <div className="space-y-6">
            <h2 className="text-5xl font-black text-white" style={{ textShadow: "0 0 10px rgba(34,197,94,0.5)", fontFamily: "var(--font-heading)" }}>
              ABOUT I AM DINO
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Hatched from the blockchain jungle — born for trade and fun. I Am Dino ($IMDINO) is the social meme layer
              of Web3, connecting gamers, creators, and communities through play-to-earn mini adventures, viral
              storytelling, and unstoppable Dino spirit.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Fueled by players. Powered by community. In this jungle, logic takes a backseat — fun earns you coins,
              memes build empires, and every roar echoes across the blockchain.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-green-300 text-2xl font-black">✓</span>
                <span className="text-gray-300 font-bold">Zero transaction taxes</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-300 text-2xl font-black">✓</span>
                <span className="text-gray-300 font-bold">Fair launch, no presale</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-300 text-2xl font-black">✓</span>
                <span className="text-gray-300 font-bold">Gamified rewards system</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-300 text-2xl font-black">✓</span>
                <span className="text-gray-300 font-bold">Telegram Mini App ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-500/10 border-y-4 border-green-400">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2
            className="text-5xl md:text-6xl font-black text-white"
            style={{ textShadow: "0 0 10px rgba(34,197,94,0.5)", fontFamily: "var(--font-heading)" }}
          >
            Ready to Join the Herd?
          </h2>
          <p className="text-xl text-gray-300 font-bold">
            Start earning points, unlock achievements, and compete on the leaderboard today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-green-500 text-black font-black rounded-lg hover:bg-green-400 transition transform hover:scale-105 text-lg shadow-lg shadow-green-500/60 border-2 border-green-400">
              BUY NOW
            </button>
            <button className="px-10 py-4 border-4 border-green-400 text-green-300 font-black rounded-lg hover:bg-green-500/20 transition text-lg">
              JOIN DISCORD
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-green-400 py-12 px-4 bg-black/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🦖</span>
                <span className="font-black text-white">I AM DINO</span>
              </div>
              <p className="text-gray-400 text-sm">
                The gamified prehistoric meme coin for the modern era. Fueled by players. Powered by community.
              </p>
            </div>
            <div>
              <h4 className="font-black text-white mb-4">LINKS</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-green-300 transition font-bold">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition font-bold">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition font-bold">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-4">RESOURCES</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-green-300 transition font-bold">
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition font-bold">
                    Contract
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition font-bold">
                    Audit
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-4">LEGAL</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-green-300 transition font-bold">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition font-bold">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition font-bold">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-green-400 pt-8 text-center text-gray-400 text-sm">
            <p className="font-bold">© 2025 I AM DINO. All rights reserved. Roaring across the blockchain!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
