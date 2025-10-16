"use client"

import { FaShare, FaWallet } from "react-icons/fa"
import { IoCopy } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from 'react'

export default function SelectWallet({ open, onClose }) {
  const [chain, setChain] = useState('BNB Chain')
  const [openMenu, setOpenMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  function confirm() {
    // Here you could do something with the selected chain
    setOpenMenu(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative w-full max-w-md rounded-3xl border border-gray-800/60 
              bg-gradient-to-br from-[#0B0C0E] via-[#121316] to-[#0E0F11] 
              p-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            {/* Top handle */}
            <div className="h-1.5 w-12 rounded-full bg-gray-600 mx-auto mb-6" />

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-100 tracking-wide">
                Select Chain
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Choose the chain for your wallet
              </p>
            </div>

            {/* Dropdown */}
            <div className="mb-6" ref={menuRef}>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 text-gray-300 text-sm mb-2">
                  <div className="text-gray-300 text-sm">Chain</div>
                  <button className="bg-primary text-sm text-black font-semibold px-3 py-1.5 rounded-md flex items-center gap-2"><FaWallet className="w-4 h-4" />Wallet</button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenMenu(v => !v)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-black/30 border border-gray-700"
                    aria-haspopup="true"
                    aria-expanded={openMenu}
                  >
                    <span className="text-sm text-gray-100">{chain}</span>
                    <svg className={`h-4 w-4 transform transition-transform ${openMenu ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {openMenu && (
                    <div className="mt-2 rounded-xl bg-[#0B0C0E] border border-gray-700 shadow-lg overflow-hidden">
                      {['BNB Chain','ETH Chain','BNB testnet'].map((c) => (
                        <button key={c} onClick={() => { setChain(c); setOpenMenu(false) }} className="w-full text-left px-4 py-3 hover:bg-gray-800">{c}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={confirm}
                className="flex items-center justify-center gap-3 w-full py-4 
                  rounded-xl font-semibold text-black 
                  bg-gradient-to-r from-yellow-400 to-yellow-300
                  shadow-[0_0_20px_#facc15aa] hover:shadow-[0_0_30px_#facc15cc] 
                  transition-all"
              >
                <FaShare className="text-black" />
                Continue with {chain}
              </motion.button>

            </div>

            {/* Footer */}
            <button
              onClick={onClose}
              className="mb-16 mt-6 w-full text-center text-gray-500 text-sm hover:text-gray-300 transition"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
