import { X, Download, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PdfModal({ open, onClose, pdfUrl, title }) {
  if (!open) return null;

  const handleOpenPdf = () => {
    // Try to open in Telegram's in-app browser
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(window.location.origin + pdfUrl);
    } else {
      // Fallback to new window
      window.open(pdfUrl, '_blank');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'JunglePaper.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-gradient-to-br from-[#0a0b0d] to-[#13151a] rounded-2xl border border-gray-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-white font-semibold text-lg">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#82ad4b]/20 to-[#6a8f3d]/20 rounded-2xl border border-[#82ad4b]/30 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#82ad4b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-white font-medium">Ready to view The Jungle Paper?</p>
                <p className="text-gray-400 text-sm">This will open the PDF document for you to read.</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleOpenPdf}
                  className="w-full py-3 bg-gradient-to-r from-[#82ad4b] to-[#6a8f3d] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open PDF
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-3 bg-transparent text-gray-400 font-medium rounded-xl hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
