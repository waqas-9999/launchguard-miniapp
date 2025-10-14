import { useEffect, useState, useCallback, lazy, Suspense } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import { fetchReferralCode } from './utils/apis'
import { setUser } from './store/wallet'

import WebglFluidAnimation from './components/WebglFluidAnimation'
import { SelectTokenModalTarget } from './components/SelectTokenModal'
import { ReferralModalTarget } from './components/ReferralModal'
import { BuyWIthCardModalTarget } from './components/BuyWithCardModal'
import AppLayout from './AppLayout'
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
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.expand(); // Forces full-screen
      if (tg.disableVerticalSwipes) {
        tg.disableVerticalSwipes(); // Prevents swipe-down minimize
      }
    }

    // Optional fallback: prevent touch propagation globally
    const stopTouch = (e: TouchEvent) => e.stopPropagation();
    document.addEventListener("touchstart", stopTouch, { passive: true });

    return () => {
      document.removeEventListener("touchstart", stopTouch);
    };
  }, []);

  return (
    <div className="app-scroll">
    <Router>
      <Suspense fallback={null}>
        <ScrollToTop />
        <Routes>
          {/* 
          <Route path="/home" element={<Home />} />*/}
       <Route path="/dino" element={<Dino />} />
       <Route path="/friends" element={<Friends />} />
       <Route path="/leaderboard-new" element={<LeaderboardNew />} />
       <Route path="/boost" element={<Boost />} />
       <Route path="/get-bcx" element={<GetBcx />} />
       <Route path="/transaction" element={<Transaction />} />

          {/* Protected Routes */}
          {isConnected && hasEntered ? (
            <>
              <Route path="/" element={<Navigate to="/dashboard" />} />

              <Route
                path="/dashboard"
                element={
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                }
              />

              <Route
                path="/buy"
                element={
                  <AppLayout>
                    <BuyNow />
                  </AppLayout>
                }
              />

              <Route
                path="/transactions"
                element={
                  <AppLayout>
                    <Transactions />
                  </AppLayout>
                }
              />

              <Route
                path="/leaderboard"
                element={
                  <AppLayout>
                    <Leaderboard />
                  </AppLayout>
                }
              />

              <Route
                path="/updates"
                element={
                  <AppLayout>
                    <ProjectUpdates />
                  </AppLayout>
                }
                
              />
               <Route
                path="/claim"
                element={
                  <AppLayout>
                    <Claim />
                  </AppLayout>
                }
                
              />
            </>
          ) : (
            // Not connected => show PresaleEntry
            <Route path="*" element={<PresaleEntry />} />
          )}
        </Routes>
      </Suspense>

      {/* Global UI (non-Web3Modal) */}
      <WebglFluidAnimation />
      <SelectTokenModalTarget />
      <ReferralModalTarget />
      <BuyWIthCardModalTarget />
    </Router>
    </div>
  )
}

export default App
