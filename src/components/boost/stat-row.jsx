"use client"

import { motion } from "framer-motion"
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}
import { CheckCircle, Pickaxe, User2, Zap, LocateFixed } from "lucide-react"
import { isValidElement, cloneElement } from "react"

const icons = {
  zap: Zap,
  user: User2,
  pickaxe: Pickaxe,
  check: CheckCircle,
  locate: LocateFixed,
}

export function StatRow({ icon, label, value, hint, muted = false, onClick, hideIcon = false, preserveIconSpace = true, trailing = null, claimed = false }) {
  // icon can be:
  // - a string key (e.g. 'zap') to lookup in icons
  // - a React component (function/class)
  // - a React element (<img ... />)
  let IconComponent = null
  let iconElement = null
  if (typeof icon === "string") {
    IconComponent = icons[icon]
  } else if (isValidElement(icon)) {
    iconElement = icon
  } else if (typeof icon === "function") {
    IconComponent = icon
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "relative flex items-center justify-between overflow-hidden rounded-2xl border border-gray-800/60 px-5 py-2 shadow-[0_0_10px_rgba(255,255,255,0.03)] backdrop-blur-sm min-h-[56px]",
        muted ? "bg-gradient-to-br from-[#0B0C0E] to-[#121316]" : "bg-gradient-to-br from-[#0B0C0E] via-[#121316] to-[#0E0F11]"
      )}
    >
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/5 via-transparent to-violet-600/10 pointer-events-none" />

      <div className={cn("relative flex items-center z-10", preserveIconSpace ? "gap-3" : "gap-2")}>
        {/* Icon slot: optionally keep size for alignment or remove entirely when hideIcon=true and preserveIconSpace=false */}
        {!hideIcon ? (
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl",
              iconElement?.props?.src?.includes("coin-dino")
                ? "" // 🧩 remove border/background for CoinDino image
                : "bg-gradient-to-br from-gray-800 to-gray-900 ring-1 ring-gray-700 shadow-inner"
            )}
          >
            {IconComponent ? (
              <IconComponent
                className={cn(
                  "",
                  muted ? "text-gray-500" : "text-yellow-400 drop-shadow-[0_0_6px_#facc15aa]"
                )}
              />
            ) : iconElement ? (
              cloneElement(iconElement, {
                className: cn(iconElement.props.className, "w-7"),
              })
            ) : null}
          </div>
        ) : (
          preserveIconSpace ? <div className="h-9 w-9" aria-hidden /> : null
        )}


        {/* Label */}
        <span
          className={cn(
            "text-sm font-medium tracking-wide",
            muted ? "text-gray-400" : "text-gray-100"
          )}
        >
          {label}
        </span>
      </div>

      {/* Value + Hint + trailing */}
      <div className="relative z-10 flex items-baseline gap-2">
        <div className="flex items-baseline gap-1">
          {value && (
            <div className="relative">
              {!claimed ? (
                // Animated ring for unclaimed items
                <span
                  className={cn(
                    "text-sm font-semibold border-2 rounded-full px-3 py-1 tracking-wide relative overflow-hidden",
                    muted ? "text-gray-400 border-gray-700" : "text-white border-gray-700"
                  )}
                >
                  {value}
                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </span>
              ) : (
                <>

                </>
              )}
            </div>
          )}
          {hint && <span className="text-xs text-gray-500">{hint}</span>}
        </div>
        {/* {trailing && <div className="text-gray-400">{trailing}</div>} */}
      </div>
    </motion.div>
  )
}
