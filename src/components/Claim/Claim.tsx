import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";
import { isAddress, formatUnits } from "viem";

import config from "../../config";
import useWeb3Functions from "../../hooks/useWeb3Functions";

// Types mirrored from hook
type ClaimRow = {
  user: `0x${string}`;
  to: `0x${string}`;
  amount: bigint;
  timestamp: bigint;
};

type ClaimInfo = {
  totalBought: bigint;
  totalClaimed: bigint;
  remaining: bigint;
  claims: ClaimRow[];
  purchases: any[];
};

// Prefer decimals from config; fallback to 18
const DECIMALS =
  (config as any)?.saleToken?.[config?.chains?.[0]?.id ?? 0]?.decimals ?? 18;

const PRESALE_ADDRESS =
  ((config as any)?.presaleAddress as `0x${string}` | undefined) ??
  (process.env.NEXT_PUBLIC_PRESALE_ADDRESS as `0x${string}` | undefined);

function formatBCX(x?: bigint) {
  if (x === undefined) return "0";
  try {
    const n = Number(formatUnits(x, DECIMALS));
    return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
  } catch {
    return "0";
  }
}

function formatDate(ts?: bigint) {
  if (!ts) return "-";
  const d = new Date(Number(ts) * 1000);
  return d.toLocaleString();
}

const Claim: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { fetchClaimInfo, claimTokens, fetchIsUnlockingStarted } =
    useWeb3Functions();

  const [toAddress, setToAddress] = useState<`0x${string}` | "">("" as any);
  const [copied, setCopied] = useState(false);

  const [info, setInfo] = useState<ClaimInfo | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [txSuccess, setTxSuccess] = useState<boolean | null>(null);
  const [isUnlocking, setIsUnlocking] = useState<boolean | null>(null);

  useEffect(() => {
    if (address && !toAddress) setToAddress(address);
  }, [address]); // eslint-disable-line

  useEffect(() => {
    (async () => {
      if (!address) {
        setInfo(null);
        return;
      }
      const data = await fetchClaimInfo();
      setInfo(data);
    })();
  }, [address, fetchClaimInfo]);

  useEffect(() => {
    (async () => {
      const flag = await fetchIsUnlockingStarted();
      setIsUnlocking(flag);
    })();
  }, [fetchIsUnlockingStarted]);

  const totalBought = info?.totalBought ?? 0n;
  const totalClaimed = info?.totalClaimed ?? 0n;
  const remaining = info?.remaining ?? 0n;
  const claims = info?.claims ?? [];

  const canClaim =
    isConnected &&
    !!address &&
    remaining > 0n &&
    (isUnlocking === null || isUnlocking === true) &&
    typeof toAddress === "string" &&
    toAddress.length > 0 &&
    isAddress(toAddress);

  async function onClaim() {
    if (!canClaim) return;

    setIsClaiming(true);
    setTxSuccess(null);
    setTxHash(null);

    const { success, hash } = await claimTokens(toAddress as `0x${string}`);
    setIsClaiming(false);
    setTxSuccess(success ?? false);
    if (hash) setTxHash(hash);

    if (success) {
      const data = await fetchClaimInfo();
      setInfo(data);
    }
  }

  async function copy(addr?: string) {
    if (!addr) return;
    await navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* Background (no image): layered gradients + subtle blur tint */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#070a12]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(239,184,28,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_120%,rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Content container */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0A0E1A]/70 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 p-5 sm:p-6 lg:p-7">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Claim BCX</h2>
            <div className="text-xs text-gray-400">
              {PRESALE_ADDRESS ? (
                <>
                  Contract:{" "}
                  <span className="font-mono">
                    {PRESALE_ADDRESS.slice(0, 6)}…{PRESALE_ADDRESS.slice(-4)}
                  </span>
                </>
              ) : (
                <span className="text-red-400">Presale address not set</span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl bg-[#101826]/70 border border-[#1f2b3c] p-5">
              <div className="text-sm text-gray-400">Total Bought</div>
              <div className="text-2xl font-bold mt-1 text-white">
                {formatBCX(totalBought)} BCX
              </div>
            </div>
            <div className="rounded-xl bg-[#101826]/70 border border-[#1f2b3c] p-5">
              <div className="text-sm text-gray-400">Claimed</div>
              <div className="text-2xl font-bold mt-1 text-white">
                {formatBCX(totalClaimed)} BCX
              </div>
            </div>
            <div className="rounded-xl bg-[#101826]/70 border border-[#1f2b3c] p-5">
              <div className="text-sm text-gray-400">Remaining</div>
              <div className="text-2xl font-bold mt-1 text-white">
                {formatBCX(remaining)} BCX
              </div>
            </div>
          </div>

          {/* Destination wallet */}
          <div className="rounded-xl bg-[#101826]/70 border border-[#1f2b3c] p-6 mb-6">
            <label className="block text-sm text-gray-300 mb-2">
              Destination Wallet (will receive BCX)
            </label>
            <div className="flex gap-2">
              <input
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value as any)}
                placeholder="0x..."
                className="w-full rounded-lg bg-[#0d1522]/80 border border-[#1f2b3c] px-3 py-2 text-sm outline-none focus:border-yellow-400 text-white placeholder:text-white/40"
              />
              <button
                type="button"
                onClick={() => copy(toAddress)}
                className="px-3 rounded-lg bg-[#1b2533] border border-[#2a3a50] hover:bg-[#2a3a50]"
                title={copied ? "Copied!" : "Copy address"}
              >
                <ClipboardIcon className="h-5 w-5 text-white" />
              </button>
              {copied && (
                <span className="self-center text-xs text-green-400">Copied</span>
              )}
            </div>
            {!toAddress || !isAddress(toAddress) ? (
              <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                <ExclamationCircleIcon className="h-4 w-4" />
                Enter a valid EVM address.
              </div>
            ) : null}
            {!isConnected ? (
              <div className="mt-2 text-xs text-yellow-400">
                Connect your wallet to claim.
              </div>
            ) : null}
            {isUnlocking === false && (
              <div className="mt-2 text-xs text-yellow-400">
                Claiming hasn’t started yet.
              </div>
            )}
          </div>

          {/* Claim action */}
          <div className="rounded-xl bg-[#101826]/70 border border-[#1f2b3c] p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-gray-300 text-sm">You can claim</div>
                <div className="text-3xl font-bold text-white">
                  {formatBCX(remaining)} BCX
                </div>
              </div>
              <button
                onClick={onClaim}
                disabled={!canClaim || isClaiming}
                className={`px-6 py-3 rounded-xl font-semibold transition shadow-lg
                  ${
                    canClaim
                      ? "bg-yellow-400 text-black hover:brightness-95"
                      : "bg-[#1b2533] text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {isClaiming ? "Claiming…" : "Claim Now"}
              </button>
            </div>

            {/* Tx status */}
            {txHash ? (
              <div className="mt-4 text-sm">
                <div className="text-gray-400">Tx Hash:</div>
                <div className="font-mono break-all text-white">{txHash}</div>
                {txSuccess ? (
                  <div className="mt-2 text-green-400 flex items-center gap-1">
                    <CheckCircleIcon className="h-5 w-5" />
                    Claimed successfully.
                  </div>
                ) : txSuccess === false ? (
                  <div className="mt-2 text-red-400 flex items-center gap-1">
                    <ExclamationCircleIcon className="h-5 w-5" />
                    Transaction failed.
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Claim history */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-white">
              Your Claim History
            </h3>
            {claims.length === 0 ? (
              <div className="text-sm text-gray-400">No claims yet.</div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#1f2b3c]">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#0d1522] text-gray-300">
                    <tr>
                      <th className="text-left px-4 py-3">Time</th>
                      <th className="text-left px-4 py-3">To</th>
                      <th className="text-right px-4 py-3">Amount (BCX)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims
                      .slice()
                      .reverse()
                      .map((c, idx) => (
                        <tr key={idx} className="border-t border-[#1f2b3c]">
                          <td className="px-4 py-3 text-white">
                            {formatDate(c.timestamp)}
                          </td>
                          <td className="px-4 py-3 font-mono text-white">
                            {c.to.slice(0, 6)}…{c.to.slice(-4)}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-white">
                            {formatBCX(c.amount)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer tip */}
          <div className="mt-6 text-xs text-gray-400">
            Tip: Remaining = Total Bought − Claimed. Enter a destination wallet
            (can be the same as your connected wallet) and press “Claim Now”.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claim;
