import { motion } from "framer-motion";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const WalletButton = ({ onCloseSidebar, className = "" }) => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const handleClick = () => {
    open();
    if (onCloseSidebar) onCloseSidebar();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`flex items-center justify-center gap-3 w-full py-4 
        rounded-xl font-semibold text-black 
        bg-white
        shadow-[0_0_20px_#fffff] hover:shadow-[0_0_30px_#ffffff] 
        transition-all ${className}`}
    >
      {isConnected ? (
        <span>{address?.slice(0, 6)}...{address?.slice(-6)}</span>
      ) : (
        <span>Connect Wallet</span>
      )}
    </motion.button>
  );
};

export default WalletButton;
