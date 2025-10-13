import buycexlogo from "../../assets/img/BUYCEX-INFINITY.png";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

export default function TokenomicsSection() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Octagonal Coin */}
          <div>
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Coin Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#efb81c] to-yellow-400 rounded-full blur-3xl opacity-20"></div>
                
                {/* Octagonal Coin */}
                <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                  {/* Outer Octagon */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#efb81c] via-yellow-400 to-[#efb81c] rounded-full p-2">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                      {/* Inner Octagon */}
                      <div className="w-4/5 h-4/5 bg-gradient-to-br from-[#efb81c] via-yellow-400 to-[#efb81c] rounded-full p-1">
                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center relative">
                          {/* Dotted Border */}
                          <div className="absolute inset-0 border-2 border-dotted border-[#efb81c] rounded-full m-4"></div>
                          
                          {/* Ridged Inner Ring */}
                          <div className="absolute inset-0 border-4 border-[#efb81c] rounded-full m-8 opacity-60"></div>
                          
                          {/* MEO COIN Text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              
                            </div>
                          </div>
                          
                          {/* Cat Face Center */}
                          <img
              src={buycexlogo}
              alt="BuycexInfinityLogo"
                  className="w-32 h-16"
            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Tokenomics Information */}
          <div>
            <div className="text-center lg:text-left">
              {/* Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
                Tokenomics
              </h2>

              {/* Information Boxes */}
              <div className="space-y-6 mb-10">
                {/* Total Supply Box */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-6 shadow-lg">
                  <div className="text-black font-bold text-xl sm:text-2xl">
                    Total Supply 300,000,000
                  </div>
                </div>

                {/* Ticker Box */}
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl p-6 shadow-lg">
                  <div className="text-black font-bold text-xl sm:text-2xl">
                    Ticker: BCX
                  </div>
                </div>

                {/* Buy/Sell Tax Box */}
                <div className="bg-gradient-to-r from-orange-300 to-orange-200 rounded-2xl p-6 shadow-lg">
                  <div className="text-black font-bold text-xl sm:text-2xl">
                  Burn: 96.667%
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Buy Button */}
                <button 
                  onClick={() => {
                    if (isConnected) {
                      navigate('/dashboard');
                    } else {
                      open();
                    }
                  }}
                  className="bg-gradient-to-r from-[#efb81c] to-yellow-400 text-black font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {isConnected ? (
                    <>
                      <span>Buy BCX</span>
                    </>
                  ) : (
                    <>
                      <span>Buy BCX</span>
                    </>
                  )}
                </button>

                {/* Chart Button */}
                <button className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                  Whitepaper
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
