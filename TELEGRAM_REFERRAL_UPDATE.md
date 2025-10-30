# 🎯 Telegram ID Referral System Implementation

## Overview
Updated the entire referral/invite system to use **Telegram IDs** instead of wallet addresses. This allows users to refer friends even before connecting their wallets.

---

## ✅ Backend Changes (server.js)

### 1. Updated `/api/referral-stats/:identifier` Endpoint
**Location:** Line ~172 in server.js

**Changes:**
- Now accepts both `telegramId` OR `walletAddress` as the identifier
- Tries to find user by telegramId first, then falls back to walletAddress
- Returns both telegramId and walletAddress in response

**Status:** ✅ Already applied to server.js

---

### 2. Updated `/api/referral-join` Endpoint
**Location:** Line ~502 in server.js

**Changes:**
- Changed parameter from `referrer` to `referrerTelegramId`
- Now accepts `telegramLastName` in addition to other fields
- Creates user with `temp_{telegramId}` wallet address
- Finds referrer by telegramId instead of wallet address
- Stores referred user's telegramId in referrer's referrals array
- Stores referrer's telegramId in `referredBy` field
- Includes "Join Telegram" task completed by default with 0.01 reward
- Comprehensive logging for debugging

**Status:** ⚠️ Needs manual update
**Action Required:** 
1. Open `backend/server.js`
2. Find line ~502 where `app.post('/api/referral-join'` starts
3. Replace entire endpoint with code from `backend/referral-join-updated.txt`

---

## ✅ Frontend Changes

### 3. Updated `Friends.jsx`
**Location:** `src/views/Friends.jsx`

**Key Changes:**
- Removed dependency on wallet connection
- Gets Telegram user data from `window.Telegram.WebApp.initDataUnsafe.user`
- Generates referral link: `https://t.me/LaunchGuardBot/app?startapp=ref_{telegramId}`
- Handles incoming referrals via `?ref={telegramId}` parameter
- Calls `/api/referral-join` with `referrerTelegramId` parameter
- Uses localStorage to prevent duplicate joins: `joined_{userId}`
- Fetches user stats by telegramId instead of wallet address
- Added `handleShare()` function for Telegram sharing

**Status:** ✅ Already applied

---

### 4. Updated `InviteModal.jsx`
**Location:** `src/components/global/InviteModal.jsx`

**Key Changes:**
- Now accepts `referralLink` and `onShare` as props
- Displays the referral link in the modal
- Implements proper Telegram sharing via `window.Telegram.WebApp.openTelegramLink()`
- Fallback to Web Share API if not in Telegram
- Enhanced copy functionality with error handling

**Status:** ⚠️ Needs manual update
**Action Required:**
1. Open `src/components/global/InviteModal.jsx`
2. Replace entire file content with code from `src/components/global/InviteModal-updated.jsx`

---

## 🔄 How the New System Works

### 1. User Opens App
```
User opens: https://t.me/LaunchGuardBot/app
↓
PresaleEntry.tsx redirects to /boost
↓
Backend saves user with walletAddress: temp_{telegramId}
```

### 2. User Visits Friends Page
```
Friends.jsx loads
↓
Gets telegramId from window.Telegram.WebApp
↓
Generates link: https://t.me/LaunchGuardBot/app?startapp=ref_{telegramId}
↓
Fetches referral stats by telegramId
```

### 3. Friend Clicks Referral Link
```
Opens: https://t.me/LaunchGuardBot/app?startapp=ref_1111554359
↓
App parses ?ref={referrerTelegramId}
↓
Calls /api/referral-join with:
  - referrerTelegramId: 1111554359
  - telegramId: {friend's ID}
  - telegramFirstName, telegramLastName, etc.
↓
Backend:
  - Creates new user record
  - Updates referrer's friendsReferred count
  - Adds friend's telegramId to referrer's referrals array
  - Awards 0.01 IMDINO to referrer
  - Checks and completes tasks automatically
```

### 4. User Connects Wallet Later
```
User clicks "Connect Wallet" button
↓
Calls /api/link-telegram with:
  - walletAddress: 0x...
  - telegramData: { id, username, etc. }
↓
Backend updates temp_{telegramId} → real wallet address
↓
Merges any duplicate records
```

---

## 📋 Database Schema

### Updated Fields Used:
```javascript
{
  walletAddress: "temp_1111554359" or "0x...",
  telegramId: "1111554359",
  telegramUsername: "john_doe",
  telegramFirstName: "John",
  telegramLastName: "Doe",  // NEW
  telegramPhotoUrl: "https://...",
  telegramConnected: true,
  referredBy: "9876543210",  // Referrer's telegramId
  friendsReferred: 5,
  referrals: ["111", "222", "333"],  // Array of referred users' telegramIds
  totalReward: 0.11,
  tasks: [...]
}
```

---

## 🔧 Required Manual Steps

### Step 1: Update server.js referral-join endpoint
```bash
# 1. Open backend/server.js
# 2. Go to line ~502
# 3. Find: app.post('/api/referral-join', async (req, res) => {
# 4. Delete entire endpoint (until the closing });)
# 5. Copy code from backend/referral-join-updated.txt
# 6. Paste in place of old endpoint
```

### Step 2: Update InviteModal.jsx
```bash
# 1. Open src/components/global/InviteModal.jsx
# 2. Replace entire file content with:
#    src/components/global/InviteModal-updated.jsx
```

### Step 3: Restart Backend Server
```bash
cd backend
# Stop current server (Ctrl+C if running)
node server.js
```

### Step 4: Test the Flow
1. Open Telegram mini app
2. Go to Friends page
3. Click "Invite a friend"
4. Copy referral link (should be: https://t.me/LaunchGuardBot/app?startapp=ref_{yourId})
5. Open link in another Telegram account
6. Check database to confirm new user was created with referredBy field
7. Check original user's friendsReferred count increased

---

## 🧪 Testing Checklist

- [ ] Backend `/api/referral-join` endpoint updated
- [ ] InviteModal.jsx updated with new props
- [ ] Backend server restarted
- [ ] Friends page loads without errors
- [ ] Referral link displays correctly
- [ ] Copy link button works
- [ ] Share via Telegram button works
- [ ] Opening referral link creates new user
- [ ] Referrer's stats update correctly
- [ ] Tasks auto-complete at 2 and 5 friends
- [ ] No duplicate users created
- [ ] localStorage prevents duplicate joins

---

## 🐛 Debug Logging

Both backend and frontend now include comprehensive logging:

**Backend:**
```
👥 Referral join request: { referrerTelegramId, telegramId, telegramFirstName }
✅ Found referrer: John
✅ Created new referred user: Jane
✅ Updated referrer stats: { friendsReferred: 3, totalReward: 0.04 }
✅ Task completed: On board 2 friends
```

**Frontend:**
```
🔗 Processing referral join: { referrerTelegramId: "123", userId: "456" }
```

---

## 🚀 Benefits

1. **No wallet needed**: Users can start referring before connecting wallet
2. **Persistent**: TelegramId doesn't change, wallet addresses might
3. **Trackable**: Easy to see who referred whom
4. **Scalable**: Works across multiple wallet connections
5. **Simple links**: Clean Telegram deep links

---

## 📝 Notes

- Referral links use Telegram's `startapp` parameter
- Format: `https://t.me/{BotUsername}/app?startapp=ref_{telegramId}`
- Replace `LaunchGuardBot` with your actual bot username
- The `startapp` parameter is automatically parsed by Telegram
- Access via `window.location.search` in the app

---

## 🔗 Related Files

- ✅ `backend/server.js` (partially updated)
- ⚠️ `backend/referral-join-updated.txt` (reference for manual update)
- ✅ `src/views/Friends.jsx` (fully updated)
- ⚠️ `src/components/global/InviteModal-updated.jsx` (reference for manual update)
- ✅ `backend/link-telegram-updated.txt` (from previous update)

---

## ⚠️ Important Reminders

1. Update bot username in referral link generation
2. Ensure MongoDB is running before testing
3. Use ngrok URL for Telegram webhook testing
4. Check browser console for frontend logs
5. Check terminal for backend logs
6. Test with at least 2 different Telegram accounts
