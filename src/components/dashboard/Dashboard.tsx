import { useAccount } from "wagmi";
import { FaWallet, FaCoins, FaBroadcastTower } from "react-icons/fa";
import LeaderboardPanel from "../leaderbord/LeaderboardPanel";
import BuyForm from "../BuyForm";
import LastTransactionsPanel from "../leaderbord/LastTransactionsPanel";
import ReferralsPanel from "./ReferralsPanel";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import config from "../../config";
import useWeb3Functions from "../../hooks/useWeb3Functions";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { address } = useAccount();
  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Not connected";

  const balances = useSelector((state: RootState) => state.wallet.balances);
  const bcxBalance = balances["BCX"] || 0;
  const tokenPrices = useSelector((state: RootState) => state.presale.prices);
  const chainId = useSelector((state: RootState) => state.presale.chainId);
const tokenPrice =
  tokenPrices[config.displayPrice[chainId as 1 | 97 | 56]] || 1;
  const tokenWorth = bcxBalance * tokenPrice;

  const { fetchLeaderboardFromAllPurchases } = useWeb3Functions();
  const [userLevel, setUserLevel] = useState(1);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userTotal, setUserTotal] = useState<bigint>(0n);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const leaderboard = await fetchLeaderboardFromAllPurchases();
      const index = leaderboard.findIndex(
        (entry) => entry.address.toLowerCase() === address?.toLowerCase()
      );
      if (index >= 0) {
        const user = leaderboard[index];
        setUserRank(index + 1);
        setUserLevel(user.level);
        setUserTotal(user.total);

        const percent = getLevelProgress(user.level, user.total);
        setProgress(percent);
      }
    })();
  }, [address, fetchLeaderboardFromAllPurchases]);

  const getLevelProgress = (level: number, total: bigint): number => {
    const nextThresholds: Record<number, bigint> = {
      1: 1_000n * 10n ** 18n,
      4: 10_000n * 10n ** 18n,
      5: 50_000n * 10n ** 18n,
      6: 100_000n * 10n ** 18n,
      7: 150_000n * 10n ** 18n,
      8: 200_000n * 10n ** 18n, // optional, beyond level 8
    };

    const current = total;
    const currentLevelThreshold = Object.entries(nextThresholds).find(
      ([lvl]) => parseInt(lvl) === level - 1
    )?.[1] || 0n;

    const nextLevelThreshold = nextThresholds[level] || current;
    const progressRaw =
      ((current - currentLevelThreshold) * 100n) /
      (nextLevelThreshold - currentLevelThreshold || 1n);

    return Number(progressRaw);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard!</h1>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Balance */}
        <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-300">Your Total BCX Balance</p>
            <h2 className="text-2xl font-bold mt-2">
              {Intl.NumberFormat().format(bcxBalance)}
            </h2>
          </div>
          <div className="text-yellow-400 text-3xl">
            <FaCoins />
          </div>
        </div>

        {/* Token Worth */}
        <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-300">Your Tokens Worth at Launch</p>
            <h2 className="text-2xl font-bold mt-2">
              ${Intl.NumberFormat().format(tokenWorth)}
            </h2>
          </div>
          <div className="text-yellow-400 text-3xl">
            <FaWallet />
          </div>
        </div>

        {/* Receiving Wallet */}
        <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-300">Receiving Wallet Address</p>
            <h2 className="text-lg font-semibold mt-2">{displayAddress}</h2>
          </div>
          <div className="text-yellow-400 text-3xl">
            <FaBroadcastTower />
          </div>
        </div>
      </div>

      {/* Rank Progress */}
      <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-gray-300">Current Rank</p>
            <h2 className="text-xl font-semibold">Level {userLevel}</h2>
          </div>
          <div className="text-center">
            <span className="text-yellow-400 text-sm">
              {progress.toFixed(2)}%
            </span>
          </div>
          <div className="text-right">
            <p className="text-gray-300">Next Rank</p>
            <h2 className="text-xl font-semibold">Level {userLevel + 1}</h2>
          </div>
        </div>
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
          <div
            className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Buy Form + Leaderboard */}
      <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-6 text-white bg-black min-h-screen">
        <div className="rounded-xl bg-black/30 backdrop-blur-lg border-0 sm:border border-white/10 p-0 md:p-6 h-full flex flex-col">
          <h2 className="text-xl font-semibold text-white mb-6">
            Presale Buy Now
          </h2>
          <div className="mt-4">
            <BuyForm />
          </div>
        </div>

        <LeaderboardPanel />
      </div>

      {/* Transactions + Referrals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <LastTransactionsPanel />
        <ReferralsPanel />
      </div>
    </div>
  );
};

export default Dashboard;
