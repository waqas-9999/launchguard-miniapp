// src/main.tsx (or src/index.tsx)
import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import App from './App'
import './index.css'

import wagmiConfig from './utils/wagmi' // default export from your new wagmi v2 setup

import { Provider } from 'react-redux'
import { store } from './store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as serviceWorker from './demo/serviceWorker.js'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </React.StrictMode>
)

serviceWorker.unregister();