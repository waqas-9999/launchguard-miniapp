import React, { useEffect } from "react";
import { Check } from "lucide-react";

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 2000); // auto close after 2s
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none" aria-live="polite" aria-atomic="true">
<div className="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/40 
  bg-gradient-to-br from-white via-white/95 to-gray-100 text-black 
  shadow-[0_0_20px_rgba(239,184,28,0.15)] backdrop-blur-sm font-semibold text-sm animate-toastDrop">

    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black/10">
      <Check className="w-3.5 h-3.5" />
    </span>
    {message}
  </div>
</div>

  );
};

export default Toast;
