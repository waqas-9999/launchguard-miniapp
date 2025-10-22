import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import buycexlogo from "../assets/img/BUYCEX-INFINITY.png";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import axios from "axios";

const BACKEND_URL = "https://isochronous-packable-sherly.ngrok-free.dev"; // ✅ new backend

const PresaleEntry = () => {
  const navigate = useNavigate();
  const { open: openWeb3Modal } = useWeb3Modal();
  const { isConnected, address } = useAccount();

  const [telegramUser, setTelegramUser] = useState<any>(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [isTelegramMobile, setIsTelegramMobile] = useState(false);
  const [isAutoLogged, setIsAutoLogged] = useState(false);

  // 🔹 Redirect safely to Boost
  const redirectToBoost = () => {
    if (isTelegram && isTelegramMobile) {
      const tg = window.Telegram?.WebApp;
      tg?.openLink?.(`${window.location.origin}/boost`);
    } else {
      navigate("/boost", { replace: true });
    }
  };

  // 🧩 Detect Telegram WebApp
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const mobile = tg && /Mobile/i.test(navigator.userAgent);
    setIsTelegram(!!tg);
    setIsTelegramMobile(!!mobile);
  }, []);

  // 🚀 Initialize Telegram login
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const controller = new AbortController();

    const initTelegram = () => {
      const tg = window.Telegram?.WebApp;
      if (!tg) {
        setTimeout(initTelegram, 500);
        return;
      }

      tg.ready?.();
      tg.expand?.();

      const user = tg.initDataUnsafe?.user;
      const initData = tg.initData;

      if (user && user.first_name) {
        setTelegramUser(user);
        setIsTelegram(true);
        localStorage.setItem("telegramUser", JSON.stringify(user));

        // ✅ Send Telegram login info to backend
        fetch(`${BACKEND_URL}/api/telegram-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData }),
          signal: controller.signal,
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) console.error("Telegram login failed:", data);
            else autoLoginSync(data.user.telegramId);
          })
          .catch((err) => {
            if (err.name !== "AbortError") console.error(err);
          });

        // Redirect after login
        timeoutId = setTimeout(() => redirectToBoost(), 1000);
      } else {
        const cachedUser = localStorage.getItem("telegramUser");
        if (cachedUser) {
          const parsedUser = JSON.parse(cachedUser);
          setTelegramUser(parsedUser);
          setIsTelegram(true);
          autoLoginSync(parsedUser.id);
          timeoutId = setTimeout(() => redirectToBoost(), 1000);
        }
      }
    };

    window.addEventListener("TelegramWebAppReady", initTelegram);
    setTimeout(initTelegram, 1000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      controller.abort();
      window.removeEventListener("TelegramWebAppReady", initTelegram);
    };
  }, []);

  // 🔗 Link wallet ↔ Telegram
  useEffect(() => {
    if (!isConnected || !address) return;
    const telegramUser = JSON.parse(localStorage.getItem("telegramUser") || "null");
    if (!telegramUser) return;

    axios
      .post(`${BACKEND_URL}/api/link-telegram`, {
        walletAddress: address,
        telegramData: telegramUser,
      })
      .then((res) => console.log("✅ Linked wallet ↔ Telegram:", res.data))
      .catch((err) => console.error("❌ Link failed:", err));
  }, [isConnected, address]);

  // 🌟 Auto-login sync
  const autoLoginSync = async (telegramId: string) => {
    if (isAutoLogged) return;
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auto-login`, {
        telegramId,
      });
      if (res.data?.walletAddress) {
        console.log("🔁 Auto-login synced:", res.data.walletAddress);
        setIsAutoLogged(true);
      }
    } catch (err) {
      console.error("Auto-login failed:", err);
    }
  };

  // 🧭 Handle wallet connect
  const handleConnectWallet = async () => {
    if (isTelegramMobile) {
      const tg = window.Telegram?.WebApp;
      const msg =
        "Wallet connection isn’t supported inside Telegram.\n\nTap ⋮ → ‘Open in Browser’ to connect your wallet.";
      tg?.showAlert ? tg.showAlert(msg) : alert(msg);
      return;
    }

    try {
      await openWeb3Modal();
    } catch (err) {
      console.error("WalletConnect failed:", err);
    }
  };

  // ⏩ Redirect connected users
  useEffect(() => {
    if (isConnected && !isTelegram) {
      localStorage.setItem("hasEntered", "true");
      setTimeout(() => redirectToBoost(), 500);
    }
  }, [isConnected, isTelegram]);

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="w-[90%] max-w-md rounded-lg border border-white/10 bg-black/40 p-8 text-center backdrop-blur-lg shadow-lg">
        <img src={buycexlogo} alt="Buycex Logo" className="mx-auto mb-6 h-14 w-auto" />
        <h1 className="mb-2 text-4xl font-bold text-yellow-400">
          Enter The Buycex Presale
        </h1>

        <p className="mb-6 text-lg text-white/80">
          {isTelegram && telegramUser
            ? `Welcome ${telegramUser.first_name}! Telegram login successful ✅ Redirecting...`
            : "To join the presale, connect your wallet or open via Telegram."}
        </p>

        <hr className="border-t border-white/10 my-4" />

      </div>
    </div>
  );
};

export default PresaleEntry;
