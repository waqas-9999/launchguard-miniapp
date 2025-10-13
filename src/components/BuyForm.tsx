import { useEffect, useMemo, useState } from 'react'
import ETHIcon from '../assets/svg/eth.svg?react'
import DownArrowIcon from '../assets/svg/down-arrow.svg?react'
import { ReferralModal } from './ReferralModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import config from '../config'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import useWeb3Functions from '../hooks/useWeb3Functions'
import Loading from './Loading'
import { toast } from 'react-toastify'
import { setCurrentChain } from '../store/presale'
import { SelectTokenModal } from './SelectTokenModal'
import BCX from '../assets/img/bcx.png'
import buycexlogo from '../assets/img/buycexlogo.png'
import { getReferralFromURL } from '../utils/getReferrer'
import { isAddress, getAddress } from 'viem'
import ProgressBar from './ProgressBar'  // <-- NEW: CPU-light progress bar

const BuyForm = () => {
  const dispatch = useDispatch()

  // wagmi v2 replacements
  const { address, isConnected } = useAccount()
  const activeChainId = useChainId()
  const { switchChain, switchChainAsync } = useSwitchChain()

  // app config chains (what you support)
  const supportedChainIds = useMemo(() => config.chains.map((c) => c.id) as ChainId[], [])
  const isUnsupported = activeChainId
    ? !(supportedChainIds.includes(activeChainId as ChainId))
    : false

  const chainId = useSelector((state: RootState) => state.presale.chainId)
  const tokens = useSelector((state: RootState) => state.presale.tokens)
  const balances = useSelector((state: RootState) => state.wallet.balances)
  const tokenPrices = useSelector((state: RootState) => state.presale.prices)
  const totalTokensSold = useSelector(
    (state: RootState) => state.presale.totalTokensSold
  )
  const totalTokensForSale = useSelector(
    (state: RootState) => state.presale.totalTokensforSale
  )
  const minBuyLimit = useSelector(
    (state: RootState) => state.presale.minBuyLimit
  )
  const maxBuyLimit = useSelector(
    (state: RootState) => state.presale.maxBuyLimit
  )
  const tokenBalance = useSelector((state: RootState) => state.wallet.balances)
  const saleToken = config.saleToken

  const [fromToken, setFromToken] = useState<Token>(tokens[chainId][0])
  const [toToken, setToToken] = useState<Token>(
    saleToken[chainId as ChainId] as Token
  )

  const [fromValue, setFromValue] = useState<string | number>('')
  const [toValue, setToValue] = useState<string | number>('')

  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [isSelectTokenModalOpen, setIsSelectTokenModalOpen] = useState(false)

  const {
    fetchIntialData,
    fetchLockedBalance,
    fetchTokenBalances,
    fetchMinMaxBuyLimits,
    buyToken,
    loading
  } = useWeb3Functions()

  const { open } = useWeb3Modal()

  const tokenPrice = useMemo(
    () => tokenPrices[config.displayPrice[chainId as ChainId]] || 1,
    [tokenPrices, chainId]
  )

  const fixedNumber = (num: number, decimals = 6) =>
    +parseFloat((+num).toFixed(decimals))

  const formatNumber = (num: number) =>
    Intl.NumberFormat().format(fixedNumber(num, 2))

  const soldPercentage = useMemo(
    () =>
      fixedNumber(
        ((totalTokensSold * tokenPrice) / (totalTokensForSale * tokenPrice)) *
          100,
        2
      ) || 0,
    [totalTokensSold, totalTokensForSale, tokenPrice]
  )

  const lockedToken = useMemo(
    () => formatNumber(balances[toToken.symbol]),
    [balances, toToken.symbol]
  )

  const insufficientBalance = useMemo(() => {
    if (!fromValue) return false
    return +fromValue > (tokenBalance[fromToken.symbol] ?? 0)
  }, [fromValue, tokenBalance, fromToken.symbol])

  const emptyValues = () => {
    setFromValue('')
    setToValue('')
  }

  const fromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value) {
      emptyValues()
      return
    }

    setFromValue(fixedNumber(+value))
    if (tokenPrices[fromToken.symbol] !== 0) {
      setToValue(fixedNumber(+value / tokenPrices[fromToken.symbol], 4))
    }
  }

  const toValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value) {
      emptyValues()
      return
    }

    setToValue(fixedNumber(+value, 4))
    if (tokenPrices[fromToken.symbol] !== 0) {
      setFromValue(fixedNumber(+value * tokenPrices[fromToken.symbol]))
    }
  }

  const checkIfMinMaxAmount = () => {
    if (+toValue + +lockedToken > maxBuyLimit) {
      toast.error(
        `You have reached maximum amount for ${Intl.NumberFormat().format(
          maxBuyLimit
        )} Buycex`
      )
      return false
    }

    if (+toValue < minBuyLimit) {
      toast.error(`Minimum amount is ${minBuyLimit} BCX`)
      return false
    }

    return true
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (+fromToken === 0) return
    if (!checkIfMinMaxAmount()) return

    // ensure on a supported chain
    if (isUnsupported) {
      await switchChainAsync?.({ chainId: config.chains[0].id })
    }

    try {
      await buyToken(fromValue, fromToken)
      emptyValues()
    } catch (error) {
      console.log(error)
    }
  }

  // keep redux in sync with the actually connected chain
  useEffect(() => {
    if (activeChainId == null) return
    if (isUnsupported) switchChain?.({ chainId: config.chains[0].id })
    dispatch(setCurrentChain(activeChainId || config.chains[0].id))
  }, [activeChainId, isUnsupported, switchChain, dispatch])

  // balances / limits when account or chain changes
  useEffect(() => {
    if (!address || !activeChainId) return
    fetchLockedBalance()
    fetchTokenBalances()
    fetchMinMaxBuyLimits()
  }, [address, activeChainId])

  // referral handling
  useEffect(() => {
    const ref = getReferralFromURL()
    const raw = localStorage.getItem('referrer')
    if (address && raw && isAddress(raw) && getAddress(raw) === getAddress(address)) {
      localStorage.removeItem('referrer')
    }
  }, [address])

  // initial boot
  useEffect(() => {
    fetchIntialData()
  }, [])

  // for the price
  // Find native token (BNB) & USDT from your configured tokens
  const nativeToken = useMemo(
    () => tokens[chainId].find((t: Token) => !t.address),
    [tokens, chainId]
  )
  const usdtToken = useMemo(
    () => tokens[chainId].find((t: Token) => t.symbol.toUpperCase() === 'USDT'),
    [tokens, chainId]
  )
  const ethToken = useMemo(
    () => tokens[chainId].find((t: Token) => t.symbol.toUpperCase() === 'ETH'),
    [tokens, chainId]
  )
  const bnbToken = useMemo(
    () => tokens[chainId].find((t: Token) => t.symbol.toUpperCase() === 'BNB'),
    [tokens, chainId]
  )
  const hasQuickTokens = useMemo(
    () => Boolean(ethToken || bnbToken || usdtToken),
    [ethToken, bnbToken, usdtToken]
  )

  // Read "price per 1 BCX" from Redux, as filled by fetchTokenPrices()
  // For native: presale.rate -> formatted in native decimals (e.g., BNB 18)
  // For ERC20: tokenPrices[USDT] -> formatted in that token's decimals
  const bnbPricePerBcx = useMemo(
    () => (nativeToken ? tokenPrices[nativeToken.symbol] : undefined),
    [tokenPrices, nativeToken]
  )
  const usdtPricePerBcx = useMemo(
    () => (usdtToken ? tokenPrices[usdtToken.symbol] : undefined),
    [tokenPrices, usdtToken]
  )

  // Format for showing "X TOKEN = 1 BCX"
  const fmtRate = (v?: number, max = 6) =>
    v && isFinite(v) && v > 0
      ? v.toLocaleString(undefined, { maximumFractionDigits: max })
      : '�'

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* {loading && <Loading />} */}

      {/* Main Form Container */}
      <div className="relative bg-[#090a0c] backdrop-blur-2xl border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-4 lg:p-6 shadow-2xl">
        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-xl sm:rounded-2xl"></div>
        
        <form onSubmit={submit} className="relative z-10 space-y-2 sm:space-y-3">
          {/* From Token Input */}
          <div className='flex flex-col items-center justify-center gap-1'>
            <h1 className="text-2xl sm:text-3xl text-center font-bold text-white">Buy Now</h1>
            <p className="text-center font-semibold text-sm sm:text-xl text-[#efb81c]">Before Price Rises</p>
          </div>
          
          {/* Price Display Section */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-white/70 uppercase tracking-wider">Current Price</label>
            <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border-2 border-white/10 bg-white/5 hover:border-primary/30 focus-within:border-primary/50 transition-all duration-300">
              <div className="flex items-center justify-between p-2 sm:p-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={BCX}
                    alt="BCX"
                    className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-contain"
                  />
                  <span className="text-sm sm:text-lg font-bold text-white">
                    {fromToken.symbol.toUpperCase() === 'BNB' && bnbPricePerBcx ? (
                      <p className="text-sm sm:text-lg font-bold text-white ">
                        1 {toToken.symbol} = {fmtRate(bnbPricePerBcx, 6)} {nativeToken?.symbol ?? 'BNB'}
                      </p>
                    ) : fromToken.symbol.toUpperCase() === 'USDT' && usdtPricePerBcx ? (
                      <p className="text-sm sm:text-lg font-bold text-white">
                        1 {toToken.symbol} = {fmtRate(usdtPricePerBcx, 2)} USDT
                      </p>
                    ) : fromToken.symbol.toUpperCase() === 'ETH' && tokenPrices[fromToken.symbol] ? (
                      <p className="text-sm sm:text-lg font-bold text-white">
                        1 {toToken.symbol} = {fmtRate(tokenPrices[fromToken.symbol], 6)} {fromToken.symbol}
                      </p>
                    ) : tokenPrices[fromToken.symbol] ? (
                      <p className="text-sm sm:text-lg font-bold text-white">
                        1 {toToken.symbol} = {fmtRate(tokenPrices[fromToken.symbol], 2)} {fromToken.symbol}
                      </p>
                    ) : (
                      <p className="text-white/50 text-xs sm:text-sm">Fetching price�</p>
                    )}
                  </span>
                </div>
                <p className='text-sm sm:text-lg font-bold text-[#efb81c]'>Next Price: $0.50</p>
              </div>
            </div>
          </div>

          {/* Progress Section (CPU-light) */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-end justify-between">
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-white/70 text-xs">Progress</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">
                  ${formatNumber(totalTokensSold * tokenPrice)} / ${formatNumber(totalTokensForSale * tokenPrice)}
                </p>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-primary text-base sm:text-lg lg:text-xl font-bold">{soldPercentage}%</p>
                <p className="text-white/50 text-xs">Sold</p>
              </div>
            </div>

            {/* Single transition � no pulsing overlays or glowing dot */}
            <ProgressBar value={soldPercentage} height="12px" durationMs={700} />
          </div>

          {/* You Send */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-white/70 uppercase tracking-wider">You Send</label>
            <div className={`group relative overflow-hidden rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
              insufficientBalance
                ? "border-red-500/50 bg-red-500/10"
                : "border-white/10 bg-white/5 hover:border-primary/30 focus-within:border-primary/50"
            }`}>
              <div className="flex items-center p-2 sm:p-3">
                <div className="flex-1 space-y-1 min-w-0">
                  <input
                    className="w-full bg-transparent text-base sm:text-lg lg:text-xl font-semibold text-white placeholder-white/30 outline-none"
                    type="number"
                    step={0.0001}
                    placeholder="0.0"
                    value={fromValue}
                    onChange={fromValueChange}
                  />
                  <p className="text-xs text-white/50 truncate">Balance: {formatNumber(tokenBalance[fromToken.symbol] || 0)}</p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 sm:gap-2 rounded-md sm:rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 py-1.5 sm:py-2 px-2 sm:px-3 transition-all duration-300 hover:from-primary/30 hover:to-primary/20 flex-shrink-0"
                  onClick={() => setIsSelectTokenModalOpen(true)}
                >
                  <img
                    src={fromToken.image}
                    alt={fromToken.symbol}
                    className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-contain"
                  />
                  <span className="font-semibold text-white text-xs sm:text-sm hidden sm:block">{fromToken.symbol}</span>
                  <span className="font-semibold text-white text-xs sm:text-sm sm:hidden">{fromToken.symbol.length > 4 ? fromToken.symbol.substring(0, 4) + '...' : fromToken.symbol}</span>
                  <DownArrowIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                </button>
              </div> 
            </div>
          </div>

          {/* Quick Picks */}
          {hasQuickTokens && (
            <div className='flex gap-4'>
              {ethToken && (
                <div
                  className='flex flex-1 items-center justify-center gap-2 border border-[#454545] rounded-lg px-3 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:scale-105 cursor-pointer'
                  onClick={() => {
                    if (ethToken) {
                      setFromToken(ethToken)
                      setFromValue('0')
                      setToValue('0')
                    }
                  }}
                >
                  <img src={ethToken?.image} alt="ETH" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-contain" />
                  <span className="font-semibold text-white text-xs sm:text-base">ETH</span>
                </div>
              )}
              {bnbToken && (
                <div
                  className='flex flex-1 items-center justify-center gap-2 border border-[#454545] rounded-lg px-3 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:scale-105 cursor-pointer'
                  onClick={() => {
                    if (bnbToken) {
                      setFromToken(bnbToken)
                      setFromValue('0')
                      setToValue('0')
                    }
                  }}
                >
                  <img src={bnbToken?.image} alt="BNB" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-contain" />
                  <span className="font-semibold text-white text-xs sm:text-base">BNB</span>
                </div>
              )}
              {usdtToken && (
                <div
                  className='flex flex-1 justify-center items-center gap-2 border border-[#454545] rounded-lg px-3 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:scale-105 cursor-pointer'
                  onClick={() => {
                    if (usdtToken) {
                      setFromToken(usdtToken)
                      setFromValue('0')
                      setToValue('0')
                    }
                  }}
                >
                  <img src={usdtToken?.image} alt="USDT" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-contain" />
                  <span className="font-semibold text-white text-xs sm:text-base">USDT</span>
                </div>
              )}
            </div>
          )}

          {/* You Get */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs font-medium text-white/70 uppercase tracking-wider">You Get</label>
            <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border-2 border-white/10 bg-white/5 hover:border-primary/30 focus-within:border-primary/50 transition-all duration-300">
              <div className="flex items-center p-2 sm:p-3">
                <div className="flex-1 space-y-1 min-w-0">
                  <input
                    type="number"
                    value={toValue}
                    onChange={toValueChange}
                    className="w-full bg-transparent text-base sm:text-lg lg:text-xl font-semibold text-white placeholder-white/30 outline-none"
                    placeholder="0.0"
                    step={0.0001}
                  />
                  <p className="text-xs text-white/50">You'll receive: {formatNumber(+toValue * 1.1)}</p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 rounded-md sm:rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 py-1.5 sm:py-2 px-2 sm:px-3 flex-shrink-0">
                  <img
                    src={BCX}
                    alt="BCX"
                    className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-contain"
                  />
                  <span className="font-semibold text-white text-xs sm:text-sm">{toToken.symbol}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insufficient balance */}
          {insufficientBalance && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-md sm:rounded-lg p-2 sm:p-3">
              <p className="text-red-400 text-xs text-center">
                ? Insufficient {fromToken.symbol} balance. Please reduce the amount and try again.
              </p>
            </div>
          )}

          {/* Status */}
          <div className="text-center">
            <p className="text-white/80 text-xs sm:text-base font-medium">
              {isConnected
                ? `You've purchased ${lockedToken} ${toToken.symbol} tokens!`
                : `Connect your wallet to start buying ${toToken.symbol}`}
            </p>
          </div>

          {/* Action Button */}
          {isConnected ? (
            <button
              className="group relative w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-black font-bold text-base sm:text-lg py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || insufficientBalance}
              type="submit"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 sm:h-5 sm:w-5 animate-spin fill-current"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm">Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm">Start Exchange</span>
                </div>
              )}
            </button>
          ) : (
            <button
              className="group relative w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-black font-bold text-base sm:text-lg py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25"
              disabled={loading}
              type="button"
              onClick={() => open()}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm">Connect Wallet</span>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-black rounded-full"></div>
              </div>
            </button>
          )}
        </form>

        {/* Powered By Section */}
        <div className="mt-4 sm:mt-6 z-40 text-center">
          <a
            href="https://www.buycex.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Buycex | Web 3.0 File Marketplace"
            className="inline-flex items-center gap-1 sm:gap-2 text-white/60 hover:text-primary transition-colors duration-300"
          >
            <span className="text-xs">Powered by</span>
            <img
              src={buycexlogo}
              className="h-4 sm:h-5 hover:scale-110 cursor-pointer transition-transform duration-300"
              alt="Buycex"
            />
          </a>
        </div>
      </div>

      {/* Modals */}
      {isSelectTokenModalOpen && (
        <SelectTokenModal
          closeModal={() => setIsSelectTokenModalOpen(false)}
          selectToken={(token: Token) => {
            setFromToken(token)
            setFromValue('0')
            setToValue('0')
            setIsSelectTokenModalOpen(false)
          }}
        />
      )}
      {isReferralModalOpen && (
        <ReferralModal closeModal={() => setIsReferralModalOpen(true)} />
      )}
    </div>
  )
}

export default BuyForm
