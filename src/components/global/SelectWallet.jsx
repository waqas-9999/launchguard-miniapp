"use client"

import { FaShare, FaWallet } from "react-icons/fa"
import { IoCopy } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi"
import { useWeb3Modal } from '@web3modal/wagmi/react'
import WalletButton from "./WalletButton"
export default function SelectWallet({ open, onClose }) {
    const { open: openModal } = useWeb3Modal()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chain, setChain] = useState('BNB Chain')
  const [openMenu, setOpenMenu] = useState(false)
  const menuRef = useRef(null)

  const { address, isConnected } = useAccount()
  const { connect, connectors, isLoading: connectLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const activeChainId = useChainId()
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  function confirm() {
    setOpenMenu(false)
    onClose()
  }

  async function handleCopy() {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      // simple feedback - replace with toast if you have one
      // alert('Copied')
    } catch (e) {
      console.error('copy failed', e)
    }
  }

  async function handleDisconnect() {
    try {
      await disconnect()
      onClose()
    } catch (e) {
      console.error('disconnect', e)
    }
  }

  async function handleSwitch(chainId) {
    if (!switchChain) return
    try {
      await switchChain({ chainId })
      onClose()
    } catch (e) {
      console.error('switchChain', e)
    }
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
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-100 tracking-wide">
                Wallet
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Connect or manage your wallet
              </p>
            </div>

            {/* Connected info */}
          {isConnected ? (
 <div className="mb-4 p-4 rounded-xl bg-white/5 border border-gray-700">
    <div className="flex items-center justify-between gap-2 text-gray-300 text-sm mb-2">
       <WalletButton />

    </div>
  </div>
) : (
              <div className="mb-4 p-4 rounded-xl bg-white/5 border border-gray-700">
                <div className="text-sm text-gray-300 mb-2">Connect a wallet</div>
                <div className="space-y-2">
                  {connectors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => connect({ connector: c })}
                      disabled={!c.ready}
                      className="w-full text-left px-4 py-3 rounded-xl bg-black/30 border border-gray-700 flex items-center justify-between"
                    >
                      <span>{c.name}</span>
                      <span className="text-xs text-gray-400">
                        {!c.ready ? 'Unsupported' : pendingConnector?.id === c.id ? 'Connecting…' : ''}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chain selector */}
            <div className="mb-6" ref={menuRef}>
              <div className="flex items-center justify-between gap-2 text-gray-300 text-sm mb-2">
                <div className="text-gray-300 text-sm">Network</div>
              </div>

              <button
                type="button"
                onClick={() => setOpenMenu(v => !v)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-black/30 border border-gray-700"
                aria-haspopup="true"
                aria-expanded={openMenu}
              >
                <span className="text-sm text-gray-100">
                  {activeChainId ? `Chain: ${activeChainId}` : 'Select chain'}
                </span>
                <svg className={`h-4 w-4 transform transition-transform ${openMenu ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </button>

              {openMenu && (
                <div className="mt-2 rounded-xl bg-[#0B0C0E] border border-gray-700 shadow-lg overflow-hidden">
                  {[56, 1, 97].map((cid) => ( // BNB mainnet (56), ETH(1), BNB testnet(97)
                    <button key={cid} onClick={() => handleSwitch(cid)} className="w-full text-left px-4 py-3 hover:bg-gray-800">
                      {cid === 56 ? 'BNB Chain' : cid === 1 ? 'ETH Chain' : 'BNB testnet'}
                    </button>
                  ))}
                </div>
              )}
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

  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={handleDisconnect}
    className="flex items-center justify-center gap-3 w-full py-4 
      rounded-xl font-semibold text-white 
      bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,0,0,0.7)] 
      transition-all"
  >
    <FaWallet className="w-4 h-4" />
    Disconnect
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