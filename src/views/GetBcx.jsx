import BottomNav from "../components/boost/BottomNav";
import { FaAngleDown, FaAngleRight, FaArrowRight, FaBroadcastTower, FaCoins, FaWallet } from 'react-icons/fa'
import { TiStarFullOutline } from "react-icons/ti";
import bcx from "../assets/img/home/BUYCEX-INFINITY.png"
import { useState, useRef, useEffect } from 'react'
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import SelectWallet from '../components/global/SelectWallet';

function GetBcx() {
  const [sendToken, setSendToken] = useState('USDT')
  const [wallet, setWallet] = useState(false)
  const [tokenOpen, setTokenOpen] = useState(false)
  const tokenRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (tokenRef.current && !tokenRef.current.contains(e.target)) setTokenOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])
  return (
    <div>
        {/* Top 4 Cards */}
        <Link to="/transaction"><button className="flex items-center justify-self-end mx-4 text-[#efb81c] mt-4">Transaction<FaAngleRight className='mt-1'/></button></Link>
      <div className="grid grid-cols-2 gap-3 my-4 mx-4">
        {/* Total Balance */}
        <div className="bg-white/5 backdrop-blur-md border border-[#efb81c]/20 rounded-2xl px-4 py-1 shadow-[0_0_20px_rgba(239,184,28,0.15)] flex justify-between items-center">
          <div>
            <p className="text-gray-300">BCX Balance</p>
            <h2 className="text-sm font-bold">
              1233
            </h2>
          </div>
          <div className="text-yellow-400 text-2xl">
            <FaCoins />
          </div>
        </div>

        {/* Token Worth */}
        <div className="bg-white/5 backdrop-blur-md border border-[#efb81c]/20 rounded-2xl px-4 py-1 shadow-[0_0_20px_rgba(239,184,28,0.15)] flex justify-between items-center">
          <div>
            <p className="text-gray-300">Tokens Worth</p>
            <h2 className="text-sm font-bold">
              $1233
            </h2>
          </div>
          <div className="text-yellow-400 text-2xl">
            <FaBroadcastTower />
          </div>
        </div>

        {/* Receiving Wallet */}
        <div onClick={() => setWallet(true)} className="bg-white/5 backdrop-blur-md border border-[#efb81c]/20 rounded-2xl px-4 py-1 shadow-[0_0_20px_rgba(239,184,28,0.15)] flex justify-between items-center">
          <div>
            <p className="text-gray-300 flex items-center gap-1">Wallet <FaAngleRight className='mt-0.5'/></p>
            <h2 className="text-sm font-semibold">0x12233</h2>
          </div>
          <div className="text-yellow-400 text-2xl">
            <FaWallet />
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md border border-[#efb81c]/20 rounded-2xl px-4 py-1 shadow-[0_0_20px_rgba(239,184,28,0.15)] flex justify-between items-center">
          <div>
            <p className="text-gray-300">Level</p>
            <h2 className="text-sm font-semibold">1</h2>
          </div>
          <div className="text-yellow-400 text-2xl">
            <TiStarFullOutline />
          </div>
        </div>
      </div>

      {/* Exchange Section */}
      <div className="mx-4 mb-20">
        
        {/* Current Price */}
        <div className="bg-white/5 flex justify-between backdrop-blur-md border border-[#efb81c]/20 rounded-2xl p-4 mb-4 text-center shadow-[0_0_20px_rgba(239,184,28,0.15)]">
          <p className="text-gray-300 flex gap-2"><img src={bcx} alt="BCX" className="h-5 w-9 mt-0.5" />Current Price</p>
          
          <p className="text-gray-300">Next Price: $0.50</p>
        </div>

        {/* Exchange Interface */}
        <div className="bg-white/5 backdrop-blur-md border border-[#efb81c]/20 rounded-2xl p-4 mb-4 shadow-[0_0_20px_rgba(239,184,28,0.15)]">
          {/* You Send */}
          <div className="mb-6">
            {/* <h3 className="text-gray-300 mb-3">YOU SEND</h3> */}
            <div className="bg-black/30 border border-gray-600 rounded-xl p-3 flex items-center">
              <div className="flex flex-col justify-between items-start">
                <input 
                  type="number" 
                  placeholder="You Send"
                  className="bg-transparent text-white text-xl w-full outline-none"
                />
                <p className="text-gray-400 text-sm mt-2">Balance: 0</p>
                
              </div>
              <div className="relative" ref={tokenRef}>
                  <button
                    type="button"
                    onClick={() => setTokenOpen((v) => !v)}
                  className="flex items-center gap-1 sm:gap-2 rounded-md sm:rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 py-1.5 sm:py-2 px-2 sm:px-3 transition-all duration-300 hover:from-primary/30 hover:to-primary/20 hover:scale-105 flex-shrink-0"
                    aria-expanded={tokenOpen}
                    aria-haspopup="true"
                  >
                    <span className='flex items-center gap-1'><RiMoneyDollarCircleFill size={22}/>{sendToken}</span>
                    <FaAngleDown />
                  </button>

                  {tokenOpen && (
                    <div className="absolute right-0 mt-2 w-32 rounded-xl bg-[#121214] border border-gray-700 shadow-lg py-1">
                      <button
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-800"
                        onClick={() => { setSendToken('USDT'); setTokenOpen(false) }}
                      >
                        USDT
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-800"
                        onClick={() => { setSendToken('BNB'); setTokenOpen(false) }}
                      >
                        BNB
                      </button>
                    </div>
                  )}
                </div>
            </div>
          </div>

          {/* You Get */}
          <div>
            <div className="bg-black/30 border border-gray-600 rounded-xl p-3 flex justify-between items-center">
              <div className="flex flex-col justify-between items-start">
                <input 
                  type="number" 
                  placeholder="0"
                  className="bg-transparent text-white text-xl w-full outline-none"
                  readOnly
                />
                <p className="text-gray-400 text-sm mt-2">You'll receive: 0</p>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 rounded-md sm:rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 py-1.5 sm:py-2 px-2 sm:px-3 flex-shrink-0">
                  <img
                    src={bcx}
                    alt="BCX"
                    className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-contain"
                  />
                  <span className="font-semibold text-white text-xs sm:text-sm">BCX</span>
                </div>
            </div>
          </div>
        </div>

        {/* Purchase Status */}
        <div className="text-center mb-6">
          <p className="text-gray-300">You've purchased 0 BCX tokens!</p>
        </div>

        {/* Start Exchange Button */}
        <button className="w-full mb-12 bg-[#efb81c] text-black font-semibold py-3 rounded-2xl text-lg transition-colors shadow-[0_0_20px_rgba(239,184,28,0.3)]">
          Start Exchange
        </button>
      </div>
    <SelectWallet open={wallet} onClose={() => setWallet(false)}/>
      <BottomNav/>
    </div>
  )
}

export default GetBcx