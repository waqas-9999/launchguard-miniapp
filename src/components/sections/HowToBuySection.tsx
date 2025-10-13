import { useState } from "react";
import { BuyWIthCardModal } from "../BuyWithCardModal";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

const HowToBuySection = () => {
  const [isBuyWithCardModalOpen, setIsBuyWithCardModalOpen] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  const steps = [
    {
      title: "Connect to wallet",
      description:
        "Connect your crypto wallet to the BuyCex presale platform for secure access."},
    {
      title: "Choose payable token & chain",
      description:
        "Participate in the BCX Infinity presale using tokens like BNB, ETH, USDT, and others on the Ethereum or Binance Smart Chain networks.",
    },
    {
      title: "Receive tokens",
      description:
        "After the presale concludes, BCX tokens will be distributed automatically to your connected wallet. You will receive tokens in line with the presale's vesting and allocation rules.",
    },
  ];
  return (
    <section id="how-to-buy" className="pb-8 sm:pb-12 lg:pb-24 px-4 sm:px-0">
      {/* Call to Action */}
      <div className="text-center">
          
          
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-['ui-sans-serif',_system-ui,_sans-serif] leading-tight lg:leading-normal font-bold mb-3 lg:mb-4 text-white">
            Be Part of Our Journey
          </h3>
          
          <p className="text-white/80 max-w-2xl mx-auto mb-6 lg:mb-8 text-sm lg:text-base px-4">
            Join thousands of users worldwide who trust BUYCEX for secure, fast, and reliable crypto payments. 
            Together, we're building the future of digital finance.
          </p>
          
        </div>
      <div className="container flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
        <div className="flex w-full flex-col gap-4 sm:gap-6 lg:w-1/2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="gradient-border flex w-full flex-col items-center gap-4 sm:gap-6 rounded-xl sm:rounded-2xl bg-[#1A2025]/70 p-4 sm:p-6 lg:p-8 backdrop-blur-xl lg:flex-row"
            >
              <div className="gradient-border flex h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 items-center justify-center text-xl sm:text-2xl lg:text-3xl font-bold before:rounded-full">
                {index + 1}.
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h4 className="text-gradient mb-2 sm:mb-4 text-lg sm:text-xl font-medium">
                  {step.title}
                </h4>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-gradient font-['ui-sans-serif',_system-ui,_sans-serif] mb-4 text-center text-3xl sm:text-4xl lg:text-5xl leading-tight lg:leading-normal font-bold">
            Why participate early?
          </h2>
          <div className="mb-4 sm:mb-6 lg:mb-8 flex flex-col gap-4 sm:gap-5">
            {/* Priority Access Card */}
            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base sm:text-lg mb-1">Priority Access</h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Secure your allocation before the public launch.
                </p>
              </div>
            </div>

            {/* Community Ownership Card */}
            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-green-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base sm:text-lg mb-1">Community Ownership</h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Early adopters have a unique role in shaping the future of BuyCex.
                </p>
              </div>
            </div>

            {/* Transparent Process Card */}
            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base sm:text-lg mb-1">Transparent Process</h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  All purchases are recorded on-chain, and token supply is fixed with no hidden inflation.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              if (isConnected) {
                navigate('/dashboard');
              } else {
                open();
              }
            }}
            className="mx-auto flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-primary py-3 sm:py-4 px-4 sm:px-6 font-semibold text-black transition-opacity duration-200 hover:opacity-75 w-full sm:w-auto"
          >
            {isConnected ? (
              <>
                <span>Buy now</span>
              </>
            ) : (
              <>
                <span>Buy now</span>
              </>
            )}
          </button>
        </div>
      </div>
      {isBuyWithCardModalOpen && (
        <BuyWIthCardModal closeModal={() => setIsBuyWithCardModalOpen(false)} />
      )}
    </section>
  );
};

export default HowToBuySection;
