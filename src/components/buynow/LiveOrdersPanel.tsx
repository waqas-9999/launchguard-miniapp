import { useEffect, useState } from "react";
import { FaEthereum, FaChevronRight } from "react-icons/fa";
import useWeb3Functions from "../../hooks/useWeb3Functions";

interface Order {
  id: number;
  price: string;
  amount: string;
  time: number;
  currency: string;
}

const LiveOrdersPanel = () => {
  const [reloadIn, setReloadIn] = useState(6);
  const [orders, setOrders] = useState<Order[]>([]);
  const { fetchLiveOrdersFromPurchases } = useWeb3Functions();

  const formatTimeAgo = (timestamp: number) => {
    const secondsAgo = Math.floor(Date.now() / 1000) - timestamp;
    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
    return `${Math.floor(secondsAgo / 86400)}d ago`;
  };

  const reloadOrders = async () => {
    const data = await fetchLiveOrdersFromPurchases();
    setOrders(data);
  };

  useEffect(() => {
    reloadOrders();
    const interval = setInterval(() => {
      setReloadIn((prev) => {
        if (prev === 1) {
          reloadOrders();
          return 6;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl bg-black/30 backdrop-blur-lg border-0 md:border border-white/10 p-0 md:p-6 text-white space-y-4">
      <div className="text-lg font-semibold">
        Recent Orders <span className="text-sm text-gray-400">(Reloads in {reloadIn}s)</span>
      </div>

      {/* Horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="min-w-[720px] sm:min-w-0">
          <div className="grid [grid-template-columns:80px_1.0fr_1.6fr_1.6fr_70px] text-gray-400 text-sm px-4">
            <span>CURRENCY</span>
            <span>ORDER ID</span>
            <span>PRICE</span>
            <span>AMOUNT</span>
            <span className="text-right">TIME</span>
          </div>

          <div className="space-y-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid [grid-template-columns:80px_1.0fr_1.6fr_1.6fr_70px] items-center bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-blue-400">
                  <FaEthereum />
                </div>
                <span className="text-white truncate">{order.id}</span>
                <span>{order.price}</span>
                <span>{order.amount}</span>
                <div className="flex justify-end">
                  <span>{formatTimeAgo(order.time)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveOrdersPanel;
