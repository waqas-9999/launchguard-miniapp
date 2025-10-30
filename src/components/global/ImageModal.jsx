"use client"

function formatSmallPercent(p) {
  if (p === null || p === undefined) return null
  if (p === 0) return '0%'
  if (p < 0.001) return '<0.001%'
  return (p >= 1 ? p.toFixed(2) : p.toFixed(5)) + '%'
}

export default function ImageModal({ open, onClose, src, title, description, details, userHoldings }) {
  if (!open) return null

  // 🔹 Calculate ownership based on total supply of 3,000,000 BCX
  const totalSupply = 3_000_000
  const ownershipPercent = userHoldings
    ? (userHoldings / totalSupply) * 100
    : 0

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className="relative mt-4 min-h-96 w-full max-w-md rounded-2xl 
        bg-[radial-gradient(circle_at_top_left,_#1e1e1e,_#000)] 
        p-6 shadow-2xl"
      >
        <div className="h-1.5 w-12 rounded-full bg-gray-500 mx-auto mb-4" />

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-white flex gap-2 items-center">
              <div className="mt-2 rounded-lg overflow-hidden bg-black">
                <img src={src} alt={title} className="h-full w-10" />
              </div>
              {title}
            </h2>

            <div className="mt-8 text-sm text-gray-300">{description}</div>
            <div className="mt-4 mb-8 text-xl">{details}</div>

            {/* ✅ Ownership section */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                <span className="font-medium">Your Ownership %</span>
                <span className="ml-2 font-mono text-xs">
                  {formatSmallPercent(ownershipPercent)}
                </span>
              </div>

              {/* Block indicator (5 blocks) + thin progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const filled = ownershipPercent >= ((i + 1) / 5) * 100
                    return (
                      <div
                        key={i}
                        className={`h-3 w-3 rounded-sm ${
                          filled ? "bg-[#efb81c]" : "bg-gray-700"
                        }`}
                      />
                    )
                  })}
                </div>

                <div className="flex-1 h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className="h-full bg-[#efb81c] transition-all duration-300"
                    style={{
                      width: Math.min(100, Math.max(0, ownershipPercent)).toFixed(6) + "%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
