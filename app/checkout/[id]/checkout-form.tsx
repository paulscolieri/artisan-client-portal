'use client'

import { useState } from 'react'
import Link from 'next/link'

function detectCardType(num: string): 'visa' | 'mc' | 'amex' | 'generic' {
  if (num.startsWith('4')) return 'visa'
  if (num.startsWith('5') || num.startsWith('2')) return 'mc'
  if (num.startsWith('3')) return 'amex'
  return 'generic'
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`
  return digits
}

function CardBadge({ type }: { type: 'visa' | 'mc' | 'amex' | 'generic' }) {
  if (type === 'visa') return (
    <span className="text-[10px] font-bold italic text-blue-700 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 leading-none tracking-wide">VISA</span>
  )
  if (type === 'mc') return (
    <span className="flex -space-x-1.5">
      <span className="w-4 h-4 rounded-full bg-red-500" />
      <span className="w-4 h-4 rounded-full bg-amber-400 opacity-90" />
    </span>
  )
  if (type === 'amex') return (
    <span className="text-[10px] font-bold text-blue-500 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 leading-none">AMEX</span>
  )
  return null
}

export function CheckoutForm({ orderId, amount }: { orderId: string; amount: number }) {
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('margaret@ashworthdesign.com')
  const [zip, setZip] = useState('')

  const cardType = detectCardType(card.replace(/\s/g, ''))

  function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setPaid(true) }, 1800)
  }

  if (paid) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-10 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl text-stone-800 mb-1">Payment confirmed</h2>
          <p className="text-stone-500 text-sm">
            ${amount.toLocaleString()} received. Your order is now moving into production.
          </p>
        </div>
        <div className="rounded-lg bg-stone-50 border border-stone-100 p-4 text-left space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-400">Order</span>
            <span className="text-stone-700 font-mono text-xs">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Confirmation sent to</span>
            <span className="text-stone-700">{email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Amount charged</span>
            <span className="text-stone-700 font-medium">${amount.toLocaleString()}</span>
          </div>
        </div>
        <p className="text-xs text-stone-400">
          A receipt has been emailed to you. Our team will be in touch with a production timeline within 48 hours.
        </p>
        <Link
          href="/portal"
          className="inline-block rounded-full bg-[#b87d6b] px-8 py-2.5 text-white text-sm font-medium hover:bg-[#a56d5c] transition-colors"
        >
          Back to my portal
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <p className="text-xs uppercase tracking-widest text-stone-400">Contact</p>
        <div>
          <label className="block text-xs text-stone-500 mb-1.5">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff] transition-all"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <p className="text-xs uppercase tracking-widest text-stone-400">Payment details</p>

        <div>
          <label className="block text-xs text-stone-500 mb-1.5">Card number</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              className="w-full rounded-lg border border-stone-200 px-3 py-2.5 pr-14 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff] transition-all font-mono tracking-wider"
              value={card}
              onChange={e => setCard(formatCardNumber(e.target.value))}
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              <CardBadge type={cardType} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Expiry</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM / YY"
              className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff] transition-all font-mono"
              value={expiry}
              onChange={e => setExpiry(formatExpiry(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">CVC</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="123"
              maxLength={4}
              className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff] transition-all font-mono"
              value={cvc}
              onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">ZIP</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="37201"
              maxLength={5}
              className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff] transition-all font-mono"
              value={zip}
              onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-stone-500 mb-1.5">Name on card</label>
          <input
            type="text"
            placeholder="Margaret Ashworth"
            className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff] transition-all"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#635bff] py-3.5 text-white font-medium text-sm hover:bg-[#5751e8] active:bg-[#4c47d4] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Processing...
          </>
        ) : (
          `Pay $${amount.toLocaleString()}`
        )}
      </button>

      <div className="flex items-center justify-center gap-4 pt-1">
        <div className="flex items-center gap-1.5 text-stone-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs">256-bit SSL</span>
        </div>
        <span className="text-stone-200">|</span>
        <span className="text-xs text-stone-400">Powered by <span className="font-medium text-[#635bff]">Stripe</span></span>
        <span className="text-stone-200">|</span>
        <span className="text-xs text-stone-400">PCI DSS compliant</span>
      </div>
    </form>
  )
}
