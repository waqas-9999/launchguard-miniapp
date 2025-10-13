import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import useWeb3Functions from "../../hooks/useWeb3Functions";

type Tx = {
  currency: string;
  orderId: number;
  price: string;
  amount: string;
  time: string;
};

const TransactionsSummary = () => {
  const { fetchLiveOrdersFromPurchases } = useWeb3Functions();
  const [transactions, setTransactions] = useState<Tx[]>([]);

  const formatTimeAgo = (timestamp: number): string => {
    const secondsAgo = Math.floor(Date.now() / 1000) - timestamp;
    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
    return `${Math.floor(secondsAgo / 86400)}d ago`;
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const raw = await fetchLiveOrdersFromPurchases();

      const txs: Tx[] = raw.map((tx: any, idx: number) => ({
        orderId: tx.id,
        currency: tx.currency === "0x0000000000000000000000000000000000000000" ? "ETH" : "ERC20",
        price: tx.price,
        amount: tx.amount.replace("$", ""), // Remove $ for calculation
        time: formatTimeAgo(tx.time),
      }));

      setTransactions(txs);
    };

    fetchTransactions();
  }, [fetchLiveOrdersFromPurchases]);

  const totalAmount = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  return (
    <div className="p-6 text-white">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Completed Transactions */}
        <div className="flex justify-between items-center bg-black/30 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FaUsers className="text-yellow-400 text-2xl" />
            <span className="font-semibold text-white">Total Completed Transactions</span>
          </div>
          <div className="bg-black/50 px-4 py-1 rounded-md border border-white/10 font-semibold text-white">
            {transactions.length}
          </div>
        </div>

        {/* Total Transaction Amount */}
        <div className="flex justify-between items-center bg-black/30 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FaUsers className="text-yellow-400 text-2xl" />
            <span className="font-semibold text-white">Total Transactions Amount</span>
          </div>
          <div className="bg-black/50 px-4 py-1 rounded-md border border-white/10 font-semibold text-white">
            ${totalAmount.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="rounded-xl bg-black/30 border border-white/10 p-6">
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <div className="min-w-[720px] sm:min-w-0">
            <table className="min-w-full text-left">
            <thead className="text-gray-400 border-b border-white/10 text-sm">
              <tr>
                <th className="pb-2">CURRENCY</th>
                <th className="pb-2">ORDER ID</th>
                <th className="pb-2">PRICE</th>
                <th className="pb-2">AMOUNT</th>
                <th className="pb-2">TIME</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx, index) => (
                  <tr key={index} className="text-sm text-white border-t border-white/5">
                    <td className="py-2">{tx.currency}</td>
                    <td className="py-2">{tx.orderId}</td>
                    <td className="py-2">{tx.price}</td>
                    <td className="py-2">${tx.amount}</td>
                    <td className="py-2">{tx.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400">
                    There are no finalized transactions yet…
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsSummary;
