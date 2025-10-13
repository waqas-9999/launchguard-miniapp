import { useEffect, useState } from "react";
import { FaMedal, FaCrown, FaTrophy, FaStar } from "react-icons/fa";
import { useAccount } from "wagmi";
import useWeb3Functions from "../../hooks/useWeb3Functions";
import { formatUnits } from "viem";
import config from "../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type LeaderboardEntry = {
  address: string;
  total: bigint;
  level: number;
};

const RECORDS_PER_PAGE = 10;

const getTier = (level: number) => {
  if (level >= 10) return { name: "Diamond", color: "from-cyan-300 to-blue-400", text: "text-cyan-200", bg: "bg-cyan-400/15", ring: "ring-cyan-300/30" };
  if (level >= 7) return { name: "Gold", color: "from-yellow-300 to-amber-400", text: "text-yellow-200", bg: "bg-yellow-400/15", ring: "ring-yellow-300/30" };
  if (level >= 4) return { name: "Silver", color: "from-zinc-200 to-gray-400", text: "text-zinc-200", bg: "bg-zinc-300/15", ring: "ring-zinc-300/30" };
  return { name: "Bronze", color: "from-amber-600 to-orange-500", text: "text-amber-200", bg: "bg-amber-500/15", ring: "ring-amber-400/30" };
};

const LeaderboardPanel = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { address } = useAccount();
  const chainId = useSelector((state: RootState) => state.presale.chainId);
  const { fetchLeaderboardFromAllPurchases } = useWeb3Functions();

  useEffect(() => {
    (async () => {
      const data = await fetchLeaderboardFromAllPurchases();
      const sorted = data.sort((a, b) => Number(b.total - a.total));
      setLeaderboard(sorted);
    })();
  }, [fetchLeaderboardFromAllPurchases]);

  const formatAmount = (amount: bigint) => {
    return Number(formatUnits(amount, config.saleToken[chainId].decimals)).toLocaleString(undefined, {
      maximumFractionDigits: 3,
    });
  };

  const totalPages = Math.ceil(leaderboard.length / RECORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const visibleEntries = leaderboard.slice(startIndex, startIndex + RECORDS_PER_PAGE);

  const userRank = leaderboard.findIndex((entry) => entry.address.toLowerCase() === address?.toLowerCase()) + 1;
  const userEntry = leaderboard.find((entry) => entry.address.toLowerCase() === address?.toLowerCase());

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/50 backdrop-blur-lg border-0 md:border border-white/10 p-0 md:p-6 h-full flex flex-col text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0">
          <div className="relative px-4 py-3">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-transparent" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-yellow-400/20 text-yellow-300">
                  <FaTrophy />
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">Holders Leaderboard</h2>
                  <div className="text-[11px] uppercase tracking-wider text-white/60">Season Rankings</div>
                </div>
              </div>
              {userEntry && (
                <div className="hidden sm:flex items-center gap-2 text-xs">
                  <span className="text-white/60">Your Rank</span>
                  <span className="rounded-md bg-white/10 px-2 py-1 font-semibold">#{userRank || 0}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leaderboard Items */}
        <div className="space-y-3">
          <div className="grid grid-cols-[60px_1fr_auto] items-center px-3 py-2 text-[11px] uppercase tracking-wider text-white/60 bg-white/5 rounded-lg">
            <div>Rank</div>
            <div>Address</div>
            <div className="text-right">Total Purchased</div>
          </div>
          {visibleEntries.map((item, idx) => (
            (() => {
              const rank = startIndex + idx + 1;
              const isTop1 = rank === 1;
              const isTop2 = rank === 2;
              const isTop3 = rank === 3;
              const isYou = address && item.address.toLowerCase() === address.toLowerCase();
              const tier = getTier(item.level);

              return (
                <div
                  key={item.address}
                  className={`relative group grid grid-cols-[60px_1fr_auto] items-center rounded-xl px-3 py-3 transition border ${
                    isTop1
                      ? "border-yellow-400/40 bg-gradient-to-r from-yellow-400/10 via-white/5 to-transparent"
                      : isTop2
                      ? "border-zinc-300/30 bg-gradient-to-r from-zinc-200/10 via-white/5 to-transparent"
                      : isTop3
                      ? "border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-white/5 to-transparent"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  } ${isYou ? `ring-2 ${tier.ring}` : ""}`}
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-yellow-400/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="flex items-center">
                    <div
                      className={`relative rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-md ${
                        isTop1
                          ? "bg-gradient-to-br from-yellow-300 to-amber-400 text-black"
                          : isTop2
                          ? "bg-gradient-to-br from-zinc-200 to-gray-400 text-black"
                          : isTop3
                          ? "bg-gradient-to-br from-amber-600 to-orange-500 text-white"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {rank}
                    </div>
                    {(isTop1 || isTop2 || isTop3) && (
                      <FaCrown className={`ml-2 ${isTop1 ? "text-yellow-300" : isTop2 ? "text-zinc-300" : "text-amber-500"}`} />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-white text-sm font-mono truncate">
                      {item.address.slice(0, 6)}...{item.address.slice(-3)}
                    </div>
                    <div className={`ml-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${tier.bg} ${tier.text} border border-white/10`}>
                      <FaStar className="text-[11px]" /> {tier.name} • Lv {item.level}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-white/60">Total Purchased</div>
                    <div className="inline-flex items-center gap-1 text-sm font-semibold">
                      <FaTrophy className="text-yellow-300" /> ${formatAmount(item.total)}
                    </div>
                  </div>
                </div>
              );
            })()
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              className={`px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"}`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${currentPage === i + 1
                  ? "bg-yellow-400 text-black font-semibold shadow-[0_0_0_2px_rgba(0,0,0,0.2)]"
                  : "bg-white/10 text-white hover:bg-white/15"}
                `}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"}`}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* Your Place */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <h3 className="text-sm text-white/70 mb-2">Your Place</h3>
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="flex items-center gap-2">
              <div className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {userRank || 0}
              </div>
              <div className="text-white text-sm font-mono">
                {address ? `${address.slice(0, 6)}...${address.slice(-3)}` : "0x..."}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-300">Level</span>
              <FaMedal className="text-yellow-400 text-lg" />
              <span className="text-white text-sm font-bold">{userEntry?.level || 1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPanel;
