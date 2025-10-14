# Telegram Bot Setup for Mini App

## The Problem
Your app is currently being treated as a regular web page in Telegram's browser instead of a proper Mini App. This causes:
- ❌ Auto-minimizing on touch/swipe
- ❌ Slower performance
- ❌ No access to Telegram UI elements
- ❌ No user context (username, ID, etc.)

## The Solution
To fix this, you need to create a Telegram Bot and configure it properly.

## Step 1: Create a Telegram Bot

1. **Open Telegram** and search for `@BotFather`
2. **Start a chat** with BotFather
3. **Send** `/newbot`
4. **Follow the prompts**:
   - Choose a name for your bot (e.g., "Buycex Mini App")
   - Choose a username (e.g., "buycex_mini_app_bot")
5. **Save the bot token** that BotFather gives you

## Step 2: Configure the Bot for Mini App

1. **Send** `/newapp` to BotFather
2. **Select your bot** from the list
3. **Choose** "Mini App" as the app type
4. **Set the Mini App URL** to your deployed app URL:
   ```
   https://your-domain.com
   ```
5. **Set the app title** (e.g., "Buycex")
6. **Set the app description** (e.g., "BCX Token Presale Platform")
7. **Upload an app icon** (512x512 PNG)

## Step 3: Get the Bot Link

After setup, BotFather will give you a link like:
```
https://t.me/your_bot_username?startapp=your_app_name
```

## Step 4: Test the Mini App

1. **Click the bot link** from BotFather
2. **Open the Mini App** from the bot
3. **Check the console** - you should see:
   ```
   Telegram Web App Status: {
     isAvailable: true,
     isProperMiniApp: true,
     user: { id: 123456, first_name: "John", ... },
     initData: "Present"
   }
   ```

## Step 5: Deploy with Bot Integration

### Option A: Direct Bot Link
- Share the bot link: `https://t.me/your_bot_username?startapp=your_app_name`
- Users click this link to open the Mini App

### Option B: Web App Button in Bot
Add a web app button to your bot:

1. **Send** `/mybots` to BotFather
2. **Select your bot**
3. **Choose** "Bot Settings" → "Menu Button"
4. **Set**:
   - Text: "Open App"
   - URL: Your deployed app URL

## Step 6: Environment Variables (Optional)

If you need to verify the bot token on your backend:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_WEBHOOK_URL=https://your-domain.com/webhook
```

## Verification

When properly set up, your app will:
- ✅ **Not minimize** on touch/swipe
- ✅ **Run faster** (cached environment)
- ✅ **Have access** to user data
- ✅ **Show proper** Telegram UI integration
- ✅ **Display** "Running as proper Telegram Mini App" in console

## Troubleshooting

### Still minimizing?
1. Make sure you're opening the app through the bot link
2. Check that the bot is properly configured with BotFather
3. Verify the app URL in bot settings matches your deployed URL

### No user data?
1. Ensure the bot link includes `?startapp=your_app_name`
2. Check that the user has started the bot first
3. Verify the bot token is correct

### Console shows "web page mode"?
1. You're opening the app directly via URL instead of through the bot
2. The bot configuration is incomplete
3. The app URL in bot settings is wrong

## Example Bot Commands

You can also add these commands to your bot:

```
/start - Welcome message with Mini App button
/help - Help information
/app - Direct link to Mini App
```

## Security Note

The `initData` from Telegram contains user information and should be verified on your backend if you need to authenticate users. The current implementation logs this data for debugging - remove the console.log in production.
