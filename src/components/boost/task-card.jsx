
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, Trophy, Wallet, Pickaxe, Zap } from "lucide-react"

const icons = {
  trophy: Trophy,
  wallet: Wallet,
  pickaxe: Pickaxe,
  zap: Zap,
}

export function TaskCard({
  icon,
  title,
  value,
  actionText,
  highlight = false,
  liveDot = false,
}) {
  const Icon = icons[icon]

  return (
    <motion.section
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="relative overflow-hidden rounded-3xl border border-gray-800/60 bg-gradient-to-br from-[#0B0C0E] via-[#121316] to-[#0E0F11] p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
    >
      {/* Accent gradient glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400/10 via-transparent to-violet-700/5 pointer-events-none" />

      {/* Highlight border for special cards */}
      {highlight && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400/20 to-amber-500/10 pointer-events-none" />
      )}

      <div className="flex items-start gap-5 relative z-10">
        {/* Icon Section */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 ring-1 ring-gray-700 shadow-inner">
          <Icon className="h-6 w-6 text-yellow-400" />
          {liveDot && (
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_#facc15]" />
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Title + Value */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-[15px] font-semibold text-white tracking-tight">
                {title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-green-400">{value}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Divider */}
          <div className="my-3 h-px w-full bg-gradient-to-r from-gray-800 via-gray-700/50 to-transparent" />

          {/* CTA Section */}
          {actionText && (
            <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-gray-800/60 to-gray-900/70 px-4 py-3 ring-1 ring-gray-700 backdrop-blur-sm">
              <span className="text-[13px] font-medium text-gray-300">
                {title}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-300 px-4 py-1.5 text-sm font-semibold text-black shadow-lg shadow-yellow-400/25 hover:from-yellow-300 hover:to-yellow-200 transition-all"
              >
                {actionText}
                <ChevronRight className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

// Main component that uses the BoostCard
export default function MiningApp() {
  const boostData = [
    {
      icon: "zap",
      title: "Earn Boosts",
      value: "+136,040",
      actionText: "Start",
      highlight: false,
      liveDot: true
    },
    {
      icon: "wallet",
      title: "Connect Wallet",
      value: "+50,000",
      actionText: "Connect",
      highlight: false,
      liveDot: false
    },
    {
      icon: "pickaxe",
      title: "Mine NACKL",
      value: "+95,000 X",
      actionText: "Start Mining",
      highlight: true,
      liveDot: true
    }
  ]

  return (
    <div className="bg-black min-h-screen text-white font-sans p-6">
      {/* Premium Header */}
      <header className="text-center mb-8">
        <div className="text-yellow-400 text-lg font-light tracking-widest mb-1">
          Go Mine
        </div>
        <h1 className="text-3xl font-bold text-yellow-400 bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
          NACKL NOW
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-300 mx-auto mt-2 rounded-full"></div>
      </header>

      {/* Boost Cards Grid */}
      <div className="max-w-md mx-auto space-y-4">
        {boostData.map((boost, index) => (
          <BoostCard
            key={index}
            icon={boost.icon}
            title={boost.title}
            value={boost.value}
            actionText={boost.actionText}
            highlight={boost.highlight}
            liveDot={boost.liveDot}
          />
        ))}
      </div>

      {/* Additional Premium Elements */}
      <div className="max-w-md mx-auto mt-8 space-y-6">
        {/* Stats Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-gray-800/60 bg-gradient-to-br from-[#0B0C0E] via-[#121316] to-[#0E0F11] p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Your Stats</h3>
            <span className="text-yellow-400 text-sm">Live</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">2,500</div>
              <div className="text-xs text-gray-400 mt-1">waspeshahab19 - GB</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">5,500</div>
              <div className="text-xs text-gray-400 mt-1">Memaboard</div>
            </div>
          </div>
        </motion.div>

        {/* Main Mining CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-yellow-400 to-amber-300 text-black font-bold py-5 rounded-2xl text-xl shadow-2xl shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-all duration-300"
        >
          Start Mining
        </motion.button>
      </div>

      {/* Background Glow Effects */}
      <div className="fixed top-0 left-0 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
    </div>
  )
}