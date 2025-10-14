
import { Hero } from "../components/boost/hero-section"
import { StatRow } from "../components/boost/stat-row"
import BottomNav from "../components/boost/BottomNav";
import bcx from "../assets/img/home/BUYCEX-INFINITY.png"
import ImageModal from "../components/global/ImageModal"
import { useState } from "react"
import { FaAngleRight, FaTelegramPlane } from "react-icons/fa";
import { TriangleAlert, ShoppingCart, FileText, ChevronRight } from "lucide-react";
function cn(...classes) { return classes.filter(Boolean).join(" ") }
import { motion } from "framer-motion"
import SelectWallet from "../components/global/SelectWallet"
import StoryProgress from "../components/boost/StoryProgress"

export default function Boost() {
  const [open, setOpen] = useState(false)
  const [wallet, setWallet] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const items = [
    { icon: TriangleAlert, title: "What is BUYCEX?", subtitle: "Intro" },
    { icon: ShoppingCart, title: "Get BCX", subtitle: "Swap crypto to BCX", url: "/get-bcx" },
    { icon: FileText, title: "Whitepaper", subtitle: "Literally" },
  ];

  return (
    <main className="mx-auto max-w-sm px-4 pb-28 pt-4">
      <div className="space-y-4">
        <Hero />
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <StatRow
              icon={<img src={bcx} alt="BCX" className="" />}
              label="70,000"
              value=""
              hint=""
              onClick={() => setOpen(true)}
              trailing={<FaAngleRight />}
            />
          </div>
          <div className="flex-1"><StatRow trailing={<FaAngleRight />} onClick={() => setWallet(true)} hideIcon preserveIconSpace={false} label={<span className="text-[#81858c] font-normal">0x123456...</span>}/></div>
        </div>
        {/* Top metric rows */}
        <div className="space-y-3">
          <StatRow icon={<FaTelegramPlane size={24} fill="#efb81c"/>} label="Join Telegram" value="0.01 BCX" claimed={false}/>
          <StatRow icon="user" label="On board 2 friends" value="0.02 BCX" claimed={false} />
        </div>

        {/* Action rows */}
        <div className="space-y-3">
          <StatRow icon="check" label="On board 5 friends" value="0.05 BCX" claimed={false} />
          
        </div>

        <div className="bg-gradient-to-br from-[#0B0C0E] via-[#121316] to-[#0E0F11] border border-gray-800/60 rounded-2xl p-4 shadow-[0_0_10px_rgba(255,255,255,0.03)] backdrop-blur-sm max-w-md mx-auto">
      <h2 className="text-gray-100 text-base font-semibold mb-3 tracking-wide">Start here</h2>

      <div className="space-y-3">
      {items.map((item, index) => {
              const Icon = item.icon;
              const handleNavigate = () => {
                if (item.title === "What is BUYCEX?") {
                  setShowStory(true); // ⬅️ open story overlay
                  return;
                }
                if (item.url) window.location.href = item.url;
              };
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              onClick={handleNavigate}
              onKeyDown={(e) => { if (e.key === 'Enter') handleNavigate() }}
              role={item.url ? 'link' : 'button'}
              tabIndex={0}
              className={cn(
                "relative flex items-center justify-between overflow-hidden rounded-2xl border border-gray-800/60 px-4 py-3 shadow-[0_0_10px_rgba(255,255,255,0.03)]",
                "bg-gradient-to-br from-[#0B0C0E] via-[#121316] to-[#0E0F11] cursor-pointer"
              )}
            >
              {/* Glow gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 via-transparent to-violet-600/10 pointer-events-none" />

              {/* Icon + Text */}
              <div className="relative flex items-center gap-3 z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 ring-1 ring-gray-700 shadow-inner">
                  <Icon className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_6px_#facc15aa]" />
                </div>
                <div>
                  <div className="text-gray-100 text-sm font-medium tracking-wide">{item.title}</div>
                  <div className="text-gray-500 text-xs">{item.subtitle}</div>
                </div>
              </div>

              {/* Chevron icon */}
              <ChevronRight className="text-gray-500 z-10" />
            </motion.div>
          )
        })}
      </div>
    </div>
      </div>

      <BottomNav />
      <SelectWallet open={wallet} onClose={() => setWallet(false)}/>
      {showStory && <StoryProgress onClose={() => setShowStory(false)} />}
      <ImageModal open={open} onClose={() => setOpen(false)} src={bcx} title="" description={<span>You earned <span className="font-semibold text-xl">10</span> BCX Fragments!</span>} userHoldings={1922222}  details={<span>Keep farming every fragment strengthens your ownership power in Buycex.</span>} />
    </main>
  )
}

