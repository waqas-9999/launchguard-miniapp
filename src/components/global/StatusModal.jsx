import React from 'react';

const StatusModal = ({ open, onClose, title, message, ctaText = 'OK' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-sm rounded-2xl border border-[#82ad4b]/30 bg-gradient-to-b from-[#0f1114] to-[#0a0b0d] p-4 shadow-2xl">
        {/* Icon */}
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#82ad4b]/20 to-[#82ad4b]/10 text-[#82ad4b] shadow-[0_0_20px_rgba(130,173,75,0.35)]">
          <span className="text-xl">ℹ️</span>
        </div>
        {/* Title */}
        {title && (
          <h3 className="mb-2 text-center text-base font-extrabold text-white drop-shadow">{title}</h3>
        )}
        {/* Message */}
        {message && (
          <div className="mb-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-gray-200">
            {message}
          </div>
        )}
        {/* Actions */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-w-[120px] items-center justify-center rounded-md border border-[#82ad4b]/30 bg-gradient-to-br from-[#82ad4b] to-[#6a8f3d] px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-[#82ad4b]/40 active:scale-95"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
