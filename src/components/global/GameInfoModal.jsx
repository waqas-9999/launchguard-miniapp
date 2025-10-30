import React from "react";

export default function GameInfoModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[101] w-[calc(100%-32px)] max-w-lg max-h-[75vh] overflow-auto 
          rounded-2xl border border-[#82ad4b]/25 bg-gradient-to-b from-[#0B0C0E] to-[#0D0E12]
          text-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-5"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-2.5 right-3 inline-flex h-8 w-8 items-center justify-center 
            rounded-full border border-[#82ad4b]/30 text-[#82ad4b]"
        >
          ×
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#82ad4b] shadow-[0_0_10px_#82ad4b]" />
          <h3 className="text-lg font-extrabold text-[#82ad4b]">How to Play</h3>
        </div>
        <div className="text-sm leading-6 space-y-1 mb-3">
          <div>• Tap Start to begin the run.</div>
          <div>• Tap or click anywhere on the screen to jump over obstacles.</div>
          <div>• Avoid hitting cacti, rocks, or flying creatures — each hit ends the game.</div>
          <div>• The longer you survive, the higher your score grows.</div>
        </div>

        <div className="h-px bg-[#82ad4b]/20 my-3" />

        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#82ad4b] shadow-[0_0_10px_#82ad4b]" />
          <h3 className="text-lg font-extrabold text-[#82ad4b]">Rewards</h3>
        </div>
        <div className="text-sm leading-6 space-y-1">
          <div>• Get IMDINO for every 100 points you score.</div>
          <div>• Only full 100-point milestones count.</div>
          
          <div className="pt-1">If you crash before the next 100 points (e.g. 150 pts), you keep your last reward only.</div>
          <div>IMDINO adds automatically each time you hit a milestone.</div>
        </div>

        <div className="text-[11px] opacity-80 mt-3">
          Note: This game is built for fun and learning purposes only. Scores and rewards are for
          entertainment within the Buycex ecosystem.
        </div>
      </div>
    </div>
  );
}


