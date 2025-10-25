import { useEffect, useState, useCallback, lazy, Suspense } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import { fetchReferralCode } from './utils/apis'
import { setUser } from './store/wallet'
import { telegramWebApp } from './utils/telegram'

import WebglFluidAnimation from './components/WebglFluidAnimation'
import { SelectTokenModalTarget } from './components/SelectTokenModal'
import { ReferralModalTarget } from './components/ReferralModal'
import { BuyWIthCardModalTarget } from './components/BuyWithCardModal'
import AppLayout from './AppLayout'
import TelegramStatus from './components/TelegramStatus'
import { getReferralFromURL } from './utils/getReferrer'
// @ts-ignore - JSX module shim
import ScrollToTop from './components/global/ScrolTop.jsx'

// Route-level code splitting
const Home = lazy(() => import('./components/home/Home'))
const PresaleEntry = lazy(() => import('./components/PresaleEntry'))
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'))
const BuyNow = lazy(() => import('./components/buynow/BuyNow'))
const Transactions = lazy(() => import('./components/Transactions/TransactionsSummary'))
const Leaderboard = lazy(() => import('./components/leaderbord/LeaderboardPanel'))
const ProjectUpdates = lazy(() => import('./components/Project/ProjectUpdates'))
const Claim = lazy(() => import('./components/Claim/Claim'))
// @ts-ignore - JSX module shim
const Dino = lazy(() => import('./views/Dino.jsx'))
// @ts-ignore - JSX module shim
const Friends = lazy(() => import('./views/Friends.jsx'))
// @ts-ignore - JSX module shim
const LeaderboardNew = lazy(() => import('./views/Leaderboard.jsx'))
// @ts-ignore - JSX module shim
const Boost = lazy(() => import('./views/Home.jsx'))
// @ts-ignore - JSX module shim
const GetBcx = lazy(() => import('./views/GetBcx.jsx'))
const LandingMini = lazy(() => import('./views/Landing-mini.jsx'))
// @ts-ignore - JSX module shim
const Transaction = lazy(() => import('./views/Transaction.jsx'))
function App() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const dispatch = useDispatch()

  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    return localStorage.getItem('hasEntered') === 'true'
  })

  // Capture ?ref= once on mount and run helper
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const referralId = searchParams.get('ref')
      if (referralId?.length === 6) {
        localStorage.setItem('ref', referralId)
      }
      getReferralFromURL()
    } catch {}
  }, [])

  const signIn = useCallback(async () => {
    try {
      const { user } = await fetchReferralCode(address as string)
      if (user) dispatch(setUser({ ...user }))
    } catch (e) {
      console.error('Referral fetch failed:', e)
    }
  }, [address, dispatch])

  useEffect(() => {
    if (!isConnected) return
    localStorage.setItem('hasEntered', 'true')
    setHasEntered(true)
    signIn()
  }, [isConnected, signIn])

  // Throttled mousemove forwarder to #webgl-fluid (prevents CPU spikes)
  useEffect(() => {
    const target = document.getElementById('webgl-fluid')
    if (!target) return

    let ticking = false
    let lastX = 0, lastY = 0

    const onWindowMove = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          const evt = new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: false,
            clientX: lastX,
            clientY: lastY
          })
          target.dispatchEvent(evt)
          ticking = false
        })
      }
    }

    window.addEventListener('mousemove', onWindowMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onWindowMove as EventListener)
    }
  }, [])

  useEffect(() => {
    // Initialize Telegram Web App
    telegramWebApp.setupMiniApp();
    
    // Log the current state for debugging
    console.log('Telegram Web App Status:', {
      isAvailable: telegramWebApp.isAvailable(),
      isProperMiniApp: telegramWebApp.isProperMiniApp(),
      user: telegramWebApp.getUser(),
      initData: telegramWebApp.getInitData() ? 'Present' : 'Missing'
    });

    // Prevent touch events that could trigger browser gestures
    const preventTouch = (e: TouchEvent) => {
      // Prevent default touch behaviors that could minimize the app
      if (e.touches.length > 1) {
        e.preventDefault(); // Prevent pinch zoom
      }
      
      // Prevent swipe gestures
      const touch = e.touches[0];
      if (touch) {
        const startX = touch.clientX;
        const startY = touch.clientY;
        
        const handleTouchMove = (moveEvent: TouchEvent) => {
          const moveTouch = moveEvent.touches[0];
          if (moveTouch) {
            const deltaX = Math.abs(moveTouch.clientX - startX);
            const deltaY = Math.abs(moveTouch.clientY - startY);
            
            // Prevent swipe gestures that could minimize the app
            if (deltaY > deltaX && deltaY > 50) {
              moveEvent.preventDefault();
            }
          }
        };
        
        const handleTouchEnd = () => {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };
        
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
      }
    };

    // Add touch event listeners
    document.addEventListener("touchstart", preventTouch, { passive: false });
    
    // Prevent context menu on long press
    const preventContextMenu = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      document.removeEventListener("touchstart", preventTouch);
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, []);

  return (
    <div className="app-scroll">
    <Router>
    <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={null}>
        <ScrollToTop />
     <Routes>
  {/* Presale Route */}
  <Route path="/presale" element={<PresaleEntry />} />

  {/* Other public routes */}
  <Route path="/landing" element={<LandingMini />} />
  <Route path="/dino" element={<Dino />} />
  <Route path="/friends" element={<Friends />} />
  <Route path="/leaderboard-new" element={<LeaderboardNew />} />
  <Route path="/boost" element={<Boost />} />
  <Route path="/get-bcx" element={<GetBcx />} />
  <Route path="/transaction" element={<Transaction />} />

  {/* Root redirects to presale */}
  <Route path="/" element={<Navigate to="/presale" replace />} />

  {/* Fallback for unknown paths */}
  <Route path="*" element={<Navigate to="/presale" replace />} />
</Routes>

      </Suspense>

      {/* Global UI (non-Web3Modal) */}
      <WebglFluidAnimation />
      <SelectTokenModalTarget />
      <ReferralModalTarget />
      <BuyWIthCardModalTarget />
      
      {/* Telegram Status Debug Component - Remove in production */}
      {/* <TelegramStatus show={process.env.NODE_ENV === 'development'} /> */}
    </Router>
    </div>
  )
}

export default App
