import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useWeb3Functions from "../../hooks/useWeb3Functions";
import { formatUnits } from "viem";
import config from "../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type PurchaseRecord = {
  amount: bigint;
  paidAmount: bigint;
  token: string;
  timestamp: bigint;
  txHash: string;
};

const LastTransactionsPanel = () => {
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const { fetchUserPurchases } = useWeb3Functions();
  const { address } = useAccount(); // ✅ add this
  const chainId = useSelector((state: RootState) => state.presale.chainId);

  // ✅ Updated Effect
useEffect(() => {
  (async () => {
    const data = await fetchUserPurchases();
  
    setPurchases(data.slice(-5).reverse());
  })();
}, [fetchUserPurchases]);


 const formatAmount = (amount?: bigint) => {
  if (!amount || isNaN(Number(amount))) return "0";
  return Number(formatUnits(amount, config.saleToken[chainId].decimals)).toLocaleString();
};


  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-6 text-white h-full">
      <h2 className="text-lg font-semibold mb-4">Your Last Transactions</h2>

      {/* ✅ Improved conditional check */}
      {purchases.length === 0 || purchases.every(tx => tx.amount === 0n) ? (
        <p className="text-center text-gray-400 mt-12">
          There are no finalized transactions yet…
        </p>
      ) : (
        <div className="space-y-4">
          
          {purchases.map((tx, i) => (
            <div key={i} className="bg-[#131b2b] border border-[#1f2b3c] rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">
                Purchased:{" "}
                <span className="font-bold text-white">
                  {formatAmount(tx.amount)} BCX
                </span>
              </div>
              <div className="text-sm text-gray-300 mb-1">
                Paid:{" "}
                <span className="font-bold text-white">
                  {formatAmount(tx.paidAmount)} 
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Date: {formatDate(tx.timestamp)}
              </div>
              {tx.txHash && (
                <div className="text-sm text-yellow-400 mt-1">
                  <a
                    href={`${config.blockExplorerUrl[chainId]}/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    View Transaction →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LastTransactionsPanel;
