import BottomNav from "../components/boost/BottomNav";
import React, { useState } from "react";
import GameInfoModal from "../components/global/GameInfoModal";

function Dino() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-screen bg-black flex flex-col">
      <iframe
        title="Dino Game"
        src="/dino.html"
        className="flex-1 w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
      ></iframe>

      {/* Floating info button for React layer (outside iframe) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Game info"
        className="fixed left-4 bottom-28 z-[60] h-11 w-11 rounded-full border border-[#82ad4b]/30 
          bg-white/5 text-[#82ad4b] font-extrabold text-lg"
      >
        ?
      </button>

      <GameInfoModal open={open} onClose={() => setOpen(false)} />
      <BottomNav />
    </div>
)};

export default Dino