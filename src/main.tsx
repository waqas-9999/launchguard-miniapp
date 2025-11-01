// src/main.tsx (or src/index.tsx)

// ✅ Silence noisy third-party extension warnings (MetaMask, Phantom, etc.)
(function(){
  try {
    const log = console.log; const warn = console.warn; const err = console.error;
    const noisy = [
      /ObjectMultiplex/i,
      /StreamMiddleware/i,
      /malformed chunk/i,
      /Unknown response id/i,
      /Removing unpermitted/i,
      /unpermitted intrinsics/i,
      /\bACK\b/i,
      /Module "buffer"/i,
      /Lit is in dev mode/i,
      /WalletConnect/i
    ];
    function filter(orig: any) {
      return function() {
        const msg = String(arguments[0] || '');
        if (noisy.some((r: RegExp) => r.test(msg))) return;
        return orig.apply(console, arguments);
      };
    }
    console.log = filter(log);
    console.warn = filter(warn);
    console.error = filter(err);
  } catch(_) {}
})();

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// @ts-ignore
import * as serviceWorker from './demo/serviceWorker'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  </React.StrictMode>
)

serviceWorker.unregister();