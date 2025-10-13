import { useWeb3Modal } from '@web3modal/wagmi/react'
import { NavLink } from 'react-router-dom'
import buycexlogo from '../assets/img/BUYCEX-INFINITY.png'

const PresaleEntry = () => {
  const { open } = useWeb3Modal()

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="w-[90%] max-w-md rounded-lg border border-white/10 bg-black/40 p-8 text-center backdrop-blur-lg shadow-lg">
        {/* Logo */}
        <img
          src={buycexlogo}
          alt="Buycex Logo"
          className="mx-auto mb-6 h-14 w-auto"
        />

        {/* Title */}
        <h1 className="mb-2 text-4xl font-bold text-yellow-400">
          Enter The Buycex Presale
        </h1>

        {/* Description */}
        <p className="mb-6 text-lg text-white/80">
          To join the presale connect your wallet first!
        </p>

        <hr className="border-t border-white/10 my-4" />

        {/* Buttons */}
      {/* Buttons */}
<div className="flex justify-center gap-4">
  <a
    href="http://buycex.org/"
    className="px-6 py-2 border border-yellow-400 text-yellow-400 rounded font-semibold hover:bg-yellow-400 hover:text-black transition"
  >
    Go Home
  </a>

  <button
    onClick={() => open()} // opens the wallet list (QR only appears if user picks WalletConnect)
    className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-[#1a1b2f] text-white rounded font-semibold hover:opacity-90 transition"
  >
    Connect Wallet
  </button>
</div>

      </div>
    </div>
  )
}

export default PresaleEntry
