import { default as ArrowToRightIcon } from "../../assets/svg/arrow-to-right.svg?react";

import BuyForm from "../BuyForm";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

const HeaderSection = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  return (
    <section className="min-h-[85vh] flex items-center justify-center py-8 sm:py-0 relative overflow-hidden">
      {/* Background BCX Token Image */}
      
      
      <div className="container flex flex-col md:justify-between items-center gap-8 sm:gap-16 px-4 lg:flex-row lg:gap-4 lg:px-0 relative z-10">
        <div className="w-full lg:w-1/2 flex sm:block flex-col justify-center h-auto sm:h-auto text-center lg:text-left">
          <h2 className="mb-4 sm:mb-6 text-center sm:text-left text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight lg:leading-normal font-bold">
            Build Wealth Through True Blockchain Ownership
          </h2>
          <p className="mb-6 sm:mb-8 text-center sm:text-left font-normal leading-relaxed text-white/80 text-sm sm:text-base lg:text-lg xl:text-xl max-w-lg mx-auto lg:mx-0">
            Join a trusted movement transforming token holders into empowered stakeholders in the new era of digital wealth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:justify-start">
            <button
              onClick={() => {
                if (isConnected) {
                  window.open('https://token.buycex.com/', '_blank');
                } else {
                  open();
                }
              }}
              className="group flex items-center justify-center gap-2 rounded-full bg-primary py-3 sm:py-4 px-4 sm:px-6 text-sm font-semibold text-black transition-all duration-200 hover:opacity-75 w-full sm:w-auto"
            >
              {isConnected ? (
                <>
                  <span>{address?.slice(0, 6)}...{address?.slice(-6)}</span>
                </>
              ) : (
                <>
                  <span>Get BCX</span>
                </>
              )}
              <ArrowToRightIcon className="h-4 w-4 sm:h-6 sm:w-6 transition-all duration-300 group-hover:translate-x-2" />
            </button>
            <a
              href="#"
              className="group flex items-center justify-center gap-2 rounded-full border-2 border-white/10 bg-secondary py-3 sm:py-4 px-4 sm:px-6 text-sm font-semibold transition-opacity duration-200 hover:opacity-75 w-full sm:w-auto"
            >
              <span>Whitepaper</span>
              <ArrowToRightIcon className="h-4 w-4 sm:h-6 sm:w-6 transition-all duration-300 group-hover:translate-x-2" />
            </a>
          </div>
        </div>

        <div className="relative flex w-full justify-center lg:w-[45%]">
          <BuyForm />
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
