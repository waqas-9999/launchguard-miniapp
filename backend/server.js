import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/launchguard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))


app.use(cors({
  origin: [
   "http://localhost:5173",
    "https://kora-brotherless-unofficiously.ngrok-free.dev",
  ],
  credentials: true,
}));

// --- Task Schema ---
const TaskSchema = new mongoose.Schema({
  name: String,
  reward: Number,
  completed: { type: Boolean, default: false }
})

// --- Wallet Schema ---
const WalletSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  connectedAt: { type: Date, default: Date.now },
  tasks: { type: [TaskSchema], default: [] },
  totalReward: { type: Number, default: 0 },
  totalHoldings: { type: Number, default: 0 }, // 🧩 add this line
  referredBy: { type: String, default: null },
  friendsReferred: { type: Number, default: 0 },
  referrals: { type: [String], default: [] },
  telegramConnected: { type: Boolean, default: false },

})


const Wallet = mongoose.model('Wallet', WalletSchema)

async function updateReferralRewards(walletAddress) {
  const wallet = await Wallet.findOne({ walletAddress });
  if (!wallet) return null;

  let updated = false;

  const markTaskCompleted = (name) => {
    const task = wallet.tasks.find((t) => t.name === name);
    if (task && !task.completed) {
      task.completed = true;
      wallet.totalReward += task.reward;
      updated = true;
    }
  };

  // ✅ When user has referred enough friends
  if (wallet.friendsReferred >= 2) markTaskCompleted("On board 2 friends");
  if (wallet.friendsReferred >= 5) markTaskCompleted("On board 5 friends");

  if (updated) await wallet.save();
  return wallet;
}




app.post("/api/wallet", async (req, res) => {
  try {
    const { walletAddress, referrer } = req.body;
    if (!walletAddress)
      return res.status(400).json({ error: "Wallet address required" });

    const defaultTasks = [
      { name: "Join Telegram", reward: 0.01 },
      { name: "On board 2 friends", reward: 0.02 },
      { name: "On board 5 friends", reward: 0.05 },
    ];

  

let wallet;
if (walletAddress) {
  wallet = await Wallet.findOne({ walletAddress });
} else {
  wallet = await Wallet.findOne({ walletAddress: `tg_${telegramId}` });
}

if (!wallet) {
  wallet = new Wallet({
    walletAddress: walletAddress || `tg_${telegramId}`,
    tasks: [
      { name: "Join Telegram", reward: 0.01 },
      { name: "On board 2 friends", reward: 0.02 },
      { name: "On board 5 friends", reward: 0.05 },
    ],
  });
}


    // ✅ If a referrer exists, update their friendsReferred count
    if (referrer) {
      const referrerWallet = await Wallet.findOne({ walletAddress: referrer });
      if (referrerWallet) {
        referrerWallet.friendsReferred += 1;
        referrerWallet.referrals.push(walletAddress);
        await referrerWallet.save();

        // ✅ Check if referral tasks (2 or 5 friends) should now be rewarded
        await updateReferralRewards(referrerWallet.walletAddress);
      }
    }

    res.json({ success: true, wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});




// --- Mark a Task Completed ---
app.post("/api/complete-task", async (req, res) => {
  const { walletAddress, taskName } = req.body;

  try {
    const wallet = await Wallet.findOne({ walletAddress });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    // Find the task
    const task = wallet.tasks.find((t) => t.name === taskName);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Prevent double rewards
    if (task.completed)
      return res.status(400).json({ error: "Task already completed" });

    let canComplete = false;

    // ✅ Add custom logic for each task
    switch (taskName) {
      case "Join Telegram":
        // Suppose you have `wallet.telegramConnected = true` after OAuth login
        if (wallet.telegramConnected) canComplete = true;
        break;

      case "On board 2 friends":
        if (wallet.friendsReferred >= 2) canComplete = true;
        break;

      case "On board 5 friends":
        if (wallet.friendsReferred >= 5) canComplete = true;
        break;

      default:
        canComplete = true; // fallback for simple one-click tasks
        break;
    }

    if (!canComplete)
      return res.status(400).json({ error: "Task requirements not met" });

    // ✅ Update wallet rewards
    task.completed = true;
    wallet.totalReward += task.reward;
    await wallet.save();

    return res.json({
      message: "Task completed successfully",
      earnedReward: task.reward,
      wallet,
    });
  } catch (err) {
    console.error("❌ Error completing task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// --- Get Leaderboard ---
app.get('/api/leaderboard/rewards', async (req, res) => {
  try {
    const wallets = await Wallet.find().sort({ totalReward: -1 });
    res.json({ success: true, wallets });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- 💎 Holders Leaderboard ---
app.get('/api/leaderboard/holders', async (req, res) => {
  try {
    const wallets = await Wallet.find().sort({ totalHoldings: -1 });
    res.json({ success: true, wallets });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Get Referral Stats for a User ---
app.get('/api/referral-stats/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params
    const wallet = await Wallet.findOne({ walletAddress })
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' })

    res.json({
      success: true,
      totalReward: wallet.totalReward,
      friendsReferred: wallet.friendsReferred,
      referrals: wallet.referrals
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})


import crypto from 'crypto'

const BOT_TOKEN = '8316272259:AAFQK5O1dWQqNxfSGWYBJzptg-pp4--pcjk' // 🔐 Replace this with your actual bot token



app.post("/api/telegram-login", async (req, res) => {
  try {
    let data = req.body;
    if (data && typeof data.initData === "string") {
      const params = new URLSearchParams(data.initData);
      const parsed = {};
      for (const [k, v] of params) {
        try {
          parsed[k] = JSON.parse(v);
        } catch {
          parsed[k] = v;
        }
      }
      data = parsed;
    }

    const { hash, ...userData } = data || {};
    if (!hash) return res.status(400).json({ error: "Missing hash" });

    const secretKey = crypto.createHash("sha256").update(BOT_TOKEN).digest();
    const checkString = Object.keys(userData)
      .sort()
      .map((key) => `${key}=${userData[key]}`)
      .join("\n");

    const hmac = crypto
      .createHmac("sha256", secretKey)
      .update(checkString)
      .digest("hex");

    if (hmac !== hash) {
      return res.status(403).json({ error: "Invalid Telegram login data" });
    }

    const telegramId = userData.id;

    let wallet = await Wallet.findOne({ walletAddress: `tg_${telegramId}` });
    if (!wallet) {
      wallet = new Wallet({
        walletAddress: `tg_${telegramId}`,
        tasks: [
          { name: "Join Telegram", reward: 0.01 },
          { name: "On board 2 friends", reward: 0.02 },
          { name: "On board 5 friends", reward: 0.05 },
        ],
      });
    }

    // ✅ Reward “Join Telegram” task only once on first login
   // ✅ Reward “Join Telegram” task only once on first login
wallet.telegramConnected = true;

const task = wallet.tasks.find((t) => t.name === "Join Telegram");
if (!task.completed) {
  task.completed = true;
  wallet.totalReward += task.reward;
}
await wallet.save();


    res.json({
      success: true,
      message: "Telegram login successful",
      wallet,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});




app.listen(5000, () => console.log('🚀 Server running on port 5000'))
