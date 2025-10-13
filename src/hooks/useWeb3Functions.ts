import config from "../config";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import {
  setTokenPrice,
  setTotalTokensforSale,
  setTotalTokensSold,
  setMinBuyLimit,
  setMaxBuyLimit,
} from "../store/presale";
import { useMemo, useState } from "react";
import {  useAccount, usePublicClient, useWalletClient } from "wagmi";
import { setBalance } from "../store/wallet";
import { toast } from "react-toastify";
import { storeReferralTransaction, storeTransaction } from "../utils/apis";
import {
  createPublicClient,
  formatUnits,
  getContract,
  http,
  parseUnits,
  zeroAddress,
  erc20Abi,
  type Address,
} from "viem";
import { presaleAbi } from "../contracts/presaleABI";

const publicClient = createPublicClient({
  chain: config.chains[0],
  batch: { multicall: true },
  transport: http(),
});
type PurchaseRecord = {
  amount: bigint;              // bcxReceived (18)
  paidAmount: bigint;          // amountPaid (pay token decimals)
  token: Address;              // payToken (zeroAddress = BNB)
  timestamp: number;           // seconds
  isReferralReward: boolean;   // NEW
  txHash?: string;
}

type LeaderboardEntry = {
  address: string;
  total: bigint;
  level: number; // Set to 0 or calculate later if needed
};
type Order = {
  id: number;
  price: string;
  amount: string;
  time: number;
  currency: string;
};
type Token = {
  symbol: string;
  address?: Address; // undefined means native coin
  decimals: number;
  image: string;
};
type ClaimRow = {
  user: Address;
  to: Address;
  amount: bigint;
  timestamp: bigint;
};

type ClaimInfo = {
  totalBought: bigint;
  totalClaimed: bigint;
  remaining: bigint;
  claims: ClaimRow[];
  purchases: PurchaseRecord[];
};

const useWeb3Functions = () => {
  const chainId = useSelector((state: RootState) => state.presale.chainId);
  const publicFromHook = usePublicClient();

  const readClient = publicFromHook ?? publicClient;

  const [loading, setLoading] = useState(false);
  const tokens = useSelector((state: RootState) => state.presale.tokens);
  const dispatch = useDispatch();
  const provider = usePublicClient();
  const { data: signer } = useWalletClient();
  const { address } = useAccount();

 const presaleContract = useMemo(
    () =>
      getContract({
        address: config.presaleContract[chainId] as Address,
        abi: presaleAbi,
        client: {
          public: publicClient,
          wallet: signer ?? undefined,
        },
      }),
    [signer, chainId]
  );

  const fetchIntialData = async () => {
    setLoading(true);

    const [totalTokensSold, totalTokensforSale] = await Promise.all([
      presaleContract.read.totalTokensSold(),
      presaleContract.read.totalTokensforSale(),
      fetchTokenPrices(),
    ]);

    dispatch(setTotalTokensSold(+format(totalTokensSold)));
    dispatch(setTotalTokensforSale(+format(totalTokensforSale)));

    setLoading(false);
  };

  const fetchMinMaxBuyLimits = async () => {
    const [minBuyLimit, maxBuyLimit] = await Promise.all([
      presaleContract.read.minBuyLimit(),
      presaleContract.read.maxBuyLimit(),
    ]);

    dispatch(setMinBuyLimit(+format(minBuyLimit)));
    dispatch(setMaxBuyLimit(+format(maxBuyLimit)));
  };

  const fetchTotalTokensSold = async () => {
    const totalTokensSold = await presaleContract.read.totalTokensSold();
    dispatch(setTotalTokensSold(+format(totalTokensSold)));

    return totalTokensSold;
  };

  const fetchLockedBalance = async () => {
    if (!address) return;

    const { symbol, decimals } = config.saleToken[chainId];
const buyerAmount = await presaleContract.read.userBCXAllocation([address]);
const balance = +formatUnits(buyerAmount, decimals);


    dispatch(setBalance({ symbol: symbol, balance }));

    return balance;
  };

  const fetchTokenBalances = async () => {
    if (!address) return;

    for await (const token of tokens[chainId]) {
      let balance: bigint;
      if (token.address) {
        balance = await publicClient.readContract({
          address: token.address,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        });
      } else {
        balance = await readClient.getBalance({ address });
      }

      dispatch(
        setBalance({
          symbol: token.symbol,
          balance: +formatUnits(balance, token.decimals),
        })
      );
    }
  };

  const fetchTokenPrices = async () => {
    for await (const token of tokens[chainId]) {
      const rate = token.address
        ? await presaleContract.read.tokenPrices([token.address])
        : await presaleContract.read.rate();

      dispatch(
        setTokenPrice({
          symbol: token.symbol,
          price: +formatUnits(rate, token.decimals),
        })
      );
    }
  };

  const checkAllowance = async (
    token: Token,
    owner: Address,
    spender: Address
  ) => {
    if (!token.address || !signer) return;

    const allowance = await publicClient.readContract({
      address: token.address,
      abi: erc20Abi,
      functionName: "allowance",
      args: [owner, spender],
    });

    if (!Number(allowance)) {
      const hash = await signer.writeContract({
        address: token.address,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender, parseUnits("9999999999999999999999999999", 18)],
      });

      await publicClient.waitForTransactionReceipt({ hash });

      toast.success("Spend approved");
    }
  };

const buyToken = async (value: string | number, token: Token) => {
  let success = false;
  if (!address || !signer) return { success };

  setLoading(true);

  try {
    const amount = parseUnits(`${value}`, token.decimals);

    const referrer =
      localStorage.getItem("referrer")?.toLowerCase() === address.toLowerCase()
        ? zeroAddress
        : (localStorage.getItem("referrer") as `0x${string}`) || zeroAddress;

   let hash: `0x${string}`;

if (token.address) {
  await checkAllowance(token, address, config.presaleContract[chainId] as Address);

  const { request } = await presaleContract.simulate.buyToken(
    [token.address, amount, referrer],
    { account: address } // non-payable
  );
  hash = await signer!.writeContract(request);
} else {
  const { request } = await presaleContract.simulate.buyToken(
    [zeroAddress, amount, referrer],
    { account: address, value: amount } // payable
  );
  hash = await signer!.writeContract(request);
}


    await publicClient.waitForTransactionReceipt({ hash });

    const purchased_amount = await presaleContract.read.getTokenAmount([
      token.address || zeroAddress,
      amount,
    ]);

    // Store purchase info
    storeTransaction({
      wallet_address: address,
      purchased_amount: +format(purchased_amount),
      paid_amount: value,
      transaction_hash: hash,
      paid_with: token.symbol,
    });

    // Fetch referred addresses AFTER purchase
    const referralStats = await presaleContract.read.getReferralStats([referrer]);
    const referredAddresses: string[] = [...referralStats[2]]; // referredAddresses
    const bcxBought: string[] = referralStats[3].map((amt: bigint) => format(amt)); // BCX amounts

    // Log or store referral info
    storeReferralTransaction({
      purchased_amount: +format(purchased_amount),
      paid: value,
      transaction_hash: hash,
      payable_token: token.symbol,
      referrer,
      referred_addresses: referredAddresses,
      bcx_by_each: bcxBought,
    });

    // Refresh states
    fetchTokenBalances();
    fetchLockedBalance();
    fetchTotalTokensSold();

    toast.success(
      `You have successfully purchased $${config.saleToken[chainId].symbol} Tokens.`
    );

    success = true;
  } catch (error: any) {
    console.error(error);
    if (
      error?.error?.code === -32603 &&
      error?.error?.message.includes("reverted")
    ) {
      toast.error(error.error.message?.replace("execution reverted:", ""));
    } else toast.error("Signing failed, please try again!");
  }

  setLoading(false);

  return { success };
};



  const addTokenAsset = async (token: Token) => {
    if (!token.address || !signer) return;
    try {
      await signer.watchAsset({
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals ?? 18,
          image: token.image.includes("http")
            ? token.image
            : `${window.location.origin}${token.image}`,
        },
      });
      toast.success("Token imported to metamask successfully");
    } catch (e) {
      toast.error("Token import failed");
    }
  };

  const parse = (value: string | number) =>
    parseUnits(`${value}`, config.saleToken[chainId].decimals);

  const format = (value: bigint) =>
    formatUnits(value, config.saleToken[chainId].decimals);
const fetchUserPurchases = async (): Promise<PurchaseRecord[]> => {
  if (!address) return [];
  try {
    const raw = await presaleContract.read.getUserPurchases([address]);
    return raw.map((tx: any) => ({
      amount: BigInt(tx.bcxReceived ?? 0n),
      paidAmount: BigInt(tx.amountPaid ?? 0n),
      token: (tx.payToken ?? zeroAddress) as Address,
      timestamp: Number(tx.timestamp ?? 0),
      isReferralReward: Boolean(tx.isReferralReward),
      txHash: "",
    }));
  } catch (err) {
    console.error("Failed to fetch user purchases:", err);
    return [];
  }
};

const getLevelFromTotal = (total: bigint): number => {
  const value = Number(total);

  if (value >= 150_000e18) return 8;
  if (value >= 100_000e18) return 7;
  if (value >= 50_000e18) return 6;
  if (value >= 10_000e18) return 5;
  if (value >= 1_000e18) return 4;
  return 1;
};


const fetchLeaderboardFromAllPurchases = async (): Promise<LeaderboardEntry[]> => {
  try {
    const raw = await presaleContract.read.getAllPurchases();

    // Aggregate total purchases per address
    const leaderboardMap: Record<string, bigint> = {};

    raw.forEach((tx: any) => {
      const buyer = tx.buyer;
      const received = BigInt(tx.bcxReceived ?? 0);
      leaderboardMap[buyer] = (leaderboardMap[buyer] || 0n) + received;
    });

    // Convert map to array and sort
    return Object.entries(leaderboardMap)
      .map(([address, total]) => ({
        address,
        total,
        level: getLevelFromTotal(total), // Optional: assign a level
      }))
      .sort((a, b) => Number(b.total - a.total)); // Descending
  } catch (err) {
    console.error("Failed to fetch leaderboard:", err);
    return [];
  }
};

const tokenByAddr = useMemo(() => {
  const m: Record<string, Token> = {};
  for (const t of tokens[chainId]) {
    const k = (t.address ?? zeroAddress).toLowerCase();
    m[k] = t;
  }
  return m;
}, [tokens, chainId]);


const STABLES = new Set(["USDT", "USDC", "BUSD"]);

const fetchLiveOrdersFromPurchases = async (): Promise<Order[]> => {
  try {
    const raw = await presaleContract.read.getAllPurchases();

    return raw
      .filter((tx: any) => !tx.isReferralReward)
      .map((tx: any, index: number) => {
        const key = (tx.payToken ?? zeroAddress).toLowerCase();
        const t =
          tokenByAddr[key] ?? { symbol: "BNB", decimals: 18, image: "", address: undefined };

        const amountPaid = BigInt(tx.amountPaid ?? 0);
        const bcxReceived = BigInt(tx.bcxReceived ?? 0);

        // human-readable paid amount
        const paidHuman = formatUnits(amountPaid, t.decimals);

        // price per 1 BCX in pay token units:
        // (amountPaid * 1e18) / bcxReceived  -> still in token decimals
        const priceInTokenUnits =
          bcxReceived === 0n ? 0n : (amountPaid * 10n ** 18n) / bcxReceived;
        const priceHuman = formatUnits(priceInTokenUnits, t.decimals);

        const priceStr = STABLES.has(t.symbol)
          ? `$${Number(priceHuman).toFixed(2)}`
          : `${priceHuman} ${t.symbol}`;

        const amountStr = STABLES.has(t.symbol)
          ? `$${Number(paidHuman).toFixed(2)}`
          : `${paidHuman} ${t.symbol}`;

        return {
          id: index + 1,
          price: priceStr,
          amount: amountStr,
          time: Number(tx.timestamp ?? 0),
          currency: t.symbol,
        };
      })
      .reverse();
  } catch (err) {
    console.error("Failed to fetch live orders:", err);
    return [];
  }
};


const fetchReferralStats = async () => {
  if (!address) return null;

  try {
    const [referredCount, totalEarnings, referredAddresses, bcxBoughtByEach] =
      await presaleContract.read.getReferralStats([address]);

    return {
      referredCount: Number(referredCount),
      totalEarnings: format(totalEarnings), // formats in BCX decimals
      referredAddresses: [...referredAddresses], // ✅ convert to mutable array
      bcxBoughtByEach: [...bcxBoughtByEach].map((amount: bigint) => format(amount)), // ✅ convert to mutable array then map
    };
  } catch (error) {
    console.error("Failed to fetch referral stats:", error);
    return null;
  }
};

const fetchClaimInfo = async (): Promise<ClaimInfo | null> => {
  if (!address) return null;

  // helper to compute minimal info if tuple fn not present
  const fallback = async (): Promise<ClaimInfo> => {
    const [bought, claimed] = await Promise.all([
      presaleContract.read.userBCXAllocation([address]),
      // claimedBCX mapping is in the updated contract you deployed
      presaleContract.read.claimedBCX([address]),
    ]);
    const remaining = bought > claimed ? bought - claimed : 0n;
    return {
      totalBought: bought,
      totalClaimed: claimed,
      remaining,
      claims: [],                // not available without the tuple view
      purchases: await fetchUserPurchases(), // you already have this util
    };
  };

  try {
    // Try calling the tuple view first
    const tuple = await presaleContract.read.getUserClaimInfo([address]);
    // tuple: (totalBought,totalClaimed,remaining,ClaimRecord[],PurchaseRecord[])
    const totalBought: bigint = tuple[0] ?? 0n;
    const totalClaimed: bigint = tuple[1] ?? 0n;
    const remaining: bigint = tuple[2] ?? 0n;
    const claimsRaw = (tuple[3] ?? []) as any[];
    const purchasesRaw = (tuple[4] ?? []) as any[];

    const claims: ClaimRow[] = claimsRaw.map((c) => ({
      user: c.user as Address,
      to: c.to as Address,
      amount: BigInt(c.amount ?? 0),
      timestamp: BigInt(c.timestamp ?? 0),
    }));

    const purchases: PurchaseRecord[] = purchasesRaw.map((tx: any) => ({
      amount: BigInt(tx.bcxReceived ?? 0n),
      paidAmount: BigInt(tx.amountPaid ?? 0n),
      token: (tx.payToken ?? zeroAddress) as Address,
      timestamp: Number(tx.timestamp ?? 0),
      isReferralReward: Boolean(tx.isReferralReward),
      txHash: "",
    }));

    return { totalBought, totalClaimed, remaining, claims, purchases };
  } catch {
    // If the function isn't in ABI/contract, or call fails, use fallback
    return await fallback();
  }
};

// --- NEW: claim tokens to a provided address ---
const claimTokens = async (
  to: Address
): Promise<{ success: boolean; hash?: `0x${string}` }> => {
  let success = false;
  if (!address || !signer) return { success };

  try {
    if (!to || to === zeroAddress) {
      toast.error("Invalid destination wallet");
      return { success };
    }

    // simulate + send
    const { request } = await presaleContract.simulate.claim([to], { account: address });
    const hash = await signer.writeContract(request);

    await publicClient.waitForTransactionReceipt({ hash });

    // Refresh balances / UI state
    await Promise.all([fetchLockedBalance(), fetchTotalTokensSold()]);

    toast.success("Claim submitted successfully.");
    success = true;
    return { success, hash };
  } catch (error: any) {
    console.error("Claim failed:", error);
    if (error?.error?.code === -32603 && error?.error?.message?.includes("reverted")) {
      toast.error(error.error.message.replace("execution reverted:", "").trim());
    } else {
      toast.error("Claim failed, please try again.");
    }
    return { success: false };
  }
};
const fetchIsUnlockingStarted = async (): Promise<boolean> => {
  try {
    const flag = await presaleContract.read.isUnlockingStarted();
    return Boolean(flag);
  } catch {
    return false;
  }
};
  return {
    loading,
    parse,
    format,
    buyToken,
    addTokenAsset,
    fetchIntialData,
    fetchLockedBalance,
    fetchTokenBalances,
    fetchMinMaxBuyLimits,
    fetchUserPurchases,
    fetchLeaderboardFromAllPurchases,
    fetchLiveOrdersFromPurchases,
    fetchReferralStats,
     fetchClaimInfo,
  claimTokens,
  fetchIsUnlockingStarted,
  };
};

export default useWeb3Functions;