import { FaUsers, FaTrophy, FaRegCopy, FaLink, FaUserPlus } from "react-icons/fa";
import useWeb3Functions from "../../hooks/useWeb3Functions";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { shortenAddress } from "../../utils/helpers"; // optional helper

const ReferralsPanel = () => {
  const { fetchReferralStats } = useWeb3Functions();
  const { address } = useAccount();

  const [referralStats, setReferralStats] = useState({
    referredCount: 0,
    totalEarnings: "0",
    referredAddresses: [] as string[],
    bcxBoughtByEach: [] as string[],
  });

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const referralLink = address
    ? `https://token.buycex.com/?ref=${address}`
    : "Connect your wallet";

  const referralId = address || "";

  useEffect(() => {
    if (!address) return;
    setIsLoading(true);

    fetchReferralStats()
      .then((stats) => {
        if (stats) {
          setReferralStats({
            referredCount: stats.referredCount,
            totalEarnings: stats.totalEarnings,
            referredAddresses: stats.referredAddresses,
            bcxBoughtByEach: stats.bcxBoughtByEach,
          });
        }
      })
      .finally(() => setIsLoading(false));
  }, [address]);

  const copyToClipboard = () => {
    if (!referralLink || referralLink === "Connect your wallet") return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 text-white h-full">
      {/* glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold tracking-tight">Referrals</h2>
          {!!address && (
            <span className="inline-flex items-center gap-2 text-xs text-white/70">
              <FaUserPlus className="text-yellow-300" />
              Invite friends, earn BCX
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mb-6 uppercase tracking-wider">
          All of your referrals appear here
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent px-5 py-4">
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-yellow-300/10 blur-2xl group-hover:bg-yellow-300/20 transition-colors" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-yellow-400/20 text-yellow-300">
                  <FaUsers />
                </div>
                <div className="flex flex-col">
                <div className="text-sm text-white/70">Your Referrals</div>
                <div className="text-xl font-bold text-white/90">
                {isLoading ? (
                  <span className="inline-block h-5 w-20 animate-pulse rounded bg-white/10" />
                ) : (
                  referralStats.referredCount
                )}
              </div>
                </div>
              </div>
              
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent px-5 py-4">
            <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-emerald-400/10 blur-2xl group-hover:bg-emerald-400/20 transition-colors" />
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-400/20 text-emerald-300">
                  <FaTrophy />
                </div>
                <div className="flex flex-col">
                <div className="text-sm text-white/70">Referral Earnings</div>
                <div className="text-xl font-bold text-white/90">
                {isLoading ? (
                  <span className="inline-block h-5 w-24 animate-pulse rounded bg-white/10" />
                ) : (
                  <>
                    {referralStats.totalEarnings} <span className="text-sm font-medium text-white/60">BCX</span>
                  </>
                )}
              </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="relative overflow-hidden rounded-xl border border-yellow-400/30 bg-gradient-to-r from-yellow-400/15 via-yellow-200/10 to-transparent p-4 mb-5">
          <div className="mb-3 flex items-center gap-2 text-yellow-300">
            <FaLink />
            <span className="text-sm font-medium">Your unique referral link</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1">
              <input
                readOnly
                value={referralLink}
                className="w-full truncate rounded-lg border border-yellow-400/20 bg-black/40 px-3 py-2 text-sm text-yellow-200 placeholder:text-yellow-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
              />
              
            </div>

            {address && (
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400/90 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
              >
                <FaRegCopy /> {copied ? "Copied" : "Copy Link"}
              </button>
            )}
          </div>

          {address && (
            <div className="mt-3 text-xs text-yellow-200/80">
              Share your link and earn a commission when your referrals buy BCX.
            </div>
          )}
        </div>

        {/* Referral ID */}
        {address && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300">
            <span className="text-white/60">Your Referral ID:</span>
            <code className="rounded bg-white/10 px-2 py-1 font-mono text-yellow-300">
              {shortenAddress(referralId)}
            </code>
          </div>
        )}

        {/* Referral List */}
        <div className="mt-2">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white/90">Referred Users</h3>
            {!isLoading && referralStats.referredAddresses.length > 0 && (
              <span className="text-xs text-white/60">
                {referralStats.referredAddresses.length} total
              </span>
            )}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between border border-white/5 bg-white/5 rounded-md py-2 px-3">
                  <span className="h-4 w-32 animate-pulse rounded bg-white/10" />
                  <span className="h-4 w-16 animate-pulse rounded bg-white/10" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && referralStats.referredAddresses.length === 0 && (
            <div className="grid place-items-center rounded-xl border border-white/10 bg-white/5 py-10 text-center">
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white/70">
                <FaUsers />
              </div>
              <div className="text-white/80 font-medium">No referrals yet</div>
              <div className="mt-1 text-xs text-white/60 max-w-xs">
                Share your link above to start earning rewards when your friends buy BCX.
              </div>
            </div>
          )}

          {/* List */}
          {!isLoading && referralStats.referredAddresses.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1fr_auto] bg-white/5 px-3 py-2 text-[11px] uppercase tracking-wider text-white/60">
                <div>User</div>
                <div className="text-right">BCX Bought</div>
              </div>
              <div className="max-h-48 overflow-y-auto divide-y divide-white/10">
                {referralStats.referredAddresses.map((user, idx) => (
                  <div
                    key={user}
                    className="flex items-center justify-between bg-black/20 px-3 py-2 hover:bg-white/5"
                  >
                    <span className="truncate text-xs text-white/80">{shortenAddress(user)}</span>
                    <span className="font-mono text-xs text-yellow-300">
                      {referralStats.bcxBoughtByEach[idx]} BCX
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralsPanel;
