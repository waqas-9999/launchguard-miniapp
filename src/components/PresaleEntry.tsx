import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import buycexlogo from "../assets/img/BUYCEX-INFINITY.png";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const PresaleEntry = () => {
  const navigate = useNavigate();
  const { open: openWeb3Modal } = useWeb3Modal();
  const { isConnected, address } = useAccount();

  const [telegramUser, setTelegramUser] = useState<any>(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    let timeoutId: number | null = null;
    const controller = new AbortController();

    const handleTelegramReady = () => {
      const tg = (window as any).Telegram?.WebApp;
      const user = tg?.initDataUnsafe?.user;
      const initData = tg?.initData; // signed payload
      console.log("📦 Sending initData to backend:", initData);

      if (user) {
        setTelegramUser(user);
        setIsTelegram(true); // mark as Telegram
        localStorage.setItem("telegramUser", JSON.stringify(user));

        // redirect after 2 seconds
        timeoutId = window.setTimeout(() => {
          navigate("/boost", { replace: true });
        }, 2000);

        // send to backend in background
        const backendUrl = `${window.location.protocol}//110.38.69.202:5000/api/telegram-login`;
        fetch(backendUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ initData }), // only send the signed payload
  signal: controller.signal,
})

          .then((res) => res.json())
          .then((data) => {
            if (!data.success) console.error("Telegram login failed:", data);
          })
          .catch((err) => {
            if ((err as any).name !== "AbortError") console.error(err);
          });
      }
    };

    const tgReady = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgReady) handleTelegramReady();
    else (window as any).Telegram?.WebApp?.onEvent?.("ready", handleTelegramReady);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      controller.abort();
      (window as any).Telegram?.WebApp?.offEvent?.("ready", handleTelegramReady);
    };
  }, [navigate]);

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

        {/* Show wallet button only if not Telegram */}
        {!isTelegram && !isConnected && (
          <button
            onClick={() => openWeb3Modal()}
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-[#1a1b2f] text-white rounded font-semibold hover:opacity-90 transition"
          >
            Connect Wallet
          </button>
        )}

        {/* Optional: show connected address */}
        {!isTelegram && isConnected && (
          <p className="text-green-400 mt-2">
            Connected as {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        )}
      </div>
    </div>
  );
};

export default PresaleEntry;
