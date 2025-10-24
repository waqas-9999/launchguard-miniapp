import React from 'react'
import BottomNav from "../components/boost/BottomNav";
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Transaction() {
  const transactions = [
    { id: 8, currency: 'ERC20', price: '0.000000000003 BNB', amount: '$0.0000000025 BNB', time: '21d ago' },
    { id: 7, currency: 'ERC20', price: '0.000000000003 BNB', amount: '$0.0000000015 BNB', time: '21d ago' },
    { id: 6, currency: 'ERC20', price: '0.000000000003 BNB', amount: '$0.000000007 BNB', time: '21d ago' },
    { id: 5, currency: 'ERC20', price: '0.000000000003 BNB', amount: '$0.000000004 BNB', time: '21d ago' },
    { id: 4, currency: 'ERC20', price: '0.000000000003 BNB', amount: '$0.000000005 BNB', time: '21d ago' },
    { id: 3, currency: 'ERC20', price: '0.000000000003 BNB', amount: '$0.00000000001 BNB', time: '21d ago' },
    { id: 2, currency: 'ERC20', price: '0.00033 BNB', amount: '$0.02 BNB', time: '25d ago' },
    { id: 1, currency: 'ERC20', price: '0.00033 BNB', amount: '$0.0033 BNB', time: '29d ago' }
  ]

  return (
    <div className="min-h-screen max-w-md mx-auto bg-black pb-20">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/20 p-4">
        <Link to="/get-bcx">
          <button className="flex items-center mb-2 text-white">
            <FaAngleLeft className="mt-0.5" /> Back
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-white">Transaction History</h1>

        {/* Total Completed Transactions */}
        <div className="mt-4 p-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_0_20px_rgba(0,255,0,0.15)]">
          <div className="text-sm text-gray-300">Total Completed Transactions</div>
          <div className="text-3xl font-bold text-white">8</div>
        </div>

        {/* Total Transactions Amount */}
        <div className="mt-3 p-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_0_20px_rgba(0,255,0,0.15)]">
          <div className="text-sm text-gray-300">Total Transactions Amount</div>
          <div className="text-lg font-semibold text-white">$0.0253 BNB</div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-4">
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,255,0,0.15)]"
            >
              {/* Header with Order ID and Time */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs text-gray-400">Order ID</span>
                  <div className="font-semibold text-white">#{transaction.id}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Time</span>
                  <div className="text-sm text-gray-300">{transaction.time}</div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Currency:</span>
                  <span className="text-sm font-medium text-white">{transaction.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Price:</span>
                  <span className="text-sm font-medium text-white">{transaction.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Amount:</span>
                  <span className="text-sm font-medium text-white">{transaction.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Transaction
