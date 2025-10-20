import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/launchguard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://kora-brotherless-unofficiously.ngrok-free.dev",
    "https://t.me",
  ],
  credentials: true,
}));

// --- Task Schema ---
const TaskSchema = new mongoose.Schema({
  name: String,
  reward: Number,
  completed: { type: Boolean, default: false }
});

// --- Wallet Schema ---
const WalletSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  connectedAt: { type: Date, default: Date.now },
  tasks: { type: [TaskSchema], default: [] },
  totalReward: { type: Number, default: 0 },
  totalHoldings: { type: Number, default: 0 },
  referredBy: { type: String, default: null },
  friendsReferred: { type: Number, default: 0 },
  referrals: { type: [String], default: [] },
  telegramId: { type: String, default: null },
  telegramUsername: { type: String, default: null },
  telegramFirstName: { type: String, default: null },
  telegramPhotoUrl: { type: String, default: null },
});

const Wallet = mongoose.model('Wallet', WalletSchema);

// --- Add / Update Wallet ---
// --- Add / Update Wallet (with referral logic) ---
app.post('/api/wallet', async (req, res) => {
  try {
    const { walletAddress, referrer } = req.body;
    if (!walletAddress)
      return res.status(400).json({ error: 'Wallet address required' });

    const defaultTasks = [
      { name: 'Join Telegram', reward: 0.01, completed: false },
      { name: 'On board 2 friends', reward: 0.02, completed: false },
      { name: 'On board 5 friends', reward: 0.05, completed: false },
    ];

    let wallet = await Wallet.findOne({ walletAddress });

    // If new wallet — create it
    if (!wallet) {
      wallet = new Wallet({
        walletAddress,
        tasks: defaultTasks,
        referredBy: referrer || null,
      });
      await wallet.save();

      // Handle referrer updates
      if (referrer) {
        const referrerWallet = await Wallet.findOne({ walletAddress: referrer });
        if (referrerWallet) {
          // Add referral only if not already counted
          if (!referrerWallet.referrals.includes(walletAddress)) {
            referrerWallet.friendsReferred += 1;
            referrerWallet.referrals.push(walletAddress);

            // Base reward for each invite
            referrerWallet.totalReward += 0.01;

            // --- Task Progression ---
            for (const task of referrerWallet.tasks) {
              if (!task.completed) {
                if (
                  (task.name === "On board 2 friends" && referrerWallet.friendsReferred >= 2) ||
                  (task.name === "On board 5 friends" && referrerWallet.friendsReferred >= 5)
                ) {
                  task.completed = true;
                  referrerWallet.totalReward += task.reward;
                }
              }
            }

            await referrerWallet.save();
          }
        }
      }
    }

    res.json({ success: true, wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// --- Mark a Task Completed ---
app.post('/api/complete-task', async (req, res) => {
  try {
    const { walletAddress, taskName } = req.body;
    if (!walletAddress || !taskName)
      return res.status(400).json({ error: 'Wallet address and task name required' });

    const wallet = await Wallet.findOne({ walletAddress });
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    const task = wallet.tasks.find(t => t.name === taskName);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (task.completed) return res.status(400).json({ error: 'Task already completed' });

    task.completed = true;
    wallet.totalReward += task.reward;
    await wallet.save();

    res.json({ success: true, wallet, earnedReward: task.reward });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
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
    const { walletAddress } = req.params;
    const wallet = await Wallet.findOne({ walletAddress });
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    res.json({
      success: true,
      totalReward: wallet.totalReward,
      friendsReferred: wallet.friendsReferred,
      referrals: wallet.referrals
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Telegram Bot Token
const BOT_TOKEN = '8316272259:AAFQK5O1dWQqNxfSGWYBJzptg-pp4--pcjk'; // 🔐 Replace this with your actual bot token

// --- Telegram Login ---
// --- Telegram Login ---
app.post('/api/telegram-login', async (req, res) => {
  try {
    const { initData } = req.body;
    if (!initData || typeof initData !== 'string') {
      return res.status(400).json({ error: 'Missing initData string' });
    }

    // ✅ Ensure proper decoding
    let decodedData = decodeURIComponent(initData);
    const params = new URLSearchParams(decodedData);

    const data = {};
    for (const [key, value] of params.entries()) {
      if (key === 'user') {
        try {
          data[key] = JSON.parse(value);
        } catch (e) {
          console.error('Failed to parse Telegram user:', e);
          return res.status(400).json({ error: 'Invalid user data' });
        }
      } else {
        data[key] = value;
      }
    }

    const { hash, user } = data;
    if (!hash || !user) {
      console.error('⚠️ Missing hash or user in Telegram data:', data);
      return res.status(400).json({ error: 'Invalid Telegram payload' });
    }

    // ✅ Verify hash
    const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();
    const checkString = Object.keys(data)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]}`)
      .join('\n');

    const hmac = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');
    if (hmac !== hash) {
      console.error('❌ Hash mismatch');
      return res.status(403).json({ error: 'Invalid Telegram login data' });
    }

    // ✅ Extract Telegram user info
    const telegramId = user.id?.toString();
    const username = user.username || '';
    const firstName = user.first_name || '';
    const photoUrl = user.photo_url || '';

    if (!telegramId) {
      return res.status(400).json({ error: 'Invalid Telegram user data' });
    }

    // ✅ Create or update wallet
    let wallet = await Wallet.findOne({ telegramId });

    if (!wallet) {
      wallet = new Wallet({
        walletAddress: `tg_${telegramId}`,
        telegramId,
        telegramUsername: username,
        telegramFirstName: firstName,
        telegramPhotoUrl: photoUrl,
        tasks: [
          { name: 'Join Telegram', reward: 0.01, completed: true },
          { name: 'On board 2 friends', reward: 0.02 },
          { name: 'On board 5 friends', reward: 0.05 },
        ],
        totalReward: 0.01,
      });
    } else {
      wallet.telegramUsername = username;
      wallet.telegramFirstName = firstName;
      wallet.telegramPhotoUrl = photoUrl;
    }

    await wallet.save();

    console.log('✅ Telegram user saved:', wallet.telegramFirstName);

    res.json({
      success: true,
      message: 'Telegram login successful',
      wallet,
      user: { telegramId, username, firstName, photoUrl },
    });
  } catch (err) {
    console.error('❌ Telegram login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



// --- ✅ Link Telegram to existing wallet ---
app.post("/api/link-telegram", async (req, res) => {
  try {
    const { walletAddress, telegramData } = req.body;

    if (!walletAddress || !telegramData?.id) {
      return res.status(400).json({ error: "Missing wallet or Telegram data" });
    }

    const telegramId = telegramData.id.toString();

    // Check if Telegram record exists
    let telegramWallet = await Wallet.findOne({ telegramId });

    if (!telegramWallet) {
      // Create minimal Telegram record if not exists
      telegramWallet = new Wallet({
        walletAddress: `tg_${telegramId}`,
        telegramId,
        telegramUsername: telegramData.username || null,
        telegramFirstName: telegramData.first_name || null,
        telegramPhotoUrl: telegramData.photo_url || null,
        tasks: [
          { name: "Join Telegram", reward: 0.01, completed: true },
          { name: "On board 2 friends", reward: 0.02 },
          { name: "On board 5 friends", reward: 0.05 },
        ],
        totalReward: 0.01,
      });
      await telegramWallet.save();
    }

    // Find or create main wallet
    let wallet = await Wallet.findOne({ walletAddress });
    if (!wallet) {
      wallet = new Wallet({
        walletAddress,
        tasks: [
          { name: "Join Telegram", reward: 0.01 },
          { name: "On board 2 friends", reward: 0.02 },
          { name: "On board 5 friends", reward: 0.05 },
        ],
      });
    }

    // Merge Telegram info
    wallet.telegramId = telegramId;
    wallet.telegramUsername = telegramData.username || null;
    wallet.telegramFirstName = telegramData.first_name || null;
    wallet.telegramPhotoUrl = telegramData.photo_url || null;
    wallet.telegramConnected = true;

    // Mark “Join Telegram” completed
    const joinTask = wallet.tasks.find(t => t.name === "Join Telegram");
    if (joinTask && !joinTask.completed) {
      joinTask.completed = true;
      wallet.totalReward += joinTask.reward;
    }

    await wallet.save();

    // Cleanup temporary tg_ record
    if (telegramWallet.walletAddress.startsWith("tg_")) {
      await Wallet.deleteOne({ _id: telegramWallet._id });
    }

    res.json({ success: true, wallet });
  } catch (err) {
    console.error("❌ Error linking Telegram:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// --- Get currently connected wallet (for frontend auto-login)
app.get('/api/current-wallet', async (req, res) => {
  try {
    // Example: fetch latest Telegram or wallet-connected user
    const wallet = await Wallet.findOne().sort({ connectedAt: -1 });
    if (!wallet) return res.json({ success: false, message: 'No wallet connected yet' });
    res.json({ success: true, wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
app.post('/api/referral-join', async (req, res) => {
  try {
    const { referrer, telegramId, telegramFirstName, telegramUsername, telegramPhotoUrl } = req.body;

    if (!referrer || !telegramId) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // Check if this user already exists
    const existing = await Wallet.findOne({ telegramId });
    if (existing) {
      return res.json({ success: false, error: "Already joined" });
    }

    // Create referred user
    const newUser = await Wallet.create({
      walletAddress: `ref_${telegramId}`,
      telegramId,
      telegramFirstName,
      telegramUsername,
      telegramPhotoUrl,
      referredBy: referrer,
      connectedAt: new Date(),
      tasks: [
        { name: "On board 2 friends", reward: 0.02, completed: false },
        { name: "On board 5 friends", reward: 0.05, completed: false },
        { name: "On board 10 friends", reward: 0.1, completed: false }
      ]
    });

    // Update referrer’s stats
    const referrerUser = await Wallet.findOne({ walletAddress: referrer });
    if (referrerUser) {
      referrerUser.friendsReferred += 1;
      referrerUser.totalReward += 0.01; // reward for referral
      await referrerUser.save();
    }

    res.json({ success: true, wallet: newUser });
  } catch (err) {
    console.error("Referral join error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});


app.listen(5000, () => console.log('🚀 Server running on port 5000'));