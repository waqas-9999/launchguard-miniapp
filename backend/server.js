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
  referrals: { type: [String], default: [] }
})


const Wallet = mongoose.model('Wallet', WalletSchema)

// --- Add / Update Wallet ---
app.post('/api/wallet', async (req, res) => {
  try {
    const { walletAddress, referrer } = req.body
    if (!walletAddress)
      return res.status(400).json({ error: 'Wallet address required' })

    const defaultTasks = [
      { name: 'Join Telegram', reward: 0.01 },
      { name: 'On board 2 friends', reward: 0.02 },
      { name: 'On board 5 friends', reward: 0.05 }
    ]

    let wallet = await Wallet.findOne({ walletAddress })

    if (!wallet) {
      wallet = new Wallet({
        walletAddress,
        tasks: defaultTasks,
        totalReward: 0,
        referredBy: referrer || null
      })
      await wallet.save()

      // If referrer exists, update their data
      if (referrer) {
        const referrerWallet = await Wallet.findOne({ walletAddress: referrer })
        if (referrerWallet) {
          referrerWallet.friendsReferred += 1
          referrerWallet.referrals.push(walletAddress)
          referrerWallet.totalReward += 0.01 // reward for referring friend
          await referrerWallet.save()
        }
      }
    }

    res.json({ success: true, wallet })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// --- Mark a Task Completed ---
app.post('/api/complete-task', async (req, res) => {
  try {
    const { walletAddress, taskName } = req.body
    if (!walletAddress || !taskName)
      return res.status(400).json({ error: 'Wallet address and task name required' })

    const wallet = await Wallet.findOne({ walletAddress })
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' })

    const task = wallet.tasks.find(t => t.name === taskName)
    if (!task) return res.status(404).json({ error: 'Task not found' })
    if (task.completed) return res.status(400).json({ error: 'Task already completed' })

    task.completed = true
    wallet.totalReward += task.reward
    await wallet.save()

    res.json({ success: true, wallet })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

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

app.listen(5000, () => console.log('🚀 Server running on port 5000'))
