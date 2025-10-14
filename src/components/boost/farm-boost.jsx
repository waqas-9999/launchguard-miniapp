"use client"

import { Timer, Swords } from "lucide-react"
import { useState, useEffect } from "react"

export function FarmBoosts() {
  const [boosts, setBoosts] = useState([
    { id: 1, amount: "0.01 BCX", isAvailable: true, isClaimed: false, unlockTime: null },
    { id: 2, amount: "0.01 BCX", isAvailable: false, isClaimed: false, unlockTime: null },
    { id: 3, amount: "0.01 BCX", isAvailable: false, isClaimed: false, unlockTime: null },
    { id: 4, amount: "0.01 BCX", isAvailable: false, isClaimed: false, unlockTime: null },
  ])

  const [farmTimer, setFarmTimer] = useState(24 * 60 * 60) // 24 hours in seconds
  const [nextUnlockTime, setNextUnlockTime] = useState(null)
  const [completedBoosts, setCompletedBoosts] = useState(0)
  const [allBoostsCompleted, setAllBoostsCompleted] = useState(false)

  // Initialize from localStorage
  useEffect(() => {
    const savedEndTime = localStorage.getItem('boostsEndTime')
    const savedCompleted = localStorage.getItem('completedBoosts')
    const savedBoosts = localStorage.getItem('boostsState')

    if (savedEndTime && savedCompleted && savedBoosts) {
      const endTime = parseInt(savedEndTime)
      const now = Math.floor(Date.now() / 1000)
      const remaining = endTime - now
      
      if (remaining > 0) {
        setFarmTimer(remaining)
        setCompletedBoosts(parseInt(savedCompleted))
        
        const savedBoostsData = JSON.parse(savedBoosts)
        setBoosts(savedBoostsData)
        
        // Check unlock times and enable available boosts
        const updatedBoosts = savedBoostsData.map(boost => {
          if (boost.unlockTime && boost.unlockTime <= now && !boost.isClaimed) {
            return { ...boost, isAvailable: true, unlockTime: null }
          }
          return boost
        })
        
        setBoosts(updatedBoosts)
        localStorage.setItem('boostsState', JSON.stringify(updatedBoosts))
        
        // Check if all boosts are completed
        const allCompleted = updatedBoosts.every(boost => boost.isClaimed)
        setAllBoostsCompleted(allCompleted)
      } else {
        resetBoosts()
      }
    } else {
      // First time user
      const endTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      localStorage.setItem('boostsEndTime', endTime.toString())
      localStorage.setItem('completedBoosts', '0')
      localStorage.setItem('boostsState', JSON.stringify(boosts))
    }
  }, [])

  // Farm timer countdown (24 hours)
  useEffect(() => {
    const farmInterval = setInterval(() => {
      setFarmTimer(prev => {
        if (prev <= 1) {
          clearInterval(farmInterval)
          resetBoosts()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(farmInterval)
  }, [])

  // Handle boost click
  const handleBoostClick = (boostId) => {
    const now = Math.floor(Date.now() / 1000)
    
    setBoosts(prev => {
      const updatedBoosts = prev.map(boost => {
        if (boost.id === boostId && boost.isAvailable && !boost.isClaimed) {
          // Set unlock time for next boost (2 hours from now)
          const nextBoost = prev.find(b => b.id === boostId + 1)
          if (nextBoost && !nextBoost.isClaimed) {
            const nextUnlockTime = now + (2 * 60 * 60) // 2 hours in seconds
            const nextBoostUpdated = { 
              ...nextBoost, 
              unlockTime: nextUnlockTime,
              isAvailable: false
            }
            
            // Update next boost
            setTimeout(() => {
              setBoosts(current => current.map(b => 
                b.id === boostId + 1 ? nextBoostUpdated : b
              ))
              localStorage.setItem('boostsState', JSON.stringify(
                current.map(b => b.id === boostId + 1 ? nextBoostUpdated : b)
              ))
            }, 100)
          }
          
          return { 
            ...boost, 
            isClaimed: true,
            isAvailable: false
          }
        }
        return boost
      })
      
      // Save to localStorage
      localStorage.setItem('boostsState', JSON.stringify(updatedBoosts))
      return updatedBoosts
    })

    // Update completed boosts count
    setCompletedBoosts(prev => {
      const newCount = prev + 1
      localStorage.setItem('completedBoosts', newCount.toString())
      
      // Check if all boosts completed
      if (newCount === boosts.length) {
        setAllBoostsCompleted(true)
      }
      
      return newCount
    })
  }

  // Check for unlock times every second
  useEffect(() => {
    const unlockInterval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      
      setBoosts(prev => {
        let shouldUpdate = false
        const updatedBoosts = prev.map(boost => {
          if (boost.unlockTime && boost.unlockTime <= now && !boost.isClaimed && !boost.isAvailable) {
            shouldUpdate = true
            return { ...boost, isAvailable: true, unlockTime: null }
          }
          return boost
        })
        
        if (shouldUpdate) {
          localStorage.setItem('boostsState', JSON.stringify(updatedBoosts))
          return updatedBoosts
        }
        
        return prev
      })
    }, 1000)

    return () => clearInterval(unlockInterval)
  }, [])

  const resetBoosts = () => {
    const resetBoostsData = [
      { id: 1, amount: "0.01 BCX", isAvailable: true, isClaimed: false, unlockTime: null },
      { id: 2, amount: "0.01 BCX", isAvailable: false, isClaimed: false, unlockTime: null },
      { id: 3, amount: "0.01 BCX", isAvailable: false, isClaimed: false, unlockTime: null },
      { id: 4, amount: "0.01 BCX", isAvailable: false, isClaimed: false, unlockTime: null },
    ]
    
    setBoosts(resetBoostsData)
    setCompletedBoosts(0)
    setAllBoostsCompleted(false)
    setFarmTimer(24 * 60 * 60)
    setNextUnlockTime(null)
    
    // Reset localStorage
    const endTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    localStorage.setItem('boostsEndTime', endTime.toString())
    localStorage.setItem('completedBoosts', '0')
    localStorage.setItem('boostsState', JSON.stringify(resetBoostsData))
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatFarmTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  // Get next unlock time for display
  const getNextUnlockTime = () => {
    const now = Math.floor(Date.now() / 1000)
    const nextBoost = boosts.find(boost => boost.unlockTime && boost.unlockTime > now)
    return nextBoost ? nextBoost.unlockTime - now : null
  }

  const nextUnlockSeconds = getNextUnlockTime()
  const nextAvailableBoost = boosts.find(boost => boost.isAvailable && !boost.isClaimed)

  return (
    <section className="space-y-3 rounded-2xl p-4 shadow-xl ring-1 ring-[#efb81c] bg-[var(--card-bg)]">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white">Farm Boosts</h4>
          <p className="text-sm leading-5 text-gray-400">
            Complete all {boosts.length} boosts in 24 hours for higher rewards tomorrow
          </p>
        </div>
        <span className="rounded-full bg-[var(--card-surface)] px-3 py-1 text-gray-400">lv1</span>
      </div>

      {/* 24-Hour Progress Timer */}
      <div className="rounded-xl bg-[var(--card-surface)] p-3">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">24-Hour Progress</span>
          <div className="inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
            <Timer className="h-4 w-4" />
            {formatFarmTime(farmTimer)}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Completed: {completedBoosts}/{boosts.length}</span>
          <span>
            {allBoostsCompleted ? "All boosts completed! 🎉" : 
             nextAvailableBoost ? `Next: Boost ${nextAvailableBoost.id} available` : 
             nextUnlockSeconds ? `Next unlock: ${formatTime(nextUnlockSeconds)}` : "Complete boosts sequentially"}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div 
            className="bg-[#efb81c] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedBoosts / boosts.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Next Unlock Timer */}
      {nextUnlockSeconds && (
        <div className="rounded-xl bg-blue-500/20 p-3 border border-blue-500">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-300">Next Boost Unlocks In</span>
            <div className="inline-flex items-center gap-2 font-semibold text-blue-300">
              <Timer className="h-4 w-4" />
              {formatTime(nextUnlockSeconds)}
            </div>
          </div>
          <div className="text-xs text-blue-300 mt-1">
            Next boost will be available after 2 hours
          </div>
        </div>
      )}

      {/* Boosts Grid */}
      <div className="flex flex-wrap items-center gap-2">
        {boosts.map((boost) => (
          <button
            key={boost.id}
            className={`
              inline-flex items-center text-xs rounded-full transition-all duration-300 cursor-pointer border px-3 py-1 font-medium min-w-[80px] justify-center
              ${boost.isClaimed 
                ? 'border-green-500 bg-green-500/20 text-green-300'
                : boost.isAvailable
                ? 'border-[#efb81c] bg-[#efb81c]/20 text-white hover:scale-105 hover:bg-[#efb81c]/30 shadow-md hover:shadow-lg animate-pulse'
                : 'border-gray-600 bg-gray-700/50 text-gray-400 cursor-not-allowed'
              }
            `}
            onClick={() => handleBoostClick(boost.id)}
            disabled={!boost.isAvailable || boost.isClaimed}
          >
            {boost.isClaimed 
              ? "Claimed ✓"
              : boost.isAvailable
              ? boost.amount
              : "Locked 🔒"
            }
          </button>
        ))}
      </div>

      {/* Status Message */}
      <div className="mt-2 text-xs text-gray-400">
        <p>
          {allBoostsCompleted 
            ? "🎉 All boosts completed! Come back tomorrow for higher rewards."
            : nextAvailableBoost 
            ? `✅ Boost ${nextAvailableBoost.id} is ready to claim!`
            : nextUnlockSeconds 
            ? `⏳ Next boost unlocks in ${formatTime(nextUnlockSeconds)}`
            : `Progress: ${completedBoosts}/${boosts.length} boosts completed. ${formatFarmTime(farmTimer)} remaining.`
          }
        </p>
        <p className="mt-1 text-yellow-400">
          Each boost unlocks 2 hours after claiming the previous one
        </p>
      </div>
    </section>
  )
}