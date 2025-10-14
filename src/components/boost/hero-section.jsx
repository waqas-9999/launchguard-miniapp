"use client"

import { useRef } from "react"
import slider1 from '../../assets/img/home/slider-1.webp'
export function Hero() {
  const scrollerRef = useRef(null)

  function scrollByAmount(amount) {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section aria-label="Mining hero" >
      {/* Sliding cards row */}
      <div className="mt-3 relative">

        <div
          ref={scrollerRef}
          className="no-scrollbar snap-x snap-mandatory flex gap-4 overflow-x-auto px-10 py-2 touch-pan-x"
          style={{ scrollBehavior: 'smooth' }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="snap-start flex-none w-64 rounded-2xl p-4"
              style={{
                background: `linear-gradient(180deg, rgba(0,0,0,0.32), rgba(0,0,0,0.52)), url(${slider1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '1px solid rgba(255,255,255,0.03)',
                backdropFilter: 'blur(6px)'
              }}
            >
              <h3 className="text-sm font-semibold text-white">Boost Pack {i + 1}</h3>
              <p className="mt-2 text-xs text-gray-300">Earn +{(i + 1) * 20} boosts</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-semibold" style={{ background: '#efb81c', color: '#080808' }}>
                Claim
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
